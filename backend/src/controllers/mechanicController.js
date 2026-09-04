const Mechanic = require("../models/Mechanic");

const getMechanics = async (req, res) => {
  try {
    const mechanics = await Mechanic.aggregate([
      // Get current booking
      {
        $lookup: {
          from: "bookings",
          let: { bookingId: "$currentBooking" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$bookingId"],
                },
              },
            },
            {
              $project: {
                _id: 1,
                bookingId: 1,
                status: 1,
                vehicle: 1,
                scheduledAt: 1,
              },
            },
          ],
          as: "currentBookingDetails",
        },
      },

      // Get latest booking for this mechanic
      {
        $lookup: {
          from: "bookings",
          let: { mechanicId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$mechanic", "$$mechanicId"],
                },
              },
            },
            {
              $sort: {
                scheduledAt: -1,
              },
            },
            {
              $limit: 1,
            },
            {
              $project: {
                _id: 1,
                bookingId: 1,
                status: 1,
                vehicle: 1,
                scheduledAt: 1,
              },
            },
          ],
          as: "lastBooking",
        },
      },

      {
        $project: {
          name: 1,
          phone: 1,
          status: 1,
          jobsCompleted: 1,
          rating: 1,
          currentBooking: {
            $arrayElemAt: ["$currentBookingDetails", 0],
          },
          lastBooking: {
            $arrayElemAt: ["$lastBooking", 0],
          },
        },
      },

      {
        $sort: {
          name: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: mechanics,
    });
  } catch (error) {
    console.error("Get mechanics error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch mechanics",
    });
  }
};

module.exports = {
  getMechanics,
};