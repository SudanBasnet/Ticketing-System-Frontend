const PriorityBadge = ({ priority }) => {
  const styles = {
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
