import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { toast } from 'sonner';
import { useTheme } from 'next-themes';
import TerminalWindow from './TerminalWindow';
import { commands, visibleCommandNames, type CommandKey } from '@/data/commands';
import { profile } from '@/data/profile';
import { skills } from '@/data/skills';
import { experience } from '@/data/experience';
import { projects } from '@/data/projects';
import { cn } from '@/lib/utils';

type Line =
  | { kind: 'input'; text: string; id: number }
  | { kind: 'output'; node: React.ReactNode; id: number };

const PROMPT = (
  <span className="font-mono text-sm">
    <span className="text-primary">{profile.handle}</span>
    <span className="text-muted-foreground">:</span>
    <span className="text-chart-3">~</span>
    <span className="text-muted-foreground">$</span>
  </span>
);

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

let nextId = 0;
const uid = () => ++nextId;

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState<number | null>(null);
  const [booted, setBooted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  const pushOutput = useCallback((node: React.ReactNode) => {
    setLines((prev) => [...prev, { kind: 'output', node, id: uid() }]);
  }, []);

  const pushInput = useCallback((text: string) => {
    setLines((prev) => [...prev, { kind: 'input', text, id: uid() }]);
  }, []);

  const run = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      pushInput(raw);
      if (!trimmed) return;
      setHistory((h) => [...h, trimmed]);

      const [cmd, ...args] = trimmed.split(/\s+/);
      const key = cmd.toLowerCase() as CommandKey;

      switch (key) {
        case 'help':
          pushOutput(<HelpOutput />);
          break;
        case 'about':
          pushOutput(<AboutOutput />);
          scrollToId('about');
          break;
        case 'skills':
          pushOutput(<SkillsOutput />);
          scrollToId('skills');
          break;
        case 'experience':
          pushOutput(<ExperienceOutput />);
          scrollToId('experience');
          break;
        case 'projects':
          pushOutput(<ProjectsOutput />);
          scrollToId('projects');
          break;
        case 'contact':
          pushOutput(<ContactOutput />);
          scrollToId('contact');
          break;
        case 'resume':
          pushOutput(
            <Line>
              Opening resume… <a href={profile.resumeUrl} target="_blank" rel="noopener" className="text-primary underline underline-offset-2">{profile.resumeUrl}</a>
            </Line>
          );
          window.open(profile.resumeUrl, '_blank', 'noopener');
          break;
        case 'github': {
          const gh = profile.socials.find((s) => s.label === 'GitHub');
          pushOutput(
            <Line>
              Opening GitHub… <span className="text-primary">{gh?.href}</span>
            </Line>
          );
          if (gh?.href) window.open(gh.href, '_blank', 'noopener');
          break;
        }
        case 'neofetch':
          pushOutput(<NeofetchOutput />);
          break;
        case 'whoami':
          pushOutput(<Line>{profile.handle}</Line>);
          break;
        case 'ls':
          pushOutput(
            <Line>
              <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                {['about/', 'skills/', 'experience/', 'projects/', 'contact/'].map((s) => (
                  <span key={s} className="text-primary">{s}</span>
                ))}
              </div>
            </Line>
          );
          break;
        case 'clear':
          setLines([]);
          break;
        case 'echo':
          pushOutput(<Line>{args.join(' ')}</Line>);
          break;
        case 'theme': {
          const next = theme === 'dark' ? 'light' : 'dark';
          setTheme(next);
          pushOutput(<Line>theme → {next}</Line>);
          break;
        }
        case 'sudo':
          pushOutput(<Line className="text-destructive">Permission denied. Nice try.</Line>);
          break;
        case 'rm':
          if (args.join(' ').includes('-rf')) {
            pushOutput(<Line className="text-destructive">Absolutely not.</Line>);
          } else {
            pushOutput(<Line>rm: missing operand</Line>);
          }
          break;
        case 'matrix':
          pushOutput(<Line className="text-muted-foreground">follow the white rabbit… but not on this site.</Line>);
          break;
        default:
          pushOutput(
            <Line className="text-destructive">
              zsh: command not found: {cmd}. Type <span className="text-primary">help</span>.
            </Line>
          );
      }
    },
    [pushInput, pushOutput, theme, setTheme]
  );

  useEffect(() => {
    if (booted) return;
    let cancelled = false;
    const boot = async () => {
      pushOutput(<Line className="text-muted-foreground">Welcome to Erion's workspace.</Line>);
      await new Promise((r) => setTimeout(r, 180));
      if (cancelled) return;
      pushOutput(
        <Line className="text-muted-foreground">
          Type <span className="text-primary">help</span> to see what I can do, or press{' '}
          <kbd className="rounded border border-border bg-background/60 px-1 text-[10px]">⌘K</kbd> for the menu.
        </Line>
      );
      setBooted(true);
    };
    boot();
    return () => {
      cancelled = true;
    };
  }, [booted, pushOutput]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const suggestions = useMemo(() => {
    if (!input) return [];
    return visibleCommandNames.filter((n) => n.startsWith(input.toLowerCase()) && n !== input.toLowerCase());
  }, [input]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      run(input);
      setInput('');
      setHistIdx(null);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.length) return;
      const next = histIdx === null ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(next);
      setInput(history[next]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx === null) return;
      const next = histIdx + 1;
      if (next >= history.length) {
        setHistIdx(null);
        setInput('');
      } else {
        setHistIdx(next);
        setInput(history[next]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions[0]) setInput(suggestions[0]);
    } else if (e.key === 'l' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setLines([]);
    }
  };

  const focusInput = () => inputRef.current?.focus();

  return (
    <TerminalWindow title={`${profile.handle}: ~`}>
      <div
        ref={scrollRef}
        onClick={focusInput}
        className="h-[320px] overflow-x-hidden overflow-y-auto px-3 py-3 font-mono text-[13px] leading-relaxed sm:h-[420px] sm:px-4 sm:py-4 sm:text-sm"
      >
        <AnimatePresence initial={false}>
          {lines.map((line) => (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
              className="mb-1"
            >
              {line.kind === 'input' ? (
                <div className="flex items-baseline gap-2">
                  {PROMPT}
                  <span>{line.text}</span>
                </div>
              ) : (
                <div className="pl-0">{line.node}</div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        <div className="flex items-baseline gap-2">
          {PROMPT}
          <div className="relative flex-1">
            <input
              ref={inputRef}
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoComplete="off"
              className="w-full bg-transparent outline-none placeholder:text-muted-foreground/40"
              placeholder={booted ? 'try: help' : ''}
              aria-label="Terminal input"
            />
            {suggestions[0] && input && (
              <span className="pointer-events-none absolute left-0 top-0 whitespace-pre text-muted-foreground/40">
                <span className="invisible">{input}</span>
                {suggestions[0].slice(input.length)}
              </span>
            )}
          </div>
          <motion.span
            className="inline-block h-4 w-1.5 translate-y-0.5 bg-primary"
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </div>
    </TerminalWindow>
  );
}

function Line({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('whitespace-pre-wrap leading-relaxed', className)}>{children}</div>;
}

function HelpOutput() {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-0.5 sm:grid-cols-2">
      {commands.filter((c) => !c.hidden).map((c) => (
        <div key={c.name} className="flex items-baseline gap-3">
          <span className="inline-block w-20 shrink-0 text-primary sm:w-24">{c.name}</span>
          <span className="text-muted-foreground">{c.description}</span>
        </div>
      ))}
    </div>
  );
}

function AboutOutput() {
  return (
    <Line className="text-muted-foreground">
      <span className="text-foreground">{profile.name}</span> — {profile.role}. {profile.tagline}
    </Line>
  );
}

function SkillsOutput() {
  return (
    <div className="space-y-1.5 sm:space-y-0.5">
      {skills.map((cat) => (
        <div key={cat.id} className="flex flex-col gap-0.5 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-2">
          <span className="inline-block w-20 shrink-0 text-primary sm:w-24">{cat.label.toLowerCase()}</span>
          <span className="break-words text-muted-foreground">{cat.items.join(', ')}</span>
        </div>
      ))}
    </div>
  );
}

function ExperienceOutput() {
  return (
    <div className="space-y-1">
      {experience.map((e, i) => (
        <div key={i}>
          <span className="text-primary">{e.role}</span>{' '}
          <span className="text-muted-foreground">@ {e.company}</span>{' '}
          <span className="text-muted-foreground">— {e.period}</span>
        </div>
      ))}
    </div>
  );
}

function ProjectsOutput() {
  return (
    <div className="space-y-0.5">
      {projects.map((p) => (
        <div key={p.slug} className="break-words">
          <span className="text-primary">{p.name}</span>{' '}
          <span className="text-muted-foreground">— {p.tagline}</span>
        </div>
      ))}
      <div className="pt-1 text-xs text-muted-foreground">Tap a card below for details.</div>
    </div>
  );
}

function ContactOutput() {
  return (
    <div className="space-y-0.5">
      <div>
        <span className="inline-block w-16 shrink-0 text-primary sm:w-20">email</span>{' '}
        <a href={`mailto:${profile.email}`} className="text-foreground underline underline-offset-2">
          {profile.email}
        </a>
      </div>
      {profile.socials
        .filter((s) => s.label !== 'Email')
        .map((s) => (
          <div key={s.label}>
            <span className="inline-block w-16 shrink-0 text-primary sm:w-20">{s.label.toLowerCase()}</span>{' '}
            <a href={s.href} target="_blank" rel="noopener" className="text-foreground underline underline-offset-2">
              {s.handle}
            </a>
          </div>
        ))}
      <button
        onClick={() => {
          navigator.clipboard.writeText(profile.email);
          toast.success('Email copied to clipboard');
        }}
        className="mt-1 text-xs text-muted-foreground hover:text-foreground"
      >
        [copy email]
      </button>
    </div>
  );
}

function NeofetchOutput() {
  const rows: [string, string][] = [
    ['user', profile.handle],
    ['role', profile.role],
    ['focus', profile.focus.join(' • ')],
    ['location', profile.location],
    ['host', profile.site],
    ['shell', 'zsh 5.9'],
    ['editor', 'vscode / neovim'],
    ['runtime', 'node • go • python'],
  ];
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
      <pre className="overflow-x-auto text-primary text-[9px] leading-tight sm:text-xs">{`   ____ _____
  | ___|_   _|
  | |__   | |
  | |__|  | |
  |____|  |_|  `}</pre>
      <div className="space-y-0.5">
        {rows.map(([k, v]) => (
          <div key={k}>
            <span className="inline-block w-20 shrink-0 text-primary sm:w-24">{k}</span>{' '}
            <span className="text-muted-foreground">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
