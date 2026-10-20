/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#6366f1',
          accent: '#8b5cf6',
        },
        surface: {
          page: '#0f172a',
          card: '#1e293b',
        },
        // Direct tokens from DESIGN.md
        'brand-primary': '#6366f1',
        'brand-accent': '#8b5cf6',
        'surface-page': '#0f172a',
        'surface-card': '#1e293b',
        'text-primary': '#f8fafc',
        'text-muted': '#94a3b8',
        'type-feature': '#10b981',
        'type-bug': '#ef4444',
        feature: '#10b981',
        bug: '#ef4444',
        due: {
          safe: '#10b981',
          warning: '#f59e0b',
          overdue: '#ef4444',
          neutral: '#64748b',
        },
        'due-safe': '#10b981',
        'due-warning': '#f59e0b',
        'due-overdue': '#ef4444',
        'due-neutral': '#64748b',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
