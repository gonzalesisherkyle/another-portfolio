import { X } from 'lucide-react';
import { Button } from './Button';

export function Modal({ title, children, open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <section className="max-h-[90vh] w-full max-w-2xl overflow-auto border-[5px] border-black bg-white text-black dark:border-white dark:bg-black dark:text-white">
        <header className="flex items-center justify-between border-b-[3px] border-black p-4 dark:border-white">
          <h3 className="text-2xl">{title}</h3>
          <Button variant="secondary" size="sm" type="button" onClick={onClose} aria-label="Close modal">
            <X size={16} />
          </Button>
        </header>
        <div className="p-4 sm:p-6">{children}</div>
      </section>
    </div>
  );
}
