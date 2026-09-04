import StatusBadge from "./StatusBadge";

const BookingTable = ({
  bookings,
  onStatusChange,
  onBookingClick
}) => {
  if (!bookings || bookings.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
        No bookings found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-[1000px] w-full text-left">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr key={bookings._id}
  onClick={() => onBookingClick(bookings)}
  className="cursor-pointer transition hover:bg-slate-50">
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Booking
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Customer
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Vehicle
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Service
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Mechanic
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Amount
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Scheduled
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {bookings.map((booking) => (
              <tr
                key={booking._id}
                className="transition hover:bg-slate-50"
              >
                <td className="px-5 py-4">
                  <span className="text-sm font-semibold text-slate-900">
                    {booking.bookingId}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      {booking.customer?.name || "N/A"}
                    </p>

                    <p className="text-xs text-slate-400">
                      {booking.customer?.phone || ""}
                    </p>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <span className="text-sm text-slate-700">
                    {booking.vehicle?.make || ""}
                    {" "}
                    {booking.vehicle?.model || ""}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      {booking.service?.name || "N/A"}
                    </p>

                    <p className="text-xs text-slate-400">
                      {booking.service?.category || ""}
                    </p>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <span className="text-sm text-slate-700">
                    {booking.mechanic?.name || "Unassigned"}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <select
                    value={booking.status}
                    onChange={(e) =>
                      onStatusChange(
                        booking._id,
                        e.target.value
                      )
                    }
                    className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs font-medium text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                  >
                    <option value="pending">
                      Pending
                    </option>

                    <option value="assigned">
                      Assigned
                    </option>

                    <option value="on_the_way">
                      On The Way
                    </option>

                    <option value="in_progress">
                      In Progress
                    </option>

                    <option value="completed">
                      Completed
                    </option>

                    <option value="cancelled">
                      Cancelled
                    </option>
                  </select>
                </td>

                <td className="px-5 py-4">
                  <span className="text-sm font-semibold text-slate-800">
                    ₹{booking.amount?.toLocaleString("en-IN") || "0"}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <span className="text-xs text-slate-500">
                    {booking.scheduledAt
                      ? new Date(
                          booking.scheduledAt
                        ).toLocaleString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "N/A"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingTable;