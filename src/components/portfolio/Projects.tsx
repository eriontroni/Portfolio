import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Github, Globe } from 'lucide-react';
import Section from './Section';
import { projects, type Project } from '@/data/projects';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <Section id="projects" eyebrow="~/projects" title="Selected work." description="Sample entries for now — edit src/data/projects.ts to plug in the real ones.">
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((p, i) => (
          <motion.button
            key={p.slug}
            onClick={() => setActive(p)}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            whileHover={{ y: -3 }}
            className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-5 text-left transition-colors hover:border-primary/50 sm:p-6"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-primary">{p.year}</span>
                <span
                  className={cn(
                    'rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide',
                    p.status === 'active' && 'border-success/50 bg-success/10 text-success',
                    p.status === 'wip' && 'border-primary/50 bg-primary/10 text-primary',
                    p.status === 'archived' && 'border-border bg-muted text-muted-foreground'
                  )}
                >
                  {p.status}
                </span>
              </div>
              <h3 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">{p.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.tagline}</p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.tech.slice(0, 5).map((t) => (
                  <span key={t} className="rounded-md border border-border bg-background/60 px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-1 text-sm text-primary">
                <span>View details</span>
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <Dialog open={!!active} onOpenChange={(v) => !v && setActive(null)}>
        <DialogContent className="max-w-2xl">
          {active && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 font-mono text-xs text-primary">
                  <span>{active.year}</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="uppercase">{active.status}</span>
                </div>
                <DialogTitle className="text-2xl">{active.name}</DialogTitle>
                <DialogDescription>{active.tagline}</DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <p className="text-sm leading-relaxed text-muted-foreground">{active.description}</p>

                <div>
                  <div className="mb-2 font-mono text-xs text-primary">features</div>
                  <ul className="space-y-1.5 text-sm">
                    {active.features.map((f, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="mb-2 font-mono text-xs text-primary">stack</div>
                  <div className="flex flex-wrap gap-1.5">
                    {active.tech.map((t) => (
                      <span key={t} className="rounded-md border border-border bg-background/60 px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {active.github && (
                    <a
                      href={active.github}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center gap-2 rounded-md border border-border bg-background/60 px-3 py-2 text-sm hover:border-primary/50 hover:text-primary"
                    >
                      <Github className="size-4" /> Source
                    </a>
                  )}
                  {active.demo && (
                    <a
                      href={active.demo}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                      <Globe className="size-4" /> Live demo
                    </a>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Section>
  );
}
