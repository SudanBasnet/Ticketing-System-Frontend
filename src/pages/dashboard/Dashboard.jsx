import {
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
} from "react-icons/fi";

import MainLayout from "../../Layouts/MainLayout";
import KpiCard from "../../components/UI/KpiCard";
import PageHeader from "../../components/UI/PageHeader";

const queueItems = [
  { label: "Network", value: 18, color: "bg-cyan-500", chartColor: "#06b6d4" },
  { label: "Email", value: 12, color: "bg-emerald-500", chartColor: "#10b981" },
  { label: "Hardware", value: 9, color: "bg-amber-500", chartColor: "#f59e0b" },
  { label: "Access", value: 6, color: "bg-rose-500", chartColor: "#f43f5e" },
];

const statusItems = [
  { label: "Open", value: 45, chartColor: "#f59e0b" },
  { label: "Resolved", value: 180, chartColor: "#10b981" },
  { label: "Breached", value: 20, chartColor: "#f43f5e" },
];

const getPieBackground = (items) => {
  const total = items.reduce((sum, item) => sum + item.value, 0);
  let start = 0;

  const slices = items.map((item) => {
    const size = (item.value / total) * 100;
    const end = start + size;
    const slice = `${item.chartColor} ${start}% ${end}%`;

    start = end;

    return slice;
  });

  return `conic-gradient(${slices.join(", ")})`;
};

const PieSummary = ({ items, centerLabel, centerValue }) => {
  return (
    <div className="grid items-center gap-5 sm:grid-cols-[210px_1fr]">
      <div className="relative mx-auto h-52 w-52">
        <div
          className="h-full w-full rounded-full shadow-inner transition duration-500 hover:rotate-6"
          style={{ background: getPieBackground(items) }}
        />
        <div className="absolute inset-8 flex flex-col items-center justify-center rounded-full bg-white shadow">
          <p className="text-sm font-medium text-slate-500">{centerLabel}</p>
          <p className="mt-1 text-3xl font-bold text-slate-950">
            {centerValue}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-lg p-2 transition hover:bg-slate-50"
          >
            <div className="flex items-center gap-3">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: item.chartColor }}
              />
              <span className="font-medium text-slate-700">{item.label}</span>
            </div>
            <span className="text-sm text-slate-500">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <MainLayout>
      <PageHeader
        meta="Command center"
        title="Dashboard"
        description="Track live ticket load, SLA pressure, and the work moving through your service desk today."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total Tickets"
          value="245"
          caption="+12 created today"
          icon={<FiTrendingUp />}
          tone="bg-cyan-100 text-cyan-800"
        />
        <KpiCard
          title="Open Tickets"
          value="45"
          caption="18 awaiting triage"
          icon={<FiAlertCircle />}
          tone="bg-amber-100 text-amber-800"
        />
        <KpiCard
          title="Resolved"
          value="180"
          caption="73% closure rate"
          icon={<FiCheckCircle />}
          tone="bg-emerald-100 text-emerald-800"
        />
        <KpiCard
          title="SLA Breached"
          value="20"
          caption="5 critical follow-ups"
          icon={<FiClock />}
          tone="bg-rose-100 text-rose-800"
          alert
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <section className="motion-card soft-enter rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Queue Breakdown</h2>
              <p className="text-sm text-slate-500">
                Current open workload by category
              </p>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100">
              Stable
            </span>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <PieSummary
              items={queueItems}
              centerLabel="Open"
              centerValue="45"
            />
            
            <div className="space-y-4">
              {queueItems.map((item) => (
                <div key={item.label} className="rounded-lg p-2 transition hover:bg-slate-50">
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-medium text-slate-700">
                      {item.label}
                    </span>
                    <span className="text-slate-500">{item.value} tickets</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-3 rounded-full transition-all duration-700 ease-out ${item.color}`}
                      style={{ width: `${item.value * 4}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="motion-card soft-enter rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Focus List</h2>
          <div className="mt-5 space-y-4">
            {[
              "Review high priority VPN incidents",
              "Assign unowned requests",
              "Follow up SLA breach queue",
            ].map((item, index) => (
              <div
                key={item}
                className="rounded-lg border border-slate-100 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-cyan-50"
              >
                <div className="flex items-center gap-2">
                  {index === 2 && (
                    <span className="blink-alert h-2.5 w-2.5 rounded-full bg-rose-500" />
                  )}
                  <p className="font-medium text-slate-800">{item}</p>
                </div>
                <p className="mt-1 text-sm text-slate-500">Due today</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="motion-card soft-enter rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Ticket Status Mix</h2>
          <p className="text-sm text-slate-500">
            Overall ticket distribution across the desk
          </p>

          <div className="mt-4 h-72">
            <PieSummary
              items={statusItems}
              centerLabel="Total"
              centerValue="245"
            />
          </div>
        </section>

        <section className="motion-card soft-enter rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Active Alerts</h2>
              <p className="text-sm text-slate-500">
                Items that need visible follow-up
              </p>
            </div>
            <span className="blink-alert h-3 w-3 rounded-full bg-rose-500" />
          </div>

          <div className="space-y-3">
            {[
              {
                title: "SLA breach risk",
                detail: "5 tickets due within the next hour",
              },
              {
                title: "Unassigned incidents",
                detail: "18 incidents still waiting for ownership",
              },
              {
                title: "Critical problem trend",
                detail: "Remote access issues increasing today",
              },
            ].map((alert) => (
              <div
                key={alert.title}
                className="rounded-lg border border-rose-100 bg-rose-50 p-4 transition hover:-translate-y-0.5 hover:border-rose-200 hover:shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="blink-alert h-2.5 w-2.5 rounded-full bg-rose-500" />
                  <p className="font-semibold text-rose-950">{alert.title}</p>
                </div>
                <p className="mt-1 text-sm text-rose-700">{alert.detail}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
