import { useState } from "react";
import { FiEdit2, FiPlus, FiSearch, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";

import MainLayout from "../Layouts/MainLayout";
import FormField from "../components/UI/FormField";
import ModalShell from "../components/UI/ModalShell";
import PageHeader from "../components/UI/PageHeader";
import PriorityBadge from "../components/UI/PriorityBadge";
import StatusBadge from "../components/UI/StatusBadge";
import { requests as initialRequests } from "../data/requests";

const emptyRequest = {
  title: "",
  category: "Access",
  requester: "",
  status: "Submitted",
  priority: "Medium",
  dueDate: "",
};

const getNextRequestId = (requests) => {
  const highestNumber = requests.reduce((highest, request) => {
    const requestNumber = Number(request.id.replace("REQ", ""));

    return Number.isNaN(requestNumber)
      ? highest
      : Math.max(highest, requestNumber);
  }, 0);

  return `REQ${String(highestNumber + 1).padStart(6, "0")}`;
};

const RequestModal = ({ mode, request, onClose, onSave }) => {
  const [formData, setFormData] = useState(request ?? emptyRequest);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <ModalShell
      eyebrow="Service catalog"
      title={mode === "edit" ? "Edit Request" : "Create Request"}
      description="Capture the request, classify the service need, and set the target fulfillment date."
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <section>
          <h3 className="mb-3 text-sm font-bold uppercase text-slate-500">
            Request details
          </h3>
          <div className="grid gap-4">
            <FormField label="Request title">
              <input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="New laptop for design team"
                className={FormField.controlClasses}
                required
              />
            </FormField>
          </div>
        </section>

        <section>
          <h3 className="mb-3 text-sm font-bold uppercase text-slate-500">
            Classification
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Category">
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className={FormField.controlClasses}
              >
                <option>Access</option>
                <option>Hardware</option>
                <option>Software</option>
                <option>Network</option>
              </select>
            </FormField>

            <FormField label="Status">
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className={FormField.controlClasses}
              >
                <option>Submitted</option>
                <option>Pending</option>
                <option>Approved</option>
                <option>Fulfilled</option>
              </select>
            </FormField>
          </div>
        </section>

        <section>
          <h3 className="mb-3 text-sm font-bold uppercase text-slate-500">
            Requester and target
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            <FormField label="Requester" className="md:col-span-1">
              <input
                value={formData.requester}
                onChange={(e) =>
                  setFormData({ ...formData, requester: e.target.value })
                }
                placeholder="Requester name"
                className={FormField.controlClasses}
                required
              />
            </FormField>

            <FormField label="Priority">
              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value })
                }
                className={FormField.controlClasses}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </FormField>

            <FormField label="Due date">
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
                className={FormField.controlClasses}
                required
              />
            </FormField>
          </div>
        </section>

        <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-slate-950 px-4 py-2 font-medium text-white transition hover:-translate-y-0.5 hover:bg-cyan-700 hover:shadow-lg"
            >
              Save Request
            </button>
        </div>
      </form>
    </ModalShell>
  );
};

const Requests = () => {
  const [requests, setRequests] = useState(initialRequests);
  const [search, setSearch] = useState("");
  const [modalMode, setModalMode] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const filteredRequests = requests.filter((request) =>
    [
      request.id,
      request.title,
      request.category,
      request.requester,
      request.status,
      request.priority,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const handleCreate = (requestDetails) => {
    const requestId = getNextRequestId(requests);

    setRequests((currentRequests) => [
      {
        id: requestId,
        ...requestDetails,
      },
      ...currentRequests,
    ]);
    toast.success(`${requestId} created.`);
  };

  const handleUpdate = (updatedRequest) => {
    setRequests((currentRequests) =>
      currentRequests.map((request) =>
        request.id === updatedRequest.id ? updatedRequest : request,
      ),
    );
    toast.success(`${updatedRequest.id} updated.`);
  };

  const openCreateModal = () => {
    setSelectedRequest(null);
    setModalMode("create");
  };

  const openEditModal = (request) => {
    setSelectedRequest(request);
    setModalMode("edit");
  };

  return (
    <MainLayout>
      <PageHeader
        meta="Service catalog"
        title="Requests"
        description="Manage employee service requests from submission through approval and fulfillment."
        actions={
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2 font-medium text-white transition hover:bg-cyan-700"
          >
            <FiPlus />
            Create Request
          </button>
        }
      />

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-4 grid gap-4 lg:grid-cols-[1fr_auto]">
          <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3">
            <FiSearch className="text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search requests by number, requester, category, or status"
              className="w-full bg-transparent py-3 outline-none"
            />
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg bg-cyan-50 px-4 py-2">
              <p className="text-xs text-cyan-700">Total</p>
              <p className="font-bold text-cyan-950">{requests.length}</p>
            </div>
            <div className="rounded-lg bg-amber-50 px-4 py-2">
              <p className="text-xs text-amber-700">Pending</p>
              <p className="font-bold text-amber-950">
                {requests.filter((request) => request.status === "Pending").length}
              </p>
            </div>
            <div className="rounded-lg bg-emerald-50 px-4 py-2">
              <p className="text-xs text-emerald-700">Approved</p>
              <p className="font-bold text-emerald-950">
                {requests.filter((request) => request.status === "Approved").length}
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full">
            <thead className="bg-slate-950 text-sm text-white">
              <tr>
                <th className="px-4 py-3 text-left">Number</th>
                <th className="px-4 py-3 text-left">Request</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Requester</th>
                <th className="px-4 py-3 text-left">Priority</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Due</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => (
                <tr
                  key={request.id}
                  className="border-b border-slate-100 transition last:border-b-0 hover:bg-slate-50"
                >
                  <td className="px-4 py-4 font-semibold text-cyan-700">
                    {request.id}
                  </td>
                  <td className="px-4 py-4 text-slate-800">{request.title}</td>
                  <td className="px-4 py-4 text-slate-600">
                    {request.category}
                  </td>
                  <td className="px-4 py-4 text-slate-600">
                    {request.requester}
                  </td>
                  <td className="px-4 py-4">
                    <PriorityBadge priority={request.priority} />
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={request.status} />
                  </td>
                  <td className="px-4 py-4 text-slate-600">
                    {request.dueDate}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(request)}
                        className="flex items-center gap-1 rounded-lg bg-amber-100 px-3 py-2 text-sm font-medium text-amber-800 transition hover:bg-amber-200"
                      >
                        <FiEdit2 />
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          setRequests((currentRequests) => {
                            toast.success(`${request.id} deleted.`);

                            return currentRequests.filter(
                              (item) => item.id !== request.id,
                            );
                          })
                        }
                        className="flex items-center gap-1 rounded-lg bg-rose-100 px-3 py-2 text-sm font-medium text-rose-800 transition hover:bg-rose-200"
                      >
                        <FiTrash2 />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredRequests.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-8 text-center text-slate-500"
                  >
                    No requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {modalMode && (
        <RequestModal
          key={selectedRequest?.id ?? "create-request"}
          mode={modalMode}
          request={selectedRequest}
          onClose={() => setModalMode(null)}
          onSave={modalMode === "edit" ? handleUpdate : handleCreate}
        />
      )}
    </MainLayout>
  );
};

export default Requests;
