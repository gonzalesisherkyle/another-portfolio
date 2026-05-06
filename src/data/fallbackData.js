export const fallbackSettings = {
  siteName: 'ALEX CARTER',
  heroName: 'ALEX CARTER',
  heroRole: 'FULL-STACK DEVELOPER',
  heroIntro: 'I build fast web products with React, Node, MongoDB, and a bias for maintainable systems.',
  aboutSnippet: '6 years shipping product interfaces, APIs, dashboards, and CMS workflows for small teams.',
  resumeUrl: 'https://drive.google.com/',
  email: 'alex@example.com',
  location: 'Manila / Remote',
  socials: [
    { label: 'GitHub', url: 'https://github.com/' },
    { label: 'LinkedIn', url: 'https://linkedin.com/' },
    { label: 'Email', url: 'mailto:alex@example.com' }
  ]
};

export const fallbackProjects = [
  {
    _id: '1',
    title: 'CMS Portfolio System',
    slug: 'cms-portfolio-system',
    summary: 'A maintainable content engine with admin auth, media uploads, and structured case studies.',
    role: 'Full-stack lead',
    year: '2026',
    stack: ['React', 'Express', 'MongoDB'],
    featured: true,
    published: true,
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com/'
  },
  {
    _id: '2',
    title: 'Ops Dashboard',
    slug: 'ops-dashboard',
    summary: 'A dense operational dashboard for tracking queues, incidents, and team handoffs.',
    role: 'Frontend engineer',
    year: '2025',
    stack: ['React', 'Tailwind', 'REST'],
    featured: true,
    published: true,
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com/'
  },
  {
    _id: '3',
    title: 'Commerce API',
    slug: 'commerce-api',
    summary: 'Inventory, checkout, and admin APIs with validation, auth, and deployment hygiene.',
    role: 'Backend engineer',
    year: '2024',
    stack: ['Node', 'MongoDB', 'JWT'],
    featured: true,
    published: true,
    repoUrl: 'https://github.com/'
  },
  {
    _id: '4',
    title: 'Design System Migration',
    slug: 'design-system-migration',
    summary: 'Reusable component primitives for forms, cards, modals, and page layouts.',
    role: 'UI engineer',
    year: '2024',
    stack: ['React', 'Storybook', 'CSS'],
    featured: false,
    published: true
  }
];

export const fallbackSkills = [
  { _id: '1', name: 'React', category: 'Frontend', level: 92, published: true },
  { _id: '2', name: 'Express.js', category: 'Backend', level: 88, published: true },
  { _id: '3', name: 'MongoDB', category: 'Data', level: 82, published: true },
  { _id: '4', name: 'Cloudinary', category: 'Media', level: 76, published: true },
  { _id: '5', name: 'Tailwind CSS', category: 'UI', level: 90, published: true }
];

export const fallbackExperience = [
  {
    _id: '1',
    company: 'Independent',
    role: 'Full-stack Developer',
    startDate: '2023',
    endDate: 'Present',
    summary: 'Build product dashboards and CMS platforms\nDesign API-backed web experiences\nMaintain reusable React component systems',
    published: true
  },
  {
    _id: '2',
    company: 'Product Studio',
    role: 'Frontend Engineer',
    startDate: '2020',
    endDate: '2023',
    summary: 'Shipped responsive React interfaces\nBuilt reusable design system components\nImproved admin workflows for content teams',
    published: true
  }
];
