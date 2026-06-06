import { FiDatabase, FiHardDrive, FiLink, FiPlus } from "react-icons/fi";

import MainLayout from "../Layouts/MainLayout";
import PageHeader from "../components/UI/PageHeader";
import StatusBadge from "../components/UI/StatusBadge";

const configurationItems = [
  {
    id: "CI000001",
    name: "VPN Gateway Cluster",
    type: "Network Service",
    owner: "Network Team",
    environment: "Production",
    status: "Active",
  },
  {
    id: "CI000002",
    name: "Exchange Online",
    type: "SaaS Application",
    owner: "Messaging Team",
    environment: "Production",
    status: "Active",
  },
  {
    id: "CI000003",
    name: "Legacy Print Server",
    type: "Server",
    owner: "Workplace Tech",
    environment: "Office",
    status: "Retired",
  },
];

const relationships = [
  "VPN Gateway Cluster supports Remote Access",
  "Exchange Online supports Email Service",
  "Print Server linked to Level 4 Printer Fleet",
];

const Cmdb = () => {
  return (
    <MainLayout>
      <PageHeader
        meta="Configuration"
        title="CMDB"
        description="Understand the services, assets, ownership, and relationships behind ticket impact."
        actions={
          <button className="flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2 font-medium text-white transition hover:bg-cyan-700">
            <FiPlus />
            Add CI
          </button>
        }
      />

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        {[
          {
            label: "Services",
            value: "18",
            icon: <FiDatabase />,
            tone: "bg-cyan-100 text-cyan-800",
          },
          {
            label: "Devices",
            value: "412",
            icon: <FiHardDrive />,
            tone: "bg-emerald-100 text-emerald-800",
          },
          {
            label: "Relationships",
            value: "126",
            icon: <FiLink />,
            tone: "bg-amber-100 text-amber-800",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{item.label}</p>
                <p className="mt-2 text-3xl font-bold">{item.value}</p>
              </div>
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-lg ${item.tone}`}
              >
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Configuration Items</h2>
            <p className="text-sm text-slate-500">
              Core assets and services currently tracked
            </p>
          </div>

          <div className="overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full">
              <thead className="bg-slate-950 text-sm text-white">
                <tr>
                  <th className="px-4 py-3 text-left">CI Number</th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Type</th>
                  <th className="px-4 py-3 text-left">Owner</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {configurationItems.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50"
                  >
                    <td className="px-4 py-4 font-semibold text-cyan-700">
                      {item.id}
                    </td>
                    <td className="px-4 py-4 text-slate-800">{item.name}</td>
                    <td className="px-4 py-4 text-slate-600">{item.type}</td>
                    <td className="px-4 py-4 text-slate-600">{item.owner}</td>
                    <td className="px-4 py-4">
                      <StatusBadge status={item.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Relationships</h2>
          <p className="mt-1 text-sm text-slate-500">
            How configuration items connect to business services
          </p>

          <div className="mt-5 space-y-3">
            {relationships.map((relationship) => (
              <div
                key={relationship}
                className="rounded-lg border border-slate-100 bg-slate-50 p-4"
              >
                <p className="font-medium text-slate-800">{relationship}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Cmdb;
