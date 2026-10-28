import React, { useState } from 'react';

export const SWE_ROLES = [
  'Senior Developer',
  'Junior Developer',
  'Architect',
  'UX Member',
  'Database Creator',
  'Software Engineer',
];

export default function TeamModal({
  isOpen,
  onClose,
  teamMembers,
  onAddMember,
  onRemoveMember,
  tasks,
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(SWE_ROLES[0]);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail) {
      setError('Both Name and Contact Email are required.');
      return;
    }

    if (
      teamMembers.some(
        (m) => m.name.toLowerCase() === trimmedName.toLowerCase()
      )
    ) {
      setError('A team member with this name already exists.');
      return;
    }

    onAddMember({
      id: `member-${Date.now()}`,
      name: trimmedName,
      email: trimmedEmail,
      role,
    });

    setName('');
    setEmail('');
    setRole(SWE_ROLES[0]);
    setError('');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="team-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 text-slate-100 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
          <div>
            <h2
              id="team-modal-title"
              className="text-lg font-semibold tracking-tight text-white"
            >
              Team Directory & Role Management
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Manage SWE team members, contact emails, and specialist roles
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close team management modal"
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Current Team Roster */}
        <div className="space-y-2.5 mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Active Project Team ({teamMembers.length})
            </h3>
            <span className="text-[11px] font-mono text-slate-400">
              Single-Project Roster
            </span>
          </div>

          <div className="space-y-2">
            {teamMembers.map((member) => {
              const assignedCount = tasks.filter(
                (t) => t.assignee === member.name
              ).length;
              return (
                <div
                  key={member.id || member.name}
                  className="p-3 rounded-xl bg-slate-800/70 border border-slate-700/70 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 flex items-center justify-center text-xs font-bold shrink-0">
                      {member.name.charAt(0)}
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-medium text-white">
                          {member.name}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                          {member.role}
                        </span>
                      </div>
                      <a
                        href={`mailto:${member.email}`}
                        className="text-xs font-mono text-slate-400 hover:text-indigo-300 truncate block"
                      >
                        {member.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-slate-900 text-slate-300 border border-slate-700">
                      {assignedCount} {assignedCount === 1 ? 'task' : 'tasks'}
                    </span>
                    {teamMembers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => onRemoveMember(member.name)}
                        aria-label={`Remove ${member.name} from team`}
                        className="p-1 rounded text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition"
                        title="Remove member"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Add New Team Member Form */}
        <form
          onSubmit={handleSubmit}
          className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/80 space-y-3"
        >
          <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
            + Add New Team Member
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="member-name-input"
                className="block text-[11px] font-medium text-slate-300 mb-1"
              >
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                id="member-name-input"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Jordan Taylor"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="member-email-input"
                className="block text-[11px] font-medium text-slate-300 mb-1"
              >
                Contact Email <span className="text-red-400">*</span>
              </label>
              <input
                id="member-email-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jordan@vibeflow.dev"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="member-role-select"
              className="block text-[11px] font-medium text-slate-300 mb-1"
            >
              Engineering / UX Role
            </label>
            <select
              id="member-role-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {SWE_ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/25 transition"
            >
              + Add to Team
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
