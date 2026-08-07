import { useEffect, useState } from 'react';
import { Command as CommandIcon, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCommandPalette } from '@/hooks/use-command-palette';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const NAV = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const { toggle } = useCommandPalette();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-colors',
        scrolled ? 'glass border-b border-border/60' : 'bg-transparent'
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-4 sm:px-6">
        <a href="#top" className="group flex min-w-0 items-center gap-2 font-mono text-xs font-semibold tracking-tight sm:text-sm">
          <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/15 text-primary text-[11px] font-bold">
            ET
          </span>
          <span className="truncate text-foreground">ERION<span className="text-muted-foreground">.</span>TRONI</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggle}
            className="hidden gap-2 pl-2.5 pr-2 font-mono text-xs sm:inline-flex"
          >
            <CommandIcon className="size-3.5" />
            <span className="text-muted-foreground">Menu</span>
            <kbd className="ml-1 rounded border border-border bg-background/60 px-1.5 py-0.5 text-[10px] text-muted-foreground">
              {isMac ? '⌘' : 'Ctrl'}K
            </kbd>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            className="sm:hidden"
            aria-label="Open command menu"
          >
            <CommandIcon className="size-5" />
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="font-mono">Navigate</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1 px-4">
                {NAV.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                  >
                    {item.label}
                  </a>
                ))}
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    toggle();
                  }}
                  className="mt-4 flex items-center gap-2 rounded-md border border-border px-3 py-2 text-left font-mono text-xs"
                >
                  <CommandIcon className="size-3.5" />
                  Open command menu
                </button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
