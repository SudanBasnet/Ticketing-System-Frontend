import { FiAlertTriangle, FiGitPullRequest, FiPlus } from "react-icons/fi";

import MainLayout from "../Layouts/MainLayout";
import PageHeader from "../components/UI/PageHeader";
import PriorityBadge from "../components/UI/PriorityBadge";
import StatusBadge from "../components/UI/StatusBadge";

const problems = [
  {
    id: "PRB000001",
    title: "Recurring VPN disconnects after MFA",
    owner: "Sudan Basnet",
    priority: "High",
    status: "Investigating",
    linkedIncidents: 8,
  },
  {
    id: "PRB000002",
    title: "Printer queue failures on level 4",
    owner: "David Lee",
    priority: "Medium",
    status: "Known Error",
    linkedIncidents: 5,
  },
  {
    id: "PRB000003",
    title: "Outlook profile corruption after update",
    owner: "Mary Jones",
    priority: "Critical",
    status: "Investigating",
    linkedIncidents: 12,
  },
];

const Problems = () => {
  return (
    <MainLayout>
      <PageHeader
        meta="Root cause"
        title="Problems"
        description="Group recurring incidents, document known errors, and drive permanent fixes."
        actions={
          <button className="flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2 font-medium text-white transition hover:bg-cyan-700">
            <FiPlus />
            New Problem
          </button>
        }
      />

      <div className="mb-6 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-rose-100 text-rose-700">
              <FiAlertTriangle />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Risk Hotspots</h2>
              <p className="text-sm text-slate-500">Areas creating repeat work</p>
            </div>
          </div>
          <div className="space-y-3">
            {["Remote access", "Messaging", "Print services"].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-slate-100 bg-slate-50 p-4"
              >
                <p className="font-medium text-slate-800">{item}</p>
                <p className="text-sm text-slate-500">
                  Requires root cause review
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-100 text-cyan-700">
              <FiGitPullRequest />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Problem Backlog</h2>
              <p className="text-sm text-slate-500">
                Known errors and investigations
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {problems.map((problem) => (
              <div
                key={problem.id}
                className="grid gap-3 rounded-lg border border-slate-100 p-4 md:grid-cols-[1fr_auto]"
              >
                <div>
                  <p className="font-semibold text-slate-950">
                    {problem.id} · {problem.title}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Owner: {problem.owner} · {problem.linkedIncidents} linked
                    incidents
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <PriorityBadge priority={problem.priority} />
                  <StatusBadge status={problem.status} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Problems;
