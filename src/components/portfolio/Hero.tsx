import { motion } from 'motion/react';
import { ArrowRight, Command as CommandIcon, FolderGit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { profile } from '@/data/profile';
import Terminal from './Terminal';
import { useCommandPalette } from '@/hooks/use-command-palette';

export default function Hero() {
  const { toggle } = useCommandPalette();
  return (
    <section id="top" className="relative mx-auto max-w-6xl px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-20 lg:pt-24">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col justify-center"
        >
          <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-border/80 bg-card/60 px-3 py-1 font-mono text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary animate-pulse" />
            available for work
          </div>
          <h1 className="text-balance text-[2.25rem] font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-3 font-mono text-xs text-primary sm:text-sm">
            {profile.role}
            <span className="text-muted-foreground"> · {profile.focus.join(' · ')}</span>
          </p>
          <p className="mt-5 max-w-xl text-balance text-base text-muted-foreground sm:mt-6 sm:text-lg">
            {profile.tagline}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-2 sm:mt-8 sm:gap-3">
            <Button asChild className="gap-2 sm:h-10 sm:px-6 sm:text-base">
              <a href="#projects">
                <FolderGit2 className="size-4" />
                View projects
                <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button asChild variant="outline" className="sm:h-10 sm:px-6 sm:text-base">
              <a href="#contact">Get in touch</a>
            </Button>
            <Button
              variant="ghost"
              onClick={toggle}
              className="hidden gap-2 font-mono text-xs sm:inline-flex sm:h-10"
            >
              <CommandIcon className="size-4" />
              ⌘K menu
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        >
          <Terminal />
        </motion.div>
      </div>
    </section>
  );
}
