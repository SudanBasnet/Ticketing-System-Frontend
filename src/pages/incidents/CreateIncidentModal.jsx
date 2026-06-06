import { useState } from "react";

import FormField from "../../components/UI/FormField";
import ModalShell from "../../components/UI/ModalShell";
import { calculateIncidentPriority } from "../../utils/incidentPriority";

const createDefaultIncident = () => ({
  ticketType: "Incident",
  shortDescription: "",
  description: "",
  category: "Network",
  subcategory: "",
  caller: "",
  requester: "",
  affectedUser: "",
  department: "",
  contactNumber: "",
  email: "",
  impact: "Low",
  urgency: "Low",
  priority: "P4",
  assignmentGroup: "Service Desk",
  assignedTo: "",
  createdBy: "",
  updatedBy: "",
  createdDate: new Date().toISOString().slice(0, 10),
  status: "New",
  responseSla: "1 Hour",
  resolutionSla: "6 Hours",
  slaStatus: "On Track",
  dueDate: new Date().toISOString().slice(0, 10),
  workNotes: "",
  additionalComments: "",
  resolutionNotes: "",
  rootCause: "",
  resolutionCode: "",
  deviceName: "",
  assetTag: "",
  serialNumber: "",
  location: "",
  configurationItem: "",
  attachments: [],
  source: "Portal",
});

const categories = ["Hardware", "Software", "Network", "Email", "Access Request"];
const impactUrgencyOptions = ["High", "Medium", "Low"];
const assignmentGroups = [
  "Service Desk",
  "Infrastructure",
  "Network Team",
  "Security Team",
];
const statusOptions = [
  "New",
  "Assigned",
  "In Progress",
  "Pending User",
  "Pending Vendor",
  "Resolved",
  "Closed",
  "Cancelled",
];
const slaStatuses = ["On Track", "Warning", "Breached"];

