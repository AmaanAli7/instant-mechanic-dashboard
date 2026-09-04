function StatCard({
  title,
  value,
  change,
  icon: Icon,
  positive = true,
}) {
  return (
    <div className="w-full rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 truncate text-2xl font-bold text-slate-900 sm:text-3xl">
            {value}
          </h3>
        </div>

        {Icon && (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 sm:h-11 sm:w-11">
            <Icon size={20} />
          </div>
        )}
      </div>

      {change !== undefined &&
        change !== null &&
        change !== "" && (
          <div className="mt-4 flex items-center gap-2">
            <span
              className={`text-sm font-medium ${
                positive
                  ? "text-emerald-600"
                  : "text-red-500"
              }`}
            >
              {change}
            </span>

            <span className="text-xs text-slate-400">
              vs last month
            </span>
          </div>
        )}
    </div>
  );
}

export default StatCard;
