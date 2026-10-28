# Vibecoding Project Tracker — PRD

**Status:** Finalized & Approved · Ready for development (`prd-done`).

---

## 1. Problem

Vibecoding teams have two recurring pains with large projects:

1. **They lose track of tasks.** Three teammates, a hundred small things, no shared view. Nothing tells them what state each task is actually in.
2. **They lose track of prompts.** The AI gave them working code two days ago but no one remembers the prompt that produced it. When they need to iterate, they start from scratch.

A spreadsheet doesn't solve this. A real project tool (Linear, Jira, Notion) is overkill, doesn't know about prompts, and takes hours to set up.

## 2. Target users

- **Primary:** Software engineering team members across core disciplines (**Senior Developer**, **Junior Developer**, **Architect**, **UX Member**, **Database Creator**, **Software Engineer**) collaborating on a single-project vibecoding sprint.
- **Secondary:** Future cohorts of vibecoders and academic evaluators reviewing prompt engineering history.

We are designing the tool we ourselves will use. The pitch demo is also our first real user test.

## 3. Product overview

A single-page web app with two persistent surfaces plus an integrated Prompt History Studio:

- A **Kanban board** where vibecoding tasks move through four states (`To Do`, `In Progress`, `Review`, `Done`).
- An **Anchor Board** above it that pins the four final-project deliverables (`Presentation`, `Demo`, `Report`, `Documentation`).
- **M12 Secret Sauce & Client Elicitation Suite:**
  - **Vibe Coding Prompt History Studio & Multi-Facet Filter Bar:** Centralizes all curated prompt briefings with one-click Markdown history export and instant filtering by search query, "My Tasks", assignee, task type, and AI tool.
  - **Client-Side Workspace Sign-In & User Switcher:** Zero-barrier profile sign-in and user switching persisted in `localStorage` (satisfying multi-user session identification without requiring assessor registration).
  - **Dynamic Team Directory:** Stores team member Name, Contact Email, and SWE Role, allowing teams to add new members dynamically.
  - **Accessibility & Custom Accent Toolbar:** WCAG-oriented text size scaling (`100%`, `110%`, `120%`), High-Contrast border/label mode, full ARIA semantics, and user-definable brand accent colours.

Each task carries the prompt context that produced it, so any teammate can click a button and copy the task + prompt history back into an AI chat to continue work.

## 4. Primary user flow

1. Open the Webapp and select an active team profile (or switch users at any time via the header). The board loads from local storage.
2. Click "+" to add a task. Fill in title, type, assignee, due date, prompt context.
3. Move the task across columns as you work (via the modal or the quick stage selector directly on each card).
4. When stuck, click "Copy as Prompt Context" on a task and paste it into Claude/ChatGPT/Cursor to continue.
5. Hand off a task to a teammate with one dropdown, or add new team members via the Team Directory.
6. Drop final deliverable links into the Anchor Board as you produce them, and export the full prompt log via the Prompt Studio.

## 5. Data model

Locked core schema (extended with `TeamMember` and `AccessibilityPrefs` for M12):

```js
// A single vibecoding task.
Task = {
  id: string,                    // uuid or timestamp string
  title: string,
  description: string,
  type: 'feature' | 'bug',       // visual color coding
  status: 'todo' | 'in-progress' | 'review' | 'done',
  assignee: string,              // team member name from §8 / Team Directory
  dueDate: string | null,        // ISO date 'YYYY-MM-DD'
  createdDate: string,           // ISO date 'YYYY-MM-DD'

  // Added in later milestones:
  context: string,               // M9 task-context — curated briefing for the next AI / teammate
  contextTool: string | null,    // M9 task-context — 'Claude' | 'ChatGPT' | 'Cursor' | 'Lovable' | 'Replit' | 'Other'
  contextUpdatedAt: string|null, // M9 task-context — ISO timestamp set automatically on save
}

// One of four pinned deliverable slots.
Anchor = {
  id: 'presentation' | 'demo' | 'report' | 'documentation',
  label: string,                 // human-readable
  url: string | null,            // the link the team pastes in
}

// Team member profile (M12 Client Q&A requirement).
TeamMember = {
  id: string,
  name: string,
  email: string,
  role: 'Senior Developer' | 'Junior Developer' | 'Architect' | 'UX Member' | 'Database Creator' | 'Software Engineer',
}
```

