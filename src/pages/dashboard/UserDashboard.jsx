import { useContext, useEffect, useMemo, useState } from "react";
import { FiAlertCircle, FiCheckCircle, FiClock, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

import MainLayout from "../../Layouts/MainLayout";
import EmptyState from "../../components/UI/EmptyState";
import KpiCard from "../../components/UI/KpiCard";
import PageHeader from "../../components/UI/PageHeader";
import PriorityBadge from "../../components/UI/PriorityBadge";
import StatusBadge from "../../components/UI/StatusBadge";
import Spinner from "../../components/UI/Spinner";
import { AuthContext } from "../../context/auth-context";
import { apiMessage } from "../../services/api";
import { listIncidents } from "../../services/incidents";

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const [incidents, setIncidents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadIncidents = async () => {
      try {
        const result = await listIncidents();
        setIncidents(result.incidents);
      } catch (requestError) {
        setError(apiMessage(requestError, "Could not load your incidents."));
      } finally {
        setIsLoading(false);
      }
    };

    loadIncidents();
  }, []);

  const summary = useMemo(
    () => ({
      total: incidents.length,
      active: incidents.filter((incident) =>
        ["Open", "In Progress"].includes(incident.status),
      ).length,
      resolved: incidents.filter((incident) => incident.status === "Resolved").length,
    }),
    [incidents],
  );

  return (
    <MainLayout>
      <PageHeader
        meta="My support portal"
        title={`Welcome back, ${user?.name?.split(" ")[0] || "there"}`}
        description="Report an issue, follow its progress, and review updates from the service desk."
        actions={
          <Link
            to="/incidents?create=true"
            className="flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2 font-medium text-white transition hover:bg-cyan-700"
          >
            <FiPlus /> Report an issue
          </Link>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <KpiCard title="My incidents" value={String(summary.total)} caption="All issues you have reported" icon={<FiAlertCircle />} />
        <KpiCard title="In progress" value={String(summary.active)} caption="Currently being worked on" icon={<FiClock />} tone="bg-amber-100 text-amber-700" />
        <KpiCard title="Resolved" value={String(summary.resolved)} caption="Issues resolved by support" icon={<FiCheckCircle />} tone="bg-emerald-100 text-emerald-700" />
      </div>

      <section className="mt-6 rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold">Recent incidents</h2>
            <p className="mt-1 text-sm text-slate-500">The latest activity on your support requests.</p>
          </div>
          <Link to="/incidents" className="text-sm font-semibold text-cyan-700 hover:text-cyan-900">View all</Link>
        </div>

        {isLoading ? (
          <p className="p-8 text-center text-sm text-slate-500"><Spinner label="Loading your incidents..." /></p>
        ) : error ? (
          <p className="p-8 text-center text-sm text-rose-700">{error}</p>
        ) : incidents.length === 0 ? (
          <div className="p-6">
            <EmptyState title="No incidents yet" description="When you report an issue, its status and service-desk updates will appear here." />
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {incidents.slice(0, 5).map((incident) => (
              <Link key={incident.id} to={`/incidents/${incident.id}`} className="flex flex-col gap-3 px-5 py-4 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-cyan-700">{incident.number}</p>
                  <p className="mt-1 truncate font-medium text-slate-900">{incident.shortDescription}</p>
                  <p className="mt-1 text-sm text-slate-500">Updated {new Date(incident.updatedAt).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <PriorityBadge priority={incident.priority} />
                  <StatusBadge status={incident.status} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </MainLayout>
  );
};

export default UserDashboard;
