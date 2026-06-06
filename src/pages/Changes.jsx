import { FiCalendar, FiCheckCircle, FiClock, FiPlus } from "react-icons/fi";

import MainLayout from "../Layouts/MainLayout";
import PageHeader from "../components/UI/PageHeader";
import StatusBadge from "../components/UI/StatusBadge";

const changes = [
  {
    id: "CHG000001",
    title: "Upgrade VPN gateway firmware",
    owner: "Network Team",
    risk: "Medium",
    status: "Scheduled",
    window: "2026-06-09 10:00 PM",
  },
  {
    id: "CHG000002",
    title: "Email retention policy update",
    owner: "Messaging Team",
    risk: "Low",
    status: "Awaiting Approval",
    window: "2026-06-11 8:00 PM",
  },
  {
    id: "CHG000003",
    title: "Database index maintenance",
    owner: "Platform Team",
    risk: "High",
    status: "Implemented",
    window: "2026-06-05 11:30 PM",
  },
];

const Changes = () => {
  return (
    <MainLayout>
      <PageHeader
        meta="Change enablement"
        title="Changes"
        description="Plan, approve, and monitor service changes with clear risk and implementation windows."
        actions={
          <button className="flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2 font-medium text-white transition hover:bg-cyan-700">
            <FiPlus />
            New Change
          </button>
        }
      />

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        {[
          {
            label: "Scheduled",
            value: "12",
            icon: <FiCalendar />,
            tone: "bg-cyan-100 text-cyan-800",
          },
          {
            label: "Awaiting CAB",
            value: "4",
            icon: <FiClock />,
            tone: "bg-amber-100 text-amber-800",
          },
          {
            label: "Implemented",
            value: "18",
            icon: <FiCheckCircle />,
            tone: "bg-emerald-100 text-emerald-800",
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

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Change Schedule</h2>
          <p className="text-sm text-slate-500">
            Upcoming and recently completed changes
          </p>
        </div>

        <div className="overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full">
            <thead className="bg-slate-950 text-sm text-white">
              <tr>
                <th className="px-4 py-3 text-left">Number</th>
                <th className="px-4 py-3 text-left">Change</th>
                <th className="px-4 py-3 text-left">Owner</th>
                <th className="px-4 py-3 text-left">Risk</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Window</th>
              </tr>
            </thead>
            <tbody>
              {changes.map((change) => (
                <tr
                  key={change.id}
                  className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50"
                >
                  <td className="px-4 py-4 font-semibold text-cyan-700">
                    {change.id}
                  </td>
                  <td className="px-4 py-4 text-slate-800">{change.title}</td>
                  <td className="px-4 py-4 text-slate-600">{change.owner}</td>
                  <td className="px-4 py-4 text-slate-600">{change.risk}</td>
                  <td className="px-4 py-4">
                    <StatusBadge status={change.status} />
                  </td>
                  <td className="px-4 py-4 text-slate-600">{change.window}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </MainLayout>
  );
};

export default Changes;
