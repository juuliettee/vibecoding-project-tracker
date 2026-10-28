import React, { useState } from 'react';

export const ACCENT_THEMES = [
  { id: 'indigo', label: 'Indigo (Default)', hex: '#6366f1', ring: 'ring-indigo-400', bg: 'bg-indigo-500' },
  { id: 'emerald', label: 'Emerald', hex: '#10b981', ring: 'ring-emerald-400', bg: 'bg-emerald-500' },
  { id: 'violet', label: 'Violet', hex: '#8b5cf6', ring: 'ring-violet-400', bg: 'bg-violet-500' },
  { id: 'cyan', label: 'Cyan', hex: '#06b6d4', ring: 'ring-cyan-400', bg: 'bg-cyan-500' },
  { id: 'rose', label: 'Rose', hex: '#f43f5e', ring: 'ring-rose-400', bg: 'bg-rose-500' },
  { id: 'amber', label: 'Amber', hex: '#f59e0b', ring: 'ring-amber-400', bg: 'bg-amber-500' },
];

export const FONT_SCALES = [
  { id: 'normal', label: '100%', scale: '100%' },
  { id: 'large', label: '110%', scale: '110%' },
  { id: 'xlarge', label: '120%', scale: '120%' },
];

export default function AccessibilityMenu({ prefs, onChangePrefs }) {
  const [isOpen, setIsOpen] = useState(false);

  const updatePref = (key, val) => {
    onChangePrefs({ ...prefs, [key]: val });
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label="Accessibility and theme settings"
        className="px-2.5 py-1.5 rounded-lg text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1.5"
        title="Accessibility & Accent Colour Settings"
      >
        <span className="font-bold text-indigo-400">Aa</span>
        <span className="hidden xl:inline">Accessibility</span>
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-label="Accessibility & Display Preferences"
          className="absolute right-0 mt-2 w-72 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-4 z-40 space-y-4 text-xs text-slate-200"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="font-semibold uppercase tracking-wider text-slate-200">
              Accessibility & Theme
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close accessibility menu"
              className="text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Font Size Scaling */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Text Size Scaling (WCAG)
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {FONT_SCALES.map((fs) => (
                <button
                  key={fs.id}
                  type="button"
                  onClick={() => updatePref('fontScale', fs.id)}
                  aria-pressed={prefs.fontScale === fs.id}
                  className={`py-1.5 px-2 rounded-lg font-mono text-xs border transition ${
                    prefs.fontScale === fs.id
                      ? 'bg-indigo-600/25 text-white border-indigo-500 font-semibold'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                  }`}
                >
                  {fs.label}
                </button>
              ))}
            </div>
          </div>

          {/* High Contrast Toggle */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <span className="block text-xs font-medium text-slate-200">
                High-Contrast Borders
              </span>
              <span className="text-[11px] text-slate-400">
                Stronger card outlines & status labels
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={Boolean(prefs.highContrast)}
              onClick={() => updatePref('highContrast', !prefs.highContrast)}
              className={`w-10 h-5 rounded-full transition relative ${
                prefs.highContrast ? 'bg-indigo-600' : 'bg-slate-700'
              }`}
            >
              <span
                className={`block w-4 h-4 rounded-full bg-white transition-transform transform ${
                  prefs.highContrast ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          {/* User-Definable Brand Accent Colour */}
          <div className="pt-1 border-t border-slate-800">
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
              User-Defined Accent Colour
            </label>
            <div className="grid grid-cols-3 gap-2">
              {ACCENT_THEMES.map((theme) => (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => updatePref('accent', theme.id)}
                  aria-pressed={prefs.accent === theme.id}
                  className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg border text-[11px] font-mono transition ${
                    prefs.accent === theme.id
                      ? 'bg-slate-800 text-white border-white/60'
                      : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: theme.hex }}
                  />
                  <span className="truncate">{theme.label.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
