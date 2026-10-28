/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: 'rgb(var(--brand-primary) / <alpha-value>)',
          accent: 'rgb(var(--brand-accent) / <alpha-value>)',
        },
        surface: {
          page: '#0f172a',
          card: '#1e293b',
        },
        // Direct tokens from DESIGN.md
        'brand-primary': 'rgb(var(--brand-primary) / <alpha-value>)',
        'brand-accent': 'rgb(var(--brand-accent) / <alpha-value>)',
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
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 200ms ease-out',
        slideUp: 'slideUp 200ms ease-out',
      },
    },
  },
  plugins: [],
};
