# VibeFlow — Vibecoding Project Tracker

**Live App:** [https://vibecoding-project-tracker-rho.vercel.app](https://vibecoding-project-tracker-rho.vercel.app) *(opens publicly with no registration required; demo passcode: `2026`)*

**VibeFlow** is a Kanban project and prompt context tracker for software engineering teams building with AI coding assistants (Claude, ChatGPT, Cursor, Lovable, Replit). It pairs task tracking with curated prompt briefings so teammates can hand off tasks and resume AI sessions without losing prompt context.

*Based on the hackathon starter repository by Prof. Dr. Ignacio Alvarez; extended by Juliette.*

---

## Features

- **Workspace Sign-In & Profile Switcher:** Shows a client-side sign-in screen on first load with one-click demo profiles (`Juliette`, `Tom Davies`, `Hannah Evans`) or an email + demo passcode (`2026`) form, plus profile switching and sign-out from the header.
- **Four-Stage Kanban Board:** Tracks tasks across `To Do`, `In Progress`, `Review`, and `Done` with inline stage switching, task counts, and `localStorage` persistence.
- **Type & Deadline Indicators:** Distinguishes `Feature` (`#10b981`) and `Bug` (`#ef4444`) cards with left stripes and icons, and displays deadline status using both colour tints and explicit text labels (`Overdue`, `Due soon`, `On track`, `Done`). Seed tasks use dates calculated relative to today so all urgency states are visible whenever the board is opened.
- **Curated Prompt Context & One-Click Copy:** Stores the working prompt briefing, target AI tool, and last-saved timestamp on every task. Clicking **Copy as Prompt Context** formats the task and prompt context into a Markdown briefing on the clipboard.
- **Prompt Studio & Board Filters:** Lists all saved prompts across the project with one-click Markdown export, alongside filters for search text, "My Tasks", assignee, task type, and AI tool.
- **Deliverable Anchor Board:** Provides four deliverable slots (`Presentation`, `Demo`, `Report`, `Documentation`) pinned above the Kanban board where users can paste, edit, and clear project links.
- **Team Directory:** Stores team member names, `@example.com` contact emails, and roles (`Senior Developer`, `Junior Developer`, `Architect`, `UX Member`, `Database Creator`, `Software Engineer`), with support for adding and removing members (and automatic task reassignment on removal).
- **Accessibility & Display Menu:** Includes text size options (`100%`, `110%`, `120%`), a High-Contrast border toggle, three brand accent colours (`Indigo`, `Violet`, `Cyan`), keyboard navigation, and ARIA dialog/live-region attributes.

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
├── DESIGN.md                        # Design System & Token Specification
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
        ├── PromptVaultModal.jsx     # Prompt Studio & Markdown exporter
        ├── LoginModal.jsx           # Client-side demo sign-in & profile switcher
        ├── TeamModal.jsx            # Team directory & role management modal
        ├── AccessibilityMenu.jsx    # Text size options, high-contrast & accent colour controls
        └── Toast.jsx                # Live-region toast notifications
```
