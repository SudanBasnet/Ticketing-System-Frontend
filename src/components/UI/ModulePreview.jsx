const ModulePreview = ({ title, description, items, accent = "bg-cyan-500" }) => {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div className={`h-3 w-3 rounded-full ${accent}`} />
        <div>
          <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
          <p className="text-sm text-slate-500">{description}</p>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {items.map((item) => (
          <div key={item.label} className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="mt-2 text-2xl font-bold text-slate-950">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModulePreview;
