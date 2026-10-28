import React, { useState } from 'react';
import { formatContextTimestamp } from './TaskModal.jsx';

const DEFAULT_TEAM = ['Juliette', 'Tom Davies', 'Hannah Evans'];

const DEFAULT_STAGES = [
  { id: 'todo', label: 'To Do' },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'review', label: 'Review' },
  { id: 'done', label: 'Done' },
];

/**
 * Evaluates the due-date status according to DESIGN.md §2:
 * - due-safe (#10b981): 2 or more days away.
 * - due-warning (#f59e0b): Due today or tomorrow (0–1 days away).
 * - due-overdue (#ef4444): Past due date (< 0 days).
 * - due-neutral (#64748b): Task is 'done' (overrides due date) or no date set.
 */
export function getDueDateStatus(task) {
  if (!task || !task.dueDate || task.status === 'done') {
    return 'neutral';
  }

  const [year, month, day] = task.dueDate.split('-').map(Number);
  if (!year || !month || !day) return 'neutral';

  const dueDateTime = new Date(year, month - 1, day).getTime();
  const now = new Date();
  const todayTime = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

  const diffDays = Math.round((dueDateTime - todayTime) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return 'overdue';
  } else if (diffDays <= 1) {
    return 'warning';
  } else {
    return 'safe';
  }
}

export function getDueDateStatusLabel(status) {
  switch (status) {
    case 'overdue':
      return 'Overdue';
    case 'warning':
      return 'Due soon';
    case 'safe':
      return 'On track';
    case 'neutral':
    default:
      return 'Done';
  }
}

export function getDueDateBadgeStyles(status) {
  switch (status) {
    case 'overdue':
      return 'text-due-overdue bg-due-overdue/10 border border-due-overdue/30';
    case 'warning':
      return 'text-due-warning bg-due-warning/10 border border-due-warning/30';
    case 'safe':
      return 'text-due-safe bg-due-safe/10 border border-due-safe/30';
    case 'neutral':
    default:
      return 'text-due-neutral bg-surface-page border border-slate-700/60';
  }
}

export function getDueDateCardTint(status, highContrast = false) {
  if (highContrast) {
    switch (status) {
      case 'overdue':
        return 'bg-red-950/35 border-2 border-due-overdue';
      case 'warning':
        return 'bg-amber-950/35 border-2 border-due-warning';
      case 'safe':
        return 'bg-surface-card border-2 border-due-safe/80';
      case 'neutral':
      default:
        return 'bg-surface-card border-2 border-due-neutral';
    }
  }

  switch (status) {
    case 'overdue':
      return 'bg-red-950/20 border-due-overdue/40 hover:border-due-overdue/60';
    case 'warning':
      return 'bg-amber-950/20 border-due-warning/40 hover:border-due-warning/60';
    case 'safe':
      return 'bg-surface-card/90 border-due-safe/25 hover:border-due-safe/45';
    case 'neutral':
    default:
      return 'bg-surface-card/90 border-slate-700/70 hover:border-slate-600';
  }
}

