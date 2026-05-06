export function LoadingBlock({ label = 'Loading content' }) {
  return (
    <div className="raw-container flex min-h-[calc(100vh-134px)] items-center justify-center py-6">
      <div className="w-full max-w-md border-[5px] border-black bg-white p-6 text-black dark:border-white dark:bg-black dark:text-white">
        <p className="font-mono text-xs uppercase tracking-[2px]">{label}</p>
        <div className="mt-4 grid grid-cols-4 gap-2" aria-hidden="true">
          <span className="h-4 bg-black dark:bg-white" />
          <span className="h-4 bg-black dark:bg-white" />
          <span className="h-4 bg-black dark:bg-white" />
          <span className="h-4 bg-black dark:bg-white" />
        </div>
      </div>
    </div>
  );
}
