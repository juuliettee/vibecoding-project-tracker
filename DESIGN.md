# Vibecoding Project Tracker (VibeFlow) — Design System

**Status:** Completed design specification (`design-done`)  
**Credits:** Based on the hackathon starter template by Prof. Dr. Ignacio Alvarez; completed by Juliette

---

## 1. Mood / vibe

*Fast, focused, and high-contrast — a dark-slate workspace inspired by Linear and Raycast, designed to reduce glare and keep prompt context readable during long AI pair-programming sessions.*

Visual references:

- **[Linear](https://linear.app):** Inspired the compact dark card layout, subtle borders, and status grouping.
- **[Raycast](https://www.raycast.com):** Inspired the monospace metadata badges, command-style modals, and keyboard-friendly controls.
- **[Vercel Dashboard](https://vercel.com):** Inspired the restrained dark surfaces and clear status indicators.

Anti-references — what we explicitly avoid:

- Cluttered enterprise boards with nested sub-menus and low-contrast grey-on-grey text.
- Unstyled default templates with inconsistent spacing.

## 2. Color palette & Tailwind tokens

Defined in `tailwind.config.js` and `src/index.css` using Tailwind's Slate palette for dark surfaces (`#0f172a` / `#1e293b`) and RGB CSS variables (`--brand-primary`, `--brand-accent`) for the brand accent so Tailwind opacity modifiers (`bg-brand-primary/20`, `border-brand-primary/40`) work across all user-selected themes.

### Brand & Surface tokens

| Token | Default Hex / RGB | Where it shows up |
|---|---|---|
| `brand.primary` | `#a5b4fc` (`165 180 252`) | Primary buttons, active filter pills, focus rings, prompt badges (configurable in Accessibility Menu) |
| `brand.accent` | `#c4b5fd` (`196 181 253`) | Wordmark gradient, secondary highlights, report deliverable icon |
| `surface.page` | `#0f172a` | Main page background and modal surfaces |
| `surface.card` | `#1e293b` | Task cards, inputs, dropdowns, and toast background |
| `text-primary` | `#f8fafc` | Primary headings, card titles, and body copy |
| `text-muted` | `#94a3b8` | Secondary captions, timestamps, and column counts |

### Task type tokens (`tag-style`)

| Token | Hex | When used |
|---|---|---|
| `type-feature` | `#34d399` | Cards tagged `feature` (4px left emerald border + bolt icon + `FEATURE` label) |
| `type-bug` | `#fca5a5` | Cards tagged `bug` (4px left red border + warning icon + `BUG` label) |

### Due-date urgency tokens (`due-tint`)

Every due-date badge pairs its colour with an explicit text label (`On track`, `Due soon`, `Overdue`, `Done`) by default so deadline urgency is never communicated by colour alone (WCAG 1.4.1), and uses lighter tints (`-300`/`-400`) that pass ≥ 4.5:1 contrast on dark card surfaces (WCAG 1.4.3).

| Token | Hex | Label | When used |
|---|---|---|---|
| `due.safe` | `#34d399` | `On track` | 2 or more days away |
| `due.warning` | `#fbbf24` | `Due soon` | Due today or tomorrow (0–1 days away) |
| `due.overdue` | `#fca5a5` | `Overdue` | Past due date (< 0 days) |
| `due.neutral` | `#94a3b8` | `Done` | Task is in `Done` stage (overrides due date) or has no due date |

## 3. Typography & Display Options

Loaded via Google Fonts in `index.html` and configured in `tailwind.config.js`:

| Role | Font Family | Why |
|---|---|---|
| Heading & Body (`font-sans`) | `Inter, ui-sans-serif, system-ui, sans-serif` | Clean legibility at compact 12px–14px card sizes |
| Monospace (`font-mono`) | `JetBrains Mono, ui-monospace, monospace` | Visual separation for prompt context blocks, task IDs, emails, and dates |

Display & accessibility controls:

- **Text Size Options:** Toggle between `100%` (`normal`), `110%` (`large`), and `120%` (`xlarge`) root font sizes via the Accessibility Menu (alongside standard browser zoom up to 200%).
- **High-Contrast Borders:** Upgrades card and column outlines to thicker 2px borders with stronger surface contrast.
- **User-Defined Accent Colours:** Supports 3 cool RGB themes (`Indigo`, `Violet`, `Cyan`). Green, amber, and red accents are intentionally excluded so the brand colour never clashes with `Feature`/`On track` (`#34d399`), `Due soon` (`#fbbf24`), or `Bug`/`Overdue` (`#fca5a5`).
- **Keyboard & Screen Reader Semantics:** Modals implement `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, and `Escape` key dismissal; toast notifications use `role="status"` and `aria-live="polite"`.

## 4. Component principles

- **Cards:** `surface-card` tiles with a 4px left type stripe (`type-feature` or `type-bug`), deadline urgency border/surface tint and text label, monospace prompt context preview, inline stage selector, and one-click prompt copy.
- **Buttons:** Solid `brand-primary` fills for primary actions and subtle `brand-primary/15` tinted buttons for secondary prompt actions.
- **Modals:** Centered `surface-page` dialog over a frosted `slate-950/75` backdrop with `200ms` `animate-fadeIn` transition.
- **Empty states:** Dashed border containers with clear prompts (`No tasks here — ready for the next prompt.` and `+ Paste {Label} Link`).

## 5. Voice / microcopy

| Where | Text |
|---|---|
| "+" button label | `+ Add Task` |
| Empty column placeholder | `No tasks here — ready for the next prompt.` |
| Toast after "Copy as Prompt Context" | `Prompt briefing copied! Paste into Claude/ChatGPT/Cursor.` |
| Confirm-delete message | `Delete this vibecoding task? You cannot undo this action.` |
| Handoff toast (`task-owner`) | `Handed off to {name}. They've got it!` |

## 6. Wordmark

- **Product name:** `VibeFlow`
- **Wordmark style:** `Vibe` in bold white and `Flow` in a `from-brand-primary to-brand-accent` gradient (`bg-clip-text text-transparent`).
