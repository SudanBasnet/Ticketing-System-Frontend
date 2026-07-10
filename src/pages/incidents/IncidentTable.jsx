import { Link } from "react-router-dom";
import { FiEdit2, FiInbox, FiTrash2 } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

import StatusBadge from "../../components/UI/StatusBadge";
import PriorityBadge from "../../components/UI/PriorityBadge";
import EmptyState from "../../components/UI/EmptyState";

const IncidentTable = ({ incidents, onDelete, onEdit }) => {
  if (incidents.length === 0) {
    return (
      <EmptyState
        icon={<FiInbox />}
        title="No incidents found"
        description="Create a new incident or adjust your search to see live API records here."
      />
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="w-full min-w-[980px]">
        <thead className="bg-slate-950 text-sm text-white">
          <tr>
            <th className="px-4 py-3 text-left">Number</th>
            <th className="px-4 py-3 text-left">Incident</th>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-left">Priority</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Owner</th>
            <th className="px-4 py-3 text-left">SLA Status</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>

        <motion.tbody layout>
          <AnimatePresence initial={false}>
          {incidents.map((incident) => (
            <motion.tr
              key={incident.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.18 }}
              className="border-b border-slate-100 transition last:border-b-0 hover:bg-slate-50"
            >
              <td className="p-4">
                <Link
                  to={`/incidents/${incident.id}`}
                  className="font-semibold text-cyan-700 hover:underline"
                >
                  {incident.number || incident.id}
                </Link>
              </td>

              <td className="max-w-sm px-4 py-4 text-slate-700">
                <p className="font-medium text-slate-950">
                  {incident.shortDescription}
                </p>
                <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                  {incident.description || "No description provided"}
                </p>
              </td>

              <td className="px-4 py-4 text-slate-700">
                <div>
                  <p className="font-medium">{incident.category}</p>
                  {incident.subcategory && (
                    <p className="text-sm text-slate-500">
                      {incident.subcategory}
                    </p>
                  )}
                </div>
              </td>

              <td className="w-32 px-4 py-4">
                <PriorityBadge priority={incident.priority} />
              </td>

              <td className="w-40 px-4 py-4">
                <StatusBadge status={incident.status} />
              </td>

              <td className="px-4 py-4 text-slate-700">
                <p className="font-medium">
                  {incident.assignedTo || "Unassigned"}
                </p>
                <p className="text-sm text-slate-500">
                  {incident.assignmentGroup}
                </p>
              </td>

              <td className="px-4 py-4">
                <StatusBadge status={incident.slaStatus} />
              </td>

              <td className="px-4 py-4">
                <div className="flex gap-2">
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    type="button"
                    onClick={() => onEdit(incident)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 text-amber-800 transition hover:bg-amber-200"
                    title="Edit incident"
                    aria-label="Edit incident"
                  >
                    <FiEdit2 />
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    type="button"
                    onClick={() => onDelete(incident.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-100 text-rose-800 transition hover:bg-rose-200"
                    title="Delete incident"
                    aria-label="Delete incident"
                  >
                    <FiTrash2 />
                  </motion.button>
                </div>
              </td>
            </motion.tr>
          ))}
          </AnimatePresence>
        </motion.tbody>
      </table>
    </div>
  );
};

export default IncidentTable;
