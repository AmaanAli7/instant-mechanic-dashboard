const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      required: true,
      unique: true,
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    mechanic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mechanic",
      default: null,
    },

    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },

    vehicle: {
      make: {
        type: String,
        required: true,
      },

      model: {
        type: String,
        required: true,
      },

      registrationNumber: {
        type: String,
        required: true,
      },
    },

    status: {
      type: String,
      enum: [
        "pending",
        "assigned",
        "on_the_way",
        "in_progress",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },

    amount: {
      type: Number,
      required: true,
    },

    location: {
      address: String,
      latitude: Number,
      longitude: Number,
    },

    scheduledAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

bookingSchema.index({ status: 1 });
bookingSchema.index({ scheduledAt: -1 });
// bookingSchema.index({ bookingId: 1 });

module.exports = mongoose.model("Booking", bookingSchema);