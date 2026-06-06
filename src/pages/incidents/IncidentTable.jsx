import { Link } from "react-router-dom";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

import StatusBadge from "../../components/UI/StatusBadge";
import PriorityBadge from "../../components/UI/PriorityBadge";

const IncidentTable = ({ incidents, onDelete, onEdit }) => {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <table className="w-full">
        <thead className="bg-slate-950 text-sm text-white">
          <tr>
            <th className="px-4 py-3 text-left">Number</th>
            <th className="px-4 py-3 text-left">Description</th>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-left">Priority</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Assignment Group</th>
            <th className="px-4 py-3 text-left">Assigned To</th>
            <th className="px-4 py-3 text-left">SLA Status</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {incidents.map((incident) => (
            <tr
              key={incident.id}
              className="border-b border-slate-100 transition last:border-b-0 hover:bg-slate-50"
            >
              <td className="p-4">
                <Link
                  to={`/incidents/${incident.id}`}
                  className="font-semibold text-cyan-700 hover:underline"
                >
                  {incident.id}
                </Link>
              </td>

              <td className="px-4 py-4 text-slate-700">
                {incident.shortDescription}
              </td>

              <td className="px-4 py-4 text-slate-700">
                <div>
                  <p className="font-medium">{incident.category}</p>
                  <p className="text-sm text-slate-500">
                    {incident.subcategory}
                  </p>
                </div>
              </td>

              <td className="w-32 px-4 py-4">
                <PriorityBadge priority={incident.priority} />
              </td>

              <td className="w-40 px-4 py-4">
                <StatusBadge status={incident.status} />
              </td>

              <td className="px-4 py-4 text-slate-700">
                {incident.assignmentGroup}
              </td>

              <td className="px-4 py-4 text-slate-700">
                {incident.assignedTo}
              </td>

              <td className="px-4 py-4">
                <StatusBadge status={incident.slaStatus} />
              </td>

              <td className="px-4 py-4">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(incident)}
                    className="flex items-center gap-1 rounded-lg bg-amber-100 px-3 py-2 text-sm font-medium text-amber-800 transition hover:bg-amber-200"
                  >
                    <FiEdit2 />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete(incident.id)}
                    className="flex items-center gap-1 rounded-lg bg-rose-100 px-3 py-2 text-sm font-medium text-rose-800 transition hover:bg-rose-200"
                  >
                    <FiTrash2 />
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {incidents.length === 0 && (
            <tr>
              <td colSpan={9} className="px-4 py-8 text-center text-slate-500">
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
