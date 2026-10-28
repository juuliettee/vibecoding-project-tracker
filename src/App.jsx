import { useState, useEffect, useMemo } from 'react';
import TaskModal from './components/TaskModal.jsx';
import TaskCard from './components/TaskCard.jsx';
import AnchorBoard from './components/AnchorBoard.jsx';
import LoginModal from './components/LoginModal.jsx';
import TeamModal from './components/TeamModal.jsx';
import PromptVaultModal from './components/PromptVaultModal.jsx';
import AccessibilityMenu, { ACCENT_THEMES } from './components/AccessibilityMenu.jsx';
import Toast from './components/Toast.jsx';
import { serializeTaskPrompt, copyTextToClipboard } from './utils/promptSerializer.js';

/**
 * Vibecoding Project Tracker — VibeFlow
 * Built according to PRD.md, DESIGN.md & CM6312 Client Elicitation Requirements.
 */

// The four columns of the board, in render order.
export const STAGES = [
  { id: 'todo',        label: 'To Do' },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'review',      label: 'Review' },
  { id: 'done',        label: 'Done' },
];

// Default team members from PRD §8 + Q&A User Data (Name, Email, SWE Role)
export const INITIAL_TEAM_MEMBERS = [
  {
    id: 'member-1',
    name: 'Juliette',
    email: 'ortegagutamajv@cardiff.ac.uk',
    role: 'Senior Developer',
  },
  {
    id: 'member-2',
    name: 'Alex Chen',
    email: 'alex.chen@vibeflow.dev',
    role: 'UX Member',
  },
  {
    id: 'member-3',
    name: 'Sam Rivera',
    email: 'sam.rivera@vibeflow.dev',
    role: 'Architect',
  },
];

export const TEAM = INITIAL_TEAM_MEMBERS.map((m) => m.name);

// The four pinned deliverable slots from PRD §3 & §5 (M11)
export const INITIAL_ANCHORS = [
  {
    id: 'presentation',
    label: 'Presentation',
    url: 'https://docs.google.com/presentation/d/vibeflow-pitch-deck',
  },
  {
    id: 'demo',
    label: 'Demo',
    url: 'https://vibeflow-tracker.vercel.app',
  },
  {
    id: 'report',
    label: 'Report',
    url: 'https://github.com/juuliettee/vibecoding-project-tracker/blob/main/PRD.md',
  },
  {
    id: 'documentation',
    label: 'Documentation',
    url: 'https://github.com/juuliettee/vibecoding-project-tracker/blob/main/DESIGN.md',
  },
];

export const INITIAL_TASKS = [
  {
    id: 'task-1',
    title: 'Scaffold Kanban board layout',
    description: 'Set up 4 columns with responsive grid and task counts matching PRD §7.',
    type: 'feature',
    status: 'done',
    assignee: 'Juliette',
    dueDate: '2026-10-25',
    createdDate: '2026-10-20',
    context:
      'Goal: Render 4 columns (To Do, In Progress, Review, Done) from STAGES.\nFiles: src/App.jsx\nConstraints: Use Tailwind grid-cols-4 on desktop, dark slate-900 surface, and localStorage persistence.',
    contextTool: 'Cursor',
    contextUpdatedAt: '2026-10-25T10:00:00.000Z',
  },
  {
    id: 'task-2',
    title: 'Implement task modal with prompt context',
    description: 'Build modal to create and edit tasks, including curated AI briefing field.',
    type: 'feature',
    status: 'in-progress',
    assignee: 'Alex Chen',
    dueDate: '2026-10-28',
    createdDate: '2026-10-20',
    context:
      'Goal: Add M9 curated Context briefing textarea, AI tool selector (Claude/ChatGPT/Cursor/Lovable/Replit/Other), and automatic ISO contextUpdatedAt timestamp on save.\nFiles: src/components/TaskModal.jsx',
    contextTool: 'Claude',
    contextUpdatedAt: '2026-10-27T11:30:00.000Z',
  },
  {
    id: 'task-3',
    title: 'Fix card status dropdown flicker on handoff',
    description: 'State update during assignee handoff causes unnecessary card rerender.',
    type: 'bug',
    status: 'todo',
    assignee: 'Sam Rivera',
    dueDate: '2026-10-25',
    createdDate: '2026-10-20',
    context:
      'Bug: Clicking the assignee <select> inside TaskCard triggers parent card onClick modal open.\nFix: Call e.stopPropagation() on wrapper div and select onChange/onClick handlers in src/components/TaskCard.jsx.',
    contextTool: 'ChatGPT',
    contextUpdatedAt: '2026-10-26T13:15:00.000Z',
  },
  {
    id: 'task-4',
    title: 'Serialize task context to AI prompt format',
    description: 'Provide single-click copy of task description + prompt history for continuing in AI.',
    type: 'feature',
    status: 'review',
    assignee: 'Juliette',
    dueDate: '2026-11-02',
    createdDate: '2026-10-20',
    context:
      'Goal: Build a Markdown serializer combining task title, type, status, description, target AI tool, and curated context block for one-click clipboard copy.\nFiles: src/components/TaskCard.jsx, src/components/TaskModal.jsx',
    contextTool: 'Cursor',
    contextUpdatedAt: '2026-10-27T14:45:00.000Z',
  },
];

