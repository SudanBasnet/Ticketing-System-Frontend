import { useState } from "react";

const EditIncidentModal = ({ isOpen, incident, onClose, onUpdate }) => {
  const [formData, setFormData] = useState(() => incident ?? {});

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdate(formData);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-xl rounded-xl bg-white p-6">
        <h2 className="mb-4 text-2xl font-bold">Edit Incident</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={formData.shortDescription || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                shortDescription: e.target.value,
              })
            }
            className="w-full rounded border p-3"
            required
          />

          <textarea
            value={formData.description || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
            className="w-full rounded border p-3"
            rows={4}
          />

          <select
            value={formData.priority || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                priority: e.target.value,
              })
            }
            className="w-full rounded border p-3"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <select
            value={formData.status || "Open"}
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.value,
              })
            }
            className="w-full rounded border p-3"
          >
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>

          <input
            value={formData.assignedTo || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                assignedTo: e.target.value,
              })
            }
            className="w-full rounded border p-3"
            placeholder="Assigned To"
          />

          <input
            value={formData.sla || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                sla: e.target.value,
              })
            }
            className="w-full rounded border p-3"
            placeholder="SLA"
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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditIncidentModal;
