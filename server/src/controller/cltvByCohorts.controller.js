import mongoose from "mongoose";

const cltvByCohortMonth = async (req, res) => {
    try {
      const db = mongoose.connection.useDb("RQ_Analytics");
      const collection = db.collection("shopifyOrders");
      const pipeline = [
        {
          $addFields: {
            createAtDate: { $dateFromString: { dateString: "$created_at" } },
          },
        },
        {
          $group: {
            _id: "$customer.id",
           firstPurchaseDate : {$min : "$createAtDate"},
           totalRevenue : { $sum: { $toDouble: "$total_price" }},
          },    
        },
        {
            $group : {
                _id : {
                    cohortYear : {$year : "$firstPurchaseDate"},
                    cohortMonth : {$month : "$firstPurchaseDate"}
                },
                cohortTotalRevenue : {$sum : "$totalRevenue"},
                customerCount : {$sum : 1}
            }
        },
        {
          $sort: {
            "_id.cohortYear" : 1,
            "_id.cohortMonth" : 1
          },
        },
      ];
  
      const cltvByCohorts = await collection
        .aggregate(pipeline)
        .toArray();
  
      if (!cltvByCohorts || cltvByCohorts.lengh === 0) {
        return res.status(404).json("No distribution data of customer found");
      }
  
      // Return the result
      res.status(200).json(cltvByCohorts);
    } catch (error) {
      console.log("Error fetching customer distribution data", error.message);
      res.status(500).send("Error fetching customer distribution data");
    }
  };

  const cltvByCohortYear = async (req, res) => {
    try {
      const db = mongoose.connection.useDb("RQ_Analytics");
      const collection = db.collection("shopifyOrders");
      const pipeline = [
        {
          $addFields: {
            createAtDate: { $dateFromString: { dateString: "$created_at" } },
          },
        },
        {
          $group: {
            _id: "$customer.id",
           firstPurchaseDate : {$min : "$createAtDate"},
           totalRevenue : { $sum: { $toDouble: "$total_price" }},
          },    
        },
        {
            $group : {
                _id : {
                    cohortYear : {$year : "$firstPurchaseDate"},
                },
                cohortTotalRevenue : {$sum : "$totalRevenue"},
                customerCount : {$sum : 1}
            }
        },
        {
          $sort: {
            "_id.cohortYear" : 1,
          },
        },
      ];
  
      const cltvByCohorts = await collection
        .aggregate(pipeline)
        .toArray();
  
      if (!cltvByCohorts || cltvByCohorts.lengh === 0) {
        return res.status(404).json("No distribution data of customer found");
      }
  
      // Return the result
      res.status(200).json(cltvByCohorts);
    } catch (error) {
      console.log("Error fetching customer distribution data", error.message);
      res.status(500).send("Error fetching customer distribution data");
    }
  };

  export {cltvByCohortMonth, cltvByCohortYear}
  