## 6. Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | React (via Vite) | What the scaffold ships with. Don't migrate. |
| Styling | Tailwind | Already configured. Use utility classes; no separate CSS files. |
| State | React `useState` + a `useLocalStorage` hook | Simple, no library needed. |
| Persistence | **localStorage** | Zero infra. Pick this. Do not switch to a backend mid-hackathon. |
| Deploy | Vercel | One-click deploy from GitHub. |

> **Decision:** localStorage, not a shared backend. Client-side session switching and team roster persistence run entirely in `localStorage`.

## 7. Stage names

Four columns, in this order, with these exact labels in the UI:

1. **To Do**
2. **In Progress**
3. **Review**
4. **Done**

## 8. Team

Default core team seeded in `vibetracker.teamMembers` (extensible via the Team Directory modal):

| Slot | Name | Contact Email | Role | GitHub handle |
|---|---|---|---|---|
| Teammate A | Juliette | ortegagutamajv@cardiff.ac.uk | Senior Developer | juuliettee |
| Teammate B | Alex Chen | alex.chen@vibeflow.dev | UX Member | alexchen |
| Teammate C | Sam Rivera | sam.rivera@vibeflow.dev | Architect | samrivera |

## 9. Milestone ownership

Fill in the owner column. Recommended default in **bold**; change if your team has different strengths.

| # | Tag | Title | Suggested owner | Final owner |
|---|---|---|---|---|
| 3 | `design-done` | Design system + voice (DESIGN.md) | **B** | Alex Chen |
| 4 | `data-model` | Task model + board view | **A** | Juliette |
| 5 | `crud-modal` | Add / edit / delete modal | **A** | Juliette |
| 6 | `tag-style` | Feature / bug colors | **B** | Alex Chen |
| 7 | `task-owner` | Owner indicator + handoff | **A** | Juliette |
| 8 | `due-tint` | Due-date color tinting | **B** | Alex Chen |
| 9 | `task-context` | Context field on the task modal | **C** | Sam Rivera |
| 10 | `copy-context` | "Copy as Prompt Context" button | **C** | Sam Rivera |
| 11 | `project-deliverables` | Deliverable Anchor Board | **B** | Alex Chen |
| 12 | `secret-sauce` | Prompt History Studio, Team/Auth & Accessibility | **C / All** | Juliette / All |
| 13 | `pitch-done` | Demo + pitch rehearsal | **All** | All |

## 10. AI / vibe coding angle

Where AI will be heavily used:
- M4, M5: scaffold the board and the modal from a single prompt each.
- M9, M10: write the Markdown serialization helper for the Context field.
- M7: animation polish for the handoff toast.

Where AI will **not** save you time:
- M2 (this PRD review) — read it yourself.
- M3 (DESIGN.md) — design taste is yours, not the model's.
- M12 (secret-sauce) — the whole point is that AI can't predict it.
- M13 (pitch) — write the script in your own voice.

Keep the Context field of each real task up to date as you work. By the end of the hackathon you should have a handful of curated context blocks — those become part of your Module 5 "Vibe Coding History" deliverable.

## 11. Team identity

Fill in:

- **Team name:** VibeFlow
- **Tagline (one sentence):** The project tracker that remembers the prompts that built it.
- **Tracker URL after deploy:** https://vibecoding-project-tracker-juuliettee.vercel.app

## 12. Out of scope (do not build)

- External cloud database / server-side authentication backend (all auth/session switching is client-side via `localStorage`).
- Real GitHub API OAuth integration.
- Multi-project / multi-organization workspaces (scoped strictly to one project for one team first).
- Real-time WebSocket collaboration.

## 13. Definition of done

The hackathon is "done" when all 13 milestone tags are pushed to your repo and visible on the dashboard. The pitch is "done" when:

- The board loads on Vercel without errors.
- The "Copy as Prompt Context" demo works on stage.
- 5 min pitch is rehearsed.

---

*PRD version: hackathon-starter v1 · maintained by Prof. Dr. Ignacio Alvarez & Team VibeFlow*
