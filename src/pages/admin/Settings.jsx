import { useEffect, useState } from 'react';
import { adminApi } from '../../api/portfolio';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input, Textarea } from '../../components/ui/FormFields';
import { SectionHeader } from '../../components/ui/SectionHeader';

const empty = {
  siteName: '',
  heroName: '',
  heroRole: '',
  heroIntro: '',
  aboutSnippet: '',
  aboutFull: '',
  email: '',
  location: '',
  resumeUrl: '',
  socialsText: ''
};

export function Settings() {
  const [form, setForm] = useState(empty);
  const [message, setMessage] = useState('');

  useEffect(() => {
    adminApi.settings().then((data) => {
      setForm({
        ...empty,
        ...data,
        socialsText: (data.socials || []).map((item) => `${item.label}|${item.url}`).join('\n')
      });
    }).catch(() => {});
  }, []);

  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    const payload = {
      ...form,
      socials: form.socialsText.split('\n').map((line) => {
        const [label, url] = line.split('|');
        return { label: label?.trim(), url: url?.trim() };
      }).filter((item) => item.label && item.url)
    };
    delete payload.socialsText;
    await adminApi.updateSettings(payload);
    setMessage('Settings saved.');
  };

  return (
    <main>
      <SectionHeader title="Site Settings" eyebrow="Hero / Contact / Resume" />
      <Card>
        <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
          <Input label="Site Name" name="siteName" value={form.siteName} onChange={update} />
          <Input label="Hero Name" name="heroName" value={form.heroName} onChange={update} />
          <Input label="Hero Role" name="heroRole" value={form.heroRole} onChange={update} />
          <Input label="Email" name="email" type="email" value={form.email} onChange={update} />
          <Input label="Location" name="location" value={form.location} onChange={update} />
          <Input label="Google Drive Resume Link" name="resumeUrl" value={form.resumeUrl} onChange={update} helper="Use a Drive sharing URL. The public CTA opens it in a new tab." />
          <Textarea label="Hero Intro" name="heroIntro" value={form.heroIntro} onChange={update} className="md:col-span-2" />
          <Textarea label="About Snippet" name="aboutSnippet" value={form.aboutSnippet} onChange={update} className="md:col-span-2" />
          <Textarea label="Full About" name="aboutFull" value={form.aboutFull} onChange={update} rows={5} className="md:col-span-2" />
          <Textarea label="Social Links" name="socialsText" value={form.socialsText} onChange={update} helper="One per line: Label|https://url" className="md:col-span-2" />
          <div className="flex items-center gap-3 md:col-span-2">
            <Button type="submit">Save Settings</Button>
            {message && <p className="font-mono text-xs uppercase">{message}</p>}
          </div>
        </form>
      </Card>
    </main>
  );
}
