const baseControlClasses =
  "w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100";

const FormField = ({ label, children, hint, className = "" }) => {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-slate-500">{hint}</span>}
    </label>
  );
};

FormField.controlClasses = baseControlClasses;

export default FormField;
