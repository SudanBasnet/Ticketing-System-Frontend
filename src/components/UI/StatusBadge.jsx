const StatusBadge = ({ status }) => {
  const styles = {
    Open: "bg-red-100 text-red-600",
    Assigned: "bg-blue-100 text-blue-700",
    "In Progress": "bg-yellow-100 text-yellow-600",
    "Pending User": "bg-amber-100 text-amber-700",
    "Pending Vendor": "bg-orange-100 text-orange-700",
    Resolved: "bg-green-100 text-green-600",
    Closed: "bg-slate-100 text-slate-600",
    Cancelled: "bg-zinc-100 text-zinc-600",
    New: "bg-cyan-100 text-cyan-700",
    Submitted: "bg-cyan-100 text-cyan-700",
    Approved: "bg-emerald-100 text-emerald-700",
    Pending: "bg-amber-100 text-amber-700",
    Fulfilled: "bg-green-100 text-green-700",
    Scheduled: "bg-cyan-100 text-cyan-700",
    "Awaiting Approval": "bg-amber-100 text-amber-700",
    Implemented: "bg-green-100 text-green-700",
    Investigating: "bg-amber-100 text-amber-700",
    "Known Error": "bg-rose-100 text-rose-700",
    Active: "bg-green-100 text-green-700",
    Retired: "bg-slate-100 text-slate-600",
    "On Track": "bg-emerald-100 text-emerald-700",
    Warning: "bg-amber-100 text-amber-700",
    Breached: "bg-rose-100 text-rose-700",
  };

  return (
    <span
      className={`rounded px-2 py-1 text-sm font-medium ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