const CreateIncidentModal = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState(createDefaultIncident);

  if (!isOpen) return null;

  const updateField = (field, value) => {
    const nextData = { ...formData, [field]: value };

    if (field === "impact" || field === "urgency") {
      nextData.priority = calculateIncidentPriority(
        nextData.impact,
        nextData.urgency,
      );
    }

    setFormData(nextData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onCreate({
      ...formData,
      attachments:
        typeof formData.attachments === "string"
          ? formData.attachments
              .split(",")
              .map((attachment) => attachment.trim())
              .filter(Boolean)
          : formData.attachments,
    });

    setFormData(createDefaultIncident());
    onClose();
  };

  return (
    <ModalShell
      eyebrow="Incident management"
      title="Create Incident"
      description="Capture the full ITIL incident record, including user impact, assignment, SLA, work tracking, and CI context."
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <section>
          <h3 className="mb-3 text-sm font-bold uppercase text-slate-500">
            Basic information
          </h3>
          <div className="grid gap-4">
            <FormField label="Short description">
              <input
                value={formData.shortDescription}
                onChange={(e) => updateField("shortDescription", e.target.value)}
                placeholder="Outlook not opening"
                className={FormField.controlClasses}
                required
              />
            </FormField>

            <FormField label="Detailed description">
              <textarea
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="User cannot launch Outlook after update..."
                className={FormField.controlClasses}
                rows={4}
              />
            </FormField>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Category">
                <select
                  value={formData.category}
                  onChange={(e) => updateField("category", e.target.value)}
                  className={FormField.controlClasses}
                >
                  {categories.map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
              </FormField>

              <FormField label="Subcategory">
                <input
                  value={formData.subcategory}
                  onChange={(e) => updateField("subcategory", e.target.value)}
                  placeholder="VPN, Outlook, Printer..."
                  className={FormField.controlClasses}
                />
              </FormField>
            </div>
          </div>
        </section>

        <section>
          <h3 className="mb-3 text-sm font-bold uppercase text-slate-500">
            User information
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["caller", "Caller / Requester"],
              ["affectedUser", "Affected user"],
              ["department", "Department"],
              ["contactNumber", "Contact number"],
              ["email", "Email"],
              ["requester", "Requester email"],
            ].map(([field, label]) => (
              <FormField key={field} label={label}>
                <input
                  value={
                    Array.isArray(formData[field])
                      ? formData[field].join(", ")
                      : formData[field]
                  }
                  onChange={(e) => updateField(field, e.target.value)}
                  className={FormField.controlClasses}
                />
              </FormField>
            ))}
          </div>
        </section>

        <section>
          <h3 className="mb-3 text-sm font-bold uppercase text-slate-500">
            Priority management
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            <FormField label="Impact">
              <select
                value={formData.impact}
                onChange={(e) => updateField("impact", e.target.value)}
                className={FormField.controlClasses}
              >
                {impactUrgencyOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </FormField>

            <FormField label="Urgency">
              <select
                value={formData.urgency}
                onChange={(e) => updateField("urgency", e.target.value)}
                className={FormField.controlClasses}
              >
                {impactUrgencyOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </FormField>

            <FormField label="Calculated priority" hint="Auto-calculated from impact and urgency.">
              <input
                value={formData.priority}
                className={`${FormField.controlClasses} font-bold text-rose-700`}
                readOnly
              />
            </FormField>
          </div>
        </section>

        <section>
          <h3 className="mb-3 text-sm font-bold uppercase text-slate-500">
            Assignment and status
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            <FormField label="Assignment group">
              <select
                value={formData.assignmentGroup}
                onChange={(e) => updateField("assignmentGroup", e.target.value)}
                className={FormField.controlClasses}
              >
                {assignmentGroups.map((group) => (
                  <option key={group}>{group}</option>
                ))}
              </select>
            </FormField>

            <FormField label="Assigned to">
              <input
                value={formData.assignedTo}
                onChange={(e) => updateField("assignedTo", e.target.value)}
                className={FormField.controlClasses}
              />
            </FormField>

            <FormField label="Status">
              <select
                value={formData.status}
                onChange={(e) => updateField("status", e.target.value)}
                className={FormField.controlClasses}
              >
                {statusOptions.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </FormField>

            <FormField label="Created by">
              <input
                value={formData.createdBy}
                onChange={(e) => updateField("createdBy", e.target.value)}
                className={FormField.controlClasses}
              />
            </FormField>

            <FormField label="Updated by">
              <input
                value={formData.updatedBy}
                onChange={(e) => updateField("updatedBy", e.target.value)}
                className={FormField.controlClasses}
              />
            </FormField>

            <FormField label="Created date">
              <input
                type="date"
                value={formData.createdDate}
                onChange={(e) => updateField("createdDate", e.target.value)}
                className={FormField.controlClasses}
              />
            </FormField>
          </div>
        </section>

        <section>
          <h3 className="mb-3 text-sm font-bold uppercase text-slate-500">
            SLA information
          </h3>
          <div className="grid gap-4 md:grid-cols-4">
            <FormField label="Response SLA">
              <input
                value={formData.responseSla}
                onChange={(e) => updateField("responseSla", e.target.value)}
                className={FormField.controlClasses}
              />
            </FormField>
            <FormField label="Resolution SLA">
              <input
                value={formData.resolutionSla}
                onChange={(e) => updateField("resolutionSla", e.target.value)}
                className={FormField.controlClasses}
              />
            </FormField>
            <FormField label="SLA status">
              <select
                value={formData.slaStatus}
                onChange={(e) => updateField("slaStatus", e.target.value)}
                className={FormField.controlClasses}
              >
                {slaStatuses.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </FormField>
            <FormField label="Due date">
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => updateField("dueDate", e.target.value)}
                className={FormField.controlClasses}
              />
            </FormField>
          </div>
        </section>

        <section>
          <h3 className="mb-3 text-sm font-bold uppercase text-slate-500">
            Work tracking and resolution
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["workNotes", "Work notes (internal)"],
              ["additionalComments", "Additional comments"],
              ["resolutionNotes", "Resolution notes"],
              ["rootCause", "Root cause"],
            ].map(([field, label]) => (
              <FormField key={field} label={label}>
                <textarea
                  value={formData[field]}
                  onChange={(e) => updateField(field, e.target.value)}
                  className={FormField.controlClasses}
                  rows={3}
                />
              </FormField>
            ))}
            <FormField label="Resolution code">
              <input
                value={formData.resolutionCode}
                onChange={(e) => updateField("resolutionCode", e.target.value)}
                className={FormField.controlClasses}
              />
            </FormField>
          </div>
        </section>

        <section>
          <h3 className="mb-3 text-sm font-bold uppercase text-slate-500">
            Asset and attachments
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["deviceName", "Device name"],
              ["assetTag", "Asset tag"],
              ["serialNumber", "Serial number"],
              ["location", "Location"],
              ["configurationItem", "Configuration item (CI)"],
              ["attachments", "Attachments"],
            ].map(([field, label]) => (
              <FormField
                key={field}
                label={label}
                hint={field === "attachments" ? "Comma-separated filenames for now." : ""}
              >
                <input
                  value={formData[field]}
                  onChange={(e) => updateField(field, e.target.value)}
                  className={FormField.controlClasses}
                />
              </FormField>
            ))}
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
            Create Incident
          </button>
        </div>
      </form>
    </ModalShell>
  );
};

export default CreateIncidentModal;
