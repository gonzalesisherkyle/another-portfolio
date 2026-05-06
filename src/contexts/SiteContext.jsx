import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getPublicData } from '../api/portfolio';
import { fallbackExperience, fallbackProjects, fallbackSettings, fallbackSkills } from '../data/fallbackData';

const SiteContext = createContext(null);

const fallbackData = {
  settings: fallbackSettings,
  projects: fallbackProjects,
  skills: fallbackSkills,
  experience: fallbackExperience
};

export function SiteProvider({ children }) {
  const [data, setData] = useState(fallbackData);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    getPublicData()
      .then((result) => {
        setData({
          settings: { ...fallbackSettings, ...(result.settings || {}) },
          projects: result.projects || [],
          skills: result.skills || [],
          experience: result.experience || []
        });
        setStatus('ready');
      })
      .catch(() => setStatus('ready'));
  }, []);

  const value = useMemo(() => ({ ...data, status }), [data, status]);

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export const useSite = () => useContext(SiteContext);
