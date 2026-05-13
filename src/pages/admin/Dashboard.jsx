import { useEffect, useState } from 'react';
import { adminApi } from '../../api/portfolio';
import { Card } from '../../components/ui/Card';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { LoadingBlock } from '../../components/ui/LoadingBlock';

const defaults = { projects: 0, skills: 0, experience: 0, messages: 0, drafts: 0, featured: 0 };

export function Dashboard() {
  const [stats, setStats] = useState(defaults);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.stats()
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingBlock label="Calculating statistics" />;

  return (
    <main>
      <SectionHeader title="Dashboard" eyebrow="Overview" />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {Object.entries(stats).map(([key, value]) => (
          <Card key={key}>
            <p className="font-mono text-xs uppercase tracking-[2px]">{key}</p>
            <p className="mt-2 font-headline text-5xl leading-none">{value}</p>
          </Card>
        ))}
      </div>
    </main>
  );
}
