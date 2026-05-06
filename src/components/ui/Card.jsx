export function Card({ children, heavy = false, inverted = false, className = '' }) {
  const border = heavy ? 'border-[5px]' : 'border-[3px]';
  const colors = inverted
    ? 'border-white bg-black text-white'
    : 'border-black bg-white text-black dark:border-white dark:bg-black dark:text-white';

  return <div className={`${border} ${colors} p-4 sm:p-6 ${className}`}>{children}</div>;
}
