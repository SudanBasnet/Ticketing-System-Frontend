import { api } from "./api";

const priorityToApi = (priority) => {
  const normalized = String(priority || "").toLowerCase();
  if (normalized.includes("p1") || normalized.includes("urgent")) return "urgent";
  if (normalized.includes("p2") || normalized.includes("high")) return "high";
  if (normalized.includes("p3") || normalized.includes("medium")) return "medium";
  return "low";
};

const statusToApi = (status) => {
  const normalized = String(status || "").toLowerCase();
  if (normalized.includes("progress") || normalized.includes("assigned")) return "in_progress";
  if (normalized.includes("resolved")) return "resolved";
  if (normalized.includes("closed") || normalized.includes("cancelled")) return "closed";
  return "open";
};

const titleCase = (value) =>
  String(value || "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const priorityFromApi = (priority) => {
  const labels = {
    urgent: "Critical",
    high: "High",
    medium: "Medium",
    low: "Low",
  };
  return labels[priority] || titleCase(priority) || "Low";
};

const statusFromApi = (status) => {
  const labels = {
    open: "Open",
    in_progress: "In Progress",
    resolved: "Resolved",
    closed: "Closed",
  };
  return labels[status] || titleCase(status) || "Open";
};

export const mapIncidentFromApi = (incident) => ({
  id: incident._id,
  number: incident.number,
  shortDescription: incident.title,
  description: incident.description,
  category: incident.category || "General",
  subcategory: incident.tags?.join(", ") || "",
  priority: priorityFromApi(incident.priority),
  status: statusFromApi(incident.status),
  assignmentGroup: incident.assignedTo ? "Assigned Queue" : "Unassigned",
  assignedTo: incident.assignedTo?.name || "",
  slaStatus: incident.status === "closed" ? "Closed" : "On Track",
  createdBy: incident.createdBy?.name || "",
  tags: incident.tags || [],
  createdAt: incident.createdAt,
  updatedAt: incident.updatedAt,
  lastActivityAt: incident.lastActivityAt,
  closedAt: incident.closedAt,
});

export const mapIncidentToApi = (incident) => ({
  title: incident.shortDescription || incident.title,
  description: incident.description || incident.shortDescription || "No description provided",
  priority: priorityToApi(incident.priority),
  status: incident.status ? statusToApi(incident.status) : undefined,
  category: incident.category,
  tags: [
    ...(incident.subcategory ? [incident.subcategory] : []),
    ...(Array.isArray(incident.tags) ? incident.tags : []),
  ].filter(Boolean),
});

export const listIncidents = async ({ search = "" } = {}) => {
  const response = await api.get("/incidents", {
    params: {
      search: search || undefined,
      sort: "-lastActivityAt",
    },
  });
  return {
    incidents: response.data.data.map(mapIncidentFromApi),
    meta: response.data.meta,
  };
};

export const getIncident = async (incidentId) => {
  const response = await api.get(`/incidents/${incidentId}`);
  return mapIncidentFromApi(response.data.data.incident);
};

export const createIncident = async (incident) => {
  const response = await api.post("/incidents", mapIncidentToApi(incident));
  return mapIncidentFromApi(response.data.data.incident);
};

export const updateIncident = async (incident) => {
  const response = await api.patch(`/incidents/${incident.id}`, mapIncidentToApi(incident));
  return mapIncidentFromApi(response.data.data.incident);
};

export const deleteIncident = async (incidentId) => {
  await api.delete(`/incidents/${incidentId}`);
};

export const listIncidentAttachments = async (incidentId) => {
  const response = await api.get(`/incidents/${incidentId}/attachments`);
  return response.data.data;
};

export const uploadIncidentAttachment = async (incidentId, file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post(`/incidents/${incidentId}/attachments`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data.data.attachment;
};

export const deleteIncidentAttachment = async (incidentId, attachmentId) => {
  await api.delete(`/incidents/${incidentId}/attachments/${attachmentId}`);
};
