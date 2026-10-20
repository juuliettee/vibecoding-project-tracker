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

### Brand

| Token | Hex | Where it shows up |
|---|---|---|
| `brand-primary` | `#6366f1` | Header, "+" button, focus rings, primary action states |
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

## 3. Typography

| Role | Font | Why |
|---|---|---|
| Heading | `Inter, ui-sans-serif, system-ui` | Geometric clarity and modern crispness across headers |
| Body | `Inter, ui-sans-serif, system-ui` | High legibility at 13px–15px in dense card layouts |
| Monospace (tags, badges, code) | `JetBrains Mono, ui-monospace, monospace` | Technical feel for prompt context, git hashes, and timestamps |

Suggested sizes (override only if the design demands it):

- Page title: 24 px / semibold
- Section header: 16 px / semibold uppercase
- Card title: 14 px / medium
- Body: 14 px / regular
- Caption: 12 px / regular muted

## 4. Component principles

One short sentence per element. These set the tone for the build phase — Person A's modal and Person B's anchor board should both feel like they came from this doc.

- **Cards:** Clean dark slate tiles with 1px border, subtle top accent indicator, hover elevation, and immediate readable metadata.
- **Buttons:** Solid tactile fills with slight hover brightness, smooth 150ms transitions, and unmistakable active focus rings.
- **Modal:** Centered slate-800 modal with 1px border, frosted dark backdrop overlay (50% opacity), and explicit keyboard/escape dismiss.
- **Empty states:** Dashed slate-700 border with warm, motivating copy — never sterile or discouraging.
- **Drag affordance (if used):** Crisp stage action buttons and status dropdowns for rapid, deterministic state changes.

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
- **Wordmark style:** `VibeFlow` with `Vibe` in bold slate-100 and `Flow` in an indigo-to-purple gradient (`text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400`).

## 7. Out of scope (this hackathon)

To keep design tight, the following are explicitly not part of `design-done`:

- A dark mode toggle. Pick one mode (dark slate) and ship it.
- Multiple themes. One brand, applied consistently.
- Animations beyond a 200 ms fade on toast notifications.
- A custom icon set. Use inline SVGs or clean Lucide-style iconography.

---

*DESIGN.md version: hackathon-starter v1 · Completed by Alex Chen (Person B)*
