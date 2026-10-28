# Vibecoding Project Tracker (VibeFlow) — Product Requirements Document

**Status:** Finalized & Implemented  
**Author:** Juliette (Individual Coursework Submission — CM6312 Adopting Technologies)

---

## 1. Problem

Vibecoding teams have two recurring pains with large projects:

1. **They lose track of tasks.** Multiple teammates, dozens of small features and bugs, and no shared view of what state each task is actually in.
2. **They lose track of prompts.** The AI assistant produced working code two days ago, but no one remembers the prompt or constraints that produced it. When teammates need to iterate, they start from scratch.

A spreadsheet doesn't solve this. A heavyweight project tool (Linear, Jira, Notion) is overkill, doesn't know about prompts, and takes hours to configure.

## 2. Target users

- **Primary:** Software engineering team members across core disciplines (**Senior Developer**, **Junior Developer**, **Architect**, **UX Member**, **Database Creator**, **Software Engineer**) collaborating on a single-project vibecoding sprint.
- **Secondary:** Academic evaluators and future cohorts reviewing prompt engineering workflows.

## 3. Product overview

A single-page web application with two persistent surfaces and an integrated Prompt History Studio:

- A **Kanban board** where vibecoding tasks move through four states (`To Do`, `In Progress`, `Review`, `Done`).
- An **Anchor Board** pinned above it for the four final-project deliverables (`Presentation`, `Demo`, `Report`, `Documentation`), initialized empty (`url: null`) so users can paste and pin deliverable URLs as they are produced.
- **Extended Workflow & Accessibility Features:**
  - **Vibe Coding Prompt History Studio & Multi-Facet Filter Bar:** Centralizes all curated prompt briefings with one-click Markdown history export and live filtering by search query, "My Tasks", assignee, task type, and AI tool.
  - **Client-Side Demo Sign-In & Profile Switcher:** Presents a sign-in screen on initial load with one-click demo user profiles and an email + demo passcode (`2026`) form. *(Note: This is client-side demo authentication only, persisted in `localStorage`; a production deployment would require server-side authentication and hashed credentials.)*
  - **Dynamic Team Directory:** Stores team member `Name`, `Contact Email`, and `Role`, allowing teams to add or remove members dynamically.
  - **Accessibility & Custom Accent Toolbar:** WCAG-oriented text size scaling (`100%`, `110%`, `120%`), High-Contrast border and explicit status tag mode, semantic ARIA landmarks, and user-definable RGB brand accent colours.

## 4. Primary user flow

1. Open the web app and sign in via one-click demo profile selection or the email + demo passcode (`2026`) form.
2. Click `+ Add Task` to create a task with title, description, type (`feature` or `bug`), stage, assignee, due date, and curated prompt context.
3. Move tasks across columns as work progresses (via the task modal or the inline stage selector on each card).
4. Click `Copy as Prompt Context` on any task to copy a structured Markdown briefing to the clipboard and paste it into Claude, ChatGPT, or Cursor.
5. Hand off a task to another team member via the card assignee dropdown, or add new team members via the Team Directory.
6. Paste final deliverable links into the Deliverable Anchor Board as they are produced, and export the project's full prompt log via the Prompt Studio.

## 5. Data model

```js
// A single vibecoding task.
Task = {
  id: string,                    // unique identifier
  title: string,
  description: string,
  type: 'feature' | 'bug',       // visual color coding
  status: 'todo' | 'in-progress' | 'review' | 'done',
  assignee: string,              // team member name from Team Directory
  dueDate: string | null,        // ISO date 'YYYY-MM-DD'
  createdDate: string,           // ISO date 'YYYY-MM-DD'
  context: string,               // curated briefing for the next AI / teammate
  contextTool: string | null,    // 'Claude' | 'ChatGPT' | 'Cursor' | 'Lovable' | 'Replit' | 'Other'
  contextUpdatedAt: string|null, // ISO timestamp set automatically on save
}

// One of four pinned deliverable slots (starts with url: null).
Anchor = {
  id: 'presentation' | 'demo' | 'report' | 'documentation',
  label: string,                 // human-readable label
  url: string | null,            // link pasted by the user
}

// Team member profile stored in localStorage.
TeamMember = {
  id: string,
  name: string,
  email: string,                 // RFC 2606 @example.com demo addresses
  role: 'Senior Developer' | 'Junior Developer' | 'Architect' | 'UX Member' | 'Database Creator' | 'Software Engineer',
}

// Accessibility & appearance preferences stored in localStorage.
AccessibilityPrefs = {
  fontScale: 'normal' | 'large' | 'xlarge', // 100% | 110% | 120%
  highContrast: boolean,
  accent: 'indigo' | 'emerald' | 'violet' | 'cyan' | 'rose' | 'amber',
}
```

## 6. Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | React 18 (via Vite) | Fast component rendering and modular state management. |
| Styling | Tailwind CSS 3 + CSS RGB Variables | Utility-first styling with dynamic `--brand-primary` RGB alpha support. |
| State & Persistence | React `useState` + `useLocalStorage` | Zero-latency client-side persistence across page reloads. |
| Deploy | Vercel | Static SPA hosting accessible via public URL without registration. |

## 7. Stage names

Four columns, in this order, with these exact labels in the UI:

1. **To Do**
2. **In Progress**
3. **Review**
4. **Done**

## 8. Seeded team & demo user profiles

To allow evaluators to test multi-user sign-in, filtering, and task handoff in an individual submission, the app seeds three profiles using RFC 2606 reserved `@example.com` addresses (`Alex Chen` and `Sam Rivera` are demo user profiles):

| Profile Type | Name | Contact Email | Role |
|---|---|---|---|
| Author / Developer | Juliette | `juliette@example.com` | Senior Developer |
| Demo User Profile | Alex Chen | `alex.chen@example.com` | UX Member |
| Demo User Profile | Sam Rivera | `sam.rivera@example.com` | Architect |

## 9. Milestone implementation record

All milestones were designed and implemented by **Juliette** (individual coursework submission):

| # | Tag | Milestone Description | Implemented By |
|---|---|---|---|
| 1 | `git-linked` | Repository & webhook configuration | Juliette |
| 2 | `prd-done` | Product Requirements Document | Juliette |
| 3 | `design-done` | Design system & Tailwind token configuration | Juliette |
| 4 | `data-model` | Task data model & 4-column Kanban board | Juliette |
| 5 | `crud-modal` | Add / edit / delete task modal with `localStorage` | Juliette |
| 6 | `tag-style` | Feature vs. bug visual distinction | Juliette |
| 7 | `task-owner` | Assignee badge, handoff dropdown & toast | Juliette |
| 8 | `due-tint` | Deadline urgency badge & card surface tinting | Juliette |
| 9 | `task-context` | Curated Prompt Context field, AI tool & timestamp | Juliette |
| 10 | `copy-context` | "Copy as Prompt Context" Markdown serializer | Juliette |
| 11 | `project-deliverables` | Deliverable Anchor Board above Kanban | Juliette |
| 12 | `secret-sauce` | Prompt Studio, filters, demo sign-in, team directory & accessibility | Juliette |
| 13 | `pitch-done` | Final demo dataset, documentation & deployment | Juliette |

## 10. Team / product identity

- **Product name:** VibeFlow
- **Tagline:** The project tracker that remembers the prompts that built it.

## 11. Out of scope

- Server-side authentication or cloud database backend (authentication is client-side demo sign-in only).
- Real GitHub OAuth / webhook ingestion inside the client app.
- Multi-project or multi-team workspaces (intentionally scoped to one project for one team).
- Real-time WebSocket collaboration.
