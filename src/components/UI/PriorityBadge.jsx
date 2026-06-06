const PriorityBadge = ({ priority }) => {
  const styles = {
    High: "bg-red-100 text-red-600",
    Medium: "bg-yellow-100 text-yellow-600",
    Low: "bg-green-100 text-green-600",
  };

  return (
    <span
      className={`rounded px-2 py-1 text-sm font-medium ${styles[priority]}`}
    >
      {priority}
    </span>
  );
};

export default PriorityBadge;
