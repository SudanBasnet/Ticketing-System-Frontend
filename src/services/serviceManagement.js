import { api } from "./api";

export const titleCase = (value) => String(value || "").replace(/_/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
export const mapRecord = (record) => ({ ...record, id: record._id, statusLabel: titleCase(record.status), priorityLabel: titleCase(record.priority), ownerName: record.owner?.name || "Unassigned", requesterName: record.requestedBy?.name || "—" });

export const listRecords = async (type, params = {}) => {
  const response = await api.get(`/service-management/${type}`, { params });
  return { records: response.data.data.map(mapRecord), meta: response.data.meta };
};
export const createRecord = async (type, record) => {
  const response = await api.post(`/service-management/${type}`, record);
  return mapRecord(response.data.data.record);
};
export const updateRecord = async (type, id, changes) => {
  const response = await api.patch(`/service-management/${type}/${id}`, changes);
  return mapRecord(response.data.data.record);
};
export const deleteRecord = (type, id) => api.delete(`/service-management/${type}/${id}`);
export const getServiceOverview = async () => (await api.get("/service-management/overview")).data.data;

export const exportRecordsCsv = (records, filename) => {
  const columns = ["number", "title", "statusLabel", "priorityLabel", "category", "ownerName", "updatedAt"];
  const csv = [columns.join(","), ...records.map((record) => columns.map((column) => `"${String(record[column] || "").replace(/"/g, '""')}"`).join(","))].join("\n");
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
};
