import React from 'react';

const DEFAULT_TEAM = ['Juliette', 'Alex Chen', 'Sam Rivera'];

export default function TaskCard({ task, onClick, team = DEFAULT_TEAM, onHandoff }) {
  const isFeature = task.type === 'feature';

  return (
    <div
      onClick={onClick}
      className={`bg-slate-800/90 hover:bg-slate-800 rounded-lg p-4 border border-slate-700/70 shadow-sm hover:shadow-md transition-all group cursor-pointer hover:border-slate-600 ${
        isFeature
          ? 'border-l-4 border-l-emerald-500'
          : 'border-l-4 border-l-red-500'
      }`}
    >
      {/* Header: Type Badge & ID */}
      <div className="flex items-center justify-between mb-2">
        <span
          className={`inline-flex items-center gap-1 text-[11px] font-mono uppercase px-2 py-0.5 rounded font-semibold border ${
            isFeature
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              : 'bg-red-500/10 text-red-400 border-red-500/30'
          }`}
        >
          {isFeature ? (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          )}
          {task.type}
        </span>
        <span className="text-[11px] font-mono text-slate-500">
          {task.id}
        </span>
      </div>

      {/* Title & Description */}
      <h3 className="text-sm font-medium text-slate-100 group-hover:text-indigo-300 transition-colors">
        {task.title}
      </h3>
      {task.description && (
        <p className="text-xs text-slate-400 mt-1 line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Footer: Assignee & Due Date */}
      <div className="mt-3 pt-3 border-t border-slate-700/50 flex items-center justify-between text-xs text-slate-400">
        <div
          className="flex items-center gap-1.5"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center text-[10px] font-bold">
            {task.assignee ? task.assignee.charAt(0) : '?'}
          </span>
          <select
            value={task.assignee}
            onChange={(e) => {
              e.stopPropagation();
              onHandoff && onHandoff(task.id, e.target.value);
            }}
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 rounded px-1.5 py-0.5 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer max-w-[110px] truncate"
            title="Hand off to teammate"
          >
            {team.map((member) => (
              <option key={member} value={member}>
                {member}
              </option>
            ))}
          </select>
        </div>
        {task.dueDate && (
          <span className="font-mono text-[11px] text-slate-400">
            {task.dueDate}
          </span>
        )}
      </div>
    </div>
  );
}
