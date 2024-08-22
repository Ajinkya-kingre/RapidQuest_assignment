import mongoose from "mongoose";

const customerDistributionByCity = async (req, res) => {
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
          _id: "$customer.default_address.city",
          customerCount: { $sum: 1 },
        },
      },
      {
        $sort: {
          customerCount: -1,
        },
      },
      {
        $project: {
          city: "$_id",
          customerCount: 1,
          _id: 0,
        },
      },
    ];

    const customerDistributionByCity = await collection
      .aggregate(pipeline)
      .toArray();

    if (!customerDistributionByCity || customerDistributionByCity.lengh === 0) {
      return res.status(404).json("No distribution data of customer found");
    }

    // Return the result
    res.status(200).json(customerDistributionByCity);
  } catch (error) {
    console.log("Error fetching customer distribution data", error.message);
    res.status(500).send("Error fetching customer distribution data");
  }
};

export { customerDistributionByCity };
