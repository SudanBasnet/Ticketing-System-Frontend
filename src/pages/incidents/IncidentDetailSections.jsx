export const DetailCard = ({ title, children }) => (
  <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
    <h2 className="mb-4 text-xl font-semibold">{title}</h2>
    {children}
  </section>
);

export const DetailGrid = ({ items }) => (
  <dl className="grid gap-4 md:grid-cols-2">
    {items.map(({ label, value }) => (
      <div key={label}>
        <dt className="text-sm font-medium text-slate-500">{label}</dt>
        <dd className="mt-1 text-slate-900">{value || "Not provided"}</dd>
      </div>
    ))}
  </dl>
);

export const WorkNoteColumn = ({
  title,
  description,
  notes,
  emptyMessage,
  tone,
}) => {
  const styles = {
    customer: {
      container: "border-cyan-200 bg-cyan-50/60",
      heading: "text-cyan-950",
      description: "text-cyan-700",
      note: "border-cyan-100",
      empty: "border-cyan-200 text-cyan-800",
    },
    internal: {
      container: "border-amber-200 bg-amber-50/70",
      heading: "text-amber-950",
      description: "text-amber-700",
      note: "border-amber-200",
      empty: "border-amber-300 text-amber-800",
    },
  }[tone];

  return (
    <div className={`rounded-lg border p-4 ${styles.container}`}>
      <div className="mb-4">
        <h3 className={`font-semibold ${styles.heading}`}>{title}</h3>
        <p className={`text-sm ${styles.description}`}>{description}</p>
      </div>

      <div className="space-y-3">
        {notes.map((workNote) => (
          <article
            key={workNote._id}
            className={`rounded-lg border bg-white p-4 ${styles.note}`}
          >
            <div className="mb-2 flex items-center justify-between gap-4">
              <p className="font-medium text-slate-900">
                {workNote.authorId?.name || "Support team"}
              </p>
              <time className="text-xs text-slate-500">
                {new Date(workNote.createdAt).toLocaleString()}
              </time>
            </div>
            <p className="text-slate-700">{workNote.note}</p>
          </article>
        ))}

        {notes.length === 0 && (
          <p className={`rounded-lg border border-dashed p-4 text-sm ${styles.empty}`}>
            {emptyMessage}
          </p>
        )}
      </div>
    </div>
  );
};
