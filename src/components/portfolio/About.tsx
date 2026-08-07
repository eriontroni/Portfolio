import Section from './Section';
import AnimatedCounter from './AnimatedCounter';
import { profile } from '@/data/profile';
import { MapPin, Mail, Globe } from 'lucide-react';

export default function About() {
  return (
    <Section id="about" eyebrow="~/about" title="A developer, obsessed with the boring parts that matter.">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-4 text-base text-muted-foreground sm:text-lg">
          <p>{profile.bio}</p>
          <p>
            I care about reliability, feedback loops, and code that survives contact with production. Most of my time
            goes into backend services, cloud infrastructure, and the small tools that make a team faster.
          </p>
        </div>

        <div className="rounded-xl border border-border/70 bg-card/60 p-5 sm:p-6">
          <div className="mb-6 grid grid-cols-3 gap-3 sm:gap-4">
            {profile.stats.map((s) => (
              <div key={s.label}>
                <div className="font-mono text-2xl font-semibold text-primary sm:text-3xl">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-[11px] text-muted-foreground sm:text-xs">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="space-y-3 border-t border-border/70 pt-4 text-sm">
            <Row icon={<MapPin className="size-4" />} label="Location" value={profile.location} />
            <Row icon={<Mail className="size-4" />} label="Email" value={profile.email} href={`mailto:${profile.email}`} />
            <Row icon={<Globe className="size-4" />} label="Site" value={profile.site} href={`https://${profile.site}`} />
          </div>
        </div>
      </div>
    </Section>
  );
}

function Row({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const content = <span className="truncate text-foreground">{value}</span>;
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex shrink-0 items-center gap-2 text-muted-foreground">
        {icon}
        <span>{label}</span>
      </div>
      {href ? (
        <a
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel="noopener"
          className="min-w-0 truncate text-right hover:text-primary"
        >
          {content}
        </a>
      ) : (
        <span className="min-w-0 truncate text-right">{content}</span>
      )}
    </div>
  );
}
