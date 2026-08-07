import { motion } from 'motion/react';
import { Copy, Mail, ArrowUpRight } from 'lucide-react';
import { toast } from 'sonner';
import Section from './Section';
import { profile } from '@/data/profile';

export default function Contact() {
  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    toast.success('Email copied to clipboard');
  };

  return (
    <Section
      id="contact"
      eyebrow="~/contact"
      title="Let's build something."
      description="Best way to reach me is email. I read everything, and reply to most."
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-6 sm:p-8 lg:p-10"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="font-mono text-xs text-primary">$ contact</div>
            <a
              href={`mailto:${profile.email}`}
              className="mt-2 block break-all text-xl font-semibold tracking-tight hover:text-primary sm:text-2xl lg:text-3xl"
            >
              {profile.email}
            </a>
            <div className="mt-4 flex flex-wrap gap-2">
              {profile.socials
                .filter((s) => s.label !== 'Email')
                .map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background/60 px-3 py-1.5 text-sm text-muted-foreground hover:border-primary/50 hover:text-primary"
                  >
                    {s.label}
                    <ArrowUpRight className="size-3.5" />
                  </a>
                ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={copyEmail}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-border bg-background/60 px-4 py-2.5 text-sm hover:border-primary/50 hover:text-primary sm:flex-none"
            >
              <Copy className="size-4" /> Copy
            </button>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 sm:flex-none"
            >
              <Mail className="size-4" /> Send an email
            </a>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
