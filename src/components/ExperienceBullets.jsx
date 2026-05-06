export function getExperienceBullets(summary = '') {
  return String(summary)
    .split(/\r?\n/)
    .map((item) => item.replace(/^[-*]\s*/, '').trim())
    .filter(Boolean);
}

export function ExperienceBullets({ summary, className = '' }) {
  const bullets = getExperienceBullets(summary);

  if (bullets.length === 0) return null;

  return (
    <ul className={`mt-2 grid gap-1 text-sm ${className}`}>
      {bullets.map((bullet) => (
        <li key={bullet} className="grid grid-cols-[14px_1fr] gap-2">
          <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 bg-black dark:bg-white" />
          <span>{bullet}</span>
        </li>
      ))}
    </ul>
  );
}
