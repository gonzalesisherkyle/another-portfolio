import { Link } from 'react-router-dom';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

export function ProjectCard({ project }) {
  return (
    <Card className="flex h-full flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-[2px]">{project.year || 'NOW'}</p>
          <h3 className="mt-1 text-2xl">{project.title}</h3>
        </div>
        {project.featured && <Badge tone="active">Featured</Badge>}
      </div>
      <p className="line-clamp-4 max-h-24 flex-1 overflow-hidden text-sm leading-6">{project.summary}</p>
      <div className="flex flex-wrap gap-2">
        {(project.stack || []).slice(0, 4).map((item) => <Badge key={item}>{item}</Badge>)}
      </div>
      <div className="flex flex-wrap gap-2 border-t-[3px] border-black pt-3 dark:border-white">
        {project.liveUrl && <Button href={project.liveUrl} target="_blank" rel="noreferrer" variant="secondary" size="sm">Live</Button>}
        {project.repoUrl && <Button href={project.repoUrl} target="_blank" rel="noreferrer" variant="secondary" size="sm">GitHub</Button>}
        <Link to={`/projects/${project.slug}`} className="inline-flex min-h-8 items-center font-headline text-xs uppercase tracking-[2px]">
          Read description
        </Link>
      </div>
    </Card>
  );
}
