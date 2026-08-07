export type CommandKey =
  | 'help'
  | 'about'
  | 'skills'
  | 'experience'
  | 'projects'
  | 'contact'
  | 'resume'
  | 'github'
  | 'neofetch'
  | 'whoami'
  | 'ls'
  | 'clear'
  | 'echo'
  | 'sudo'
  | 'rm'
  | 'matrix'
  | 'theme';

export type CommandDef = {
  name: CommandKey;
  description: string;
  hidden?: boolean;
};

export const commands: CommandDef[] = [
  { name: 'help', description: 'List available commands' },
  { name: 'about', description: 'Who I am' },
  { name: 'skills', description: 'Tech I work with' },
  { name: 'experience', description: 'Where I have worked' },
  { name: 'projects', description: 'Things I have built' },
  { name: 'contact', description: 'How to reach me' },
  { name: 'resume', description: 'Download my resume (PDF)' },
  { name: 'github', description: 'Open my GitHub' },
  { name: 'neofetch', description: 'System info, but for me' },
  { name: 'whoami', description: 'Print current user' },
  { name: 'ls', description: 'List sections' },
  { name: 'clear', description: 'Clear the terminal' },
  { name: 'theme', description: 'Toggle theme' },
  { name: 'echo', description: 'Echo input', hidden: true },
  { name: 'sudo', description: 'nope', hidden: true },
  { name: 'rm', description: 'nope', hidden: true },
  { name: 'matrix', description: 'not that kind of terminal', hidden: true },
];

export const visibleCommandNames = commands.filter((c) => !c.hidden).map((c) => c.name);
