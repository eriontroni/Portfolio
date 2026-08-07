export type Social = {
  label: string;
  href: string;
  handle: string;
};

export const profile = {
  name: 'Erion Troni',
  handle: 'erion@troni',
  role: 'Software Engineer',
  focus: ['Backend', 'DevOps', 'Cloud'],
  location: '[TODO: location]',
  email: 'eriontroni3@gmail.com',
  site: 'erion.troni.dev',
  tagline: 'I build reliable backends, cloud infrastructure, and the systems that keep them running.',
  bio: '[TODO: bio — a short paragraph about you: what you focus on, what you enjoy building, and how you approach problems.]',
  resumeUrl: '/resume.pdf',
  socials: [
    { label: 'GitHub', href: 'https://github.com/[TODO]', handle: '@[TODO]' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/[TODO]', handle: '/in/[TODO]' },
    { label: 'Email', href: 'mailto:eriontroni3@gmail.com', handle: 'eriontroni3@gmail.com' },
  ] as Social[],
  stats: [
    { label: 'Years shipping', value: 4, suffix: '+' },
    { label: 'Projects', value: 12, suffix: '+' },
    { label: 'Technologies', value: 25, suffix: '+' },
  ],
};

export type Profile = typeof profile;
