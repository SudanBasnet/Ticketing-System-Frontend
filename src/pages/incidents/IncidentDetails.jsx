import { useCallback, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiDownload,
  FiFile,
  FiPlus,
  FiRefreshCw,
  FiTrash2,
  FiUpload,
} from "react-icons/fi";
import toast from "react-hot-toast";

import PriorityBadge from "../../components/UI/PriorityBadge";
import StatusBadge from "../../components/UI/StatusBadge";
import { AuthContext } from "../../context/auth-context";
import MainLayout from "../../Layouts/MainLayout";
import PageHeader from "../../components/UI/PageHeader";
import { apiMessage } from "../../services/api";
import {
  deleteIncidentAttachment,
  getIncident,
  listIncidentAttachments,
  uploadIncidentAttachment,
} from "../../services/incidents";

const WORK_NOTES_KEY = "ticketing-system-work-notes";

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
  const [incident, setIncident] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [workNotesByIncident, setWorkNotesByIncident] = useState(() =>
    getStoredRecord(WORK_NOTES_KEY),
  );

  const workNotes = workNotesByIncident[id] ?? [];

  const loadIncident = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const [incidentResult, attachmentResult] = await Promise.all([
        getIncident(id),
        listIncidentAttachments(id),
      ]);
      setIncident(incidentResult);
      setAttachments(attachmentResult);
    } catch (loadError) {
      setError(apiMessage(loadError, "Could not load incident."));
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    const timeout = window.setTimeout(loadIncident, 0);
    return () => window.clearTimeout(timeout);
  }, [loadIncident]);

  const handleUploadAttachment = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const attachment = await uploadIncidentAttachment(id, file);
      setAttachments((current) => [attachment, ...current]);
      toast.success("Attachment uploaded.");
    } catch (uploadError) {
      toast.error(apiMessage(uploadError, "Could not upload attachment."));
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  const handleDeleteAttachment = async (attachmentId) => {
    try {
      await deleteIncidentAttachment(id, attachmentId);
      setAttachments((current) =>
        current.filter((attachment) => attachment._id !== attachmentId),
      );
      toast.success("Attachment deleted.");
    } catch (deleteError) {
      toast.error(apiMessage(deleteError, "Could not delete attachment."));
    }
  };

  const handleAddWorkNote = (event) => {
    event.preventDefault();

    const trimmedNote = noteText.trim();
    if (!trimmedNote) return;

    const nextNote = {
      id: Date.now(),
      author: user?.name || "Service Desk User",
      createdAt: formatTimestamp(),
      note: trimmedNote,
    };

    setWorkNotesByIncident((currentNotes) => {
      const updatedNotes = {
        ...currentNotes,
        [id]: [nextNote, ...(currentNotes[id] ?? [])],
      };
      localStorage.setItem(WORK_NOTES_KEY, JSON.stringify(updatedNotes));
      return updatedNotes;
    });

    setNoteText("");
    setIsAddingNote(false);
    toast.success("Work note added locally.");
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="rounded-lg border border-slate-200 bg-white p-8 text-center text-slate-500">
          Loading incident...
        </div>
      </MainLayout>
    );
  }

  if (error || !incident) {
    return (
      <MainLayout>
        <div className="mb-6 border-b border-slate-200 pb-4">
          <Link to="/incidents" className="text-sm font-medium text-cyan-700">
            Back to incidents
          </Link>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h1 className="text-2xl font-bold">Incident not found</h1>
          <p className="mt-2 text-slate-600">{error || `No incident exists for ${id}.`}</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <PageHeader
        meta="Incident details"
        title={incident.number || incident.id}
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
            <button
              type="button"
              onClick={loadIncident}
              className="flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 transition hover:bg-white"
            >
              <FiRefreshCw />
              Refresh
            </button>
            <div className="flex items-center gap-3 rounded-lg bg-white px-4 py-2 shadow-sm">
              <PriorityBadge priority={incident.priority} />
              <StatusBadge status={incident.status} />
              <StatusBadge status={incident.slaStatus} />
            </div>
          </>
        }
      />

      <div className="mb-6 grid gap-6">
        <DetailCard title="Incident Summary">
          <DetailGrid
            items={[
              { label: "Incident Number", value: incident.number },
              { label: "Title", value: incident.shortDescription },
              { label: "Description", value: incident.description },
              { label: "Category", value: incident.category },
              { label: "Tags", value: incident.tags?.join(", ") },
              { label: "Created By", value: incident.createdBy },
              { label: "Assigned To", value: incident.assignedTo },
              { label: "Status", value: incident.status },
              { label: "Priority", value: incident.priority },
            ]}
          />
        </DetailCard>

        <DetailCard title="Attachments">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-500">
              Upload screenshots, PDFs, logs, and supporting files.
            </p>
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700">
              <FiUpload />
              {isUploading ? "Uploading..." : "Upload file"}
              <input
                type="file"
                className="hidden"
                onChange={handleUploadAttachment}
                disabled={isUploading}
              />
            </label>
          </div>

          <div className="space-y-3">
            {attachments.map((attachment) => (
              <article
                key={attachment._id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                    <FiFile />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{attachment.fileName}</p>
                    <p className="text-sm text-slate-500">
                      {attachment.fileType} · {Math.ceil(attachment.fileSize / 1024)} KB
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={attachment.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    <FiDownload />
                    Open
                  </a>
                  <button
                    type="button"
                    onClick={() => handleDeleteAttachment(attachment._id)}
                    className="flex items-center gap-1 rounded-lg bg-rose-100 px-3 py-2 text-sm font-medium text-rose-800 transition hover:bg-rose-200"
                  >
                    <FiTrash2 />
                    Delete
                  </button>
                </div>
              </article>
            ))}

            {attachments.length === 0 && (
              <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-slate-500">
                No attachments uploaded yet.
              </div>
            )}
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
                onChange={(event) => setNoteText(event.target.value)}
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
    </MainLayout>
  );
};

export default IncidentDetails;
