const statusConfig = {
  // Booking statuses
  pending: {
    label: "Pending",
    className:
      "bg-yellow-50 text-yellow-700 border-yellow-200",
  },

  assigned: {
    label: "Assigned",
    className:
      "bg-blue-50 text-blue-700 border-blue-200",
  },

  on_the_way: {
    label: "On The Way",
    className:
      "bg-purple-50 text-purple-700 border-purple-200",
  },

  in_progress: {
    label: "In Progress",
    className:
      "bg-orange-50 text-orange-700 border-orange-200",
  },

  completed: {
    label: "Completed",
    className:
      "bg-green-50 text-green-700 border-green-200",
  },

  cancelled: {
    label: "Cancelled",
    className:
      "bg-red-50 text-red-700 border-red-200",
  },

  // Mechanic statuses
  available: {
    label: "Available",
    className:
      "bg-green-50 text-green-700 border-green-200",
  },

  busy: {
    label: "Busy",
    className:
      "bg-orange-50 text-orange-700 border-orange-200",
  },

  offline: {
    label: "Offline",
    className:
      "bg-slate-50 text-slate-600 border-slate-200",
  },
};

const StatusBadge = ({ status }) => {
  const normalizedStatus =
    typeof status === "string"
      ? status.toLowerCase()
      : "";

  const config = statusConfig[normalizedStatus] || {
    label: status
      ? String(status)
          .replace(/_/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase())
      : "Unknown",
    className:
      "bg-slate-50 text-slate-600 border-slate-200",
  };

  return (
    <span
      className={`inline-flex max-w-full items-center rounded-full border px-2.5 py-1 text-xs font-medium ${config.className}`}
    >
      <span className="mr-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current" />

      <span className="truncate">
        {config.label}
      </span>
    </span>
  );
};

export default StatusBadge;
