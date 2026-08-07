import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Section from './Section';
import { skills } from '@/data/skills';
import { cn } from '@/lib/utils';

export default function Skills() {
  const [active, setActive] = useState<string>('all');
  const categories = [{ id: 'all', label: 'All' }, ...skills.map(({ id, label }) => ({ id, label }))];

  const visible =
    active === 'all'
      ? skills.flatMap((c) => c.items.map((name) => ({ name, category: c.label })))
      : skills.find((c) => c.id === active)?.items.map((name) => ({ name, category: '' })) ?? [];

  return (
    <Section
      id="skills"
      eyebrow="~/skills"
      title="The stack I reach for."
      description="Curated by what I actually ship — not what I've read a blog post about."
    >
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActive(c.id)}
            className={cn(
              'rounded-full border px-3.5 py-1.5 font-mono text-xs transition-colors',
              active === c.id
                ? 'border-primary/60 bg-primary/10 text-primary'
                : 'border-border bg-card/40 text-muted-foreground hover:border-border/80 hover:text-foreground'
            )}
          >
            {c.label.toLowerCase()}
          </button>
        ))}
      </div>

      <motion.div layout className="flex flex-wrap gap-2">
        <AnimatePresence mode="popLayout">
          {visible.map((item) => (
            <motion.div
              key={`${active}-${item.name}`}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className="group relative rounded-lg border border-border bg-card/60 px-3.5 py-2 text-sm text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/5"
              title={item.category}
            >
              <span className="font-mono text-xs text-muted-foreground group-hover:text-primary">$</span>{' '}
              {item.name}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}
