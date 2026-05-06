import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProjectBySlug } from '../../api/portfolio';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { StateBlock } from '../../components/ui/StateBlock';
import { LoadingBlock } from '../../components/ui/LoadingBlock';

export function ProjectDetails() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    getProjectBySlug(slug).then((data) => {
      setProject(data);
      setStatus('ready');
    }).catch(() => setStatus('error'));
  }, [slug]);

  if (status === 'loading') return <LoadingBlock label="Loading project" />;

  if (status === 'error') {
    return <section className="raw-container py-6"><StateBlock title="Unable To Load" message="This project could not be loaded." /></section>;
  }

  if (status === 'ready' && !project) {
    return <section className="raw-container py-6"><StateBlock title="Not Found" message="This case study is not published." /></section>;
  }

  return (
    <article className="raw-container min-h-[calc(100vh-134px)] py-6">
      <Link to="/projects" className="font-headline text-sm uppercase tracking-[2px]">Back to archive</Link>
      {project && (
        <>
          <header className="mt-4 border-b-[5px] border-black pb-5 dark:border-white">
            <p className="font-mono text-xs uppercase tracking-[2px]">{project.role} / {project.year}</p>
            <h1 className="mt-2">{project.title}</h1>
            <p className="mt-4 max-w-3xl text-lg">{project.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">{(project.stack || []).map((item) => <Badge key={item}>{item}</Badge>)}</div>
          </header>
          <div className="flex flex-wrap gap-3 py-5">
            {project.liveUrl && <Button href={project.liveUrl} target="_blank" rel="noreferrer">Live</Button>}
            {project.repoUrl && <Button href={project.repoUrl} target="_blank" rel="noreferrer" variant="secondary">GitHub</Button>}
            {!project.liveUrl && !project.repoUrl && <p className="font-mono text-xs uppercase">No project links added yet.</p>}
          </div>
        </>
      )}
    </article>
  );
}
