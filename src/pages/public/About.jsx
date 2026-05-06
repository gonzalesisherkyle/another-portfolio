import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { ExperienceBullets } from '../../components/ExperienceBullets';
import { useSite } from '../../contexts/SiteContext';

export function About() {
  const { settings, skills, experience } = useSite();

  return (
    <section className="raw-container min-h-[calc(100vh-134px)] py-6">
      <SectionHeader title="About" eyebrow="Profile" action={<Button href={settings.resumeUrl} target="_blank" rel="noreferrer" variant="secondary" size="sm">Resume</Button>} />
      <div className="grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
        <Card heavy>
          <h1 className="text-[38px] sm:text-[52px]">{settings.heroName}</h1>
          <p className="mt-4 text-lg">{settings.aboutFull || settings.aboutSnippet}</p>
          <p className="mt-4 font-mono text-sm uppercase">{settings.location}</p>
        </Card>
        <div className="grid gap-4">
          <Card>
            <h3 className="text-2xl">Experience</h3>
            <div className="mt-3 divide-y-[3px] divide-black dark:divide-white">
              {experience.map((item) => (
                <div key={item._id} className="py-3">
                  <p className="font-mono text-xs uppercase tracking-[2px]">{item.startDate} - {item.endDate}</p>
                  <h4 className="text-xl font-bold">{item.role} / {item.company}</h4>
                  <ExperienceBullets summary={item.summary} />
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h3 className="text-2xl">Skills</h3>
            <div className="mt-3 flex flex-wrap gap-2">{skills.map((skill) => <Badge key={skill._id}>{skill.name}</Badge>)}</div>
          </Card>
        </div>
      </div>
    </section>
  );
}
