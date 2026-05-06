import { Route, Routes } from 'react-router-dom';
import { PublicLayout } from './components/layout/PublicLayout';
import { AdminLayout } from './components/layout/AdminLayout';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { Home } from './pages/public/Home';
import { Projects } from './pages/public/Projects';
import { ProjectDetails } from './pages/public/ProjectDetails';
import { About } from './pages/public/About';
import { Login } from './pages/admin/Login';
import { Dashboard } from './pages/admin/Dashboard';
import { ResourceManager } from './pages/admin/ResourceManager';
import { Settings } from './pages/admin/Settings';
import { Messages } from './pages/admin/Messages';

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:slug" element={<ProjectDetails />} />
        <Route path="about" element={<About />} />
      </Route>
      <Route path="admin/login" element={<Login />} />
      <Route path="admin" element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<ResourceManager resource="projects" />} />
          <Route path="skills" element={<ResourceManager resource="skills" />} />
          <Route path="experience" element={<ResourceManager resource="experience" />} />
          <Route path="settings" element={<Settings />} />
          <Route path="messages" element={<Messages />} />
        </Route>
      </Route>
    </Routes>
  );
}
