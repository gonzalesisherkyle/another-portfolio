import { Card } from './Card';

export function StateBlock({ title, message }) {
  return (
    <Card className="p-6">
      <h3 className="text-2xl">{title}</h3>
      {message && <p className="mt-2 max-w-xl">{message}</p>}
    </Card>
  );
}
