import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export default function Section({ id, eyebrow, title, description, children, className }: Props) {
  return (
    <section id={id} className={cn('mx-auto max-w-6xl scroll-mt-20 px-4 py-14 sm:px-6 sm:py-20', className)}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.4 }}
        className="mb-10 max-w-2xl"
      >
        <div className="mb-3 flex items-center gap-2 font-mono text-xs text-primary">
          <span className="h-px w-6 bg-primary/60" />
          <span>{eyebrow}</span>
        </div>
        <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
        {description && <p className="mt-3 text-sm text-muted-foreground sm:text-base">{description}</p>}
      </motion.div>
      {children}
    </section>
  );
}
