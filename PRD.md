# Vibecoding Project Tracker (VibeFlow) — Product Requirements Document

**Status:** Completed specification (`prd-done`)  
**Credits:** Based on the hackathon starter PRD by Prof. Dr. Ignacio Alvarez; extended by Juliette

---

## 1. Problem

Vibecoding teams have two recurring pains with large projects:

1. **They lose track of tasks.** Multiple teammates, dozens of small features and bugs, and no shared view of what state each task is actually in.
2. **They lose track of prompts.** The AI assistant produced working code two days ago, but no one remembers the prompt or constraints that produced it. When teammates need to iterate, they start from scratch.

A spreadsheet doesn't solve this. A heavyweight project tool (Linear, Jira, Notion) is overkill, doesn't know about prompts, and takes hours to configure.

## 2. Target users

- **Primary:** Software engineering teams (developers, architects, UX designers, and database engineers) collaborating on a single-project vibecoding sprint.
- **Secondary:** Course evaluators and future cohorts reviewing prompt engineering workflows.

## 3. Product overview

A single-page web application with two main surfaces and supporting workflow tools:

- A **Kanban board** where vibecoding tasks move through four states (`To Do`, `In Progress`, `Review`, `Done`).
- An **Anchor Board** pinned above it for the four final-project deliverables (`Presentation`, `Demo`, `Report`, `Documentation`), starting empty (`url: null`) so users can paste and pin deliverable links as they are produced.
- **Supporting tools:**
  - **Prompt Studio & Filter Bar:** Lists all saved prompt briefings with one-click Markdown export, alongside board filters for search text, "My Tasks", assignee, task type, and AI tool.
  - **Client-Side Demo Sign-In:** Shows a sign-in modal on initial load with one-click demo user profiles and an email + demo passcode (`2026`) form. *(Client-side demo authentication only, stored in `localStorage`; production use would require server-side authentication and hashed credentials.)*
  - **Team Directory:** Stores each team member's name, contact email, and role (`Senior Developer`, `Junior Developer`, `Architect`, `UX Member`, `Database Creator`, `Software Engineer`), allowing members to be added or removed (with automatic task reassignment).
  - **Accessibility & Theme Menu:** Provides text size options (`100%`, `110%`, `120%`), a High-Contrast border toggle, and three user-selectable brand accent colours (`Indigo`, `Violet`, `Cyan`).

## 4. Primary user flow

1. Open the web app and sign in via one-click demo profile selection or by entering a team email and the demo passcode (`2026`).
2. Click `+ Add Task` to create a task with title, description, type (`feature` or `bug`), stage, assignee, due date, and curated prompt context.
3. Move tasks across columns as work progresses (via the task modal or the inline stage selector on each card).
4. Click `Copy as Prompt Context` on any task to copy a structured Markdown briefing to the clipboard and paste it into Claude, ChatGPT, or Cursor.
5. Hand off a task to another team member via the card assignee dropdown, or manage team members via the Team Directory.
6. Paste final deliverable links into the Deliverable Anchor Board as they are produced, or export the project's full prompt log via the Prompt Studio.

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
  dueDate: string | null,        // ISO date 'YYYY-MM-DD' (seeded relative to today)
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

// Display & appearance preferences stored in localStorage.
AccessibilityPrefs = {
  fontScale: 'normal' | 'large' | 'xlarge', // 100% | 110% | 120%
  highContrast: boolean,
  accent: 'indigo' | 'violet' | 'cyan',
}
```

## 6. Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | React 18 (via Vite) | Component-based UI and state management. |
| Styling | Tailwind CSS 3 + CSS RGB Variables | Utility-first styling with `--brand-primary` RGB alpha support. |
| State & Persistence | React `useState` + `useLocalStorage` | Client-side persistence across page reloads without a backend. |
| Deploy | Vercel | Public static hosting with no registration required to view. |

## 7. Stage names

Four columns, in this order, with these exact labels in the UI:

1. **To Do**
2. **In Progress**
3. **Review**
4. **Done**

## 8. Demo profiles

Three user profiles are seeded using `@example.com` addresses (`Tom Davies` and `Hannah Evans` are demo user profiles for testing sign-in and task handoff):

| Profile | Name | Email | Role |
|---|---|---|---|
| Author | Juliette | `juliette@example.com` | Senior Developer |
| Demo | Tom Davies | `tom@example.com` | UX Member |
| Demo | Hannah Evans | `hannah@example.com` | Architect |

## 9. Milestone implementation record

All milestones were completed by **Juliette**:

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
- Multi-project or multi-team workspaces (scoped to one project for one team).
- Real-time WebSocket collaboration.
