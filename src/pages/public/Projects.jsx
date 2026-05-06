import { useEffect, useState } from 'react';
import { getProjects } from '../../api/portfolio';
import { ProjectCard } from '../../components/ProjectCard';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { StateBlock } from '../../components/ui/StateBlock';
import { LoadingBlock } from '../../components/ui/LoadingBlock';

export function Projects() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    getProjects().then((data) => {
      setProjects(data);
      setStatus('ready');
    }).catch(() => setStatus('error'));
  }, []);

  if (status === 'loading') return <LoadingBlock label="Loading projects" />;

  return (
    <section className="raw-container min-h-[calc(100vh-134px)] py-6">
      <SectionHeader title="Project Archive" eyebrow="Case Studies" />
      {status === 'error' && <StateBlock title="Unable To Load" message="The project archive could not be loaded." />}
      {status === 'ready' && projects.length === 0 && <StateBlock title="Empty" message="Published projects will appear here." />}
      {status === 'ready' && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => <ProjectCard key={project._id} project={project} />)}
        </div>
      )}
    </section>
  );
}
