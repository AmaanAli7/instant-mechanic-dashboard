
import {
  X,
  User,
  Car,
  Wrench,
  MapPin,
  Calendar,
  IndianRupee,
} from "lucide-react";

import StatusBadge from "./StatusBadge";

const BookingDetails = ({ booking, onClose }) => {
  if (!booking) return null;

  const vehicleName =
    `${booking.vehicle?.make || ""} ${
      booking.vehicle?.model || ""
    }`.trim() || "Vehicle unavailable";

  const mechanicStatus = booking.mechanic?.status
    ? booking.mechanic.status.replace(/_/g, " ")
    : "";

  const formattedAmount = Number(
    booking.amount || 0
  ).toLocaleString("en-IN");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-details-title"
      onClick={onClose}
    >
      <div
        className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-4 py-4 sm:px-6 sm:py-5">
          <div className="min-w-0 pr-4">
            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400 sm:text-xs">
              Booking Details
            </p>

            <h2
              id="booking-details-title"
              className="mt-1 truncate text-lg font-bold text-slate-900 sm:text-xl"
            >
              {booking.bookingId || "Booking"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
            aria-label="Close booking details"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto">
          {/* Status */}
          <div className="border-b border-slate-100 px-4 py-4 sm:px-6">
            <StatusBadge status={booking.status} />
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 gap-4 p-4 sm:gap-5 sm:p-6 md:grid-cols-2">
            {/* Customer */}
            <div className="rounded-xl border border-slate-200 p-4 transition hover:border-slate-300">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                  <User size={17} className="text-slate-600" />
                </div>

                <h3 className="font-semibold text-slate-900">
                  Customer
                </h3>
              </div>

              <p className="break-words text-sm font-medium text-slate-800">
                {booking.customer?.name || "N/A"}
              </p>

              <p className="mt-1 break-words text-sm text-slate-500">
                {booking.customer?.phone || "No phone"}
              </p>

              <p className="mt-1 break-words text-sm text-slate-500">
                {booking.customer?.email || "No email"}
              </p>
            </div>

            {/* Vehicle */}
            <div className="rounded-xl border border-slate-200 p-4 transition hover:border-slate-300">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                  <Car size={17} className="text-slate-600" />
                </div>

                <h3 className="font-semibold text-slate-900">
                  Vehicle
                </h3>
              </div>

              <p className="break-words text-sm font-medium text-slate-800">
                {vehicleName}
              </p>

              <p className="mt-1 break-words text-sm text-slate-500">
                {booking.vehicle?.registrationNumber ||
                  booking.vehicle?.number ||
                  "Registration unavailable"}
              </p>
            </div>

            {/* Service */}
            <div className="rounded-xl border border-slate-200 p-4 transition hover:border-slate-300">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                  <Wrench size={17} className="text-slate-600" />
                </div>

                <h3 className="font-semibold text-slate-900">
                  Service
                </h3>
              </div>

              <p className="break-words text-sm font-medium text-slate-800">
                {booking.service?.name || "N/A"}
              </p>

              <p className="mt-1 break-words text-sm text-slate-500">
                {booking.service?.category || "General service"}
              </p>
            </div>

            {/* Mechanic */}
            <div className="rounded-xl border border-slate-200 p-4 transition hover:border-slate-300">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                  <Wrench size={17} className="text-slate-600" />
                </div>

                <h3 className="font-semibold text-slate-900">
                  Mechanic
                </h3>
              </div>

              <p className="break-words text-sm font-medium text-slate-800">
                {booking.mechanic?.name || "Unassigned"}
              </p>

              {mechanicStatus && (
                <p className="mt-1 text-sm capitalize text-slate-500">
                  {mechanicStatus}
                </p>
              )}
            </div>

            {/* Location */}
            <div className="rounded-xl border border-slate-200 p-4 transition hover:border-slate-300">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                  <MapPin size={17} className="text-slate-600" />
                </div>

                <h3 className="font-semibold text-slate-900">
                  Location
                </h3>
              </div>

              <p className="break-words text-sm leading-6 text-slate-600">
                {booking.location?.address ||
                  booking.location ||
                  "Location unavailable"}
              </p>
            </div>

            {/* Schedule */}
            <div className="rounded-xl border border-slate-200 p-4 transition hover:border-slate-300">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                  <Calendar
                    size={17}
                    className="text-slate-600"
                  />
                </div>

                <h3 className="font-semibold text-slate-900">
                  Scheduled
                </h3>
              </div>

              <p className="text-sm leading-6 text-slate-600">
                {booking.scheduledAt
                  ? new Date(
                      booking.scheduledAt
                    ).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })
                  : "Not scheduled"}
              </p>
            </div>
          </div>

          {/* Amount */}
          <div className="px-4 pb-4 sm:px-6 sm:pb-6">
            <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 px-4 py-4 sm:px-5">
              <div className="flex min-w-0 items-center gap-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white">
                  <IndianRupee
                    size={17}
                    className="text-slate-600"
                  />
                </div>

                <span className="text-sm font-medium text-slate-600">
                  Service Amount
                </span>
              </div>

              <span className="shrink-0 text-lg font-bold text-slate-900">
                ₹{formattedAmount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
