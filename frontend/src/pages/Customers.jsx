
import { useEffect, useState } from "react";

import {
  Search,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatusBadge from "../components/StatusBadge";
import { getCustomers } from "../services/api";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await getCustomers();
        setCustomers(response.data);
      } catch (error) {
        console.error("Customers error:", error);
        setError("Failed to load customers.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter((customer) => {
    const searchValue = search.toLowerCase();

    return (
  (customer.name || "").toLowerCase().includes(searchValue) ||
  (customer.email || "").toLowerCase().includes(searchValue) ||
  (customer.phone || "").toLowerCase().includes(searchValue) ||
  (customer.city || "").toLowerCase().includes(searchValue)
);
  });

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-50">
      <Sidebar />

      <div className="min-h-screen min-w-0 w-full lg:ml-64 lg:w-[calc(100%-16rem)]">
        <Header />

        <main className="w-full min-w-0 p-4 sm:p-6 lg:p-8">
          {/* Page Heading */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Customers
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              View customer information and service history.
            </p>
          </div>

          {/* Search & Count */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:w-80">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search customers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="text-sm text-slate-500 sm:text-right">
              {filteredCustomers.length} customers
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Loading */}
          {loading ? (
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="flex animate-pulse items-center gap-6 border-b border-slate-100 p-5"
                >
                  <div className="h-10 w-10 shrink-0 rounded-full bg-slate-200" />

                  <div className="h-4 w-40 rounded bg-slate-200" />

                  <div className="h-4 w-32 rounded bg-slate-200" />

                  <div className="h-4 w-20 rounded bg-slate-200" />
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full max-w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
  <div className="w-full max-w-full overflow-x-auto">
    <table className="w-full min-w-[1050px]">
                  <thead className="border-b border-slate-200 bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Customer
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Contact
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Location
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Total Bookings
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Last Booking
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Joined
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {filteredCustomers.map((customer) => (
                      <tr
                        key={customer._id}
                        className="transition hover:bg-slate-50"
                      >
                        {/* Customer */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-600">
                              {(customer.name || "C")
                                .split(" ")
                                .map((word) => word[0])
                                .join("")
                                .slice(0, 2)
                                .toUpperCase()}
                            </div>

                            <div>
                              <p className="font-medium text-slate-900">
                                {customer.name || "Unknown Customer"}
                              </p>

                              <p className="mt-1 text-xs text-slate-500">
                                Customer
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Contact */}
                        <td className="px-6 py-5">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <Mail size={14} />
                              {customer.email || "No email"}
                            </div>

                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <Phone size={13} />
                              {customer.phone || "No phone"}
                            </div>
                          </div>
                        </td>

                        {/* Location */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <MapPin size={15} />
                            {customer.city || "Unknown"}
                          </div>
                        </td>

                        {/* Total Bookings */}
                        <td className="px-6 py-5">
                          <span className="font-medium text-slate-700">
                            {customer.totalBookings ?? 0}
                          </span>
                        </td>

                        {/* Last Booking */}
                        <td className="px-6 py-5">
                          {customer.lastBooking ? (
                            <div>
                              <p className="font-medium text-slate-900">
                                {customer.lastBooking.bookingId}
                              </p>

                              <div className="mt-1">
                                <StatusBadge
                                  status={customer.lastBooking.status}
                                />
                              </div>
                            </div>
                          ) : (
                            <span className="text-sm text-slate-400">
                              No booking
                            </span>
                          )}
                        </td>

                        {/* Joined */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <CalendarDays size={15} />

                            {customer.createdAt
                              ? new Date(
                                  customer.createdAt
                                ).toLocaleDateString("en-IN", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                })
                              : "—"}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty State */}
              {filteredCustomers.length === 0 && (
                <div className="px-6 py-16 text-center">
                  <p className="font-medium text-slate-700">
                    No customers found
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Try a different search term.
                  </p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Customers;

