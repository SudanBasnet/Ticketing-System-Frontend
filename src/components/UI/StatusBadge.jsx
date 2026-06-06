const StatusBadge = ({ status }) => {
  const styles = {
    Open: "bg-red-100 text-red-600",
    "In Progress": "bg-yellow-100 text-yellow-600",
    Resolved: "bg-green-100 text-green-600",
  };

  return (
    <span className={`rounded px-2 py-1 text-sm font-medium ${styles[status]}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
