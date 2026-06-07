import { useState } from "react";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

import { FiPlus, FiSearch } from "react-icons/fi";

import MainLayout from "../../Layouts/MainLayout";
import IncidentTable from "./IncidentTable";
import CreateIncidentModal from "./CreateIncidentModal";
import EditIncidentModal from "./EditIncidentModal";
import PageHeader from "../../components/UI/PageHeader";

import { incidents as initialIncidents } from "../../data/incidents";
import { normalizeIncidentPriority } from "../../utils/incidentPriority";

const getNextIncidentId = (incidents) => {
  const highestNumber = incidents.reduce((highest, incident) => {
    const incidentNumber = Number(incident.id.replace("INC", ""));

    return Number.isNaN(incidentNumber)
      ? highest
      : Math.max(highest, incidentNumber);
  }, 0);

  return `INC${String(highestNumber + 1).padStart(6, "0")}`;
};

const Incidents = () => {
  const [search, setSearch] = useState("");

  const [incidents, setIncidents] = useState(initialIncidents);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [incidentToEdit, setIncidentToEdit] = useState(null);

  const handleCreateIncident = (incidentDetails) => {
    const newIncident = {
      id: getNextIncidentId(incidents),
      ...incidentDetails,
    };

    setIncidents((currentIncidents) => [
      normalizeIncidentPriority(newIncident),
      ...currentIncidents,
    ]);
    toast.success(`${newIncident.id} created.`);
  };

  const handleUpdateIncident = (updatedIncident) => {
    const normalizedIncident = normalizeIncidentPriority(updatedIncident);

    setIncidents((currentIncidents) =>
      currentIncidents.map((incident) =>
        incident.id === normalizedIncident.id ? normalizedIncident : incident,
      ),
    );
    toast.success(`${normalizedIncident.id} updated.`);
  };

  const handleDeleteIncident = (incidentId) => {
    setIncidents((currentIncidents) =>
      currentIncidents.filter((incident) => incident.id !== incidentId),
    );
    toast.success(`${incidentId} deleted.`);
  };

  const filteredIncidents = incidents.filter((incident) =>
    [
      incident.id,
      incident.shortDescription,
      incident.priority,
      incident.status,
      incident.assignedTo,
      incident.category,
      incident.subcategory,
      incident.assignmentGroup,
      incident.caller,
      incident.affectedUser,
      incident.slaStatus,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <MainLayout>
      <PageHeader
        meta="Incident management"
        title="Incidents"
        description="Capture, triage, and track service disruptions from first report through resolution."
        actions={
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2 font-medium text-white transition hover:bg-cyan-700"
          >
            <FiPlus />
            Create Incident
          </motion.button>
        }
      />

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3">
          <FiSearch className="text-slate-400" />
          <input
            type="text"
            placeholder="Search by number, description, status, priority, or assignee"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent py-3 outline-none"
          />
        </div>

        <IncidentTable
          incidents={filteredIncidents}
          onDelete={handleDeleteIncident}
          onEdit={setIncidentToEdit}
        />
      </section>

      <AnimatePresence>
        {isCreateModalOpen && (
          <CreateIncidentModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onCreate={handleCreateIncident}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {incidentToEdit && (
          <EditIncidentModal
            key={incidentToEdit.id}
            isOpen={Boolean(incidentToEdit)}
            incident={incidentToEdit}
            onClose={() => setIncidentToEdit(null)}
            onUpdate={handleUpdateIncident}
          />
        )}
      </AnimatePresence>
    </MainLayout>
  );
};

export default Incidents;
