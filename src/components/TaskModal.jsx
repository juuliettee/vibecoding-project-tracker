import { useState, useEffect } from 'react';

export default function TaskModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  task,
  team,
  stages,
}) {
  const isEditing = Boolean(task);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('feature');
  const [status, setStatus] = useState('todo');
  const [assignee, setAssignee] = useState(team[0]);
  const [dueDate, setDueDate] = useState('');
  const [context, setContext] = useState('');
  const [contextTool, setContextTool] = useState('Cursor');

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setType(task.type || 'feature');
      setStatus(task.status || 'todo');
      setAssignee(task.assignee || team[0]);
      setDueDate(task.dueDate || '');
      setContext(task.context || '');
      setContextTool(task.contextTool || 'Cursor');
    } else {
      setTitle('');
      setDescription('');
      setType('feature');
      setStatus('todo');
      setAssignee(team[0]);
      setDueDate('');
      setContext('');
      setContextTool('Cursor');
    }
  }, [task, team, isOpen]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const taskPayload = {
      id: task?.id || `task-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      type,
      status,
      assignee,
      dueDate: dueDate || null,
      createdDate: task?.createdDate || new Date().toISOString().slice(0, 10),
      context: context.trim(),
      contextTool: context.trim() ? contextTool : null,
      contextUpdatedAt: context.trim()
        ? new Date().toISOString()
        : task?.contextUpdatedAt || null,
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 text-slate-100 flex flex-col max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
          <div className="flex items-center gap-2">
            <span
              className={`w-3 h-3 rounded-full ${
                type === 'feature' ? 'bg-emerald-400' : 'bg-red-400'
              }`}
            ></span>
            <h2 className="text-lg font-semibold tracking-tight text-white">
              {isEditing ? 'Edit Vibecoding Task' : 'New Vibecoding Task'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
              Task Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Scaffold authentication flow"
              className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What needs to be built or fixed?"
              className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
            />
          </div>

          {/* Type & Status Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                Type
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setType('feature')}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold border transition ${
                    type === 'feature'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
                      : 'bg-slate-800/60 text-slate-400 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  Feature
                </button>
                <button
                  type="button"
                  onClick={() => setType('bug')}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold border transition ${
                    type === 'bug'
                      ? 'bg-red-500/20 text-red-300 border-red-500/40 shadow-sm'
                      : 'bg-slate-800/60 text-slate-400 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  Bug
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                Stage / Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
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
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                Assignee
              </label>
              <select
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              >
                {team.map((member) => (
                  <option key={member} value={member}>
                    {member}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition [color-scheme:dark]"
              />
            </div>
          </div>

          {/* Prompt Context Section (M9 foundation prepared) */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-indigo-400">
                Prompt Context (AI Briefing)
              </label>
              <select
                value={contextTool}
                onChange={(e) => setContextTool(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded px-2 py-0.5 text-xs text-indigo-300 focus:outline-none"
              >
                <option value="Cursor">Cursor</option>
                <option value="Claude">Claude</option>
                <option value="ChatGPT">ChatGPT</option>
                <option value="Lovable">Lovable</option>
                <option value="Replit">Replit</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <textarea
              rows={3}
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Curated briefing for the next AI / teammate (prompts, constraints, files to touch)..."
              className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800 mt-6">
            {isEditing ? (
              <button
                type="button"
                onClick={handleDelete}
                className="px-3 py-2 rounded-lg text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/20 transition flex items-center gap-1.5"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 hover:shadow-indigo-600/50 transition"
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
