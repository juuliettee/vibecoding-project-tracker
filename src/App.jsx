import { useState, useEffect } from 'react';

/**
 * Vibecoding Project Tracker — VibeFlow
 * Built according to PRD.md & DESIGN.md.
 */

/**
 * @typedef {Object} Task
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {'feature'|'bug'} type
 * @property {'todo'|'in-progress'|'review'|'done'} status
 * @property {string} assignee
 * @property {string|null} dueDate     ISO 'YYYY-MM-DD'
 * @property {string} createdDate      ISO 'YYYY-MM-DD'
 * @property {string} context
 * @property {string|null} contextTool
 * @property {string|null} contextUpdatedAt
 */

// The four columns of the board, in render order.
export const STAGES = [
  { id: 'todo',        label: 'To Do' },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'review',      label: 'Review' },
  { id: 'done',        label: 'Done' },
];

// The three allowed team members from PRD §8
export const TEAM = ['Juliette', 'Alex Chen', 'Sam Rivera'];

export const INITIAL_TASKS = [
  {
    id: 'task-1',
    title: 'Scaffold Kanban board layout',
    description: 'Set up 4 columns with responsive grid and task counts matching PRD §7.',
    type: 'feature',
    status: 'done',
    assignee: 'Juliette',
    dueDate: '2026-10-21',
    createdDate: '2026-10-20',
    context: 'Use Tailwind flex/grid with slate-800 columns and crisp borders.',
    contextTool: 'Cursor',
    contextUpdatedAt: '2026-10-20T10:00:00.000Z',
  },
  {
    id: 'task-2',
    title: 'Implement task modal with prompt context',
    description: 'Build modal to create and edit tasks, including curated AI briefing field.',
    type: 'feature',
    status: 'in-progress',
    assignee: 'Alex Chen',
    dueDate: '2026-10-22',
    createdDate: '2026-10-20',
    context: 'Ensure context field includes tool selection and timestamp tracking.',
    contextTool: 'Claude',
    contextUpdatedAt: '2026-10-20T11:30:00.000Z',
  },
  {
    id: 'task-3',
    title: 'Fix card status dropdown flicker on handoff',
    description: 'State update during assignee handoff causes unnecessary card rerender.',
    type: 'bug',
    status: 'todo',
    assignee: 'Sam Rivera',
    dueDate: '2026-10-20',
    createdDate: '2026-10-20',
    context: 'Check event propagation on the select dropdown inside the card header.',
    contextTool: 'ChatGPT',
    contextUpdatedAt: '2026-10-20T13:15:00.000Z',
  },
  {
    id: 'task-4',
    title: 'Serialize task context to AI prompt format',
    description: 'Provide single-click copy of task description + prompt history for continuing in AI.',
    type: 'feature',
    status: 'review',
    assignee: 'Juliette',
    dueDate: '2026-10-23',
    createdDate: '2026-10-20',
    context: 'Markdown serializer formatting Task title, type, description, and briefing context.',
    contextTool: 'Cursor',
    contextUpdatedAt: '2026-10-20T13:45:00.000Z',
  },
];

/**
 * A tiny localStorage hook — survives reloads, no library needed.
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
      /* quota or private-mode error — silently ignore for hackathon */
    }
  }, [key, value]);

  return [value, setValue];
}

export default function App() {
  const [tasks, setTasks] = useLocalStorage('vibetracker.tasks', INITIAL_TASKS);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 flex flex-col">
      {/* App Header */}
      <header className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="text-white">Vibe</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Flow</span>
            </h1>
            <span className="px-2 py-0.5 rounded text-xs font-mono font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              v0.4 · data-model
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            The project tracker that remembers the prompts that built it.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Team: {TEAM.join(', ')}</span>
          </div>
        </div>
      </header>

      {/* Main Kanban Board (M4) */}
      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
        {STAGES.map((stage) => {
          const stageTasks = tasks.filter((t) => t.status === stage.id);
          return (
            <div
              key={stage.id}
              className="bg-slate-900/60 rounded-xl border border-slate-800/80 p-4 flex flex-col min-h-[500px]"
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
                    <div
                      key={task.id}
                      className="bg-slate-800/90 hover:bg-slate-800 rounded-lg p-4 border border-slate-700/70 shadow-sm hover:shadow transition-all group"
                    >
                      {/* Card Type Badge & ID */}
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-[11px] font-mono uppercase px-2 py-0.5 rounded border font-semibold ${
                            task.type === 'feature'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                              : 'bg-red-500/10 text-red-400 border-red-500/20'
                          }`}
                        >
                          {task.type}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500">
                          {task.id}
                        </span>
                      </div>

                      {/* Card Title & Description */}
                      <h3 className="text-sm font-medium text-slate-100 group-hover:text-indigo-300 transition-colors">
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                          {task.description}
                        </p>
                      )}

                      {/* Card Footer: Assignee & Due Date */}
                      <div className="mt-3 pt-3 border-t border-slate-700/50 flex items-center justify-between text-xs text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center text-[10px] font-bold">
                            {task.assignee.charAt(0)}
                          </span>
                          <span className="truncate max-w-[90px]">{task.assignee}</span>
                        </div>
                        {task.dueDate && (
                          <span className="font-mono text-[11px] text-slate-400">
                            {task.dueDate}
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}
