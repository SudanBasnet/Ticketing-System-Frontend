import { FiAlertTriangle, FiGitPullRequest, FiInbox, FiPlus } from "react-icons/fi";

import MainLayout from "../Layouts/MainLayout";
import EmptyState from "../components/UI/EmptyState";
import PageHeader from "../components/UI/PageHeader";

const Problems = () => {
  return (
    <MainLayout>
      <PageHeader
        meta="Root cause"
        title="Problems"
        description="Group recurring incidents, document known errors, and drive permanent fixes."
        actions={
          <button
            type="button"
            disabled
            className="flex cursor-not-allowed items-center gap-2 rounded-lg bg-slate-200 px-4 py-2 font-medium text-slate-500"
          >
            <FiPlus />
            New Problem
          </button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-rose-100 text-rose-700">
              <FiAlertTriangle />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Risk Hotspots</h2>
              <p className="text-sm text-slate-500">
                Calculated from persisted problem records
              </p>
            </div>
          </div>
          <EmptyState
            icon={<FiInbox />}
            title="No hotspots yet"
            description="Hotspots will appear when a problem backend exposes linked incident trends."
          />
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

          <EmptyState
            icon={<FiInbox />}
            title="No problem data source connected"
            description="This page is ready for real problem records, but it no longer displays static investigations."
          />
        </section>
      </div>
    </MainLayout>
  );
};

export default Problems;
