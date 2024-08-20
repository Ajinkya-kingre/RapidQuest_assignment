// first connect to database
// fetch to the shopify_order.total_price_set
// make a controller for daily sales
// make a controller for monthly sales
// make a controller for yearly sales

import mongoose from "mongoose";

const dailySales = async (req, res) => {
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
            day: { $dayOfMonth: "$createdAtDate" },
          },
          totalSales: { $sum: { $toDouble: "$total_price" } },
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

const monthlySales = async (req, res) => {
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

const quarterlySales = async (req, res) => {
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
            quarter: { $ceil: { $divide: [{ $month: "$createdAtDate" }, 3] } },
          },
          totalSales: { $sum: { $toDouble: "$total_price" } },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.quarter": 1,
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

const yearlySales = async (req, res) => {
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
          _id: { year: { $year: "$createdAtDate" } },
          totalSales: { $sum: { $toDouble: "$total_price" } },
        },
      },
      {
        $sort: {
          "_id.year": 1, // Sort by year in ascending order
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

export { dailySales, monthlySales, quarterlySales, yearlySales };
