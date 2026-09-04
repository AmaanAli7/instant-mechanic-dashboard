
const Booking = require("../models/Booking");

require("../models/Customer");
require("../models/Mechanic");
require("../models/Service");

const getBookings = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      status = "all",
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    const pageNumber = Math.max(Number(page), 1);
    const limitNumber = Math.min(Math.max(Number(limit), 1), 100);

    const skip = (pageNumber - 1) * limitNumber;

    const query = {};

    // Status filter
    if (status !== "all") {
      query.status = status;
    }

    // Search
    if (search) {
      const customers = await require("../models/Customer").find({
        name: {
          $regex: search,
          $options: "i",
        },
      }).select("_id");

      const customerIds = customers.map(
        (customer) => customer._id
      );

      query.$or = [
        {
          bookingId: {
            $regex: search,
            $options: "i",
          },
        },
        {
          "vehicle.registrationNumber": {
            $regex: search,
            $options: "i",
          },
        },
        {
          customer: {
            $in: customerIds,
          },
        },
      ];
    }

    const sortDirection = sortOrder === "asc" ? 1 : -1;

    const sort = {
      [sortBy]: sortDirection,
    };

    const [bookings, totalBookings] = await Promise.all([
      Booking.find(query)
        .populate("customer", "name email phone")
        .populate("mechanic", "name status")
        .populate("service", "name category")
        .sort(sort)
        .skip(skip)
        .limit(limitNumber),

      Booking.countDocuments(query),
    ]);

    const totalPages = Math.ceil(
      totalBookings / limitNumber
    );

    res.status(200).json({
      success: true,

      data: bookings,

      pagination: {
        currentPage: pageNumber,
        totalPages,
        totalBookings,
        limit: limitNumber,
      },
    });
  } catch (error) {
    console.error("Get bookings error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
    });
  }
};

const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);

    const populatedBooking = await Booking.findById(
      booking._id
    )
      .populate("customer", "name email phone")
      .populate("mechanic", "name status")
      .populate("service", "name category");

    const io = req.app.get("io");

    io.emit("booking:created", populatedBooking);

    res.status(201).json({
      success: true,
      data: populatedBooking,
    });
  } catch (error) {
  console.error("Create booking error:", error);

  res.status(500).json({
    success: false,
    message: "Failed to create booking",
    error: error.message,
  });
}
};

const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "assigned",
      "on_the_way",
      "in_progress",
      "completed",
      "cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking status",
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("customer", "name email phone")
      .populate("mechanic", "name status")
      .populate("service", "name category");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    const io = req.app.get("io");

    io.emit("booking:status-updated", booking);

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error("Update booking status error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update booking status",
      error: error.message,
    });
  }
};

module.exports = {
  getBookings,
  createBooking,
  updateBookingStatus
};