export function TutorChecks() {
  return <ul aria-label="Tutor checks" className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-emerald-900">
    {["DBS checked", "Safeguarding trained"].map(label => <li key={label} className="rounded-full bg-emerald-50 px-3 py-2 ring-1 ring-inset ring-emerald-200"><span aria-hidden="true">✓ </span>{label}</li>)}
  </ul>;
}
