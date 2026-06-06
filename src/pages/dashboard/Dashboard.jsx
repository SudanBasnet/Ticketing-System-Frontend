import {
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
} from "react-icons/fi";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import MainLayout from "../../Layouts/MainLayout";
import KpiCard from "../../components/UI/KpiCard";
import PageHeader from "../../components/UI/PageHeader";
import { incidents } from "../../data/incidents";

const chartColors = ["#06b6d4", "#10b981", "#f59e0b", "#f43f5e", "#8b5cf6"];
const progressColors = [
  "bg-cyan-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-violet-500",
];

const buildChartItems = (records, field) => {
  const counts = records.reduce((summary, record) => {
    const label = record[field] || "Unspecified";

    return {
      ...summary,
      [label]: (summary[label] || 0) + 1,
    };
  }, {});

  return Object.entries(counts).map(([label, value], index) => ({
    label,
    value,
    chartColor: chartColors[index % chartColors.length],
    color: progressColors[index % progressColors.length],
  }));
};

const PieSummary = ({ items, centerLabel, centerValue }) => {
  return (
    <div className="grid items-center gap-5 sm:grid-cols-[210px_1fr]">
      <div className="relative mx-auto h-52 w-52">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={items}
              dataKey="value"
              nameKey="label"
              innerRadius={62}
              outerRadius={96}
              paddingAngle={3}
              animationDuration={900}
            >
              {items.map((item) => (
                <Cell key={item.label} fill={item.chartColor} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
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
  const totalIncidents = incidents.length;
  const openIncidents = incidents.filter(
    (incident) => !["Resolved", "Closed", "Cancelled"].includes(incident.status),
  ).length;
  const resolvedToday = incidents.filter(
    (incident) =>
      incident.status === "Resolved" && incident.createdDate === "2026-06-06",
  ).length;
  const slaBreached = incidents.filter(
    (incident) => incident.slaStatus === "Breached",
  ).length;
  const categoryItems = buildChartItems(incidents, "category");
  const assignmentGroupItems = buildChartItems(incidents, "assignmentGroup");
  const priorityItems = buildChartItems(incidents, "priority");
  const maxCategoryValue = Math.max(
    ...categoryItems.map((item) => item.value),
    1,
  );

  return (
    <MainLayout>
      <PageHeader
        meta="Command center"
        title="Dashboard"
        description="Track live ticket load, SLA pressure, and the work moving through your service desk today."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total Incidents"
          value={String(totalIncidents)}
          caption="All incident records"
          icon={<FiTrendingUp />}
          tone="bg-cyan-100 text-cyan-800"
        />
        <KpiCard
          title="Open Incidents"
          value={String(openIncidents)}
          caption="Active work in progress"
          icon={<FiAlertCircle />}
          tone="bg-amber-100 text-amber-800"
        />
        <KpiCard
          title="Resolved Today"
          value={String(resolvedToday)}
          caption="Closed from today's queue"
          icon={<FiCheckCircle />}
          tone="bg-emerald-100 text-emerald-800"
        />
        <KpiCard
          title="SLA Breached"
          value={String(slaBreached)}
          caption="Incidents over SLA"
          icon={<FiClock />}
          tone="bg-rose-100 text-rose-800"
          alert
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <section className="motion-card soft-enter rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Incidents by Category</h2>
              <p className="text-sm text-slate-500">
                Current incident distribution by ITIL category
              </p>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100">
              Stable
            </span>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <PieSummary
              items={categoryItems}
              centerLabel="Total"
              centerValue={String(totalIncidents)}
            />
            
            <div className="space-y-4">
              {categoryItems.map((item) => (
                <div key={item.label} className="rounded-lg p-2 transition hover:bg-slate-50">
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-medium text-slate-700">
                      {item.label}
                    </span>
                    <span className="text-slate-500">{item.value} incidents</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-3 rounded-full transition-all duration-700 ease-out ${item.color}`}
                      style={{ width: `${(item.value / maxCategoryValue) * 100}%` }}
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
              "Review P1/P2 incidents",
              "Assign incidents without owners",
              "Follow up SLA warning and breached queue",
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
          <h2 className="text-xl font-semibold">P1/P2/P3/P4 Count</h2>
          <p className="text-sm text-slate-500">
            Priority distribution calculated from impact and urgency
          </p>

          <div className="mt-4 h-72">
            <PieSummary
              items={priorityItems}
              centerLabel="Total"
              centerValue={String(totalIncidents)}
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
                detail: `${slaBreached} incidents are currently breached`,
              },
              {
                title: "Unassigned incidents",
                detail: `${incidents.filter((incident) => !incident.assignedTo).length} incidents still waiting for ownership`,
              },
              {
                title: "Critical problem trend",
                detail: "Network incidents are trending upward",
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

      <section className="motion-card soft-enter mt-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Incidents by Assignment Group</h2>
        <p className="text-sm text-slate-500">
          Workload split across resolver teams
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {assignmentGroupItems.map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-slate-100 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-cyan-50"
            >
              <p className="text-sm font-medium text-slate-500">{item.label}</p>
              <p className="mt-2 text-3xl font-bold text-slate-950">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>
    </MainLayout>
  );
};

export default Dashboard;
