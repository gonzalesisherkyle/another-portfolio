const tones = {
  default: 'border-black bg-white text-black dark:border-white dark:bg-black dark:text-white',
  success: 'border-raw-green bg-white text-raw-green dark:border-raw-green dark:bg-black dark:text-raw-green',
  warning: 'border-raw-orange bg-white text-raw-orange dark:border-raw-orange dark:bg-black dark:text-raw-orange',
  error: 'border-raw-red bg-white text-raw-red dark:border-raw-red dark:bg-black dark:text-raw-red',
  active: 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black'
};

export function Badge({ children, tone = 'default', inverted = false, className = '' }) {
  const surface = inverted
    ? 'border-white bg-black text-white dark:border-black dark:bg-white dark:text-black'
    : tones[tone] || tones.default;

  return (
    <span className={`inline-flex border-2 px-2.5 py-0.5 font-sans text-[11px] font-semibold uppercase tracking-[1px] ${surface} ${className}`}>
      {children}
    </span>
  );
}
