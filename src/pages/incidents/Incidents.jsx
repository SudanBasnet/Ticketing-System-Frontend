import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

import { FiPlus, FiSearch } from "react-icons/fi";

import MainLayout from "../../Layouts/MainLayout";
import IncidentTable from "./IncidentTable";
import CreateIncidentModal from "./CreateIncidentModal";
import EditIncidentModal from "./EditIncidentModal";
import PageHeader from "../../components/UI/PageHeader";

import { apiMessage } from "../../services/api";
import {
  createIncident,
  deleteIncident,
  listIncidents,
  updateIncident,
} from "../../services/incidents";

const Incidents = () => {
  const [search, setSearch] = useState("");

  const [incidents, setIncidents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [incidentToEdit, setIncidentToEdit] = useState(null);

  useEffect(() => {
    const loadIncidents = async () => {
      setIsLoading(true);
      setLoadError("");
      try {
        const result = await listIncidents({ search });
        setIncidents(result.incidents);
      } catch (error) {
        setLoadError(apiMessage(error, "Could not load incidents."));
      } finally {
        setIsLoading(false);
      }
    };

    const timeout = window.setTimeout(loadIncidents, 250);
    return () => window.clearTimeout(timeout);
  }, [search]);

  const handleCreateIncident = async (incidentDetails) => {
    try {
      const newIncident = await createIncident(incidentDetails);
      setIncidents((currentIncidents) => [newIncident, ...currentIncidents]);
      toast.success(`${newIncident.number || newIncident.id} created.`);
    } catch (error) {
      toast.error(apiMessage(error, "Could not create incident."));
    }
  };

  const handleUpdateIncident = async (updatedIncident) => {
    try {
      const savedIncident = await updateIncident(updatedIncident);
      setIncidents((currentIncidents) =>
        currentIncidents.map((incident) =>
          incident.id === savedIncident.id ? savedIncident : incident,
        ),
      );
      toast.success(`${savedIncident.number || savedIncident.id} updated.`);
    } catch (error) {
      toast.error(apiMessage(error, "Could not update incident."));
    }
  };

  const handleDeleteIncident = async (incidentId) => {
    try {
      await deleteIncident(incidentId);
      setIncidents((currentIncidents) =>
        currentIncidents.filter((incident) => incident.id !== incidentId),
      );
      toast.success("Incident deleted.");
    } catch (error) {
      toast.error(apiMessage(error, "Only admins can delete incidents."));
    }
  };

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

        {loadError && (
          <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
            {loadError}
          </div>
        )}

        {isLoading ? (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
            Loading incidents...
          </div>
        ) : (
          <IncidentTable
            incidents={incidents}
            onDelete={handleDeleteIncident}
            onEdit={setIncidentToEdit}
          />
        )}
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
