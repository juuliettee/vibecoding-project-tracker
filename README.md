# VibeFlow — Vibecoding Project Tracker

**VibeFlow** is a Kanban-style project and prompt context tracker designed for software engineering teams building with AI coding assistants (Claude, ChatGPT, Cursor, Lovable, Replit). It pairs task lifecycle tracking with curated prompt briefings so teammates can hand off tasks and resume AI pair-programming sessions without losing prompt context.

---

## Key Features

- **Workspace Demo Sign-In & Profile Switcher:** Presents a client-side sign-in screen on initial load with one-click demo user profiles (`Juliette`, `Alex Chen`, `Sam Rivera`) and an email + demo passcode (`2026`) form, plus instant profile switching and sign-out from the header.
- **Four-Stage Kanban Board:** Tracks tasks across `To Do`, `In Progress`, `Review`, and `Done` with inline stage switching, task counts, and full `localStorage` persistence.
- **Visual Type & Deadline Tinting:** Distinguishes `Feature` (`#10b981`) vs. `Bug` (`#ef4444`) tasks with left accent stripes and highlights deadline urgency (`Overdue`, `Warning`, `Safe`, and `Neutral` when completed).
- **Curated Prompt Context & One-Click Copy:** Stores the working prompt briefing, target AI tool, and last-saved timestamp on every task. Clicking **Copy as Prompt Context** serializes the task and prompt context into a structured Markdown briefing on the clipboard.
- **Vibe Coding Prompt History Studio:** Aggregates all curated prompts across the project into a searchable studio with one-click full Markdown history export.
- **Pinned Deliverable Anchor Board:** Provides four deliverable slots (`Presentation`, `Demo`, `Report`, `Documentation`) above the Kanban board where team members can paste, edit, and pin project links as they are produced.
- **Team Directory & Role Management:** Stores team member names, `@example.com` contact emails, and specialist roles (`Senior Developer`, `Junior Developer`, `Architect`, `UX Member`, `Database Creator`, `Software Engineer`), supporting dynamic addition and removal of team members.
- **Accessibility & Custom Theme Suite:** Includes WCAG text size scaling (`100%`, `110%`, `120%`), High-Contrast border and explicit `[OVERDUE]`/`[WARNING]`/`[SAFE]` status tag mode, six user-definable RGB brand accent colours, keyboard navigation, and ARIA semantics.

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start the Vite development server
npm run dev

# 3. Build for production
npm run build
```

---

## Project Structure

```text
.
├── PRD.md                           # Product Requirements Document
├── DESIGN.md                        # Design System & Accessibility Specification
├── PITCH.md                         # 5-Minute Pitch & Live Demo Walkthrough
├── index.html                       # App entry HTML (loads Inter & JetBrains Mono)
├── tailwind.config.js               # Design tokens, RGB CSS variables & animations
└── src/
    ├── App.jsx                      # Main board, filter bar & localStorage state
    ├── index.css                    # Tailwind directives & root CSS variables
    ├── utils/
    │   └── promptSerializer.js      # Markdown prompt context serializer & clipboard helper
    └── components/
        ├── AnchorBoard.jsx          # Pinned Deliverable Anchor Board
        ├── TaskCard.jsx             # Kanban task card with inline handoff, stage & copy actions
        ├── TaskModal.jsx            # Create / Edit / Delete task modal with Prompt Context
        ├── PromptVaultModal.jsx     # Vibe Coding Prompt History Studio & Markdown exporter
        ├── LoginModal.jsx           # Client-side demo sign-in & profile switcher
        ├── TeamModal.jsx            # Team directory & role management modal
        ├── AccessibilityMenu.jsx    # Text scaling, high-contrast & accent colour controls
        └── Toast.jsx                # Accessible live-region toast notifications
```
