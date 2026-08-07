import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import Section from './Section';
import { experience } from '@/data/experience';
import { cn } from '@/lib/utils';

export default function Experience() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="experience" eyebrow="~/experience" title="Where I've been." description="Roles, projects, and the outcomes I'm proud of.">
      <ol className="relative border-l border-border/70 pl-6">
        {experience.map((e, i) => {
          const isOpen = open === i;
          return (
            <li key={i} className="mb-4 last:mb-0">
              <span className="absolute -left-[7px] mt-4 size-3 rounded-full border-2 border-background bg-primary" />
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className={cn(
                  'group flex w-full items-start justify-between gap-3 rounded-xl border border-border/70 bg-card/60 p-4 text-left transition-colors hover:border-primary/40 sm:gap-4 sm:p-5'
                )}
              >
                <div className="min-w-0">
                  <div className="font-mono text-xs text-primary">{e.period}</div>
                  <div className="mt-1 text-base font-semibold sm:text-lg">
                    {e.role} <span className="text-muted-foreground">@ {e.company}</span>
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">{e.location}</div>
                  <p className="mt-3 text-sm text-muted-foreground">{e.summary}</p>
                </div>
                <ChevronDown
                  className={cn(
                    'mt-1 size-5 shrink-0 text-muted-foreground transition-transform',
                    isOpen && 'rotate-180 text-primary'
                  )}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2 rounded-xl border border-dashed border-border/70 bg-background/40 p-5">
                      <ul className="space-y-2 text-sm">
                        {e.highlights.map((h, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                            <span className="text-foreground/90">{h}</span>
                          </li>
                        ))}
                      </ul>
                      {e.stack && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {e.stack.map((s) => (
                            <span key={s} className="rounded-md border border-border bg-card/60 px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
