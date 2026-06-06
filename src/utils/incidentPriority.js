const priorityMatrix = {
  High: {
    High: "P1",
    Medium: "P2",
    Low: "P3",
  },
  Medium: {
    High: "P2",
    Medium: "P3",
    Low: "P4",
  },
  Low: {
    High: "P3",
    Medium: "P4",
    Low: "P4",
  },
};

export const calculateIncidentPriority = (impact, urgency) =>
  priorityMatrix[impact]?.[urgency] || "P4";

export const normalizeIncidentPriority = (incident) => ({
  ...incident,
  priority: calculateIncidentPriority(incident.impact, incident.urgency),
});
