import { useState } from "react";

const CreateIncidentModal = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    shortDescription: "",
    description: "",
    priority: "Low",
    urgency: "Low",
    status: "Open",
    assignedTo: "",
    createdBy: "",
    createdDate: new Date().toISOString().slice(0, 10),
    sla: "6 Hours",
  });

  const resetForm = () => {
    setFormData({
      shortDescription: "",
      description: "",
      priority: "Low",
      urgency: "Low",
      status: "Open",
      assignedTo: "",
      createdBy: "",
      createdDate: new Date().toISOString().slice(0, 10),
      sla: "6 Hours",
    });
  };

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    onCreate(formData);

    resetForm();

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-xl rounded-xl bg-white p-6">
        <h2 className="mb-4 text-2xl font-bold">Create Incident</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Short Description"
            value={formData.shortDescription}
            onChange={(e) =>
              setFormData({ ...formData, shortDescription: e.target.value })
            }
            className="w-full rounded border p-3"
            required
          />

          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full rounded border p-3"
            rows={4}
          />

          <select
            value={formData.priority}
            onChange={(e) =>
              setFormData({ ...formData, priority: e.target.value })
            }
            className="w-full rounded border p-3"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full rounded border p-3"
          >
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>

          <input
            type="text"
            placeholder="Assigned To"
            value={formData.assignedTo}
            onChange={(e) =>
              setFormData({ ...formData, assignedTo: e.target.value })
            }
            className="w-full rounded border p-3"
          />

          <input
            type="text"
            placeholder="Created By"
            value={formData.createdBy}
            onChange={(e) =>
              setFormData({ ...formData, createdBy: e.target.value })
            }
            className="w-full rounded border p-3"
          />

          <input
            type="text"
            placeholder="SLA"
            value={formData.sla}
            onChange={(e) => setFormData({ ...formData, sla: e.target.value })}
            className="w-full rounded border p-3"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded bg-gray-300 px-4 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-white"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateIncidentModal;
