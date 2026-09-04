const Booking = require("../models/Booking");

const getAnalytics = async (req, res) => {
  try {
    // 1. Bookings over time
    const bookingsOverTime = await Booking.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$scheduledAt",
            },
          },
          bookings: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          bookings: 1,
        },
      },
    ]);

    // 2. Revenue over time
    const revenueOverTime = await Booking.aggregate([
      {
        $match: {
          status: "completed",
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$scheduledAt",
            },
          },
          revenue: {
            $sum: "$amount",
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          revenue: 1,
        },
      },
    ]);

    // 3. Booking status distribution
    const statusDistribution = await Booking.aggregate([
      {
        $group: {
          _id: "$status",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          _id: 0,
          status: "$_id",
          count: 1,
        },
      },
    ]);

    // 4. Service breakdown
    const serviceBreakdown = await Booking.aggregate([
      {
        $lookup: {
          from: "services",
          localField: "service",
          foreignField: "_id",
          as: "serviceDetails",
        },
      },
      {
        $unwind: "$serviceDetails",
      },
      {
        $group: {
          _id: "$serviceDetails.name",
          bookings: {
            $sum: 1,
          },
          revenue: {
            $sum: "$amount",
          },
        },
      },
      {
        $sort: {
          bookings: -1,
        },
      },
      {
        $project: {
          _id: 0,
          service: "$_id",
          bookings: 1,
          revenue: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        bookingsOverTime,
        revenueOverTime,
        statusDistribution,
        serviceBreakdown,
      },
    });
  } catch (error) {
    console.error("Analytics error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch analytics data",
    });
  }
};

module.exports = {
  getAnalytics,
};