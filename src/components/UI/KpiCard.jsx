const KpiCard = ({ title, value }) => {
  return (
    <div className="rounded-xl bg-white p-5 shadow">
      <h3 className="text-gray-500">{title}</h3>

      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
};

export default KpiCard;
