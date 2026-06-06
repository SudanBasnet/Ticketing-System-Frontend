import { useState } from "react";

import MainLayout from "../../Layouts/MainLayout";
import IncidentTable from "./IncidentTable";
import CreateIncidentModal from "./CreateIncidentModal";
import EditIncidentModal from "./EditIncidentModal";

import { incidents as initialIncidents } from "../../data/incidents";

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

    setIncidents((currentIncidents) => [newIncident, ...currentIncidents]);
  };

  const handleUpdateIncident = (updatedIncident) => {
    setIncidents((currentIncidents) =>
      currentIncidents.map((incident) =>
        incident.id === updatedIncident.id ? updatedIncident : incident,
      ),
    );
  };

  const handleDeleteIncident = (incidentId) => {
    setIncidents((currentIncidents) =>
      currentIncidents.filter((incident) => incident.id !== incidentId),
    );
  };

  const filteredIncidents = incidents.filter((incident) =>
    [
      incident.id,
      incident.shortDescription,
      incident.priority,
      incident.status,
      incident.assignedTo,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <MainLayout>
      <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-bold">Incidents</h1>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
        >
          Create Incident
        </button>
      </div>

      <input
        type="text"
        placeholder="Search incidents..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full rounded-lg border p-3"
      />

      <IncidentTable
        incidents={filteredIncidents}
        onDelete={handleDeleteIncident}
        onEdit={setIncidentToEdit}
      />

      <CreateIncidentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateIncident}
      />

      <EditIncidentModal
        key={incidentToEdit?.id ?? "new-edit"}
        isOpen={Boolean(incidentToEdit)}
        incident={incidentToEdit}
        onClose={() => setIncidentToEdit(null)}
        onUpdate={handleUpdateIncident}
      />
    </MainLayout>
  );
};

export default Incidents;
