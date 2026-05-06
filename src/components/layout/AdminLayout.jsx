import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LogOut, Moon, Sun } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const linkClass = ({ isActive }) =>
  `border-[3px] border-black px-3 py-2 font-headline text-xs uppercase tracking-[2px] no-underline dark:border-white ${isActive ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-white text-black dark:bg-black dark:text-white'}`;

export function AdminLayout() {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <header className="border-b-[5px] border-black dark:border-white">
        <div className="raw-container flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[2px]">CMS</p>
            <h1 className="text-[34px] sm:text-[44px]">ADMIN</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" size="sm" onClick={toggleTheme} type="button">{theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}</Button>
            <Button variant="secondary" size="sm" onClick={handleLogout} type="button"><LogOut size={16} /></Button>
          </div>
        </div>
      </header>
      <div className="raw-container grid gap-4 py-4 lg:grid-cols-[220px_1fr]">
        <aside className="border-[3px] border-black p-3 dark:border-white">
          <nav className="grid gap-2" aria-label="Admin navigation">
            <NavLink to="/admin" end className={linkClass}>Dashboard</NavLink>
            <NavLink to="/admin/projects" className={linkClass}>Projects</NavLink>
            <NavLink to="/admin/skills" className={linkClass}>Skills</NavLink>
            <NavLink to="/admin/experience" className={linkClass}>Experience</NavLink>
            <NavLink to="/admin/settings" className={linkClass}>Settings</NavLink>
            <NavLink to="/admin/messages" className={linkClass}>Messages</NavLink>
          </nav>
        </aside>
        <Outlet />
      </div>
    </div>
  );
}
