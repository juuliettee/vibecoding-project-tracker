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
 * VibeFlow — Vibecoding Project Tracker
 * Built according to PRD.md & DESIGN.md.
 */

export function getRelativeDate(offsetDays) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getRelativeIsoTimestamp(offsetDays, hours = 14, minutes = 30) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  date.setHours(hours, minutes, 0, 0);
  return date.toISOString();
}

export const STAGES = [
  { id: 'todo',        label: 'To Do' },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'review',      label: 'Review' },
  { id: 'done',        label: 'Done' },
];

// Core team user profile + demo user profiles using RFC 2606 @example.com emails
export const INITIAL_TEAM_MEMBERS = [
  {
    id: 'member-1',
    name: 'Juliette',
    email: 'juliette@example.com',
    role: 'Senior Developer',
  },
  {
    id: 'member-2',
    name: 'Tom Davies',
    email: 'tom@example.com',
    role: 'UX Member',
  },
  {
    id: 'member-3',
    name: 'Hannah Evans',
    email: 'hannah@example.com',
    role: 'Architect',
  },
];

export const TEAM = INITIAL_TEAM_MEMBERS.map((m) => m.name);

// Deliverable Anchor Board starts empty so evaluators can test pasting & pinning links directly
export const INITIAL_ANCHORS = [
  {
    id: 'presentation',
    label: 'Presentation',
    url: null,
  },
  {
    id: 'demo',
    label: 'Demo',
    url: null,
  },
  {
    id: 'report',
    label: 'Report',
    url: null,
  },
  {
    id: 'documentation',
    label: 'Documentation',
    url: null,
  },
];

export function buildInitialTasks() {
  return [
    {
      id: 'task-1',
      title: 'Scaffold Kanban board layout',
      description: 'Set up 4 columns with responsive grid and task counts matching PRD §7.',
      type: 'feature',
      status: 'done',
      assignee: 'Juliette',
      dueDate: getRelativeDate(-3),
      createdDate: getRelativeDate(-8),
      context:
        'Goal: Render 4 columns (To Do, In Progress, Review, Done) from STAGES.\nFiles: src/App.jsx\nConstraints: Use Tailwind grid-cols-4 on desktop, dark slate-900 surface, and localStorage persistence.',
      contextTool: 'Cursor',
      contextUpdatedAt: getRelativeIsoTimestamp(-3, 10, 0),
    },
    {
      id: 'task-2',
      title: 'Implement task modal with prompt context',
      description: 'Build modal to create and edit tasks, including curated AI briefing field.',
      type: 'feature',
      status: 'in-progress',
      assignee: 'Tom Davies',
      dueDate: getRelativeDate(0),
      createdDate: getRelativeDate(-6),
      context:
        'Goal: Add curated Context briefing textarea, AI tool selector (Claude/ChatGPT/Cursor/Lovable/Replit/Other), and automatic ISO contextUpdatedAt timestamp on save.\nFiles: src/components/TaskModal.jsx',
      contextTool: 'Claude',
      contextUpdatedAt: getRelativeIsoTimestamp(-1, 11, 30),
    },
    {
      id: 'task-3',
      title: 'Fix card status dropdown flicker on handoff',
      description: 'State update during assignee handoff causes unnecessary card rerender.',
      type: 'bug',
      status: 'todo',
      assignee: 'Hannah Evans',
      dueDate: getRelativeDate(-2),
      createdDate: getRelativeDate(-6),
      context:
        'Bug: Clicking the assignee <select> inside TaskCard triggers parent card onClick modal open.\nFix: Call e.stopPropagation() on wrapper div and select onChange/onClick handlers in src/components/TaskCard.jsx.',
      contextTool: 'ChatGPT',
      contextUpdatedAt: getRelativeIsoTimestamp(-2, 13, 15),
    },
    {
      id: 'task-4',
      title: 'Serialize task context to AI prompt format',
      description: 'Provide single-click copy of task description + prompt history for continuing in AI.',
      type: 'feature',
      status: 'review',
      assignee: 'Juliette',
      dueDate: getRelativeDate(4),
      createdDate: getRelativeDate(-5),
      context:
        'Goal: Build a Markdown serializer combining task title, type, status, description, target AI tool, and curated context block for one-click clipboard copy.\nFiles: src/utils/promptSerializer.js, src/components/TaskCard.jsx',
      contextTool: 'Cursor',
      contextUpdatedAt: getRelativeIsoTimestamp(-1, 14, 45),
    },
    {
      id: 'task-5',
      title: 'Pin Deliverable Anchor Board above Kanban',
      description: 'Pin Presentation, Demo, Report, and Documentation slots with editable URLs.',
      type: 'feature',
      status: 'done',
      assignee: 'Tom Davies',
      dueDate: getRelativeDate(-1),
      createdDate: getRelativeDate(-4),
      context:
        'Goal: Build AnchorBoard component supporting inline URL editing, status badges, and localStorage persistence.\nFiles: src/components/AnchorBoard.jsx, src/App.jsx',
      contextTool: 'Lovable',
      contextUpdatedAt: getRelativeIsoTimestamp(0, 9, 42),
    },
    {
      id: 'task-6',
      title: 'Add accessibility menu & Prompt Studio',
      description: 'Include text size options, high-contrast borders, custom brand accents, and prompt log export.',
      type: 'feature',
      status: 'review',
      assignee: 'Hannah Evans',
      dueDate: getRelativeDate(6),
      createdDate: getRelativeDate(-2),
      context:
        'Goal: Implement AccessibilityMenu (100%/110%/120% text size options, High-Contrast borders, 3 RGB accent colors), LoginModal, TeamModal, and PromptVaultModal with ARIA attributes.\nFiles: src/components/AccessibilityMenu.jsx, src/components/PromptVaultModal.jsx',
      contextTool: 'Claude',
      contextUpdatedAt: getRelativeIsoTimestamp(0, 11, 15),
    },
  ];
}

