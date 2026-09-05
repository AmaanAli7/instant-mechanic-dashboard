import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { getAnalytics } from "../services/api";

const PIE_COLORS = [
  "#2563eb",
  "#16a34a",
  "#f59e0b",
  "#dc2626",
  "#7c3aed",
  "#0891b2",
];

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await getAnalytics();
        setAnalytics(response.data);
      } catch (error) {
        console.error("Analytics error:", error);
        setError("Failed to load analytics data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen w-full overflow-x-hidden bg-slate-50">
        <Sidebar />

        <div className="min-h-screen min-w-0 w-full lg:ml-64 lg:w-[calc(100%-16rem)]">
          <Header />

          <main className="w-full min-w-0 p-4 sm:p-6 lg:p-8">
            <div className="mb-6 sm:mb-8">
              <div className="h-7 w-32 animate-pulse rounded bg-slate-200" />
              <div className="mt-2 h-4 w-72 max-w-full animate-pulse rounded bg-slate-200" />
            </div>

            <div className="grid w-full min-w-0 grid-cols-1 gap-5 sm:gap-6 xl:grid-cols-2">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
                >
                  <div className="mb-5">
                    <div className="h-5 w-40 animate-pulse rounded bg-slate-200" />
                    <div className="mt-2 h-4 w-52 animate-pulse rounded bg-slate-100" />
                  </div>

                  <div className="h-64 animate-pulse rounded-lg bg-slate-100 sm:h-80" />
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-50">
      <Sidebar />

      <div className="min-h-screen min-w-0 w-full lg:ml-64 lg:w-[calc(100%-16rem)]">
        <Header />

        <main className="w-full min-w-0 p-4 sm:p-6 lg:p-8">
          {/* Page Heading */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Analytics
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Monitor booking trends, revenue and service performance.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Charts */}
          <div className="grid w-full min-w-0 grid-cols-1 gap-5 sm:gap-6 xl:grid-cols-2">
            {/* Bookings Over Time */}
            <div className="min-w-0 w-full overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
              <div className="mb-5">
                <h2 className="font-semibold text-slate-900">
                  Bookings Over Time
                </h2>

                <p className="text-sm text-slate-500">
                  Daily booking volume
                </p>
              </div>

              <div className="h-64 w-full min-w-0 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={analytics?.bookingsOverTime || []}
                    margin={{
                      top: 5,
                      right: 10,
                      left: -10,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 11 }}
                      tickMargin={8}
                    />

                    <YAxis
                      allowDecimals={false}
                      tick={{ fontSize: 11 }}
                    />

                    <Tooltip />

                    <Line
                      type="monotone"
                      dataKey="bookings"
                      stroke="#2563eb"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Revenue Over Time */}
            <div className="min-w-0 w-full overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
              <div className="mb-5">
                <h2 className="font-semibold text-slate-900">
                  Revenue Over Time
                </h2>

                <p className="text-sm text-slate-500">
                  Revenue generated from completed bookings
                </p>
              </div>

              <div className="h-64 w-full min-w-0 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={analytics?.revenueOverTime || []}
                    margin={{
                      top: 5,
                      right: 10,
                      left: -5,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 11 }}
                      tickMargin={8}
                    />

                    <YAxis
                      tick={{ fontSize: 11 }}
                      tickFormatter={(value) =>
                        `₹${Number(value).toLocaleString("en-IN")}`
                      }
                    />

                    <Tooltip
                      formatter={(value) =>
                        `₹${Number(value).toLocaleString("en-IN")}`
                      }
                    />

                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#16a34a"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Booking Status */}
            <div className="min-w-0 w-full overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
              <div className="mb-5">
                <h2 className="font-semibold text-slate-900">
                  Booking Status
                </h2>

                <p className="text-sm text-slate-500">
                  Distribution by current status
                </p>
              </div>

              <div className="h-64 w-full min-w-0 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analytics?.statusDistribution || []}
                      dataKey="count"
                      nameKey="status"
                      outerRadius="68%"
                      innerRadius="42%"
                      paddingAngle={2}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {(analytics?.statusDistribution || []).map(
                        (_, index) => (
                          <Cell
                            key={`status-${index}`}
                            fill={
                              PIE_COLORS[index % PIE_COLORS.length]
                            }
                          />
                        )
                      )}
                    </Pie>

                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Service Breakdown */}
            <div className="min-w-0 w-full overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
              <div className="mb-5">
                <h2 className="font-semibold text-slate-900">
                  Service Breakdown
                </h2>

                <p className="text-sm text-slate-500">
                  Most frequently booked services
                </p>
              </div>

              <div className="h-64 w-full min-w-0 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={analytics?.serviceBreakdown || []}
                    margin={{
                      top: 5,
                      right: 10,
                      left: -10,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                      dataKey="service"
                      tick={{ fontSize: 10 }}
                      tickMargin={8}
                      interval={0}
                    />

                    <YAxis
                      allowDecimals={false}
                      tick={{ fontSize: 11 }}
                    />

                    <Tooltip />

                    <Bar
                      dataKey="bookings"
                      fill="#2563eb"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
