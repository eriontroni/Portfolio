import { useTheme } from 'next-themes';
import { toast } from 'sonner';
import {
  ArrowRight,
  Copy,
  FileText,
  Github,
  Home,
  Mail,
  Moon,
  Sun,
  Terminal as TerminalIcon,
  User,
  Wrench,
  Briefcase,
  FolderGit2,
} from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { useCommandPalette } from '@/hooks/use-command-palette';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function CommandPalette() {
  const { open, setOpen } = useCommandPalette();
  const { theme, setTheme } = useTheme();

  const go = (id: string) => {
    setOpen(false);
    setTimeout(() => scrollTo(id), 50);
  };

  const openLink = (href: string) => {
    setOpen(false);
    window.open(href, '_blank', 'noopener');
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen} title="Command menu" description="Jump anywhere">
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>

        <CommandGroup heading="Navigate">
          <CommandItem onSelect={() => go('top')}><Home className="mr-2 size-4" /> Home</CommandItem>
          <CommandItem onSelect={() => go('about')}><User className="mr-2 size-4" /> About</CommandItem>
          <CommandItem onSelect={() => go('skills')}><Wrench className="mr-2 size-4" /> Skills</CommandItem>
          <CommandItem onSelect={() => go('experience')}><Briefcase className="mr-2 size-4" /> Experience</CommandItem>
          <CommandItem onSelect={() => go('projects')}><FolderGit2 className="mr-2 size-4" /> Projects</CommandItem>
          <CommandItem onSelect={() => go('contact')}><Mail className="mr-2 size-4" /> Contact</CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem
            onSelect={() => {
              navigator.clipboard.writeText(profile.email);
              toast.success('Email copied to clipboard');
              setOpen(false);
            }}
          >
            <Copy className="mr-2 size-4" /> Copy email
          </CommandItem>
          <CommandItem onSelect={() => openLink(`mailto:${profile.email}`)}>
            <Mail className="mr-2 size-4" /> Send email
          </CommandItem>
          <CommandItem onSelect={() => openLink(profile.resumeUrl)}>
            <FileText className="mr-2 size-4" /> Download resume
          </CommandItem>
          {profile.socials
            .filter((s) => s.label === 'GitHub' || s.label === 'LinkedIn')
            .map((s) => (
              <CommandItem key={s.label} onSelect={() => openLink(s.href)}>
                {s.label === 'GitHub' ? <Github className="mr-2 size-4" /> : <ArrowRight className="mr-2 size-4" />}
                Open {s.label}
              </CommandItem>
            ))}
          <CommandItem
            onSelect={() => {
              setTheme(theme === 'dark' ? 'light' : 'dark');
              setOpen(false);
            }}
          >
            {theme === 'dark' ? <Sun className="mr-2 size-4" /> : <Moon className="mr-2 size-4" />}
            Toggle theme
          </CommandItem>
          <CommandItem onSelect={() => go('top')}>
            <TerminalIcon className="mr-2 size-4" /> Focus terminal
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Projects">
          {projects.map((p) => (
            <CommandItem key={p.slug} onSelect={() => go('projects')}>
              <FolderGit2 className="mr-2 size-4" /> {p.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
