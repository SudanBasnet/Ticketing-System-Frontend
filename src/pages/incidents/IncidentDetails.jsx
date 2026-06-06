import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiPlus } from "react-icons/fi";
import toast from "react-hot-toast";

import PriorityBadge from "../../components/UI/PriorityBadge";
import StatusBadge from "../../components/UI/StatusBadge";
import { AuthContext } from "../../context/auth-context";
import { incidents } from "../../data/incidents";
import MainLayout from "../../Layouts/MainLayout";
import PageHeader from "../../components/UI/PageHeader";

const WORK_NOTES_KEY = "ticketing-system-work-notes";
const ACTIVITY_KEY = "ticketing-system-activity";

const defaultWorkNotes = {
  INC000001: [
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
  ],
};

const defaultActivityTimeline = {
  INC000001: [
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
  ],
};

const getStoredRecord = (key) => {
  const storedValue = localStorage.getItem(key);

  return storedValue ? JSON.parse(storedValue) : {};
};

const formatTimestamp = () =>
  new Intl.DateTimeFormat("en-AU", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date());

const DetailCard = ({ title, children }) => (
  <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
    <h2 className="mb-4 text-xl font-semibold">{title}</h2>
    {children}
  </section>
);

const DetailGrid = ({ items }) => (
  <div className="grid gap-4 md:grid-cols-2">
    {items.map((item) => (
      <div key={item.label}>
        <p className="text-sm font-medium text-slate-500">{item.label}</p>
        <p className="mt-1 text-slate-900">{item.value || "Not provided"}</p>
      </div>
    ))}
  </div>
);

const IncidentDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const incident = incidents.find((item) => item.id === id);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [workNotesByIncident, setWorkNotesByIncident] = useState(() => ({
    ...defaultWorkNotes,
    ...getStoredRecord(WORK_NOTES_KEY),
  }));
  const [activityByIncident, setActivityByIncident] = useState(() => ({
    ...defaultActivityTimeline,
    ...getStoredRecord(ACTIVITY_KEY),
  }));

  const workNotes = workNotesByIncident[id] ?? [];
  const activityTimeline =
    activityByIncident[id] ??
    (incident
      ? [
          {
            id: 1,
            title: "Incident created",
            description: `${incident.createdBy} reported the issue through the service portal.`,
            timestamp: incident.createdDate,
          },
        ]
      : []);

  const handleAddWorkNote = (e) => {
    e.preventDefault();

    const trimmedNote = noteText.trim();

    if (!trimmedNote) {
      return;
    }

    const timestamp = formatTimestamp();
    const author = user?.name || "Service Desk User";
    const nextNote = {
      id: Date.now(),
      author,
      createdAt: timestamp,
      note: trimmedNote,
    };

    const nextActivity = {
      id: Date.now() + 1,
      title: "Work note added",
      description: `${author} added a work note to ${id}.`,
      timestamp,
    };

    setWorkNotesByIncident((currentNotes) => {
      const updatedNotes = {
        ...currentNotes,
        [id]: [nextNote, ...(currentNotes[id] ?? [])],
      };

      localStorage.setItem(WORK_NOTES_KEY, JSON.stringify(updatedNotes));

      return updatedNotes;
    });

    setActivityByIncident((currentActivity) => {
      const updatedActivity = {
        ...currentActivity,
        [id]: [nextActivity, ...(currentActivity[id] ?? [])],
      };

      localStorage.setItem(ACTIVITY_KEY, JSON.stringify(updatedActivity));

      return updatedActivity;
    });

    setNoteText("");
    setIsAddingNote(false);
    toast.success("Work note added.");
  };

  if (!incident) {
    return (
      <MainLayout>
        <div className="mb-6 border-b border-slate-200 pb-4">
          <Link to="/incidents" className="text-sm font-medium text-cyan-700">
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
      <PageHeader
        meta="Incident details"
        title={incident.id}
        description={incident.shortDescription}
        actions={
          <>
            <Link
              to="/incidents"
              className="flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 transition hover:bg-white"
            >
              <FiArrowLeft />
              Back
            </Link>
            <div className="flex items-center gap-3 rounded-lg bg-white px-4 py-2 shadow-sm">
              <PriorityBadge priority={incident.priority} />
              <StatusBadge status={incident.status} />
              <StatusBadge status={incident.slaStatus} />
            </div>
          </>
        }
      />

      <div className="mb-6 grid gap-6">
        <DetailCard title="Basic Information">
          <DetailGrid
            items={[
              { label: "Incident Number", value: incident.id },
              { label: "Ticket Type", value: incident.ticketType },
              { label: "Short Description", value: incident.shortDescription },
              { label: "Detailed Description", value: incident.description },
              { label: "Category", value: incident.category },
              { label: "Subcategory", value: incident.subcategory },
              { label: "Source", value: incident.source },
            ]}
          />
        </DetailCard>

        <div className="grid gap-6 lg:grid-cols-2">
          <DetailCard title="User Information">
            <DetailGrid
              items={[
                { label: "Caller / Requester", value: incident.caller },
                { label: "Requester Email", value: incident.requester },
                { label: "Affected User", value: incident.affectedUser },
                { label: "Department", value: incident.department },
                { label: "Contact Number", value: incident.contactNumber },
                { label: "Email", value: incident.email },
              ]}
            />
          </DetailCard>

          <DetailCard title="Priority Management">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm font-medium text-slate-500">Impact</p>
                <p className="mt-1 text-slate-900">{incident.impact}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Urgency</p>
                <p className="mt-1 text-slate-900">{incident.urgency}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Priority</p>
                <div className="mt-1">
                  <PriorityBadge priority={incident.priority} />
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-lg bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-700">
                Priority Matrix
              </p>
              <p className="mt-1 text-sm text-slate-500">
                High + High = P1, High + Medium = P2, Medium + Medium = P3,
                Low + Low = P4.
              </p>
            </div>
          </DetailCard>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <DetailCard title="Assignment and Status">
            <DetailGrid
              items={[
                { label: "Assignment Group", value: incident.assignmentGroup },
                { label: "Assigned To", value: incident.assignedTo },
                { label: "Created By", value: incident.createdBy },
                { label: "Updated By", value: incident.updatedBy },
                { label: "Created Date", value: incident.createdDate },
                { label: "Status", value: incident.status },
              ]}
            />
          </DetailCard>

          <DetailCard title="SLA Information">
            <DetailGrid
              items={[
                { label: "Response SLA", value: incident.responseSla },
                { label: "Resolution SLA", value: incident.resolutionSla },
                { label: "SLA Status", value: incident.slaStatus },
                { label: "Due Date", value: incident.dueDate },
              ]}
            />
          </DetailCard>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <DetailCard title="Work Tracking and Resolution">
            <DetailGrid
              items={[
                { label: "Internal Work Notes", value: incident.workNotes },
                {
                  label: "Additional Comments",
                  value: incident.additionalComments,
                },
                { label: "Resolution Notes", value: incident.resolutionNotes },
                { label: "Root Cause", value: incident.rootCause },
                { label: "Resolution Code", value: incident.resolutionCode },
              ]}
            />
          </DetailCard>

          <DetailCard title="Asset Information">
            <DetailGrid
              items={[
                { label: "Device Name", value: incident.deviceName },
                { label: "Asset Tag", value: incident.assetTag },
                { label: "Serial Number", value: incident.serialNumber },
                { label: "Location", value: incident.location },
                {
                  label: "Configuration Item (CI)",
                  value: incident.configurationItem,
                },
              ]}
            />
          </DetailCard>
        </div>

        <DetailCard title="Attachments and Email Integration">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-slate-500">Attachments</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {(incident.attachments || []).map((attachment) => (
                  <span
                    key={attachment}
                    className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700"
                  >
                    {attachment}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-lg bg-cyan-50 p-4">
              <p className="text-sm font-semibold text-cyan-900">
                Email-created incident shape
              </p>
              <pre className="mt-2 overflow-x-auto text-xs text-cyan-900">
                {JSON.stringify(
                  {
                    ticketType: "Incident",
                    shortDescription: "Outlook not opening",
                    description: "User cannot launch Outlook after update",
                    requester: "john@company.com",
                    status: "New",
                  },
                  null,
                  2,
                )}
              </pre>
            </div>
          </div>
        </DetailCard>
      </div>

      <section className="mb-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Work Notes</h2>

          <button
            type="button"
            onClick={() => setIsAddingNote((isOpen) => !isOpen)}
            className="flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-700"
          >
            <FiPlus />
            Add Note
          </button>
        </div>

        {isAddingNote && (
          <form
            onSubmit={handleAddWorkNote}
            className="mb-5 rounded-lg border border-cyan-100 bg-cyan-50/60 p-4"
          >
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                Work note
              </span>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                rows={4}
                placeholder="Add troubleshooting steps, customer updates, or handoff notes..."
                className="w-full rounded-lg border border-slate-200 bg-white p-3 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                required
              />
            </label>

            <div className="mt-3 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setNoteText("");
                  setIsAddingNote(false);
                }}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-700"
              >
                Save Note
              </button>
            </div>
          </form>
        )}

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

          {workNotes.length === 0 && (
            <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-slate-500">
              No work notes have been added yet.
            </div>
          )}
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
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
