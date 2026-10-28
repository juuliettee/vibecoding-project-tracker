import React, { useState } from 'react';

export const ACCENT_THEMES = [
  {
    id: 'indigo',
    label: 'Indigo (Default)',
    hex: '#a5b4fc',
    rgb: '165 180 252',
    accentRgb: '196 181 253',
  },
  {
    id: 'violet',
    label: 'Violet',
    hex: '#c4b5fd',
    rgb: '196 181 253',
    accentRgb: '221 214 254',
  },
  {
    id: 'cyan',
    label: 'Cyan',
    hex: '#22d3ee',
    rgb: '34 211 238',
    accentRgb: '103 232 249',
  },
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
        className="px-2.5 py-1.5 rounded-lg text-xs font-mono bg-surface-card hover:bg-slate-700 text-text-primary border border-slate-700 transition flex items-center gap-1.5"
        title="Accessibility & Accent Colour Settings"
      >
        <span className="font-bold text-brand-primary">Aa</span>
        <span className="hidden xl:inline">Accessibility</span>
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-label="Accessibility & Display Preferences"
          className="absolute right-0 mt-2 w-72 rounded-xl bg-surface-page border border-slate-700 shadow-2xl p-4 z-40 space-y-4 text-xs text-text-primary animate-fadeIn"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="font-semibold uppercase tracking-wider text-text-primary">
              Accessibility & Theme
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close accessibility menu"
              className="text-text-muted hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Text Size Options */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">
              Text Size Options
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
                      ? 'bg-brand-primary/25 text-white border-brand-primary font-semibold'
                      : 'bg-surface-card text-text-muted border-slate-700 hover:text-white'
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
              <span className="block text-xs font-medium text-text-primary">
                High-Contrast Borders
              </span>
              <span className="text-[11px] text-text-muted">
                Thicker 2px card & column outlines
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={Boolean(prefs.highContrast)}
              onClick={() => updatePref('highContrast', !prefs.highContrast)}
              className={`w-10 h-5 rounded-full transition relative ${
                prefs.highContrast ? 'bg-brand-primary' : 'bg-slate-700'
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
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-2">
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
                      ? 'bg-surface-card text-white border-brand-primary'
                      : 'bg-surface-page/80 text-text-muted border-slate-800 hover:border-slate-700'
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
