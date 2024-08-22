import mongoose from "mongoose";

const salesGrowthOverMonths = async (req, res) => {
  try {
    // Fetch all documents from the "shopifyOrders" collection
    const db = mongoose.connection.useDb("RQ_Analytics");
    const collection = db.collection("shopifyOrders");
    const pipeline = [
      {
        $addFields: {
          createdAtDate: { $dateFromString: { dateString: "$created_at" } },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAtDate" },
            month: { $month: "$createdAtDate" },
          },
          totalSales: { $sum: { $toDouble: "$total_price" } },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
      {
        $setWindowFields: {
          sortBy: { "_id.year": 1, "_id.month": 1 },
          output: {
            previousMonthSales: {
              $shift: {
                output: "$totalSales",
                by: -1,
              },
            },
          },
        },
      },
      {
        $addFields: {
          growthRate: {
            $cond: {
              if: { $ne: ["$previousMonthSales", null] },
              then: {
                $multiply: [
                  {
                    $divide: [
                      { $subtract: ["$totalSales", "$previousMonthSales"] },
                      "$previousMonthSales",
                    ],
                  },
                 100
                ],
              },
              else : null
            },
          },
        },
      },
      {
        $project : {
            _id : 0,
            year : "$_id.year",
            month : "$_id.month",
            totalSales : 1,
            growthRate : 1
        }
      }
    ];

    // Fetch documents
    const tt = await collection.aggregate(pipeline).toArray();

    if (!tt || tt.length === 0) {
      res.status(404).json("couldn't get and calculate the data");
    }

    res.status(200).json(tt);
  } catch (err) {
    console.error("Error fetching sales data:", err.message);
    res.status(500).send("Server Error");
  }
};

const salesGrowthOveryears = async (req, res) => {
    try {
      // Fetch all documents from the "shopifyOrders" collection
      const db = mongoose.connection.useDb("RQ_Analytics");
      const collection = db.collection("shopifyOrders");
      const pipeline = [
        {
          $addFields: {
            createdAtDate: { $dateFromString: { dateString: "$created_at" } },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$createdAtDate" },
            },
            totalSales: { $sum: { $toDouble: "$total_price" } },
          },
        },
        {
          $sort: {
            "_id.year": 1,
          },
        },
        {
          $setWindowFields: {
            sortBy: { "_id.year": 1 },
            output: {
              previousYearSales: {
                $shift: {
                  output: "$totalSales",
                  by: -1,
                },
              },
            },
          },
        },
        {
          $addFields: {
            growthRate: {
              $cond: {
                if: { $ne: ["$previousYearSales", null] },
                then: {
                  $multiply: [
                    {
                      $divide: [
                        { $subtract: ["$totalSales", "$previousYearSales"] },
                        "$previousYearSales",
                      ],
                    },
                   100
                  ],
                },
                else : null
              },
            },
          },
        },
        {
          $project : {
              _id : 0,
              year : "$_id.year",
              totalSales : 1,
              growthRate : 1
          }
        }
      ];
  
      // Fetch documents
      const tt = await collection.aggregate(pipeline).toArray();
  
      if (!tt || tt.length === 0) {
        res.status(404).json("couldn't get and calculate the data");
      }
  
      res.status(200).json(tt);
    } catch (err) {
      console.error("Error fetching sales data:", err.message);
      res.status(500).send("Server Error");
    }
  };



export {salesGrowthOverMonths, salesGrowthOveryears}
