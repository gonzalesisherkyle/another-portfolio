import { useEffect, useMemo, useState } from 'react';
import { adminApi } from '../../api/portfolio';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Checkbox, Input, Textarea } from '../../components/ui/FormFields';
import { Modal } from '../../components/ui/Modal';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { ExperienceBullets } from '../../components/ExperienceBullets';

const configs = {
  projects: {
    title: 'Projects',
    empty: { title: '', slug: '', summary: '', role: '', year: '', stack: '', liveUrl: '', repoUrl: '', imageUrl: '', published: true, featured: false },
    fields: ['title', 'slug', 'summary', 'role', 'year', 'stack', 'liveUrl', 'repoUrl', 'imageUrl']
  },
  skills: {
    title: 'Skills',
    empty: { name: '', category: '', level: 80, published: true },
    fields: ['name', 'category', 'level']
  },
  experience: {
    title: 'Experience',
    empty: { company: '', role: '', startDate: '', endDate: '', summary: '', published: true },
    fields: ['company', 'role', 'startDate', 'endDate', 'summary']
  }
};

export function ResourceManager({ resource }) {
  const config = configs[resource];
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(config.empty);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  const load = () => adminApi.list(resource).then(setItems).catch(() => setItems([]));

  useEffect(() => {
    load();
  }, [resource]);

  const titleField = useMemo(() => resource === 'projects' ? 'title' : resource === 'skills' ? 'name' : 'role', [resource]);

  const startCreate = () => {
    setEditing(null);
    setForm(config.empty);
    setOpen(true);
  };

  const startEdit = (item) => {
    setEditing(item);
    setForm({ ...config.empty, ...item, stack: Array.isArray(item.stack) ? item.stack.join(', ') : item.stack });
    setOpen(true);
  };

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    const payload = { ...form };
    if (resource === 'projects') payload.stack = String(payload.stack || '').split(',').map((item) => item.trim()).filter(Boolean);
    if (resource === 'skills') payload.level = Number(payload.level);
    try {
      if (editing?._id) await adminApi.update(resource, editing._id, payload);
      else await adminApi.create(resource, payload);
      setOpen(false);
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed.');
    }
  };

  const uploadFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'portfolio');
    try {
      const uploaded = await adminApi.upload(formData);
      setForm((current) => ({ ...current, imageUrl: uploaded.url }));
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed.');
    }
  };

  const remove = async (id) => {
    await adminApi.remove(resource, id);
    load();
  };

  return (
    <main>
      <SectionHeader title={config.title} eyebrow="CRUD" action={<Button onClick={startCreate} size="sm">New</Button>} />
      <div className="grid gap-3">
        {items.map((item) => (
          <Card key={item._id} className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h3 className="text-2xl">{item[titleField]}</h3>
              {resource === 'experience'
                ? <ExperienceBullets summary={item.summary} />
                : <p className="text-sm">{item.summary || item.category || item.company}</p>}
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge tone={item.published ? 'success' : 'warning'}>{item.published ? 'Published' : 'Draft'}</Badge>
                {item.featured && <Badge tone="active">Featured</Badge>}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" size="sm" onClick={() => startEdit(item)}>Edit</Button>
              <Button variant="destructive" size="sm" onClick={() => remove(item._id)}>Delete</Button>
            </div>
          </Card>
        ))}
        {items.length === 0 && <Card>No records yet.</Card>}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={`${editing ? 'Edit' : 'New'} ${config.title}`}>
        <form onSubmit={submit} className="grid gap-4">
          {config.fields.map((field) => {
            const common = {
              key: field,
              label: field === 'summary' && resource === 'experience' ? 'Description Bullets' : field,
              value: form[field] || '',
              onChange: (e) => setForm({ ...form, [field]: e.target.value }),
              helper: field === 'summary' && resource === 'experience' ? 'One bullet per line.' : undefined
            };
            return field === 'summary' ? <Textarea {...common} rows={3} /> : <Input {...common} type={field === 'level' ? 'number' : 'text'} />;
          })}
          {resource === 'projects' && (
            <Input label="Cloudinary Upload" type="file" accept="image/*,.pdf" onChange={uploadFile} helper="Uploads to Cloudinary and fills Image URL." />
          )}
          <div className="flex flex-wrap gap-4">
            <Checkbox label="Published" checked={Boolean(form.published)} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
            {resource === 'projects' && <Checkbox label="Featured" checked={Boolean(form.featured)} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />}
          </div>
          {error && <p className="font-mono text-xs uppercase text-raw-red">{error}</p>}
          <Button type="submit">Save</Button>
        </form>
      </Modal>
    </main>
  );
}
