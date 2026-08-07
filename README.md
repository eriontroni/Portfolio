# erion.troni.dev — portfolio

Personal developer portfolio for Erion Troni. A single static React + Vite + TypeScript site with an interactive terminal, `⌘K` command palette, and animated sections. Deploys to `https://erion.troni.dev`.

## Stack

- React 19 + Vite 7 + TypeScript
- Tailwind CSS v4 (CSS-first, config in `src/index.css`)
- `motion` for animations
- `cmdk` for the command palette
- `next-themes` + `sonner` + `lucide-react` + shadcn-style Radix primitives

## Editing content

All content lives in `src/data/`:

- `profile.ts` — name, role, bio, email, socials, stats
- `skills.ts` — grouped by category
- `experience.ts` — timeline entries
- `projects.ts` — project cards + detail-panel content
- `commands.ts` — terminal command registry

Placeholders are marked `[TODO: …]`. Search for `TODO` to find everything that still needs your input.

Drop your resume at `public/resume.pdf`.

## Scripts

```bash
npm install
npm run dev      # local dev
npm run build    # type-check + production bundle → dist/
npm run preview  # preview the production bundle
npm run lint
```

## Terminal

Type `help` in the terminal on the landing page. Supports command history (↑/↓), Tab autocomplete, and `Ctrl/⌘+L` to clear.

## Command palette

Press `⌘K` (macOS) or `Ctrl+K` (Windows/Linux) anywhere.
