# VibeFlow — 5-Minute Pitch & Live Demo Script (`pitch-done`)

**Product:** VibeFlow — *The project tracker that remembers the prompts that built it.*  
**Author:** Juliette (CM6312 Adopting Technologies)

---

## 1. The Problem (0:00 – 0:45)

When software engineering teams build with AI coding assistants (Cursor, Claude, ChatGPT), they hit two recurring issues:
1. **Task state fragmentation:** Fast prototyping creates dozens of small features and bugs faster than heavyweight tools like Jira can track.
2. **Prompt amnesia:** Days after a working component is generated, nobody remembers the exact prompt, constraints, or file paths used. Iteration means starting over from scratch.

---

## 2. The Solution: VibeFlow (0:45 – 1:30)

**VibeFlow** is a dark-slate Kanban tracker designed for AI-assisted software engineering:
- **Curated Prompt Context on Every Task:** Stores the working prompt briefing, target AI tool (`Cursor`, `Claude`, `ChatGPT`, `Lovable`, `Replit`), and automatic ISO timestamp (`contextUpdatedAt`).
- **One-Click "Copy as Prompt Context":** Serializes the task metadata, stage, description, and curated technical briefing into a structured Markdown prompt on the clipboard.
- **Pinned Deliverable Anchor Board:** Keeps the four project deliverable slots (`Presentation`, `Demo`, `Report`, `Documentation`) pinned above the board ready for link pinning.

---

## 3. Live Demo Walkthrough (1:30 – 4:00)

1. **First-Load Workspace Sign-In & Team Directory (45s):**
   - On first load, the **Workspace Sign-In** screen appears automatically. Sign in with one click using a demo profile (`Juliette — Senior Developer`) or enter `juliette@example.com` with the on-screen demo passcode `2026`.
   - Open **`Team (3) +`** to view team member `@example.com` emails and SWE roles, and add a new member live.
2. **Kanban Board, Deadline Tinting & Inline Handoff (45s):**
   - Show the four columns (`To Do`, `In Progress`, `Review`, `Done`), `Feature` vs. `Bug` stripes, and deadline urgency tinting (`overdue`, `warning`, `safe`, `neutral`).
   - Change a task's stage inline from the card header and hand off a task via the assignee dropdown.
   - Paste a sample URL into one of the empty **Deliverable Anchor Board** slots (`+ Paste Presentation Link`) to pin it (`1/4 Linked`).
3. **Hero Moment — Curated Context & "Copy as Prompt Context" (45s):**
   - Click **`Copy as Prompt Context`** on `task-4` (*Serialize task context to AI prompt format*), observe the toast (`Prompt briefing copied! Paste into Claude/ChatGPT/Cursor.`), and paste the formatted Markdown briefing.
4. **Prompt Studio & Accessibility Suite (30s):**
   - Open **`✦ Prompt Studio`** to inspect the chronological prompt history and click **`Export All History (.md)`**.
   - Open **`Aa Accessibility`** to demonstrate `100%`/`110%`/`120%` text scaling, High-Contrast borders with explicit `[OVERDUE]`/`[WARNING]`/`[SAFE]` tags, and RGB Brand Accent Colours that update across the entire interface.
