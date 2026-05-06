import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/FormFields';
import { useAuth } from '../../contexts/AuthContext';

export function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  if (isAuthenticated) return <Navigate to="/admin" replace />;

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await login(form);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <main className="raw-grid flex min-h-screen items-center justify-center bg-white p-4 text-black dark:bg-black dark:text-white">
      <Card heavy className="w-full max-w-md">
        <p className="font-mono text-xs uppercase tracking-[2px]">Admin only</p>
        <h1 className="mt-2 text-[42px]">LOGIN</h1>
        <form onSubmit={submit} className="mt-5 grid gap-4">
          <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <Input label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          {error && <p className="font-mono text-xs uppercase text-raw-red">{error}</p>}
          <Button type="submit">Enter CMS</Button>
        </form>
      </Card>
    </main>
  );
}
