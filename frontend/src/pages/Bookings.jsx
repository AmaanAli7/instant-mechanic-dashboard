import { useEffect, useState } from "react";

import {
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  CalendarX,
  RefreshCw,
} from "lucide-react";

import BookingDetails from "../components/BookingDetails";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatusBadge from "../components/StatusBadge";

import {
  getBookings,
  updateBookingStatus,
} from "../services/api";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalBookings: 0,
    limit: 10,
  });

  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const bookingsPerPage = 10;

  // Fetch bookings
  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getBookings({
        page: currentPage,
        limit: bookingsPerPage,
        search,
        status: statusFilter,
        sortBy,
        sortOrder,
      });

      setBookings(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      setError("Failed to load bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Search / filter / pagination / sorting
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBookings();
    }, 400);

    return () => clearTimeout(timer);
  }, [
    search,
    currentPage,
    statusFilter,
    sortBy,
    sortOrder,
  ]);

  // Sorting
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder((order) =>
        order === "asc" ? "desc" : "asc"
      );
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  // Update booking status
  const handleStatusChange = async (id, status) => {
    try {
      await updateBookingStatus(id, status);
      await fetchBookings();
    } catch (error) {
      console.error(
        "Failed to update booking status:",
        error
      );
    }
  };

  const hasFilters =
    search.trim() !== "" || statusFilter !== "all";

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-50">
      <Sidebar />

      <div className="ml-0 min-h-screen w-full min-w-0 lg:ml-64">
        <Header />

        <main className="w-full min-w-0 p-4 sm:p-6 lg:p-8">
          {/* Heading */}
          <div className="mb-6">
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Bookings
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage and monitor all vehicle service bookings.
            </p>
          </div>

          {/* Filters */}
          <div className="mb-5 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center">
            {/* Search */}
            <div className="relative min-w-0 flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search booking, customer or vehicle..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Status */}
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 sm:w-auto"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="assigned">Assigned</option>
              <option value="on_the_way">On The Way</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-red-700">
                  Unable to load bookings
                </p>

                <p className="mt-1 text-xs text-red-500">
                  {error}
                </p>
              </div>

              <button
                type="button"
                onClick={fetchBookings}
                className="inline-flex w-fit items-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                <RefreshCw size={15} />
                Retry
              </button>
            </div>
          )}

          {/* Table */}
          <div className="w-full max-w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="w-full max-w-full overflow-x-auto">
              <table className="w-full min-w-[1000px]">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Booking ID
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Customer
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Vehicle
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Service
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Mechanic
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Status
                    </th>

                    <th
                      className="cursor-pointer px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 hover:text-slate-900"
                      onClick={() => handleSort("amount")}
                    >
                      <div className="flex items-center justify-end gap-1">
                        Amount
                        <ArrowUpDown size={14} />
                      </div>
                    </th>

                    <th
                      className="cursor-pointer px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 hover:text-slate-900"
                      onClick={() => handleSort("scheduledAt")}
                    >
                      <div className="flex items-center gap-1">
                        Date
                        <ArrowUpDown size={14} />
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {/* Loading */}
                  {loading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                      <tr key={index}>
                        <td className="px-5 py-5">
                          <div className="h-4 w-24 animate-pulse rounded bg-slate-100" />
                        </td>

                        <td className="px-5 py-5">
                          <div className="space-y-2">
                            <div className="h-4 w-32 animate-pulse rounded bg-slate-100" />
                            <div className="h-3 w-24 animate-pulse rounded bg-slate-100" />
                          </div>
                        </td>

                        <td className="px-5 py-5">
                          <div className="space-y-2">
                            <div className="h-4 w-28 animate-pulse rounded bg-slate-100" />
                            <div className="h-3 w-20 animate-pulse rounded bg-slate-100" />
                          </div>
                        </td>

                        <td className="px-5 py-5">
                          <div className="space-y-2">
                            <div className="h-4 w-24 animate-pulse rounded bg-slate-100" />
                            <div className="h-3 w-16 animate-pulse rounded bg-slate-100" />
                          </div>
                        </td>

                        <td className="px-5 py-5">
                          <div className="h-4 w-24 animate-pulse rounded bg-slate-100" />
                        </td>

                        <td className="px-5 py-5">
                          <div className="h-6 w-20 animate-pulse rounded-full bg-slate-100" />
                        </td>

                        <td className="px-5 py-5">
                          <div className="ml-auto h-4 w-16 animate-pulse rounded bg-slate-100" />
                        </td>

                        <td className="px-5 py-5">
                          <div className="h-4 w-24 animate-pulse rounded bg-slate-100" />
                        </td>
                      </tr>
                    ))
                  ) : bookings.length === 0 ? (
                    /* Empty state */
                    <tr>
                      <td
                        colSpan="8"
                        className="px-5 py-14 text-center"
                      >
                        <div className="mx-auto flex max-w-sm flex-col items-center">
                          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                            <CalendarX size={22} />
                          </div>

                          <p className="text-sm font-semibold text-slate-700">
                            {hasFilters
                              ? "No matching bookings"
                              : "No bookings found"}
                          </p>

                          <p className="mt-1 text-xs leading-5 text-slate-400">
                            {hasFilters
                              ? "Try adjusting your search or status filter."
                              : "There are currently no bookings available."}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    /* Bookings */
                    bookings.map((booking) => (
                      <tr
                        key={booking._id}
                        onClick={() =>
                          setSelectedBooking(booking)
                        }
                        className="cursor-pointer transition hover:bg-slate-50 active:bg-slate-100"
                      >
                        {/* Booking ID */}
                        <td className="px-5 py-4 text-sm font-semibold text-slate-900">
                          {booking.bookingId}
                        </td>

                        {/* Customer */}
                        <td className="px-5 py-4">
                          <div className="text-sm font-medium text-slate-900">
                            {booking.customer?.name || "Unknown"}
                          </div>

                          <div className="text-xs text-slate-500">
                            {booking.customer?.phone || "-"}
                          </div>
                        </td>

                        {/* Vehicle */}
                        <td className="px-5 py-4">
                          <div className="text-sm font-medium text-slate-900">
                            {booking.vehicle?.make}{" "}
                            {booking.vehicle?.model}
                          </div>

                          <div className="text-xs text-slate-500">
                            {booking.vehicle?.registrationNumber ||
                              booking.vehicle?.number ||
                              "-"}
                          </div>
                        </td>

                        {/* Service */}
                        <td className="px-5 py-4">
                          <div className="text-sm text-slate-900">
                            {booking.service?.name || "-"}
                          </div>

                          <div className="text-xs text-slate-500">
                            {booking.service?.category || "-"}
                          </div>
                        </td>

                        {/* Mechanic */}
                        <td className="px-5 py-4">
                          <div className="text-sm text-slate-700">
                            {booking.mechanic?.name ||
                              "Unassigned"}
                          </div>
                        </td>

                        {/* Status */}
                        <td
                          className="px-5 py-4"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            className="cursor-default"
                          >
                            <StatusBadge
                              status={booking.status}
                            />
                          </button>
                        </td>

                        {/* Amount */}
                        <td className="px-5 py-4 text-right text-sm font-semibold text-slate-900">
                          ₹
                          {booking.amount?.toLocaleString(
                            "en-IN"
                          ) || "0"}
                        </td>

                        {/* Date */}
                        <td className="px-5 py-4 text-sm text-slate-600">
                          {booking.scheduledAt
                            ? new Date(
                                booking.scheduledAt
                              ).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                            : "-"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {!loading && bookings.length > 0 && (
              <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <p className="text-center text-xs text-slate-500 sm:text-left sm:text-sm">
                  Showing{" "}
                  {(pagination.currentPage - 1) *
                    pagination.limit +
                    1}
                  –
                  {Math.min(
                    pagination.currentPage *
                      pagination.limit,
                    pagination.totalBookings
                  )}{" "}
                  of {pagination.totalBookings}
                </p>

                <div className="flex items-center justify-center gap-2 sm:justify-end">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage((page) => page - 1)
                    }
                    className="rounded-lg border border-slate-200 p-2 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <span className="min-w-[100px] text-center text-sm text-slate-600">
                    Page {pagination.currentPage} of{" "}
                    {pagination.totalPages}
                  </span>

                  <button
                    type="button"
                    disabled={
                      currentPage === pagination.totalPages
                    }
                    onClick={() =>
                      setCurrentPage((page) => page + 1)
                    }
                    className="rounded-lg border border-slate-200 p-2 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Next page"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Booking details modal */}
        {selectedBooking && (
          <BookingDetails
            booking={selectedBooking}
            onClose={() => setSelectedBooking(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Bookings;
