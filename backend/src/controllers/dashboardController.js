const Booking = require("../models/Booking");
const Customer = require("../models/Customer");
const Mechanic = require("../models/Mechanic");

const getDashboardSummary = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();

    const completedBookings = await Booking.countDocuments({
      status: "completed",
    });

    const pendingBookings = await Booking.countDocuments({
      status: "pending",
    });

    const cancelledBookings = await Booking.countDocuments({
      status: "cancelled",
    });

    // Start of today
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    // Start of tomorrow
    const startOfTomorrow = new Date(startOfToday);
    startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

    const todayBookings = await Booking.countDocuments({
      scheduledAt: {
        $gte: startOfToday,
        $lt: startOfTomorrow,
      },
    });

    // Total revenue from completed bookings
    const revenueResult = await Booking.aggregate([
      {
        $match: {
          status: "completed",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$amount",
          },
        },
      },
    ]);

    const totalRevenue =
      revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

    // Mechanics who are currently available or busy
    const activeMechanics = await Mechanic.countDocuments({
      status: {
        $in: ["available", "busy"],
      },
    });

    // Customers created in the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const newCustomers = await Customer.countDocuments({
      createdAt: {
        $gte: thirtyDaysAgo,
      },
    });

    res.status(200).json({
      success: true,
      data: {
        totalBookings,
        todayBookings,
        completedBookings,
        pendingBookings,
        cancelledBookings,
        totalRevenue,
        activeMechanics,
        newCustomers,
      },
    });
  } catch (error) {
    console.error("Dashboard summary error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard summary",
    });
  }
};

module.exports = {
  getDashboardSummary,
};