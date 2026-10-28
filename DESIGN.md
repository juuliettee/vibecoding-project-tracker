# Vibecoding Project Tracker (VibeFlow) — Design System

**Status:** Completed design specification (`design-done`)  
**Author:** Juliette (Individual Coursework Submission — CM6312 Adopting Technologies)

---

## 1. Mood / vibe

*Fast, focused, and high-contrast — a dark-slate workspace inspired by Linear and Raycast, designed to reduce eye strain and keep prompt context visible during long AI pair-programming sessions.*

Visual references:

- **Linear:** High-density dark slate surfaces (`#0f172a` / `#1e293b`) and clear card hierarchy.
- **Raycast:** Monospace metadata badges (`JetBrains Mono`), subtle 1px borders, and keyboard-friendly modals.
- **Vercel Dashboard:** High-contrast status indicators and restrained visual noise.

Anti-references — what we explicitly avoid:

- Cluttered enterprise boards with nested sub-menus and low-contrast grey-on-grey text.
- Unstyled default templates with inconsistent spacing.

## 2. Color palette & Tailwind tokens

Defined in `tailwind.config.js` and `src/index.css`. Brand tokens use RGB CSS variables (`--brand-primary`, `--brand-accent`) so Tailwind opacity modifiers (such as `bg-brand-primary/20` and `border-brand-primary/40`) work dynamically across all user-selected accent themes.

### Brand & Surface tokens

| Token | Default Hex / RGB | Where it shows up |
|---|---|---|
| `brand-primary` | `#6366f1` (`99 102 241`) | Primary buttons, active filter pills, focus rings, prompt badges (user-configurable in Accessibility Menu) |
| `brand-accent` | `#8b5cf6` (`139 92 246`) | Wordmark gradient, secondary highlights, report deliverable icon |
| `surface-page` | `#0f172a` | Main page background and modal surfaces |
| `surface-card` | `#1e293b` | Task cards, inputs, dropdowns, and toast background |
| `text-primary` | `#f8fafc` | Primary headings, card titles, and body copy |
| `text-muted` | `#94a3b8` | Secondary captions, timestamps, and column counts |

### Task type tokens (`tag-style`)

| Token | Hex | When used |
|---|---|---|
| `type-feature` | `#10b981` | Cards tagged `feature` (4px left emerald border + bolt badge) |
| `type-bug` | `#ef4444` | Cards tagged `bug` (4px left crimson border + warning badge) |

### Due-date urgency tokens (`due-tint`)

| Token | Hex | When used |
|---|---|---|
| `due-safe` | `#10b981` | More than 1 day remaining |
| `due-warning` | `#f59e0b` | Due today or tomorrow (within 24–48 hours) |
| `due-overdue` | `#ef4444` | Past due date |
| `due-neutral` | `#64748b` | Task is in `Done` stage (overrides due date) or has no due date |

## 3. Typography & Accessibility

Loaded via Google Fonts in `index.html` and configured in `tailwind.config.js`:

| Role | Font Family | Why |
|---|---|---|
| Heading & Body (`font-sans`) | `Inter, ui-sans-serif, system-ui, sans-serif` | High x-height and legibility at compact 12px–14px card sizes |
| Monospace (`font-mono`) | `JetBrains Mono, ui-monospace, monospace` | Clear visual separation for prompt context blocks, task IDs, emails, and dates |

Accessibility & customisation support:

- **Root Text Size Scaling:** Toggle between `100%` (`normal`), `110%` (`large`), and `120%` (`xlarge`) root font sizes via the Accessibility Menu.
- **High-Contrast Mode:** Upgrades card outlines to 2px high-contrast borders and appends explicit text status tags (`[OVERDUE]`, `[WARNING]`, `[SAFE]`) to due dates so urgency is never communicated by colour alone.
- **User-Definable Accent Colours:** Supports 6 RGB themes (`Indigo`, `Emerald`, `Violet`, `Cyan`, `Rose`, `Amber`).
- **Keyboard & Screen Reader Semantics:** All modals implement `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, and `Escape` key dismissal; toast notifications use `role="status"` and `aria-live="polite"`.

## 4. Component principles

- **Cards:** `surface-card` tiles with a 4px left type stripe (`type-feature` or `type-bug`), deadline urgency border/surface tint, monospace prompt context preview, inline stage selector, and one-click prompt copy.
- **Buttons:** Solid `brand-primary` fills for primary actions and subtle `brand-primary/15` tinted buttons for secondary prompt actions.
- **Modals:** Centered `surface-page` dialog over a frosted `slate-950/75` backdrop with `200ms` `animate-fadeIn` transition.
- **Empty states:** Dashed border containers with clear, actionable prompts (`No tasks here — ready for the next prompt.` and `+ Paste {Label} Link`).

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
