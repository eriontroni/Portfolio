import { profile } from '@/data/profile';

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 sm:flex-row sm:px-6">
        <div className="font-mono text-xs text-muted-foreground">
          <span className="text-primary">$</span> echo "&copy; {new Date().getFullYear()} {profile.name}"
        </div>
        <div className="font-mono text-xs text-muted-foreground">
          built with react · vite · tailwind
        </div>
      </div>
    </footer>
  );
}
