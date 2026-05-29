/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // IllamViz Brand Palette
        illam: {
          50:  '#fdf8f3',
          100: '#f9ede0',
          200: '#f2d5b8',
          300: '#e8b688',
          400: '#d98c52',
          500: '#c8692a',  // primary terracotta
          600: '#a8511c',
          700: '#863d14',
          800: '#652e0f',
          900: '#3d1c09',
        },
        sand: {
          50:  '#fefcf8',
          100: '#fdf7ed',
          200: '#f8edda',
          300: '#f0dfc0',
          400: '#e4c99a',
          500: '#d4ae72',
        },
        stone: {
          50:  '#f8f6f2',
          100: '#eeeae3',
          200: '#ddd6c8',
          300: '#c8bcaa',
          400: '#ae9d86',
          500: '#917e64',
        },
        warm: {
          dark:    '#140c07',
          deeper:  '#1e1008',
          mid:     '#2a160d',
          surface: '#3d2212',
        }
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sub:     ['"Tenor Sans"', '"DM Sans"', 'sans-serif'],
        body:    ['"DM Sans"', 'system-ui', 'sans-serif'],
        label:   ['"Barlow Condensed"', '"DM Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'illam-gradient': 'linear-gradient(160deg, #1e1008 0%, #2a160d 45%, #1a1205 100%)',
        'hero-vignette':  'radial-gradient(ellipse at 60% 50%, transparent 20%, rgba(14,7,3,0.9) 100%)',
        'warm-glow':      'radial-gradient(ellipse at 50% 80%, rgba(200,105,42,0.12) 0%, transparent 65%)',
      },
      animation: {
        'fade-up':   'fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) forwards',
        'fade-in':   'fadeIn 1.2s ease forwards',
        'pulse-slow':'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)'    },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}