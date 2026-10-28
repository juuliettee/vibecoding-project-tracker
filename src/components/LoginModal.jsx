import React, { useState, useEffect } from 'react';

const DEMO_PASSCODE = '2026';

export default function LoginModal({
  isOpen,
  teamMembers,
  currentUser,
  onLogin,
  onClose,
  onResetDemo,
}) {
  const [selectedEmail, setSelectedEmail] = useState(
    currentUser?.email || teamMembers[0]?.email || ''
  );
  const [accessPin, setAccessPin] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setSelectedEmail(currentUser?.email || teamMembers[0]?.email || '');
      setAccessPin('');
      setError('');
    }
  }, [isOpen, currentUser, teamMembers]);

  if (!isOpen) return null;

  const handleQuickLogin = (member) => {
    setError('');
    onLogin(member);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError('');

    const matched = teamMembers.find(
      (m) => m.email.toLowerCase() === selectedEmail.trim().toLowerCase()
    );

    if (!matched) {
      setError(
        'Unrecognised email. Please select one of the registered team emails listed above.'
      );
      return;
    }

    if (accessPin.trim() !== DEMO_PASSCODE) {
      setError(
        `Invalid workspace passcode. Please enter the demo passcode: ${DEMO_PASSCODE}.`
      );
      return;
    }

    onLogin(matched);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn"
    >
      <div className="relative w-full max-w-md bg-surface-page border border-slate-700/80 rounded-2xl shadow-2xl p-6 text-text-primary">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <h2
                id="login-modal-title"
                className="text-xl font-bold tracking-tight"
              >
                <span className="text-white">Vibe</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
                  Flow
                </span>
                <span className="text-text-primary font-semibold ml-1.5 text-base">
                  Workspace Sign In
                </span>
              </h2>
            </div>
            <p className="text-xs text-text-muted mt-1">
              Client-side demo sign-in · Select a team profile or enter credentials below
            </p>
          </div>

          {currentUser && onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close sign in dialog"
              className="text-text-muted hover:text-white p-1 rounded-lg hover:bg-surface-card transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* One-Click Demo User Profiles */}
        <div className="space-y-2 mb-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
            One-Click Demo Profile Sign-In
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
                      ? 'bg-brand-primary/20 border-brand-primary/60 text-white'
                      : 'bg-surface-card/80 hover:bg-surface-card border-slate-700/70 hover:border-brand-primary/40 text-text-primary'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-9 h-9 rounded-full bg-brand-primary/20 border border-brand-primary/30 text-brand-primary flex items-center justify-center text-sm font-bold shrink-0">
                      {member.name.charAt(0)}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white truncate">
                          {member.name}
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-surface-page text-brand-primary border border-slate-700">
                          {member.role}
                        </span>
                      </div>
                      <p className="text-xs font-mono text-text-muted truncate">
                        {member.email}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-brand-primary shrink-0">
                    {isCurrent ? 'Active ✓' : 'Sign in →'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Standard Email + Passcode Form with Real Validation */}
        <form
          onSubmit={handleFormSubmit}
          className="pt-4 border-t border-slate-800 space-y-3"
        >
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
              Or Sign In with Email & Passcode
            </p>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-brand-primary/15 text-brand-primary border border-brand-primary/30">
              Demo passcode: {DEMO_PASSCODE}
            </span>
          </div>

          <div>
            <label
              htmlFor="login-email-input"
              className="block text-xs text-text-primary mb-1"
            >
              Team Email Address
            </label>
            <input
              id="login-email-input"
              type="email"
              required
              value={selectedEmail}
              onChange={(e) => setSelectedEmail(e.target.value)}
              placeholder="juliette@example.com"
              className="w-full bg-surface-card border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
          </div>

          <div>
            <label
              htmlFor="login-pin-input"
              className="block text-xs text-text-primary mb-1"
            >
              Workspace Passcode (Enter <code className="font-mono text-brand-primary">{DEMO_PASSCODE}</code>)
            </label>
            <input
              id="login-pin-input"
              type="password"
              required
              value={accessPin}
              onChange={(e) => setAccessPin(e.target.value)}
              placeholder="2026"
              className="w-full bg-surface-card border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
          </div>

          {error && (
            <p role="alert" className="text-xs text-type-bug font-medium">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold bg-brand-primary hover:opacity-90 text-slate-950 shadow-lg shadow-brand-primary/25 transition"
          >
            Sign In to Workspace
          </button>

          {onResetDemo && (
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={onResetDemo}
                className="text-[11px] font-mono text-text-muted hover:text-text-primary underline transition"
              >
                ↺ Reset demo profiles & tasks
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
