import React, { useState } from 'react';

export default function LoginModal({
  isOpen,
  teamMembers,
  currentUser,
  onLogin,
  onClose,
}) {
  const [selectedEmail, setSelectedEmail] = useState(
    currentUser?.email || teamMembers[0]?.email || ''
  );
  const [accessPin, setAccessPin] = useState('2026');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleQuickLogin = (member) => {
    setError('');
    onLogin(member);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const matched = teamMembers.find(
      (m) => m.email.toLowerCase() === selectedEmail.trim().toLowerCase()
    );
    if (matched) {
      onLogin(matched);
    } else if (selectedEmail.trim()) {
      // Allow ad-hoc evaluator login without registration barrier
      const nameFromEmail = selectedEmail
        .split('@')[0]
        .replace(/[._-]/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase());
      onLogin({
        id: `user-${Date.now()}`,
        name: nameFromEmail || 'Guest Evaluator',
        email: selectedEmail.trim(),
        role: 'Software Engineer (Evaluator)',
      });
    } else {
      setError('Please select a team profile or enter your work email.');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn"
    >
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 text-slate-100">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <h2
                id="login-modal-title"
                className="text-xl font-bold tracking-tight"
              >
                <span className="text-white">Vibe</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                  Flow
                </span>
                <span className="text-slate-200 font-semibold ml-1.5 text-base">
                  Workspace Sign In
                </span>
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Select your team profile for instant access (no registration required)
            </p>
          </div>

          {currentUser && onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close sign in dialog"
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* One-Click Team Member Profiles */}
        <div className="space-y-2 mb-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            One-Click Team Profile Login
          </p>
          <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
            {teamMembers.map((member) => {
              const isCurrent = currentUser?.name === member.name;
              return (
                <button
                  key={member.id || member.name}
                  type="button"
                  onClick={() => handleQuickLogin(member)}
                  className={`w-full p-3 rounded-xl border text-left transition flex items-center justify-between gap-3 ${
                    isCurrent
                      ? 'bg-indigo-600/20 border-indigo-500/60 text-white'
                      : 'bg-slate-800/70 hover:bg-slate-800 border-slate-700/70 hover:border-indigo-500/40 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-9 h-9 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 flex items-center justify-center text-sm font-bold shrink-0">
                      {member.name.charAt(0)}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white truncate">
                          {member.name}
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-indigo-300 border border-slate-700">
                          {member.role}
                        </span>
                      </div>
                      <p className="text-xs font-mono text-slate-400 truncate">
                        {member.email}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-indigo-400 shrink-0">
                    {isCurrent ? 'Active ✓' : 'Sign in →'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Standard Email + Pin Login Form */}
        <form
          onSubmit={handleFormSubmit}
          className="pt-4 border-t border-slate-800 space-y-3"
        >
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Or Sign In with Work Email
          </p>
          <div>
            <label
              htmlFor="login-email-input"
              className="block text-xs text-slate-300 mb-1"
            >
              Work Email Address
            </label>
            <input
              id="login-email-input"
              type="email"
              value={selectedEmail}
              onChange={(e) => setSelectedEmail(e.target.value)}
              placeholder="name@cardiff.ac.uk"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="login-pin-input"
              className="block text-xs text-slate-300 mb-1"
            >
              Workspace Passcode (Demo pre-filled)
            </label>
            <input
              id="login-pin-input"
              type="password"
              value={accessPin}
              onChange={(e) => setAccessPin(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition"
          >
            Enter VibeFlow Workspace
          </button>
        </form>
      </div>
    </div>
  );
}
