import { useState } from "react";
import FormField from "../../components/UI/FormField";
import ModalShell from "../../components/UI/ModalShell";
import Spinner from "../../components/UI/Spinner";

const emptyForm = { shortDescription: "", description: "" };

const CreateIncidentModal = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState(emptyForm);
  const [isSaving, setIsSaving] = useState(false);
  if (!isOpen) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    const saved = await onCreate({ ...formData, priority: "P4", category: "General" });
    setIsSaving(false);
    if (saved) {
      setFormData(emptyForm);
      onClose();
    }
  };

  return (
    <ModalShell eyebrow="Customer support" title="Report an issue" description="Tell us what went wrong and our support team will review your ticket." onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormField label="Issue">
          <input value={formData.shortDescription} onChange={(event) => setFormData((current) => ({ ...current, shortDescription: event.target.value }))} placeholder="Briefly describe the issue" minLength={3} maxLength={160} className={FormField.controlClasses} required />
        </FormField>
        <FormField label="Description">
          <textarea value={formData.description} onChange={(event) => setFormData((current) => ({ ...current, description: event.target.value }))} placeholder="Include what happened and what you expected" rows={6} minLength={3} maxLength={5000} className={FormField.controlClasses} required />
        </FormField>
        <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
          <button type="button" onClick={onClose} className="rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700">Cancel</button>
          <button type="submit" disabled={isSaving} className="rounded-lg bg-slate-950 px-5 py-2 font-medium text-white disabled:cursor-wait disabled:opacity-60">{isSaving ? <Spinner size="sm" label="Submitting..." /> : "Submit issue"}</button>
        </div>
      </form>
    </ModalShell>
  );
};

export default CreateIncidentModal;
