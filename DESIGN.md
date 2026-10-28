# Vibecoding Project Tracker — Design

**Status:** Completed design doc · Tag: `design-done`.

**Why this file exists.** This tracker is your tool. It should look like *your* tool — not a generic Kanban with default Tailwind blue. Twenty minutes of design decisions here will be visible on every screen for the next six weeks of Module 5.

**Who owns this.** Person B (Alex Chen), during the same window the rest of the team is reviewing the PRD. By the time the team converges to start M4 (`data-model`), this file should be filled in and the colors should already be in `tailwind.config.js`.

---

## 1. Mood / vibe

One sentence that captures the feeling the tracker should leave you with:

*Fast, focused, and electric — feels like an Obsidian canvas crossed with Linear, engineered specifically for high-velocity AI pair programming.*

Two or three references that capture the vibe:

- Linear.app's sleek dark slate palette and high-density card ergonomics
- Raycast's crisp monospace badges, subtle borders, and keyboard-first simplicity
- Vercel dashboard's minimalist contrast and information clarity

Anti-references — what we are explicitly **not** trying to look like:

- Cluttered, sluggish corporate Jira enterprise boards with 50 dropdown filters
- Generic, default Bootstrap blue templates with rounded bubble corners

## 2. Color palette

These are the colors the build milestones will reference. Once chosen, paste the hex values into `tailwind.config.js` so the rest of the team can use Tailwind utility classes (e.g. `bg-brand-primary`, `border-due-warning`).

### Brand (with M12 User-Definable Accent Support)

| Token | Hex | Where it shows up |
|---|---|---|
| `brand-primary` | `#6366f1` | Default primary brand accent (user-customizable in M12 Accessibility Menu: Indigo, Emerald, Violet, Cyan, Rose, Amber) |
| `brand-accent` | `#8b5cf6` | Highlights, hover states, badges, prompt actions |
| `surface-page` | `#0f172a` | Page background (deep dark slate) |
| `surface-card` | `#1e293b` | Card background, modals, dropdown menus |
| `text-primary` | `#f8fafc` | Primary titles, body text, card headers |
| `text-muted` | `#94a3b8` | Captions, dates, metadata counts, secondary badges |

### Task type (M6 `tag-style`)

| Token | Hex | When used |
|---|---|---|
| `type-feature` | `#10b981` | Cards tagged `feature` (accent emerald stripe + icon) |
| `type-bug` | `#ef4444` | Cards tagged `bug` (accent crimson stripe + icon) |

### Due-date states (M8 `due-tint`)

| Token | Hex | When used |
|---|---|---|
| `due-safe` | `#10b981` | More than 2 days out |
| `due-warning` | `#f59e0b` | Less than 24 hours |
| `due-overdue` | `#ef4444` | Past due |
| `due-neutral` | `#64748b` | Done (overrides date) |

## 3. Typography & Accessibility (`!!`)

| Role | Font | Why |
|---|---|---|
| Heading | `Inter, ui-sans-serif, system-ui` | Geometric clarity and modern crispness across headers |
| Body | `Inter, ui-sans-serif, system-ui` | High legibility at 13px–15px in dense card layouts |
| Monospace (tags, badges, code) | `JetBrains Mono, ui-monospace, monospace` | Technical feel for prompt context, git hashes, and timestamps |

Suggested sizes & Accessibility Scaling:

- Page title: 24 px / semibold
- Section header: 16 px / semibold uppercase
- Card title: 14 px / medium
- Body: 14 px / regular
- Caption: 12 px / regular muted
- **Accessibility Scaling (M12):** Supports live root font scaling (`100%`, `110%`, `120%`), High-Contrast border and explicit status tag mode (`[OVERDUE]`, `[WARNING]`, `[SAFE]`), semantic ARIA landmarks (`role="dialog"`, `aria-modal="true"`, `aria-live="polite"`), and keyboard navigation (`Tab`, `Enter`, `Escape`).

## 4. Component principles

One short sentence per element. These set the tone for the build phase — Person A's modal and Person B's anchor board should both feel like they came from this doc.

- **Cards:** Clean dark slate tiles with 1px border, subtle left type stripe, deadline surface tint, prompt snippet preview, and immediate readable metadata.
- **Buttons:** Solid tactile fills with slight hover brightness, smooth 150ms transitions, and unmistakable active focus rings.
- **Modal:** Centered slate-900 modal with 1px border, frosted dark backdrop overlay, and explicit keyboard/escape dismiss.
- **Empty states:** Dashed slate-800 border with warm, motivating copy — never sterile or discouraging.
- **Stage movement affordance:** Crisp stage selector directly on each card header plus full modal status control for rapid, deterministic state changes.

## 5. Voice / microcopy

Three lines of microcopy that capture the tone of the product. Keep it short — these are the words a stressed user reads at 11pm.

| Where | Text |
|---|---|
| "+" button label | `+ Add Task` |
| Empty column placeholder | `No tasks here — ready for the next prompt.` |
| Toast after "Copy as Prompt Context" | `Prompt briefing copied! Paste into Claude/ChatGPT/Cursor.` |
| Confirm-delete message | `Delete this vibecoding task? You cannot undo this action.` |
| Handoff toast (M7 `task-owner`) | `Handed off to {name}. They've got it!` |

## 6. Logo / wordmark

The tracker probably doesn't need a logo, but it does need a name and a wordmark style.

- **Product name:** `VibeFlow`
- **Wordmark style:** `VibeFlow` with `Vibe` in bold white and `Flow` in a dynamic user-definable accent-to-purple gradient.

---

*DESIGN.md version: hackathon-starter v1 · Completed by Alex Chen (Person B) & Team VibeFlow*
