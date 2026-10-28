import { useState, useEffect } from 'react';

const AI_TOOLS = ['Claude', 'ChatGPT', 'Cursor', 'Lovable', 'Replit', 'Other'];

const BRIEFING_TEMPLATE = `Goal: 
Files to touch: 
Constraints / Rules: 
Prompt / Context notes: `;

export function formatContextTimestamp(isoString) {
  if (!isoString) return null;
  try {
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return null;
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return null;
  }
}

export default function TaskModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  onCopyPrompt,
  task,
  team,
  defaultAssignee,
  stages,
}) {
  const isEditing = Boolean(task);
  const fallbackAssignee = defaultAssignee || team[0] || 'Juliette';

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('feature');
  const [status, setStatus] = useState('todo');
  const [assignee, setAssignee] = useState(fallbackAssignee);
  const [dueDate, setDueDate] = useState('');
  const [context, setContext] = useState('');
  const [contextTool, setContextTool] = useState('Cursor');

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setType(task.type || 'feature');
      setStatus(task.status || 'todo');
      setAssignee(task.assignee || fallbackAssignee);
      setDueDate(task.dueDate || '');
      setContext(task.context || '');
      setContextTool(task.contextTool || 'Cursor');
    } else {
      setTitle('');
      setDescription('');
      setType('feature');
      setStatus('todo');
      setAssignee(fallbackAssignee);
      setDueDate('');
      setContext('');
      setContextTool('Cursor');
    }
  }, [task, fallbackAssignee, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleInsertTemplate = () => {
    if (!context.trim()) {
      setContext(BRIEFING_TEMPLATE);
    } else {
      setContext((prev) => `${prev.trim()}\n\n${BRIEFING_TEMPLATE}`);
    }
  };

  const handleCopyFromModal = () => {
    if (!onCopyPrompt) return;
    onCopyPrompt({
      id: task?.id || 'draft-task',
      title: title.trim() || 'Untitled Task',
      description: description.trim(),
      type,
      status,
      assignee,
      dueDate: dueDate || null,
      context: context.trim(),
      contextTool: context.trim() ? contextTool : null,
      contextUpdatedAt: task?.contextUpdatedAt || new Date().toISOString(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const trimmedContext = context.trim();
    const contextChanged =
      trimmedContext !== (task?.context || '').trim() ||
      (trimmedContext && contextTool !== task?.contextTool);

    const now = new Date();
    const todayLocal = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    const taskPayload = {
      id: task?.id || `task-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      type,
      status,
      assignee,
      dueDate: dueDate || null,
      createdDate: task?.createdDate || todayLocal,
      context: trimmedContext,
      contextTool: trimmedContext ? contextTool : null,
      contextUpdatedAt: trimmedContext
        ? contextChanged || !task?.contextUpdatedAt
          ? new Date().toISOString()
          : task.contextUpdatedAt
        : null,
    };

    onSave(taskPayload);
    onClose();
  };

  const handleDelete = () => {
    if (!task) return;
    const confirmed = window.confirm(
      'Delete this vibecoding task? You cannot undo this action.'
    );
    if (confirmed) {
      onDelete(task.id);
      onClose();
    }
  };

  const formattedUpdatedAt = formatContextTimestamp(task?.contextUpdatedAt);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-surface-page border border-slate-700/80 rounded-2xl shadow-2xl p-6 text-text-primary flex flex-col max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className={`w-3 h-3 rounded-full ${
                type === 'feature' ? 'bg-type-feature' : 'bg-type-bug'
              }`}
            ></span>
            <h2
              id="task-modal-title"
              className="text-lg font-semibold tracking-tight text-white"
            >
              {isEditing ? 'Edit Vibecoding Task' : 'New Vibecoding Task'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close task modal"
            className="text-text-muted hover:text-white p-1 rounded-lg hover:bg-surface-card transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label
              htmlFor="task-title-input"
              className="block text-xs font-semibold uppercase tracking-wider text-text-primary mb-1"
            >
              Task Title <span className="text-type-bug">*</span>
            </label>
            <input
              id="task-title-input"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Scaffold authentication flow"
              className="w-full bg-surface-card border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="task-desc-input"
              className="block text-xs font-semibold uppercase tracking-wider text-text-primary mb-1"
            >
              Description
            </label>
            <textarea
              id="task-desc-input"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What needs to be built or fixed?"
              className="w-full bg-surface-card border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition resize-none"
            />
          </div>

          {/* Type & Status Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-text-primary mb-1">
                Type
              </span>
              <div className="flex gap-2" role="group" aria-label="Task Type">
                <button
                  type="button"
                  aria-pressed={type === 'feature'}
                  onClick={() => setType('feature')}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold border transition ${
                    type === 'feature'
                      ? 'bg-type-feature/20 text-type-feature border-type-feature/40 shadow-sm'
                      : 'bg-surface-card/60 text-text-muted border-slate-700 hover:bg-surface-card'
                  }`}
                >
                  Feature
                </button>
                <button
                  type="button"
                  aria-pressed={type === 'bug'}
                  onClick={() => setType('bug')}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold border transition ${
                    type === 'bug'
                      ? 'bg-type-bug/20 text-type-bug border-type-bug/40 shadow-sm'
                      : 'bg-surface-card/60 text-text-muted border-slate-700 hover:bg-surface-card'
                  }`}
                >
                  Bug
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="task-status-select"
                className="block text-xs font-semibold uppercase tracking-wider text-text-primary mb-1"
              >
                Stage / Status
              </label>
              <select
                id="task-status-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-surface-card border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-primary transition"
              >
                {stages.map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Assignee & Due Date Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="task-assignee-select"
                className="block text-xs font-semibold uppercase tracking-wider text-text-primary mb-1"
              >
                Assignee
              </label>
              <select
                id="task-assignee-select"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="w-full bg-surface-card border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-primary transition"
              >
                {team.map((member) => (
                  <option key={member} value={member}>
                    {member}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="task-duedate-input"
                className="block text-xs font-semibold uppercase tracking-wider text-text-primary mb-1"
              >
                Due Date
              </label>
              <input
                id="task-duedate-input"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-surface-card border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-primary transition [color-scheme:dark]"
              />
            </div>
          </div>

          {/* Curated Prompt Context Section */}
          <div className="p-3.5 rounded-xl bg-brand-primary/10 border border-brand-primary/30 space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="inline-flex items-center justify-center w-5 h-5 rounded bg-brand-primary/20 text-brand-primary text-xs font-mono"
                >
                  ✦
                </span>
                <div>
                  <label
                    htmlFor="task-context-textarea"
                    className="block text-xs font-semibold uppercase tracking-wider text-brand-primary"
                  >
                    Curated Prompt Context
                  </label>
                  <p className="text-[11px] text-text-muted">
                    Paste-ready AI briefing for the next prompt or teammate handoff
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleInsertTemplate}
                  className="px-2 py-1 rounded text-[11px] font-mono bg-surface-card hover:bg-slate-700 text-text-primary border border-slate-700 transition"
                  title="Insert structured prompt briefing template"
                >
                  + Template
                </button>
                <select
                  aria-label="Select AI Tool for Prompt Context"
                  value={contextTool}
                  onChange={(e) => setContextTool(e.target.value)}
                  className="bg-surface-card border border-brand-primary/40 rounded px-2 py-1 text-xs font-mono text-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
                  title="AI Tool used for this context"
                >
                  {AI_TOOLS.map((tool) => (
                    <option key={tool} value={tool}>
                      {tool}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <textarea
              id="task-context-textarea"
              rows={4}
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Curated briefing for the next AI / teammate (working prompts, architectural constraints, files to touch)..."
              className="w-full bg-surface-page/90 border border-slate-700/80 rounded-lg px-3 py-2 text-xs font-mono text-text-primary placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition resize-y leading-relaxed"
            />

            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-text-muted pt-0.5">
              <span>
                {context.trim()
                  ? `Tool: ${contextTool} · ${context.trim().length} chars`
                  : 'No prompt context recorded yet'}
              </span>
              <div className="flex items-center gap-2">
                {formattedUpdatedAt && (
                  <span>Last saved: {formattedUpdatedAt}</span>
                )}
                <button
                  type="button"
                  onClick={handleCopyFromModal}
                  className="px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-brand-primary/20 hover:bg-brand-primary/30 text-brand-primary border border-brand-primary/40 transition flex items-center gap-1"
                  title="Copy formatted Markdown prompt context to clipboard"
                >
                  <svg className="w-3.5 h-3.5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Copy as Prompt Context
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800 mt-6">
            {isEditing ? (
              <button
                type="button"
                onClick={handleDelete}
                className="px-3 py-2 rounded-lg text-xs font-semibold text-type-bug hover:opacity-90 hover:bg-type-bug/10 border border-type-bug/20 transition flex items-center gap-1.5"
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete Task
              </button>
            ) : (
              <div></div>
            )}

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-text-muted hover:text-white hover:bg-surface-card transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg text-xs font-semibold bg-brand-primary hover:opacity-90 text-slate-950 shadow-md shadow-brand-primary/30 transition"
              >
                {isEditing ? 'Save Changes' : '+ Add Task'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
