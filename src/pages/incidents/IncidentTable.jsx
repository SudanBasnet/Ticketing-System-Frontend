import StatusBadge from "../../components/UI/StatusBadge";
import PriorityBadge from "../../components/UI/PriorityBadge";

const IncidentTable = ({ incidents, onDelete, onEdit }) => {
  return (
    <div className="overflow-hidden border-y border-slate-200 bg-white">
      <table className="w-full">
        <thead className="bg-slate-100 text-sm text-slate-600">
          <tr>
            <th className="px-4 py-3 text-left">Number</th>
            <th className="px-4 py-3 text-left">Description</th>
            <th className="px-4 py-3 text-left">Priority</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Assigned To</th>
            <th className="px-4 py-3 text-left">SLA</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {incidents.map((incident) => (
            <tr
              key={incident.id}
              className="border-b border-slate-100 last:border-b-0"
            >
              <td className="w-36 px-4 py-4 font-medium text-slate-900">
                {incident.id}
              </td>

              <td className="px-4 py-4 text-slate-700">
                {incident.shortDescription}
              </td>

              <td className="w-32 px-4 py-4">
                <PriorityBadge priority={incident.priority} />
              </td>

              <td className="w-40 px-4 py-4">
                <StatusBadge status={incident.status} />
              </td>

              <td className="px-4 py-4 text-slate-700">
                {incident.assignedTo}
              </td>

              <td className="px-4 py-4 text-slate-700">{incident.sla}</td>

              <td className="px-4 py-4">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(incident)}
                    className="rounded bg-yellow-500 px-3 py-1 text-sm font-medium text-white transition hover:bg-yellow-600"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete(incident.id)}
                    className="rounded bg-red-600 px-3 py-1 text-sm font-medium text-white transition hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {incidents.length === 0 && (
            <tr>
              <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                No incidents found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default IncidentTable;
