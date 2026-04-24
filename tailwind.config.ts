import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      geistSans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
      geistMono: ['var(--font-geist-mono)', 'system-ui', 'sans-serif'],
      sourceSerif: ['var(--font-source-serif)', 'system-ui', 'sans-serif'],
      notoSans: ['var(--font-noto-sans)', 'system-ui', 'sans-serif'],
    },
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      colors: {
        blue: {
          400: '#2589FE',
          500: '#0070F3',
          600: '#2F6FEB',
        },
      },
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  }
};
export default config;
