import { useEffect, useState } from "react";

import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  XCircle,
  IndianRupee,
  Users,
  UserPlus,
  ClipboardList,
  RefreshCw,
} from "lucide-react";

import socket from "../services/socket";

import ActivityFeed from "../components/ActivityFeed";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import LiveIndicator from "../components/LiveIndicator";

import { getDashboardSummary } from "../services/api";

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [socketConnected, setSocketConnected] = useState(
    socket.connected
  );
  const [activities, setActivities] = useState([]);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getDashboardSummary();
      setSummary(response.data);
    } catch (error) {
      console.error("Failed to load dashboard:", error);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  /* Socket connection status */
  useEffect(() => {
    const handleConnect = () => {
      setSocketConnected(true);
    };

    const handleDisconnect = () => {
      setSocketConnected(false);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
    };
  }, []);

  /* New booking */
  useEffect(() => {
    const handleBookingCreated = async (booking) => {
      console.log(
        "🔥 LIVE BOOKING RECEIVED:",
        booking.bookingId
      );

      const newActivity = {
        id: `${booking._id}-${Date.now()}`,
        type: "created",
        title: "New booking created",
        description: `${booking.bookingId} has been created`,
        time: "Just now",
      };

      setActivities((prev) =>
        [newActivity, ...prev].slice(0, 5)
      );

      try {
        const response = await getDashboardSummary();
        setSummary(response.data);
      } catch (error) {
        console.error(
          "Failed to refresh dashboard:",
          error
        );
      }
    };

    socket.on("booking:created", handleBookingCreated);

    return () => {
      socket.off(
        "booking:created",
        handleBookingCreated
      );
    };
  }, []);

  /* Booking status update */
  useEffect(() => {
    const handleStatusUpdated = async (booking) => {
      console.log(
        "🔄 BOOKING STATUS UPDATED:",
        booking.bookingId,
        booking.status
      );

      const statusLabels = {
        pending: "Pending",
        assigned: "Assigned",
        on_the_way: "On The Way",
        in_progress: "In Progress",
        completed: "Completed",
        cancelled: "Cancelled",
      };

      const newActivity = {
        id: `${booking._id}-${Date.now()}`,
        type:
          booking.status === "completed"
            ? "completed"
            : booking.status === "cancelled"
            ? "cancelled"
            : "pending",
        title: "Booking status updated",
        description: `${booking.bookingId} is now ${
          statusLabels[booking.status] || booking.status
        }`,
        time: "Just now",
      };

      setActivities((prev) =>
        [newActivity, ...prev].slice(0, 5)
      );

      try {
        const response = await getDashboardSummary();
        setSummary(response.data);
      } catch (error) {
        console.error(
          "Failed to refresh dashboard:",
          error
        );
      }
    };

    socket.on(
      "booking:status-updated",
      handleStatusUpdated
    );

    return () => {
      socket.off(
        "booking:status-updated",
        handleStatusUpdated
      );
    };
  }, []);

  const stats = [
    {
      title: "Total Bookings",
      value: summary?.totalBookings ?? 0,
      icon: ClipboardList,
    },
    {
      title: "Today's Bookings",
      value: summary?.todayBookings ?? 0,
      icon: CalendarDays,
    },
    {
      title: "Completed",
      value: summary?.completedBookings ?? 0,
      icon: CheckCircle2,
    },
    {
      title: "Pending",
      value: summary?.pendingBookings ?? 0,
      icon: Clock3,
    },
    {
      title: "Cancelled",
      value: summary?.cancelledBookings ?? 0,
      icon: XCircle,
    },
    {
      title: "Total Revenue",
      value: `₹${(
        summary?.totalRevenue ?? 0
      ).toLocaleString("en-IN")}`,
      icon: IndianRupee,
    },
    {
      title: "Active Mechanics",
      value: summary?.activeMechanics ?? 0,
      icon: Users,
    },
    {
      title: "New Customers",
      value: summary?.newCustomers ?? 0,
      icon: UserPlus,
    },
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-50">
      <Sidebar />

      <div className="min-h-screen min-w-0 w-full lg:ml-64 lg:w-[calc(100%-16rem)]">
        <Header />

        <main className="w-full min-w-0 p-4 sm:p-6 lg:p-8">
          {/* Page heading */}
          <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
                Overview
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Monitor your vehicle service operations in real time.
              </p>
            </div>

            <div className="shrink-0">
              <LiveIndicator connected={socketConnected} />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-red-700">
                  Unable to load dashboard
                </p>

                <p className="mt-1 text-xs text-red-500">
                  {error}
                </p>
              </div>

              <button
                type="button"
                onClick={fetchSummary}
                className="inline-flex w-fit items-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                <RefreshCw size={15} />
                Retry
              </button>
            </div>
          )}

          {/* KPI Stats */}
          {loading ? (
            <div className="grid w-full min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="h-32 animate-pulse rounded-xl border border-slate-200 bg-white shadow-sm"
                >
                  <div className="flex h-full flex-col justify-between p-5">
                    <div className="h-4 w-28 rounded bg-slate-100" />
                    <div className="h-8 w-20 rounded bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid w-full min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <StatCard
                  key={stat.title}
                  title={stat.title}
                  value={stat.value}
                  icon={stat.icon}
                />
              ))}
            </div>
          )}

          {/* Activity */}
          <div className="mt-6 sm:mt-8">
            <ActivityFeed activities={activities} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
