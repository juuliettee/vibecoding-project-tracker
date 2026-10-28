import React from 'react';
import { formatContextTimestamp } from './TaskModal.jsx';
import { copyTextToClipboard } from '../utils/promptSerializer.js';

export default function PromptVaultModal({
  isOpen,
  onClose,
  tasks,
  onCopyTaskPrompt,
  onToast,
}) {
  if (!isOpen) return null;

  const tasksWithContext = tasks.filter(
    (t) => Boolean(t.context && t.context.trim())
  );

  const handleExportAllHistory = async () => {
    const lines = [
      '# VibeFlow — Complete Vibecoding Prompt History Log',
      `Generated: ${new Date().toISOString()}`,
      `Total Curated Tasks: ${tasksWithContext.length}`,
      '',
      ...tasksWithContext.map((t, index) =>
        [
          `## ${index + 1}. ${t.title} (\`${t.id}\`)`,
          `- **Stage:** \`${t.status}\` | **Type:** \`${t.type}\` | **Assignee:** ${t.assignee}`,
          `- **AI Tool:** ${t.contextTool || 'Unspecified'} | **Updated:** ${
            formatContextTimestamp(t.contextUpdatedAt) || 'N/A'
          }`,
          `- **Description:** ${t.description || 'N/A'}`,
          '',
          '```text',
          t.context.trim(),
          '```',
          '',
        ].join('\n')
      ),
    ].join('\n');

    await copyTextToClipboard(lines);
    if (onToast) {
      onToast('Full Vibe Coding History exported to clipboard as Markdown!');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="prompt-vault-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-surface-page border border-slate-700/80 rounded-2xl shadow-2xl p-6 text-text-primary flex flex-col max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-brand-primary/20 text-brand-primary border border-brand-primary/30 text-xs font-mono">
                ✦
              </span>
              <h2
                id="prompt-vault-title"
                className="text-lg font-semibold tracking-tight text-white"
              >
                Vibe Coding Prompt History Studio
              </h2>
            </div>
            <p className="text-xs text-text-muted mt-0.5">
              Curated prompt context log across all tasks · Ready for AI handoff & deliverable export
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportAllHistory}
              className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-brand-primary hover:opacity-90 text-slate-950 shadow-md shadow-brand-primary/30 transition flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Export All History (.md)
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close prompt history studio"
              className="text-text-muted hover:text-white p-1 rounded-lg hover:bg-surface-card transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Prompt Entries List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {tasksWithContext.length === 0 ? (
            <div className="p-8 text-center rounded-xl border border-dashed border-slate-800 text-xs text-text-muted">
              No curated prompt contexts recorded yet. Add a Prompt Context on any task to populate the studio.
            </div>
          ) : (
            tasksWithContext.map((t) => (
              <div
                key={t.id}
                className="p-4 rounded-xl bg-surface-card/80 border border-slate-700/70 space-y-2"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-brand-primary/15 text-brand-primary border border-brand-primary/30">
                      ✦ {t.contextTool || 'AI'}
                    </span>
                    <h3 className="text-sm font-semibold text-white">
                      {t.title}
                    </h3>
                    <span className="text-[11px] font-mono text-text-muted">
                      ({t.id})
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-text-muted">
                      {t.assignee} · {formatContextTimestamp(t.contextUpdatedAt) || 'Saved'}
                    </span>
                    <button
                      type="button"
                      onClick={() => onCopyTaskPrompt(t)}
                      className="px-2.5 py-1 rounded text-[11px] font-mono bg-surface-page hover:bg-brand-primary/25 text-brand-primary border border-brand-primary/30 transition"
                    >
                      Copy Prompt
                    </button>
                  </div>
                </div>

                <pre className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs font-mono text-text-primary whitespace-pre-wrap leading-relaxed">
                  {t.context}
                </pre>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
