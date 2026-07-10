import { FiDatabase, FiHardDrive, FiInbox, FiLink, FiPlus } from "react-icons/fi";

import MainLayout from "../Layouts/MainLayout";
import EmptyState from "../components/UI/EmptyState";
import PageHeader from "../components/UI/PageHeader";

const stats = [
  {
    label: "Services",
    value: "0",
    icon: <FiDatabase />,
    tone: "bg-cyan-100 text-cyan-800",
  },
  {
    label: "Devices",
    value: "0",
    icon: <FiHardDrive />,
    tone: "bg-emerald-100 text-emerald-800",
  },
  {
    label: "Relationships",
    value: "0",
    icon: <FiLink />,
    tone: "bg-amber-100 text-amber-800",
  },
];

const Cmdb = () => {
  return (
    <MainLayout>
      <PageHeader
        meta="Configuration"
        title="CMDB"
        description="Understand the services, assets, ownership, and relationships behind ticket impact."
        actions={
          <button
            type="button"
            disabled
            className="flex cursor-not-allowed items-center gap-2 rounded-lg bg-slate-200 px-4 py-2 font-medium text-slate-500"
          >
            <FiPlus />
            Add CI
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

      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Configuration Items</h2>
            <p className="text-sm text-slate-500">
              Core assets and services currently tracked
            </p>
          </div>

          <EmptyState
            icon={<FiInbox />}
            title="No configuration data source connected"
            description="Static configuration items were removed. Persisted services, devices, and owners can appear here once CMDB endpoints exist."
          />
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Relationships</h2>
          <p className="mt-1 text-sm text-slate-500">
            How configuration items connect to business services
          </p>

          <div className="mt-5">
            <EmptyState
              icon={<FiLink />}
              title="No relationships yet"
              description="Relationship rows will be rendered from backend CMDB data instead of hard-coded examples."
            />
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Cmdb;
