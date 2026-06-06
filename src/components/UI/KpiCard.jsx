const KpiCard = ({
  title,
  value,
  caption,
  icon,
  tone = "bg-cyan-100 text-cyan-800",
  alert = false,
}) => {
  return (
    <div className="motion-card soft-enter group rounded-lg border border-slate-200 bg-white p-5 shadow-sm hover:border-cyan-200">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium text-slate-500">{title}</h3>
            {alert && (
              <span className="blink-alert h-2.5 w-2.5 rounded-full bg-rose-500" />
            )}
          </div>
          <p className="mt-2 text-3xl font-bold text-slate-950">{value}</p>
        </div>

        {icon && (
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-lg transition group-hover:scale-105 ${tone}`}
          >
            {icon}
          </div>
        )}
      </div>

      {caption && <p className="mt-4 text-sm text-slate-500">{caption}</p>}
    </div>
  );
};

export default KpiCard;
