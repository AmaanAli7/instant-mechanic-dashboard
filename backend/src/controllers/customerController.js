const Customer = require("../models/Customer");
// const Booking = require("../models/Booking");

const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.aggregate([
      {
        $lookup: {
          from: "bookings",
          let: { customerId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$customer", "$$customerId"],
                },
              },
            },
            {
              $sort: {
                createdAt: -1,
              },
            },
            {
              $limit: 1,
            },
            {
              $project: {
                bookingId: 1,
                status: 1,
                amount: 1,
                scheduledAt: 1,
              },
            },
          ],
          as: "lastBooking",
        },
      },

      {
        $lookup: {
          from: "bookings",
          let: { customerId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$customer", "$$customerId"],
                },
              },
            },
            {
              $count: "total",
            },
          ],
          as: "bookingCount",
        },
      },

      {
        $project: {
          name: 1,
          email: 1,
          phone: 1,
          city: 1,
          createdAt: 1,

          lastBooking: {
            $arrayElemAt: ["$lastBooking", 0],
          },

          totalBookings: {
            $ifNull: [
              {
                $arrayElemAt: ["$bookingCount.total", 0],
              },
              0,
            ],
          },
        },
      },

      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: customers,
    });
  } catch (error) {
    console.error("Get customers error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch customers",
    });
  }
};

module.exports = {
  getCustomers,
};