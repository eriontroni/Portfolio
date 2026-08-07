import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  title?: string;
  children: ReactNode;
  className?: string;
};

export default function TerminalWindow({ title = 'erion@troni: ~', children, className }: Props) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-xl border border-border/70 bg-card/70 shadow-2xl shadow-black/40 backdrop-blur',
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-border/60 bg-background/40 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
          <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
          <span className="size-2.5 rounded-full bg-[#28c840]/80" />
        </div>
        <div className="font-mono text-[11px] text-muted-foreground">{title}</div>
        <div className="w-12" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
