const baseInput = 'w-full border-[3px] border-black bg-raw-sunken px-3 py-2.5 font-mono text-[15px] text-black outline-none transition-all file:mr-3 file:border-[3px] file:border-black file:bg-black file:px-3 file:py-1 file:font-headline file:text-xs file:uppercase file:tracking-[2px] file:text-white hover:bg-[#E8E8E8] focus:border-[5px] disabled:border-raw-muted disabled:bg-raw-soft dark:border-white dark:bg-black dark:text-white dark:file:border-white dark:file:bg-white dark:file:text-black dark:hover:bg-black';

export function Field({ label, helper, error, children }) {
  return (
    <label className="block">
      <span className="mb-1 block font-headline text-sm uppercase">{label}</span>
      {children}
      {(helper || error) && <span className={`mt-1 block text-xs ${error ? 'text-raw-red' : 'text-black dark:text-white'}`}>{error || helper}</span>}
    </label>
  );
}

export function Input({ label, helper, error, className = '', ...props }) {
  return (
    <Field label={label} helper={helper} error={error}>
      <input className={`${baseInput} ${error ? 'border-raw-red' : ''} ${className}`} {...props} />
    </Field>
  );
}

export function Textarea({ label, helper, error, className = '', rows = 4, ...props }) {
  return (
    <Field label={label} helper={helper} error={error}>
      <textarea rows={rows} className={`${baseInput} resize-y ${error ? 'border-raw-red' : ''} ${className}`} {...props} />
    </Field>
  );
}

export function Select({ label, helper, error, children, className = '', ...props }) {
  return (
    <Field label={label} helper={helper} error={error}>
      <select className={`${baseInput} ${error ? 'border-raw-red' : ''} ${className}`} {...props}>{children}</select>
    </Field>
  );
}

export function Checkbox({ label, checked, onChange, ...props }) {
  return (
    <label className="flex items-center gap-3 font-sans text-sm font-semibold uppercase tracking-[1px]">
      <span className="relative inline-grid h-6 w-6 shrink-0 place-items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="peer h-6 w-6 appearance-none border-[3px] border-black bg-white transition-all checked:bg-black focus:border-[5px] active:border-[5px] dark:border-white dark:bg-black dark:checked:bg-white"
          {...props}
        />
        <span className="pointer-events-none absolute hidden h-[3px] w-3.5 rotate-45 bg-white peer-checked:block dark:bg-black" />
        <span className="pointer-events-none absolute hidden h-[3px] w-3.5 -rotate-45 bg-white peer-checked:block dark:bg-black" />
      </span>
      {label}
    </label>
  );
}
