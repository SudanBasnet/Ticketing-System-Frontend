import { FiCheckCircle, FiClock, FiInbox, FiPlus } from "react-icons/fi";

import MainLayout from "../Layouts/MainLayout";
import EmptyState from "../components/UI/EmptyState";
import PageHeader from "../components/UI/PageHeader";

const stats = [
  {
    label: "Total",
    value: "0",
    icon: <FiInbox />,
    tone: "bg-cyan-100 text-cyan-800",
  },
  {
    label: "Pending",
    value: "0",
    icon: <FiClock />,
    tone: "bg-amber-100 text-amber-800",
  },
  {
    label: "Approved",
    value: "0",
    icon: <FiCheckCircle />,
    tone: "bg-emerald-100 text-emerald-800",
  },
];

const Requests = () => {
  return (
    <MainLayout>
      <PageHeader
        meta="Service catalog"
        title="Requests"
        description="Manage employee service requests from submission through approval and fulfillment."
        actions={
          <button
            type="button"
            disabled
            className="flex cursor-not-allowed items-center gap-2 rounded-lg bg-slate-200 px-4 py-2 font-medium text-slate-500"
          >
            <FiPlus />
            Create Request
          </button>
        }
      />

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{item.label}</p>
                <p className="mt-2 text-3xl font-bold text-slate-950">
                  {item.value}
                </p>
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
        <EmptyState
          icon={<FiInbox />}
          title="No request data source connected"
          description="This workspace has live incident APIs, but no request endpoints yet. This page only shows persisted backend data when the module is added."
        />
      </section>
    </MainLayout>
  );
};

export default Requests;