export const INITIAL_A11Y_PREFS = {
  fontScale: 'normal',
  highContrast: false,
  accent: 'indigo',
};

/**
 * A tiny localStorage hook — survives reloads, no library needed.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw != null) {
        const parsed = JSON.parse(raw);
        if (
          key === 'vibetracker.tasks' &&
          Array.isArray(parsed) &&
          parsed.some((t) => t.id === 'task-2' && t.dueDate === '2026-10-22')
        ) {
          const seedMap = Object.fromEntries(INITIAL_TASKS.map((t) => [t.id, t]));
          return parsed.map((t) => (seedMap[t.id] ? seedMap[t.id] : t));
        }
        return parsed;
      }
      return initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* quota or private-mode error — silently ignore for hackathon */
    }
  }, [key, value]);

  return [value, setValue];
}

export default function App() {
  const [tasks, setTasks] = useLocalStorage('vibetracker.tasks', INITIAL_TASKS);
  const [anchors, setAnchors] = useLocalStorage('vibetracker.anchors', INITIAL_ANCHORS);
  const [teamMembers, setTeamMembers] = useLocalStorage(
    'vibetracker.teamMembers',
    INITIAL_TEAM_MEMBERS
  );
  const [currentUser, setCurrentUser] = useLocalStorage(
    'vibetracker.currentUser',
    INITIAL_TEAM_MEMBERS[0]
  );
  const [a11yPrefs, setA11yPrefs] = useLocalStorage(
    'vibetracker.a11y',
    INITIAL_A11Y_PREFS
  );

  // Modals & UI States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isPromptVaultOpen, setIsPromptVaultOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Secret Sauce Filter & Search Bar States
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAssignee, setFilterAssignee] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterTool, setFilterTool] = useState('all');

  const teamNames = useMemo(
    () => teamMembers.map((m) => m.name),
    [teamMembers]
  );

  const activeAccent = useMemo(
    () =>
      ACCENT_THEMES.find((t) => t.id === a11yPrefs.accent) || ACCENT_THEMES[0],
    [a11yPrefs.accent]
  );

  useEffect(() => {
    const scaleMap = { normal: '100%', large: '108%', xlarge: '116%' };
    document.documentElement.style.fontSize =
      scaleMap[a11yPrefs.fontScale] || '100%';
  }, [a11yPrefs.fontScale]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (filterAssignee === 'mine' && currentUser) {
        if (t.assignee !== currentUser.name) return false;
      } else if (filterAssignee !== 'all' && t.assignee !== filterAssignee) {
        return false;
      }

      if (filterType !== 'all' && t.type !== filterType) {
        return false;
      }

      if (filterTool !== 'all' && (t.contextTool || 'None') !== filterTool) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = (t.title || '').toLowerCase().includes(q);
        const matchDesc = (t.description || '').toLowerCase().includes(q);
        const matchCtx = (t.context || '').toLowerCase().includes(q);
        const matchId = (t.id || '').toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchCtx && !matchId) return false;
      }

      return true;
    });
  }, [tasks, filterAssignee, filterType, filterTool, searchQuery, currentUser]);

  const handleOpenCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (savedTask) => {
    setTasks((prevTasks) => {
      const exists = prevTasks.some((t) => t.id === savedTask.id);
      if (exists) {
        return prevTasks.map((t) => (t.id === savedTask.id ? savedTask : t));
      }
      return [savedTask, ...prevTasks];
    });
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId));
  };

  const handleHandoffTask = (taskId, newAssignee) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === taskId ? { ...t, assignee: newAssignee } : t))
    );
    setToastMessage(`Handed off to ${newAssignee}. They've got it!`);
  };

  const handleStageChange = (taskId, newStageId) => {
    const stageObj = STAGES.find((s) => s.id === newStageId);
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === taskId ? { ...t, status: newStageId } : t))
    );
    if (stageObj) {
      setToastMessage(`Moved task to ${stageObj.label}.`);
    }
  };

  const handleCopyPromptContext = async (task) => {
    const markdownPrompt = serializeTaskPrompt(task);
    await copyTextToClipboard(markdownPrompt);
    // Exact microcopy from DESIGN.md §5:
    setToastMessage('Prompt briefing copied! Paste into Claude/ChatGPT/Cursor.');
  };

  const handleUpdateAnchor = (anchorId, newUrl) => {
    setAnchors((prevAnchors) =>
      prevAnchors.map((a) => (a.id === anchorId ? { ...a, url: newUrl } : a))
    );
    const target = anchors.find((a) => a.id === anchorId);
    const label = target ? target.label : 'Deliverable';
    setToastMessage(
      newUrl ? `${label} deliverable link pinned!` : `${label} deliverable link cleared.`
    );
  };

  const handleLogin = (member) => {
    setCurrentUser(member);
    setIsLoginModalOpen(false);
    setToastMessage(`Signed in as ${member.name} (${member.role}).`);
  };

  const handleAddTeamMember = (newMember) => {
    setTeamMembers((prev) => [...prev, newMember]);
    setToastMessage(`Added ${newMember.name} (${newMember.role}) to the team!`);
  };

  const handleRemoveTeamMember = (memberName) => {
    setTeamMembers((prev) => prev.filter((m) => m.name !== memberName));
    setToastMessage(`Removed ${memberName} from the team roster.`);
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    filterAssignee !== 'all' ||
    filterType !== 'all' ||
    filterTool !== 'all';

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 flex flex-col">
      {/* App Header */}
      <header className="mb-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="text-white">Vibe</span>
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400"
                style={{
                  backgroundImage: `linear-gradient(to right, ${activeAccent.hex}, #a855f7)`,
                }}
              >
                Flow
              </span>
            </h1>
            <span
              className="px-2 py-0.5 rounded text-xs font-mono font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/30"
              style={{ borderColor: `${activeAccent.hex}55`, color: activeAccent.hex }}
            >
              v1.2 · secret-sauce
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            The project tracker that remembers the prompts that built it.
          </p>
        </div>

        {/* Header Actions: User Session, Team Roster, Prompt Studio, A11y, + Add Task */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Active User & Login / Switch User Button */}
          <button
            type="button"
            onClick={() => setIsLoginModalOpen(true)}
            aria-label="Switch user or open workspace sign in"
            className="px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-800 border border-slate-700 text-xs flex items-center gap-2 transition"
            title="Switch active user / Open Sign In screen"
          >
            <span className="w-5 h-5 rounded-full bg-indigo-500/25 text-indigo-300 flex items-center justify-center text-[10px] font-bold">
              {currentUser?.name ? currentUser.name.charAt(0) : '?'}
            </span>
            <span className="font-medium text-slate-200">
              {currentUser?.name || 'Sign In'}
            </span>
            <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
              ({currentUser?.role || 'Guest'})
            </span>
            <span className="text-[10px] font-mono text-indigo-400 ml-0.5">
              ⇄ Switch
            </span>
          </button>

          {/* Team Directory & Add Member Button */}
          <button
            type="button"
            onClick={() => setIsTeamModalOpen(true)}
            aria-label="Open team directory and add team members"
            className="px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-200 flex items-center gap-1.5 transition"
            title="View team emails/roles & add team members"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Team ({teamMembers.length})</span>
            <span className="text-indigo-400">+</span>
          </button>

          {/* Secret Sauce: Vibe Coding Prompt History Studio */}
          <button
            type="button"
            onClick={() => setIsPromptVaultOpen(true)}
            aria-label="Open Vibe Coding Prompt History Studio"
            className="px-3 py-1.5 rounded-lg bg-indigo-950/60 hover:bg-indigo-900/50 border border-indigo-500/40 text-xs font-mono text-indigo-200 flex items-center gap-1.5 transition"
            title="Open Vibe Coding Prompt History & Export Studio"
          >
            <span>✦</span>
            <span>Prompt Studio</span>
          </button>

          {/* Accessibility & Custom Accent Colour Menu */}
          <AccessibilityMenu prefs={a11yPrefs} onChangePrefs={setA11yPrefs} />

          {/* + Add Task Primary Action */}
          <button
            type="button"
            onClick={handleOpenCreateModal}
            style={{ backgroundColor: activeAccent.hex }}
            className="px-4 py-2 hover:opacity-95 active:scale-95 text-white rounded-lg text-xs font-semibold shadow-lg transition flex items-center gap-1.5"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            + Add Task
          </button>
        </div>
      </header>

      {/* M11 Deliverable Anchor Board (Pinned above the Kanban Columns) */}
      <AnchorBoard anchors={anchors} onUpdateAnchor={handleUpdateAnchor} />

      {/* M12 Secret Sauce: Interactive Search, My-Tasks Filter & AI Tool Filter Bar */}
      <section
        aria-label="Task Search and Filters"
        className="mb-5 p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-wrap items-center justify-between gap-3"
      >
        <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[240px]">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[180px] max-w-xs">
            <input
              type="search"
              aria-label="Search tasks by title, description, or prompt context"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks or prompts..."
              className="w-full bg-slate-800/90 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <svg
              className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Quick "My Tasks" Toggle */}
          {currentUser && (
            <button
              type="button"
              aria-pressed={filterAssignee === 'mine'}
              onClick={() =>
                setFilterAssignee((prev) => (prev === 'mine' ? 'all' : 'mine'))
              }
              className={`px-2.5 py-1.5 rounded-lg text-xs font-mono border transition ${
                filterAssignee === 'mine'
                  ? 'bg-indigo-600/25 text-indigo-200 border-indigo-500/60'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              My Tasks ({currentUser.name})
            </button>
          )}

          {/* Assignee Filter */}
          <select
            aria-label="Filter by Assignee"
            value={filterAssignee}
            onChange={(e) => setFilterAssignee(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="all">All Assignees</option>
            {currentUser && (
              <option value="mine">Assigned to Me ({currentUser.name})</option>
            )}
            {teamNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>

          {/* Type Filter */}
          <select
            aria-label="Filter by Task Type"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="all">All Types</option>
            <option value="feature">Features Only</option>
            <option value="bug">Bugs Only</option>
          </select>

          {/* AI Tool Filter */}
          <select
            aria-label="Filter by AI Tool"
            value={filterTool}
            onChange={(e) => setFilterTool(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-mono text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="all">All AI Tools</option>
            <option value="Cursor">Cursor</option>
            <option value="Claude">Claude</option>
            <option value="ChatGPT">ChatGPT</option>
            <option value="Lovable">Lovable</option>
            <option value="Replit">Replit</option>
            <option value="Other">Other</option>
          </select>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setFilterAssignee('all');
                setFilterType('all');
                setFilterTool('all');
              }}
              className="px-2.5 py-1.5 rounded-lg text-xs font-mono text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition"
            >
              Reset Filters ✕
            </button>
          )}
        </div>

        <div className="text-xs font-mono text-slate-400">
          Showing {filteredTasks.length} of {tasks.length} tasks
        </div>
      </section>

      {/* Main Kanban Board */}
      <main
        aria-label="Kanban Board"
        className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start"
      >
        {STAGES.map((stage) => {
          const stageTasks = filteredTasks.filter((t) => t.status === stage.id);
          return (
            <section
              key={stage.id}
              aria-label={`${stage.label} column`}
              className={`bg-slate-900/60 rounded-xl p-4 flex flex-col min-h-[500px] ${
                a11yPrefs.highContrast
                  ? 'border-2 border-slate-600'
                  : 'border border-slate-800/80'
              }`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
                    {stage.label}
                  </h2>
                  <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-slate-800 text-slate-400 border border-slate-700/60">
                    {stageTasks.length}
                  </span>
                </div>
              </div>

              {/* Task Cards List */}
              <div className="flex-1 space-y-3">
                {stageTasks.length === 0 ? (
                  <div className="h-32 flex items-center justify-center rounded-lg border border-dashed border-slate-800 text-xs text-slate-500 p-4 text-center">
                    No tasks here — ready for the next prompt.
                  </div>
                ) : (
                  stageTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      team={teamNames}
                      stages={STAGES}
                      onClick={() => handleOpenEditModal(task)}
                      onHandoff={handleHandoffTask}
                      onStageChange={handleStageChange}
                      onCopyPrompt={handleCopyPromptContext}
                      highContrast={a11yPrefs.highContrast}
                    />
                  ))
                )}
              </div>
            </section>
          );
        })}
      </main>

      {/* CRUD Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        onDelete={handleDeleteTask}
        onCopyPrompt={handleCopyPromptContext}
        task={editingTask}
        team={teamNames}
        stages={STAGES}
      />

      {/* Login / Workspace Profile Switcher Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        teamMembers={teamMembers}
        currentUser={currentUser}
        onLogin={handleLogin}
        onClose={() => setIsLoginModalOpen(false)}
      />

      {/* Team Directory & Add Member Modal */}
      <TeamModal
        isOpen={isTeamModalOpen}
        onClose={() => setIsTeamModalOpen(false)}
        teamMembers={teamMembers}
        onAddMember={handleAddTeamMember}
        onRemoveMember={handleRemoveTeamMember}
        tasks={tasks}
      />

      {/* Secret Sauce: Vibe Coding Prompt History Studio Modal */}
      <PromptVaultModal
        isOpen={isPromptVaultOpen}
        onClose={() => setIsPromptVaultOpen(false)}
        tasks={tasks}
        onCopyTaskPrompt={handleCopyPromptContext}
        onToast={setToastMessage}
      />

      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage('')} />
    </div>
  );
}