export default function TaskCard({
  task,
  onClick,
  team = DEFAULT_TEAM,
  stages = DEFAULT_STAGES,
  onHandoff,
  onStageChange,
  onCopyPrompt,
  highContrast = false,
}) {
  const [justCopied, setJustCopied] = useState(false);

  const isFeature = task.type === 'feature';
  const dueDateStatus = getDueDateStatus(task);
  const dueDateLabel = getDueDateStatusLabel(dueDateStatus);
  const badgeStyles = getDueDateBadgeStyles(dueDateStatus);
  const cardTintStyles = getDueDateCardTint(dueDateStatus, highContrast);
  const hasContext = Boolean(task.context && task.context.trim());
  const updatedTimeLabel = formatContextTimestamp(task.contextUpdatedAt);
  const assigneeOptions =
    task.assignee && !team.includes(task.assignee)
      ? [task.assignee, ...team]
      : team;

  const handleCopyClick = (e) => {
    e.stopPropagation();
    if (onCopyPrompt) {
      onCopyPrompt(task);
    }
    setJustCopied(true);
    setTimeout(() => setJustCopied(false), 1800);
  };

  return (
    <article
      aria-label={`${task.type} task: ${task.title}`}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick && onClick();
        }
      }}
      className={`hover:bg-surface-card rounded-lg p-4 border shadow-sm hover:shadow-md transition-all group cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary ${cardTintStyles} ${
        isFeature
          ? 'border-l-4 border-l-type-feature'
          : 'border-l-4 border-l-type-bug'
      }`}
    >
      {/* Header: Type Badge, Quick Stage Selector & ID */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span
          className={`inline-flex items-center gap-1 text-[11px] font-mono uppercase px-2 py-0.5 rounded font-semibold border ${
            isFeature
              ? 'bg-type-feature/10 text-type-feature border-type-feature/30'
              : 'bg-type-bug/10 text-type-bug border-type-bug/30'
          }`}
        >
          {isFeature ? (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
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
              aria-hidden="true"
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

        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
          {onStageChange && (
            <select
              aria-label={`Change stage for ${task.title}`}
              value={task.status}
              onChange={(e) => {
                e.stopPropagation();
                onStageChange(task.id, e.target.value);
              }}
              className="bg-surface-page/90 hover:bg-surface-page border border-slate-700 rounded px-1.5 py-0.5 text-[10px] font-mono text-text-primary focus:outline-none focus:ring-1 focus:ring-brand-primary cursor-pointer"
              title="Move task to stage"
            >
              {stages.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.label}
                </option>
              ))}
            </select>
          )}
          <span className="text-[11px] font-mono text-text-muted">
            {task.id}
          </span>
        </div>
      </div>

      {/* Title & Description */}
      <h3 className="text-sm font-medium text-text-primary group-hover:text-brand-primary transition-colors">
        {task.title}
      </h3>
      {task.description && (
        <p className="text-xs text-text-muted mt-1 line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Curated Prompt Context Indicator & Snippet */}
      {hasContext && (
        <div className="mt-2.5 p-2 rounded-md bg-surface-page/75 border border-brand-primary/25">
          <div className="flex items-center justify-between gap-1.5 mb-1">
            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-brand-primary bg-brand-primary/15 px-1.5 py-0.5 rounded border border-brand-primary/30">
              <span>✦</span>
              <span>{task.contextTool || 'AI Context'}</span>
            </span>
            {updatedTimeLabel && (
              <span className="text-[10px] font-mono text-text-muted truncate">
                {updatedTimeLabel}
              </span>
            )}
          </div>
          <p className="text-[11px] font-mono text-text-primary line-clamp-2 leading-snug">
            {task.context}
          </p>
        </div>
      )}

      {/* Copy as Prompt Context Button */}
      <div className="mt-2.5" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={handleCopyClick}
          aria-label={`Copy prompt context for ${task.title}`}
          className={`w-full py-1.5 px-2.5 rounded-md text-[11px] font-mono font-medium border transition flex items-center justify-center gap-1.5 ${
            justCopied
              ? 'bg-due-safe/20 text-due-safe border-due-safe/40'
              : 'bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary border-brand-primary/30 hover:border-brand-primary/50'
          }`}
          title="Serialize task + prompt context to Markdown and copy to clipboard"
        >
          {justCopied ? (
            <>
              <svg className="w-3.5 h-3.5 text-due-safe" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Copied Prompt Context!</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span>Copy as Prompt Context</span>
            </>
          )}
        </button>
      </div>

      {/* Footer: Assignee & Due Date */}
      <div className="mt-3 pt-3 border-t border-slate-700/50 flex items-center justify-between text-xs text-text-muted">
        <div
          className="flex items-center gap-1.5"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="w-5 h-5 rounded-full bg-brand-primary/20 text-brand-primary flex items-center justify-center text-[10px] font-bold">
            {task.assignee ? task.assignee.charAt(0) : '?'}
          </span>
          <select
            aria-label={`Hand off ${task.title} to teammate`}
            value={task.assignee}
            onChange={(e) => {
              e.stopPropagation();
              onHandoff && onHandoff(task.id, e.target.value);
            }}
            onClick={(e) => e.stopPropagation()}
            className="bg-surface-page/80 hover:bg-surface-page border border-slate-700/60 rounded px-1.5 py-0.5 text-xs text-text-primary focus:outline-none focus:ring-1 focus:ring-brand-primary cursor-pointer max-w-[110px] truncate"
            title="Hand off to teammate"
          >
            {assigneeOptions.map((member) => (
              <option key={member} value={member}>
                {member}
              </option>
            ))}
          </select>
        </div>
        {task.dueDate && (
          <span
            className={`inline-flex items-center gap-1 font-mono text-[11px] px-2 py-0.5 rounded ${badgeStyles}`}
            title={`Due: ${task.dueDate} (${dueDateLabel})`}
          >
            <svg className="w-3 h-3 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{task.dueDate}</span>
            <span className="uppercase text-[9px] font-bold ml-0.5">
              · {dueDateLabel}
            </span>
          </span>
        )}
      </div>
    </article>
  );
}
