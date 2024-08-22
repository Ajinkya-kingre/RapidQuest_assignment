import mongoose from "mongoose";

const repeatCustomersDaily = async (req, res) => {
  try {
    // Connect to the database
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
            day : {$dayOfMonth : "$createdAtDate"},
            customerId: "$customer.id", // Group by customer ID along with year and month
          },
          orderCount: { $sum: 1 },
        },
      },
      {
        $match: {
          orderCount: { $gt: 1 }, // Match customers with more than one order in the same month
        },
      },
      {
        $group: {
          _id: {
            year: "$_id.year",
            month: "$_id.month",
            day : "$_id_day",
          },
          repeatCustomers: { $sum: 1 }, // Count repeat customers per month
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
          "_id.day" : 1
        },
      },
    ];

    // Execute the aggregation
    const repeatCustomers = await collection.aggregate(pipeline).toArray();

    // Check if data is found
    if (!repeatCustomers || repeatCustomers.length === 0) {
      return res.status(404).json("No repeat customers data found for the month");
    }

    // Return the result
    res.status(200).json(repeatCustomers);
  } catch (err) {
    console.error("Error fetching repeat customers data:", err.message);
    res.status(500).send("Server Error");
  }
};

const repeatCustomersMonthly = async (req, res) => {
  try {
    // Connect to the database
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
            customerId: "$customer.id", // Group by customer ID along with year and month
          },
          orderCount: { $sum: 1 },
        },
      },
      {
        $match: {
          orderCount: { $gt: 1 }, // Match customers with more than one order in the same month
        },
      },
      {
        $group: {
          _id: {
            year: "$_id.year",
            month: "$_id.month",
          },
          repeatCustomers: { $sum: 1 }, // Count repeat customers per month
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ];

    // Execute the aggregation
    const repeatCustomers = await collection.aggregate(pipeline).toArray();

    // Check if data is found
    if (!repeatCustomers || repeatCustomers.length === 0) {
      return res.status(404).json("No repeat customers data found for the month");
    }

    // Return the result
    res.status(200).json(repeatCustomers);
  } catch (err) {
    console.error("Error fetching repeat customers data:", err.message);
    res.status(500).send("Server Error");
  }
};

const repeatCustomersQuater= async (req, res) => {
  try {
    // Connect to the database
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
            quater : {$ceil : { $divide: [{$month : "$createdAtDate"}, 3]}},
            customerId: "$customer.id", // Group by customer ID along with year and month
          },
          orderCount: { $sum: 1 },
        },
      },
      {
        $match: {
          orderCount: { $gt: 1 }, // Match customers with more than one order in the same month
        },
      },
      {
        $group: {
          _id: {
            year: "$_id.year",
            quater: "$_id.quater",
          },
          repeatCustomers: { $sum: 1 }, // Count repeat customers per month
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.quater": 1,
        },
      },
    ];

    // Execute the aggregation
    const repeatCustomers = await collection.aggregate(pipeline).toArray();

    // Check if data is found
    if (!repeatCustomers || repeatCustomers.length === 0) {
      return res.status(404).json("No repeat customers data found for the month");
    }

    // Return the result
    res.status(200).json(repeatCustomers);
  } catch (err) {
    console.error("Error fetching repeat customers data:", err.message);
    res.status(500).send("Server Error");
  }
};

const repeatCustomersYear= async (req, res) => {
  try {
    // Connect to the database
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
            customerId: "$customer.id", // Group by customer ID along with year and month
          },
          orderCount: { $sum: 1 },
        },
      },
      {
        $match: {
          orderCount: { $gt: 1 }, // Match customers with more than one order in the same month
        },
      },
      {
        $group: {
          _id: {
            year: "$_id.year",
          },
          repeatCustomers: { $sum: 1 }, // Count repeat customers per month
        },
      },
      {
        $sort: {
          "_id.year": 1,
        },
      },
    ];

    // Execute the aggregation
    const repeatCustomers = await collection.aggregate(pipeline).toArray();

    // Check if data is found
    if (!repeatCustomers || repeatCustomers.length === 0) {
      return res.status(404).json("No repeat customers data found for the month");
    }

    // Return the result
    res.status(200).json(repeatCustomers);
  } catch (err) {
    console.error("Error fetching repeat customers data:", err.message);
    res.status(500).send("Server Error");
  }
};

export { repeatCustomersDaily, repeatCustomersMonthly, repeatCustomersQuater, repeatCustomersYear };
