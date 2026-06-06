import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiPlus } from "react-icons/fi";

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
            </div>
          </>
        }
      />

      <section className="mb-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
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
