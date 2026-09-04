import {
  CalendarPlus,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

const activityConfig = {
  created: {
    icon: CalendarPlus,
    iconClass: "bg-blue-50 text-blue-600",
  },

  completed: {
    icon: CheckCircle2,
    iconClass: "bg-green-50 text-green-600",
  },

  pending: {
    icon: Clock3,
    iconClass: "bg-yellow-50 text-yellow-600",
  },

  cancelled: {
    icon: XCircle,
    iconClass: "bg-red-50 text-red-600",
  },
};

const ActivityFeed = ({ activities = [] }) => {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 px-4 py-4 sm:px-5">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h2 className="font-semibold text-slate-900">
              Live Activity
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Real-time booking activity
            </p>
          </div>

          <span className="flex shrink-0 items-center gap-2 text-xs font-medium text-green-600">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>

            Live
          </span>
        </div>
      </div>

      {/* Activities */}
      <div className="divide-y divide-slate-100">
        {activities.length === 0 ? (
          <div className="flex min-h-[150px] flex-col items-center justify-center px-5 py-8 text-center">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
              <Clock3
                size={19}
                className="text-slate-400"
              />
            </div>

            <p className="text-sm font-medium text-slate-600">
              No recent activity
            </p>

            <p className="mt-1 text-xs text-slate-400">
              New booking activity will appear here.
            </p>
          </div>
        ) : (
          activities.map((activity) => {
            const config =
              activityConfig[activity.type] ||
              activityConfig.created;

            const Icon = config.icon;

            return (
              <div
                key={activity.id}
                className="flex items-start gap-3 px-4 py-4 transition hover:bg-slate-50 sm:px-5"
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${config.iconClass}`}
                >
                  <Icon size={17} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="break-words text-sm font-medium text-slate-800">
                    {activity.title}
                  </p>

                  <p className="mt-1 break-words text-xs leading-5 text-slate-500">
                    {activity.description}
                  </p>

                  <p className="mt-1 text-[11px] text-slate-400">
                    {activity.time}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;
