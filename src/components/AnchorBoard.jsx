import React, { useState } from 'react';

const ANCHOR_META = {
  presentation: {
    subtitle: 'Final pitch deck & slides',
    icon: (
      <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
        />
      </svg>
    ),
  },
  demo: {
    subtitle: 'Live deployed Vercel URL',
    icon: (
      <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  report: {
    subtitle: 'Requirements & UX report',
    icon: (
      <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
  documentation: {
    subtitle: 'PRD, Design System & Repo',
    icon: (
      <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
};

function normalizeUrl(rawUrl) {
  const trimmed = (rawUrl || '').trim();
  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export default function AnchorBoard({ anchors, onUpdateAnchor }) {
  const [editingId, setEditingId] = useState(null);
  const [draftUrl, setDraftUrl] = useState('');

  const linkedCount = anchors.filter((a) => Boolean(a.url)).length;

  const handleStartEdit = (anchor) => {
    setEditingId(anchor.id);
    setDraftUrl(anchor.url || '');
  };

  const handleSave = (id) => {
    const normalized = normalizeUrl(draftUrl);
    onUpdateAnchor(id, normalized);
    setEditingId(null);
    setDraftUrl('');
  };

  const handleClear = (id) => {
    onUpdateAnchor(id, null);
    setEditingId(null);
    setDraftUrl('');
  };

  return (
    <section
      aria-label="Deliverable Anchor Board"
      className="mb-6 rounded-xl bg-slate-900/80 border border-slate-800 p-4 shadow-sm"
    >
      {/* Anchor Board Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 text-xs font-mono">
            ⚓
          </span>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
            Deliverable Anchor Board
          </h2>
          <span className="text-xs text-slate-500 hidden sm:inline">
            · Pinned final-project deliverables
          </span>
        </div>

        <span
          className={`px-2 py-0.5 rounded-full text-[11px] font-mono border ${
            linkedCount === anchors.length
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              : 'bg-slate-800 text-slate-400 border-slate-700/60'
          }`}
        >
          {linkedCount}/{anchors.length} Linked
        </span>
      </div>

      {/* Four Pinned Deliverable Slots */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {anchors.map((anchor) => {
          const meta = ANCHOR_META[anchor.id] || {
            subtitle: 'Project deliverable',
            icon: null,
          };
          const isEditing = editingId === anchor.id;
          const hasUrl = Boolean(anchor.url);

          return (
            <div
              key={anchor.id}
              className={`rounded-lg p-3 border transition flex flex-col justify-between gap-2.5 ${
                hasUrl
                  ? 'bg-slate-800/75 border-slate-700/80 hover:border-indigo-500/40'
                  : 'bg-slate-900/50 border-dashed border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Top Row: Icon, Title, Status Badge */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="p-1.5 rounded-md bg-slate-900 border border-slate-700/70 shrink-0">
                    {meta.icon}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-semibold text-slate-100 truncate">
                      {anchor.label}
                    </h3>
                    <p className="text-[11px] text-slate-400 truncate">
                      {meta.subtitle}
                    </p>
                  </div>
                </div>

                <span
                  className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono uppercase shrink-0 border ${
                    hasUrl
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      hasUrl ? 'bg-emerald-400' : 'bg-amber-400'
                    }`}
                  ></span>
                  {hasUrl ? 'Pinned' : 'Empty'}
                </span>
              </div>

              {/* Bottom Area: Edit Input or Active Link Actions */}
              {isEditing ? (
                <div className="space-y-2 pt-1">
                  <input
                    type="text"
                    autoFocus
                    value={draftUrl}
                    onChange={(e) => setDraftUrl(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSave(anchor.id);
                      if (e.key === 'Escape') setEditingId(null);
                    }}
                    placeholder="https://..."
                    className="w-full bg-slate-900 border border-indigo-500/60 rounded px-2 py-1 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                  />
                  <div className="flex items-center justify-between gap-1.5">
                    {hasUrl ? (
                      <button
                        type="button"
                        onClick={() => handleClear(anchor.id)}
                        className="px-2 py-1 rounded text-[10px] font-mono text-red-400 hover:bg-red-500/10 border border-red-500/20 transition"
                      >
                        Unpin
                      </button>
                    ) : (
                      <span></span>
                    )}
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="px-2 py-1 rounded text-[10px] font-mono text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSave(anchor.id)}
                        className="px-2.5 py-1 rounded text-[10px] font-mono font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition"
                      >
                        Save Link
                      </button>
                    </div>
                  </div>
                </div>
              ) : hasUrl ? (
                <div className="pt-1 flex items-center justify-between gap-2 border-t border-slate-700/50">
                  <a
                    href={anchor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-mono text-indigo-300 hover:text-indigo-200 truncate underline decoration-indigo-500/40 underline-offset-2 flex items-center gap-1 min-w-0"
                    title={anchor.url}
                  >
                    <span className="truncate">
                      {anchor.url.replace(/^https?:\/\//i, '')}
                    </span>
                    <span className="shrink-0">↗</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => handleStartEdit(anchor)}
                    className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-700 border border-slate-700 transition shrink-0"
                  >
                    Edit
                  </button>
                </div>
              ) : (
                <div className="pt-1 border-t border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => handleStartEdit(anchor)}
                    className="w-full py-1 px-2 rounded text-[11px] font-mono text-slate-400 hover:text-indigo-300 bg-slate-900/60 hover:bg-indigo-500/10 border border-slate-800 hover:border-indigo-500/30 transition flex items-center justify-center gap-1"
                  >
                    <span>+ Paste {anchor.label} Link</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
