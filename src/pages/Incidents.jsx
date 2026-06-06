import MainLayout from "../layouts/MainLayout";

export const incidents = [
  {
    id: "INC000001",
    shortDescription: "VPN not connecting",
    priority: "High",
    status: "Open",
  },
  {
    id: "INC000002",
    shortDescription: "Outlook crashing",
    priority: "Medium",
    status: "In Progress",
  },
  {
    id: "INC000003",
    shortDescription: "Printer offline",
    priority: "Low",
    status: "Resolved",
  },
];
const Incidents = () => {
  return (
    <MainLayout>
      <h1 className="text-3xl font-bold">Incidents</h1>
    </MainLayout>
  );
};

export default Incidents;
