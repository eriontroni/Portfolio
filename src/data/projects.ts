export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  features: string[];
  github?: string;
  demo?: string;
  year: string;
  status?: 'active' | 'archived' | 'wip';
};

export const projects: Project[] = [
  {
    slug: 'sample-project-1',
    name: 'Sample Project 1',
    tagline: 'A short one-liner describing what this project does.',
    description:
      '[TODO: Replace with a real project. Write 2–4 sentences on the problem, the approach, and the outcome. Keep it concrete: what did you build, what did it enable, what did you learn?]',
    tech: ['TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
    features: [
      'Sample feature — describe what it does for the user.',
      'Sample feature — architectural or performance detail.',
      'Sample feature — integration or DevOps aspect.',
    ],
    github: 'https://github.com/[TODO]/[repo]',
    demo: 'https://[TODO].dev',
    year: '2025',
    status: 'active',
  },
  {
    slug: 'sample-project-2',
    name: 'Sample Project 2',
    tagline: 'Another placeholder — swap for a real project.',
    description:
      '[TODO: Replace with a real project. Focus on the technical decisions you made and why.]',
    tech: ['Go', 'Redis', 'Kubernetes', 'gRPC'],
    features: [
      'Sample feature 1.',
      'Sample feature 2.',
      'Sample feature 3.',
    ],
    github: 'https://github.com/[TODO]/[repo]',
    year: '2024',
    status: 'active',
  },
  {
    slug: 'sample-project-3',
    name: 'Sample Project 3',
    tagline: 'Placeholder for a third project.',
    description:
      '[TODO: Replace with a real project. What problem did it solve, and how?]',
    tech: ['Python', 'FastAPI', 'AWS', 'Terraform'],
    features: [
      'Sample feature 1.',
      'Sample feature 2.',
    ],
    github: 'https://github.com/[TODO]/[repo]',
    year: '2024',
    status: 'archived',
  },
];
