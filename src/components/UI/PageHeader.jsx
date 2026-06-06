const PageHeader = ({ title, description, actions, meta }) => {
  return (
    <div className="mb-6 border-b border-slate-200 pb-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          {meta && (
            <p className="mb-2 text-sm font-semibold uppercase text-cyan-700">
              {meta}
            </p>
          )}
          <h1 className="text-3xl font-bold text-slate-950">{title}</h1>
          {description && (
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              {description}
            </p>
          )}
        </div>

        {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
      </div>
    </div>
  );
};

export default PageHeader;
