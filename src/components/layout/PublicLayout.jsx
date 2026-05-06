import { NavLink, Outlet } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { Button } from '../ui/Button';
import { useTheme } from '../../contexts/ThemeContext';
import { SiteProvider, useSite } from '../../contexts/SiteContext';

const navClass = ({ isActive }) =>
  `font-headline text-sm uppercase tracking-[2px] no-underline ${isActive ? 'bg-black px-2 py-1 text-white dark:bg-white dark:text-black' : 'text-black dark:text-white'}`;

function PublicLayoutShell() {
  const { theme, toggleTheme } = useTheme();
  const { settings } = useSite();
  const siteName = settings?.siteName || 'RAW.DEV';

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <header className="sticky top-0 z-40 border-b-[3px] border-black bg-white dark:border-white dark:bg-black">
        <div className="raw-container flex min-h-16 flex-wrap items-center justify-between gap-3 py-3">
          <NavLink to="/" className="font-headline text-xl uppercase no-underline text-black dark:text-white">{siteName}</NavLink>
          <nav className="flex flex-wrap items-center gap-3 sm:gap-5" aria-label="Main navigation">
            <NavLink to="/" className={navClass}>Home</NavLink>
            <NavLink to="/projects" className={navClass}>Projects</NavLink>
            <NavLink to="/about" className={navClass}>About</NavLink>
            <Button variant="secondary" size="sm" type="button" onClick={toggleTheme} aria-label="Toggle light and dark mode">
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </Button>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="border-t-[3px] border-black py-5 dark:border-white">
        <div className="raw-container flex flex-col justify-between gap-2 font-mono text-xs uppercase sm:flex-row">
          <span>Built with React / Express / MongoDB</span>
        </div>
      </footer>
    </div>
  );
}

export function PublicLayout() {
  return (
    <SiteProvider>
      <PublicLayoutShell />
    </SiteProvider>
  );
}
