export type SkillCategory = {
  id: string;
  label: string;
  items: string[];
};

export const skills: SkillCategory[] = [
  {
    id: 'languages',
    label: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'Go', 'SQL', 'Bash'],
  },
  {
    id: 'backend',
    label: 'Backend',
    items: ['Node.js', 'Express', 'NestJS', 'FastAPI', 'REST', 'GraphQL', 'gRPC'],
  },
  {
    id: 'databases',
    label: 'Databases',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'SQLite'],
  },
  {
    id: 'devops',
    label: 'DevOps',
    items: ['Docker', 'Kubernetes', 'GitHub Actions', 'Terraform', 'Nginx', 'Linux'],
  },
  {
    id: 'cloud',
    label: 'Cloud',
    items: ['AWS', 'GCP', 'Cloudflare', 'Vercel', 'DigitalOcean'],
  },
  {
    id: 'tools',
    label: 'Tools',
    items: ['Git', 'VS Code', 'Neovim', 'Postman', 'Figma', 'Datadog'],
  },
];
