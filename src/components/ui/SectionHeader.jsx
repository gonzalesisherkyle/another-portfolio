export function SectionHeader({ eyebrow, title, action }) {
  return (
    <div className="mb-4 flex flex-col gap-3 border-b-[3px] border-black pb-3 dark:border-white sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <p className="font-mono text-xs uppercase tracking-[2px]">{eyebrow}</p>}
        <h2>{title}</h2>
      </div>
      {action}
    </div>
  );
}
