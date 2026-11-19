/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: 'var(--c-bg)',
          soft: 'var(--c-bg-soft)',
          card: 'var(--c-card)',
        },
        chalk: {
          DEFAULT: 'var(--c-text)',
          dim: 'var(--c-dim)',
        },
        line: 'var(--c-line)',
        lime: {
          electric: '#C5F36B',
        },
        voltage: '#718CFF',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
};
