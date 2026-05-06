import { ArrowUpRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { ProjectCard } from '../../components/ProjectCard';
import { ContactForm } from '../../components/ContactForm';
import { useSite } from '../../contexts/SiteContext';

export function Home() {
  const { settings, projects, skills, experience } = useSite();
  const featured = projects.filter((project) => project.featured).slice(0, 3);
  const currentRole = experience[0];

  return (
    <>
      <section className="raw-grid border-b-[5px] border-black dark:border-white">
        <div className="raw-container grid min-h-[calc(100vh-156px)] gap-5 py-6 md:grid-cols-[1.35fr_.65fr] md:items-center lg:min-h-[560px]">
          <div className="max-w-4xl">
            <p className="font-mono text-sm uppercase tracking-[2px]">{settings.heroRole}</p>
            <h1 className="mt-3">{settings.heroName}</h1>
            <p className="mt-4 max-w-2xl text-lg leading-7">{settings.heroIntro}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button to="/projects" size="lg">Projects</Button>
              <Button href={settings.resumeUrl} target="_blank" rel="noreferrer" variant="secondary" size="lg">Resume</Button>
            </div>
            <div className="mt-5 flex flex-wrap gap-4 font-mono text-xs uppercase tracking-[1px]">
              {(settings.socials || []).map((social) => (
                <a key={social.label} href={social.url} target={social.url.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                  {social.label}
                </a>
              ))}
            </div>
          </div>
          <Card heavy className="self-stretch md:self-center">
            <p className="font-mono text-xs uppercase tracking-[2px]">Profile</p>
            <p className="mt-3 text-2xl font-bold leading-tight">{settings.aboutSnippet}</p>
            <div className="mt-5 grid grid-cols-2 gap-3 border-t-[3px] border-black pt-4 dark:border-white">
              <div><span className="font-headline text-3xl">{projects.length}</span><p className="font-mono text-xs uppercase">Projects</p></div>
              <div><span className="font-headline text-3xl">{skills.length}</span><p className="font-mono text-xs uppercase">Skills</p></div>
            </div>
          </Card>
        </div>
      </section>

      <section className="raw-container py-6">
        <SectionHeader title="Selected Projects" eyebrow="Only 3" action={<Button to="/projects" variant="secondary" size="sm">Archive</Button>} />
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((project) => <ProjectCard key={project._id} project={project} />)}
        </div>
      </section>

      <section className="border-y-[5px] border-black bg-black text-white dark:border-white dark:bg-white dark:text-black">
        <div className="raw-container grid gap-5 py-6 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[2px]">Stack Snapshot</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {skills.slice(0, 8).map((skill) => <Badge key={skill._id} inverted>{skill.name}</Badge>)}
            </div>
          </div>
          <div className="border-[3px] border-white p-4 dark:border-black">
            <p className="font-mono text-xs uppercase tracking-[2px]">Current</p>
            <h3 className="mt-2">{currentRole?.role}</h3>
            <p className="mt-2 text-sm">{currentRole?.company} / {currentRole?.startDate} - {currentRole?.endDate}</p>
          </div>
        </div>
      </section>

      <section className="raw-container grid gap-5 py-6 lg:grid-cols-[.85fr_1.15fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[2px]">Contact</p>
          <h2>Build The Next Thing</h2>
          <p className="mt-3 max-w-md">Send a concise note. I read every serious project inquiry and reply from {settings.email}.</p>
          <a className="mt-3 inline-flex items-center gap-1 font-headline uppercase tracking-[2px]" href={`mailto:${settings.email}`}>
            {settings.email} <ArrowUpRight size={16} />
          </a>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
