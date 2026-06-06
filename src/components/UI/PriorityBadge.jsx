const PriorityBadge = ({ priority }) => {
  const styles = {
    P1: "bg-rose-100 text-rose-700",
    P2: "bg-red-100 text-red-700",
    P3: "bg-amber-100 text-amber-700",
    P4: "bg-emerald-100 text-emerald-700",
    Critical: "bg-rose-100 text-rose-700",
    High: "bg-red-100 text-red-600",
    Medium: "bg-yellow-100 text-yellow-600",
    Low: "bg-green-100 text-green-600",
  };

  return (
    <span
      className={`rounded px-2 py-1 text-sm font-medium ${
        styles[priority] || "bg-slate-100 text-slate-600"
      }`}
    >
      {priority}
    </span>
  );
};

export default PriorityBadge;
