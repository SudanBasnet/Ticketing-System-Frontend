const EmptyState = ({
  icon,
  title,
  description,
  action,
  className = "",
}) => (
  <div
    className={`rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center ${className}`}
  >
    {icon && (
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white text-xl text-slate-500 shadow-sm">
        {icon}
      </div>
    )}
    <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
    <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
      {description}
    </p>
    {action && <div className="mt-5">{action}</div>}
  </div>
);

export default EmptyState;
