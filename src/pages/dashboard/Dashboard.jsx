import MainLayout from "../../Layouts/MainLayout";
import KpiCard from "../../components/UI/KpiCard";

const Dashboard = () => {
  return (
    <MainLayout>
      <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard title="Total Tickets" value="245" />
        <KpiCard title="Open Tickets" value="45" />
        <KpiCard title="Resolved" value="180" />
        <KpiCard title="SLA Breached" value="20" />
      </div>
    </MainLayout>
  );
};

export default Dashboard;
