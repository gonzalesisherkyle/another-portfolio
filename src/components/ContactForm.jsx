import { useState } from 'react';
import { sendContactMessage } from '../api/portfolio';
import { Button } from './ui/Button';
import { Input, Textarea } from './ui/FormFields';

const initial = { name: '', email: '', message: '' };

export function ContactForm() {
  const [form, setForm] = useState(initial);
  const [state, setState] = useState({ status: 'idle', message: '' });

  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    setState({ status: 'loading', message: 'Sending' });
    try {
      await sendContactMessage(form);
      setForm(initial);
      setState({ status: 'success', message: 'Message received.' });
    } catch (error) {
      setState({ status: 'error', message: error.response?.data?.message || 'Could not send message.' });
    }
  };

  return (
    <form onSubmit={submit} className="grid gap-3">
      <Input label="Name" name="name" value={form.name} onChange={update} required />
      <Input label="Email" name="email" type="email" value={form.email} onChange={update} required />
      <Textarea label="Message" name="message" rows={3} value={form.message} onChange={update} required />
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={state.status === 'loading'}>{state.status === 'loading' ? 'Sending' : 'Send'}</Button>
        {state.message && <p className="font-mono text-xs uppercase">{state.message}</p>}
      </div>
    </form>
  );
}
