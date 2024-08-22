import mongoose from "mongoose";

const newCustomerDaily = async (req, res) => {
  try {
    // Fetch all documents from the "shopifyOrders" collection
    const db = mongoose.connection.useDb("RQ_Analytics");
    const collection = db.collection("shopifyCustomers");
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
            day: { $dayOfMonth: "$createdAtDate" },
          },
          totalNewCustomerPerDay: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
          "_id.day": 1,
        },
      },
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

const newCustomerMonthly = async (req, res) => {
  try {
    // Fetch all documents from the "shopifyOrders" collection
    const db = mongoose.connection.useDb("RQ_Analytics");
    const collection = db.collection("shopifyCustomers");
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
          totalNewCustomerPerDay: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
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

const newCustomerYearly = async (req, res) => {
  try {
    // Fetch all documents from the "shopifyOrders" collection
    const db = mongoose.connection.useDb("RQ_Analytics");
    const collection = db.collection("shopifyCustomers");
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
          totalNewCustomerPerDay: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
        },
      },
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

export { newCustomerDaily, newCustomerMonthly, newCustomerYearly };