export const INITIAL_TASKS = buildInitialTasks();

export const INITIAL_A11Y_PREFS = {
  fontScale: 'normal',
  highContrast: false,
  accent: 'indigo',
};

/**
 * LocalStorage persistence hook.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw != null ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* quota or private-mode error */
    }
  }, [key, value]);

  return [value, setValue];
}

export default function App() {
  const [tasks, setTasks] = useLocalStorage('vibeflow.tasks', INITIAL_TASKS);
  const [anchors, setAnchors] = useLocalStorage('vibeflow.anchors', INITIAL_ANCHORS);
  const [teamMembers, setTeamMembers] = useLocalStorage(
    'vibeflow.teamMembers',
    INITIAL_TEAM_MEMBERS
  );
  // Defaults to null so the Login Screen is presented on first load
  const [currentUser, setCurrentUser] = useLocalStorage(
    'vibeflow.currentUser',
    null
  );
  const [a11yPrefs, setA11yPrefs] = useLocalStorage(
    'vibeflow.a11y',
    INITIAL_A11Y_PREFS
  );

  // Modals & UI States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isPromptVaultOpen, setIsPromptVaultOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Search & Filter Bar States
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

  // Sync font size scaling (exact 100% / 110% / 120%)
  useEffect(() => {
    const scaleMap = { normal: '100%', large: '110%', xlarge: '120%' };
    document.documentElement.style.fontSize =
      scaleMap[a11yPrefs.fontScale] || '100%';
  }, [a11yPrefs.fontScale]);

  // Sync RGB CSS variables so Tailwind bg-brand-primary/20 opacity utilities work globally
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--brand-primary',
      activeAccent.rgb
    );
    document.documentElement.style.setProperty(
      '--brand-accent',
      activeAccent.accentRgb
    );
  }, [activeAccent]);

  // Reset 'mine' filter if currentUser signs out
  useEffect(() => {
    if (!currentUser && filterAssignee === 'mine') {
      setFilterAssignee('all');
    }
  }, [currentUser, filterAssignee]);

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

  const handleSignOut = () => {
    setCurrentUser(null);
    setIsLoginModalOpen(true);
    setToastMessage('Signed out of workspace.');
  };

  const handleAddTeamMember = (newMember) => {
    setTeamMembers((prev) => [...prev, newMember]);
    setToastMessage(`Added ${newMember.name} (${newMember.role}) to the team!`);
  };

  const handleRemoveTeamMember = (memberName) => {
    if (teamMembers.length <= 1 || currentUser?.name === memberName) {
      return;
    }
    const remainingMembers = teamMembers.filter((m) => m.name !== memberName);
    const fallbackAssignee =
      currentUser?.name || remainingMembers[0]?.name || 'Juliette';
    const reassignedCount = tasks.filter(
      (t) => t.assignee === memberName
    ).length;
    const targetLabel =
      currentUser?.name === fallbackAssignee ? 'you' : fallbackAssignee;

    setTeamMembers(remainingMembers);
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.assignee === memberName ? { ...t, assignee: fallbackAssignee } : t
      )
    );
    if (filterAssignee === memberName) {
      setFilterAssignee('all');
    }
    setToastMessage(
      reassignedCount > 0
        ? `Removed ${memberName} · ${reassignedCount} ${
            reassignedCount === 1 ? 'task' : 'tasks'
          } reassigned to ${targetLabel}.`
        : `Removed ${memberName} from the team.`
    );
  };

  const handleResetDemoData = () => {
    setTasks(buildInitialTasks());
    setAnchors(INITIAL_ANCHORS);
    setTeamMembers(INITIAL_TEAM_MEMBERS);
    setSearchQuery('');
    setFilterAssignee('all');
    setFilterType('all');
    setFilterTool('all');
    setToastMessage('Demo dataset restored to initial state!');
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    filterAssignee !== 'all' ||
    filterType !== 'all' ||
    filterTool !== 'all';

  return (
    <div className="min-h-screen bg-surface-page text-text-primary p-6 flex flex-col">
      {/* App Header */}
      <header className="mb-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="text-white">Vibe</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
                Flow
              </span>
            </h1>
          </div>
          <p className="text-sm text-text-muted mt-1">
            The project tracker that remembers the prompts that built it.
          </p>
        </div>

        {/* Header Actions: User Session, Team Roster, Prompt Studio, A11y, + Add Task */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Active User & Switch / Sign Out Controls */}
          <div className="flex items-center rounded-lg bg-surface-card border border-slate-700 overflow-hidden">
            <button
              type="button"
              onClick={() => setIsLoginModalOpen(true)}
              aria-label="Switch user profile"
              className="px-3 py-1.5 hover:bg-slate-700/70 text-xs flex items-center gap-2 transition"
              title="Switch active user profile"
            >
              <span className="w-5 h-5 rounded-full bg-brand-primary/25 text-brand-primary flex items-center justify-center text-[10px] font-bold">
                {currentUser?.name ? currentUser.name.charAt(0) : '?'}
              </span>
              <span className="font-medium text-text-primary">
                {currentUser?.name || 'Not Signed In'}
              </span>
              {currentUser?.role && (
                <span className="text-[10px] font-mono text-text-muted hidden sm:inline">
                  ({currentUser.role})
                </span>
              )}
            </button>
            {currentUser && (
              <button
                type="button"
                onClick={handleSignOut}
                aria-label="Sign out of workspace"
                className="px-2.5 py-1.5 border-l border-slate-700 text-[11px] font-mono text-text-muted hover:text-white hover:bg-slate-700/70 transition"
                title="Sign out to login screen"
              >
                Sign Out
              </button>
            )}
          </div>

          {/* Team Directory & Add Member Button */}
          <button
            type="button"
            onClick={() => setIsTeamModalOpen(true)}
            aria-label="Open team directory and add team members"
            className="px-3 py-1.5 rounded-lg bg-surface-card hover:bg-slate-700 border border-slate-700 text-xs font-mono text-text-primary flex items-center gap-1.5 transition"
            title="View team emails/roles & add team members"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-type-feature"></span>
            <span>Team ({teamMembers.length})</span>
            <span className="text-brand-primary">+</span>
          </button>

          {/* Vibe Coding Prompt History Studio */}
          <button
            type="button"
            onClick={() => setIsPromptVaultOpen(true)}
            aria-label="Open Vibe Coding Prompt History Studio"
            className="px-3 py-1.5 rounded-lg bg-brand-primary/15 hover:bg-brand-primary/25 border border-brand-primary/40 text-xs font-mono text-brand-primary flex items-center gap-1.5 transition"
            title="Open Vibe Coding Prompt History & Export Studio"
          >
            <span>✦</span>
            <span>Prompt Studio</span>
          </button>

          {/* Accessibility & Custom Accent Colour Menu */}
          <AccessibilityMenu prefs={a11yPrefs} onChangePrefs={setA11yPrefs} />

          {/* + Add Task Primary Action (Single '+' matching DESIGN.md §5) */}
          <button
            type="button"
            onClick={handleOpenCreateModal}
            className="px-4 py-2 bg-brand-primary hover:opacity-90 active:scale-95 text-white rounded-lg text-xs font-semibold shadow-lg shadow-brand-primary/25 transition"
          >
            + Add Task
          </button>
        </div>
      </header>

      {/* Deliverable Anchor Board (Pinned above the Kanban Columns) */}
      <AnchorBoard anchors={anchors} onUpdateAnchor={handleUpdateAnchor} />

      {/* Interactive Search & Filter Bar */}
      <section
        aria-label="Task Search and Filters"
        className="mb-5 p-3 rounded-xl bg-surface-page/70 border border-slate-800 flex flex-wrap items-center justify-between gap-3"
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
              className="w-full bg-surface-card border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
            <svg
              className="w-3.5 h-3.5 text-text-muted absolute left-2.5 top-2"
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
                  ? 'bg-brand-primary/25 text-white border-brand-primary'
                  : 'bg-surface-card text-text-primary border-slate-700 hover:bg-slate-700'
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
            className="bg-surface-card border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-text-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
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
            className="bg-surface-card border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-text-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
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
            className="bg-surface-card border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-mono text-text-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
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
              className="px-2.5 py-1.5 rounded-lg text-xs font-mono text-text-primary hover:text-white bg-surface-card hover:bg-slate-700 border border-slate-700 transition"
            >
              Reset Filters ✕
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-text-muted">
            Showing {filteredTasks.length} of {tasks.length} tasks
          </span>
          <button
            type="button"
            onClick={handleResetDemoData}
            aria-label="Reset demo dataset to initial tasks"
            className="px-2.5 py-1 rounded-lg text-[11px] font-mono text-text-muted hover:text-text-primary bg-surface-card/70 hover:bg-surface-card border border-slate-700/70 transition"
            title="Restore initial 6 demo tasks and empty anchors"
          >
            ↺ Reset Demo
          </button>
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
              className={`bg-surface-page/60 rounded-xl p-4 flex flex-col min-h-[500px] ${
                a11yPrefs.highContrast
                  ? 'border-2 border-slate-600'
                  : 'border border-slate-800/80'
              }`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-text-primary">
                    {stage.label}
                  </h2>
                  <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-surface-card text-text-muted border border-slate-700/60">
                    {stageTasks.length}
                  </span>
                </div>
              </div>

              {/* Task Cards List */}
              <div className="flex-1 space-y-3">
                {stageTasks.length === 0 ? (
                  <div className="h-32 flex items-center justify-center rounded-lg border border-dashed border-slate-800 text-xs text-text-muted p-4 text-center">
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
        defaultAssignee={currentUser?.name || teamNames[0]}
        stages={STAGES}
      />

      {/* Login / Workspace Profile Switcher Modal (Opens automatically on first load when currentUser is null) */}
      <LoginModal
        isOpen={!currentUser || isLoginModalOpen}
        teamMembers={teamMembers}
        currentUser={currentUser}
        onLogin={handleLogin}
        onClose={currentUser ? () => setIsLoginModalOpen(false) : null}
        onResetDemo={handleResetDemoData}
      />

      {/* Team Directory & Add Member Modal */}
      <TeamModal
        isOpen={isTeamModalOpen}
        onClose={() => setIsTeamModalOpen(false)}
        teamMembers={teamMembers}
        currentUser={currentUser}
        onAddMember={handleAddTeamMember}
        onRemoveMember={handleRemoveTeamMember}
        tasks={tasks}
      />

      {/* Vibe Coding Prompt History Studio Modal */}
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
