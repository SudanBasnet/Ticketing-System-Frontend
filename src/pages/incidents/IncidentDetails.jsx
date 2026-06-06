import { Link, useParams } from "react-router-dom";

import PriorityBadge from "../../components/UI/PriorityBadge";
import StatusBadge from "../../components/UI/StatusBadge";
import { incidents } from "../../data/incidents";
import MainLayout from "../../Layouts/MainLayout";

const workNotes = [
  {
    id: 1,
    author: "Sudan Basnet",
    createdAt: "2026-06-06 10:15 AM",
    note: "User confirmed the VPN client fails after entering MFA code.",
  },
  {
    id: 2,
    author: "David Lee",
    createdAt: "2026-06-06 10:42 AM",
    note: "Checked account lockout status and confirmed the user is active.",
  },
  {
    id: 3,
    author: "Sudan Basnet",
    createdAt: "2026-06-06 11:05 AM",
    note: "Reinstalled VPN profile and asked the user to retest connection.",
  },
];

const activityTimeline = [
  {
    id: 1,
    title: "Incident created",
    description: "John Smith reported the issue through the service portal.",
    timestamp: "2026-06-06 9:58 AM",
  },
  {
    id: 2,
    title: "Assigned to Service Desk",
    description: "Incident assigned to Sudan Basnet for initial triage.",
    timestamp: "2026-06-06 10:03 AM",
  },
  {
    id: 3,
    title: "Priority updated",
    description: "Priority changed to High due to business impact.",
    timestamp: "2026-06-06 10:30 AM",
  },
  {
    id: 4,
    title: "Work note added",
    description: "Troubleshooting notes were added to the incident.",
    timestamp: "2026-06-06 11:05 AM",
  },
];

const IncidentDetails = () => {
  const { id } = useParams();
  const incident = incidents.find((item) => item.id === id);

  if (!incident) {
    return (
      <MainLayout>
        <div className="mb-6 border-b border-slate-200 pb-4">
          <Link to="/incidents" className="text-sm font-medium text-blue-600">
            Back to incidents
          </Link>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h1 className="text-2xl font-bold">Incident not found</h1>
          <p className="mt-2 text-slate-600">
            No incident exists for number {id}.
          </p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <Link to="/incidents" className="text-sm font-medium text-blue-600">
            Back to incidents
          </Link>
          <h1 className="mt-2 text-3xl font-bold">{incident.id}</h1>
        </div>

        <div className="flex gap-3">
          <PriorityBadge priority={incident.priority} />
          <StatusBadge status={incident.status} />
        </div>
      </div>

      <section className="mb-6 rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">Incident Information</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Short Description
            </p>
            <p className="mt-1 text-slate-900">{incident.shortDescription}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">Assigned To</p>
            <p className="mt-1 text-slate-900">{incident.assignedTo}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">Created By</p>
            <p className="mt-1 text-slate-900">{incident.createdBy}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">Created Date</p>
            <p className="mt-1 text-slate-900">{incident.createdDate}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">Urgency</p>
            <p className="mt-1 text-slate-900">{incident.urgency}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">SLA</p>
            <p className="mt-1 text-slate-900">{incident.sla}</p>
          </div>
        </div>
      </section>

      <section className="mb-6 rounded-lg bg-white p-6 shadow">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Work Notes</h2>

          <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
            Add Note
          </button>
        </div>

        <div className="space-y-4">
          {workNotes.map((workNote) => (
            <article
              key={workNote.id}
              className="border-b border-slate-100 pb-4 last:border-b-0 last:pb-0"
            >
              <div className="mb-2 flex items-center justify-between gap-4">
                <p className="font-medium text-slate-900">{workNote.author}</p>
                <p className="text-sm text-slate-500">{workNote.createdAt}</p>
              </div>

              <p className="text-slate-700">{workNote.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">Activity Timeline</h2>

        <div className="space-y-5">
          {activityTimeline.map((activity) => (
            <article key={activity.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="mt-1 h-3 w-3 rounded-full bg-blue-600" />
                <div className="mt-2 h-full w-px bg-slate-200" />
              </div>

              <div className="pb-2">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <p className="font-medium text-slate-900">
                    {activity.title}
                  </p>
                  <p className="text-sm text-slate-500">
                    {activity.timestamp}
                  </p>
                </div>

                <p className="mt-1 text-slate-700">{activity.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </MainLayout>
  );
};

export default IncidentDetails;
