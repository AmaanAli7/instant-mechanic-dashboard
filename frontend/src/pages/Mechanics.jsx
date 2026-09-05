import { useEffect, useState } from "react";

import {
  Search,
  Star,
  Phone,
  BriefcaseBusiness,
  Wrench,
  RefreshCw,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatusBadge from "../components/StatusBadge";
import { getMechanics } from "../services/api";

const Mechanics = () => {
  const [mechanics, setMechanics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchMechanics = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMechanics();
      setMechanics(response.data);
    } catch (error) {
      console.error("Mechanics error:", error);
      setError("Failed to load mechanics. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMechanics();
  }, []);

  const filteredMechanics = mechanics.filter((mechanic) =>
    (mechanic.name || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const hasSearch = search.trim() !== "";

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-50">
      <Sidebar />

      <div className="min-h-screen min-w-0 w-full lg:ml-64 lg:w-[calc(100%-16rem)]">
        <Header />

        <main className="w-full min-w-0 p-4 sm:p-6 lg:p-8">
          {/* Page heading */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Mechanics
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Monitor mechanic availability, workload and service activity.
            </p>
          </div>

          {/* Search */}
          <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full min-w-0 sm:w-80">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search mechanics..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="text-sm text-slate-500">
              {filteredMechanics.length}{" "}
              {filteredMechanics.length === 1
                ? "mechanic"
                : "mechanics"}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-red-700">
                  Unable to load mechanics
                </p>

                <p className="mt-1 text-xs text-red-500">
                  {error}
                </p>
              </div>

              <button
                type="button"
                onClick={fetchMechanics}
                className="inline-flex w-fit items-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                <RefreshCw size={15} />
                Retry
              </button>
            </div>
          )}

          {/* Loading */}
          {loading ? (
            <div className="w-full max-w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="w-full overflow-x-auto">
                <div className="min-w-[1000px]">
                  {/* Skeleton header */}
                  <div className="grid grid-cols-6 border-b border-slate-200 bg-slate-50 px-6 py-4">
                    {[
                      "Mechanic",
                      "Status",
                      "Rating",
                      "Jobs",
                      "Booking",
                      "Vehicle",
                    ].map((item) => (
                      <div
                        key={item}
                        className="text-xs font-semibold uppercase tracking-wide text-slate-400"
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  {/* Skeleton rows */}
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div
                      key={item}
                      className="grid grid-cols-6 items-center gap-4 border-b border-slate-100 px-6 py-5 last:border-0"
                    >
                      {/* Mechanic */}
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 animate-pulse rounded-full bg-slate-100" />

                        <div className="space-y-2">
                          <div className="h-4 w-28 animate-pulse rounded bg-slate-100" />
                          <div className="h-3 w-20 animate-pulse rounded bg-slate-100" />
                        </div>
                      </div>

                      {/* Status */}
                      <div className="h-6 w-20 animate-pulse rounded-full bg-slate-100" />

                      {/* Rating */}
                      <div className="h-4 w-12 animate-pulse rounded bg-slate-100" />

                      {/* Jobs */}
                      <div className="h-4 w-16 animate-pulse rounded bg-slate-100" />

                      {/* Booking */}
                      <div className="space-y-2">
                        <div className="h-4 w-24 animate-pulse rounded bg-slate-100" />
                        <div className="h-3 w-16 animate-pulse rounded bg-slate-100" />
                      </div>

                      {/* Vehicle */}
                      <div className="space-y-2">
                        <div className="h-4 w-28 animate-pulse rounded bg-slate-100" />
                        <div className="h-3 w-20 animate-pulse rounded bg-slate-100" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              {filteredMechanics.length > 0 ? (
                <div className="w-full max-w-full overflow-x-auto">
                  <table className="w-full min-w-[1000px]">
                    <thead className="border-b border-slate-200 bg-slate-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Mechanic
                        </th>

                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Status
                        </th>

                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Rating
                        </th>

                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Jobs Completed
                        </th>

                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Current / Last Booking
                        </th>

                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Vehicle
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {filteredMechanics.map((mechanic) => {
                        const booking =
                          mechanic.currentBooking ||
                          mechanic.lastBooking;

                        const mechanicName =
                          mechanic.name || "Unknown";

                        const initials = mechanicName
                          .split(" ")
                          .map((word) => word[0])
                          .filter(Boolean)
                          .join("")
                          .slice(0, 2)
                          .toUpperCase();

                        return (
                          <tr
                            key={mechanic._id}
                            className="transition hover:bg-slate-50"
                          >
                            {/* Mechanic */}
                            <td className="px-6 py-5">
                              <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-600">
                                  {initials || "M"}
                                </div>

                                <div className="min-w-0">
                                  <p className="truncate font-medium text-slate-900">
                                    {mechanicName}
                                  </p>

                                  <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                                    <Phone size={12} />

                                    <span>
                                      {mechanic.phone || "-"}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Status */}
                            <td className="px-6 py-5">
                              <StatusBadge
                                status={mechanic.status}
                              />
                            </td>

                            {/* Rating */}
                            <td className="px-6 py-5">
                              <div className="flex items-center gap-1">
                                <Star
                                  size={15}
                                  className="fill-yellow-400 text-yellow-400"
                                />

                                <span className="font-medium text-slate-700">
                                  {typeof mechanic.rating ===
                                  "number"
                                    ? mechanic.rating.toFixed(1)
                                    : "—"}
                                </span>
                              </div>
                            </td>

                            {/* Jobs */}
                            <td className="px-6 py-5">
                              <div className="flex items-center gap-2 text-sm text-slate-700">
                                <BriefcaseBusiness
                                  size={16}
                                  className="text-slate-400"
                                />

                                {mechanic.jobsCompleted ?? 0}
                              </div>
                            </td>

                            {/* Booking */}
                            <td className="px-6 py-5">
                              {booking ? (
                                <div>
                                  <p className="font-medium text-slate-900">
                                    {booking.bookingId || "-"}
                                  </p>

                                  <p className="mt-1 text-xs capitalize text-slate-500">
                                    {booking.status
                                      ? booking.status.replace(
                                          /_/g,
                                          " "
                                        )
                                      : "-"}
                                  </p>
                                </div>
                              ) : (
                                <span className="text-sm text-slate-400">
                                  No booking
                                </span>
                              )}
                            </td>

                            {/* Vehicle */}
                            <td className="px-6 py-5">
                              {booking?.vehicle ? (
                                <div>
                                  <p className="text-sm font-medium text-slate-700">
                                    {booking.vehicle.make || ""}{" "}
                                    {booking.vehicle.model || ""}
                                  </p>

                                  <p className="mt-1 text-xs text-slate-400">
                                    {booking.vehicle
                                      .registrationNumber || "-"}
                                  </p>
                                </div>
                              ) : (
                                <span className="text-sm text-slate-400">
                                  —
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                /* Empty state */
                <div className="flex min-h-[280px] flex-col items-center justify-center px-6 py-16 text-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                    {hasSearch ? (
                      <Search size={22} />
                    ) : (
                      <Wrench size={22} />
                    )}
                  </div>

                  <p className="text-sm font-semibold text-slate-700">
                    {hasSearch
                      ? "No matching mechanics"
                      : "No mechanics found"}
                  </p>

                  <p className="mt-1 max-w-sm text-xs leading-5 text-slate-400">
                    {hasSearch
                      ? "Try a different search term to find the mechanic you're looking for."
                      : "There are currently no mechanics available."}
                  </p>

                  {hasSearch && (
                    <button
                      type="button"
                      onClick={() => setSearch("")}
                      className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Mechanics;
