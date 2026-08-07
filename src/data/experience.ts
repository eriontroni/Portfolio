export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  stack?: string[];
};

export const experience: ExperienceEntry[] = [
  {
    company: '[TODO: Company name]',
    role: '[TODO: Role]',
    period: '[TODO: 202X — Present]',
    location: '[TODO: Remote / City]',
    summary: '[TODO: One-line description of what the team builds and your role in it.]',
    highlights: [
      '[TODO: Concrete achievement with a number or outcome.]',
      '[TODO: Another highlight — architecture decision, migration, or launch.]',
      '[TODO: Third highlight — cross-functional or DevOps impact.]',
    ],
    stack: ['[TODO: tech]', '[TODO: tech]', '[TODO: tech]'],
  },
  {
    company: '[TODO: Previous company]',
    role: '[TODO: Role]',
    period: '[TODO: 202X — 202X]',
    location: '[TODO: Remote / City]',
    summary: '[TODO: Short summary.]',
    highlights: [
      '[TODO: Highlight 1]',
      '[TODO: Highlight 2]',
    ],
    stack: ['[TODO: tech]', '[TODO: tech]'],
  },
];
