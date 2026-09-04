
import { Bell, Search } from "lucide-react";
import { useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  const pageInfo = {
    "/": {
      title: "Overview",
      description: "Monitor your vehicle service operations",
    },
    "/bookings": {
      title: "Bookings",
      description: "Manage and monitor vehicle service bookings",
    },
    "/mechanics": {
      title: "Mechanics",
      description: "Manage mechanics and their service activity",
    },
    "/customers": {
      title: "Customers",
      description: "View customer information and service history",
    },
    "/analytics": {
      title: "Analytics",
      description: "Monitor booking trends, revenue and service performance",
    },
  };

  const currentPage = pageInfo[location.pathname] || pageInfo["/"];

  return (
    <header className="flex min-h-20 w-full items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-4 sm:gap-4 sm:px-6 lg:px-8">
      {/* Page title */}
      <div className="min-w-0 flex-1 pl-12 lg:pl-0">
        <h2 className="truncate text-lg font-semibold text-slate-900 sm:text-xl">
          {currentPage.title}
        </h2>

        <p className="hidden truncate text-sm text-slate-500 sm:block">
          {currentPage.description}
        </p>
      </div>

      {/* Header actions */}
      <div className="flex shrink-0 items-center gap-1.5 sm:gap-5">
        {/* Search */}
        <div className="relative hidden sm:block">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-48 rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 lg:w-64"
          />
        </div>

        {/* Notification */}
        <button
          className="relative rounded-lg p-2 text-slate-600 hover:bg-slate-100 sm:p-2.5"
          aria-label="Notifications"
        >
          <Bell size={20} />

          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 sm:right-2 sm:top-2" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600 sm:h-10 sm:w-10">
            AM
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-900">
              Admin
            </p>

            <p className="text-xs text-slate-500">
              Operations
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
