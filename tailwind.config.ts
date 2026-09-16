import type { Config } from 'tailwindcss';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * DESIGN TOKENS — Pulmo Mentor BFD / Yashoda Hospitals, Somajiguda Pulmonology
 * ─────────────────────────────────────────────────────────────────────────────
 * BRAND NOTE (for the marketing team):
 * These values are a restrained, WCAG-checked *placeholder* palette built in the
 * spirit of the Yashoda identity — deep navy, white, soft neutral greys and one
 * warm accent. They are NOT sampled from an official brand sheet.
 *
 * When the official Yashoda brand guideline is supplied, replace the hex values
 * in `ink` (primary navy) and `accent` (warm) below. Nothing else in the code
 * base hard-codes a brand colour, so the whole site re-skins from this file.
 * Verify contrast stays at or above WCAG AA (4.5:1 body, 3:1 large text).
 * ─────────────────────────────────────────────────────────────────────────────
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      // 400px: the line between "small phone" and "normal phone". Below it the
      // header lockup drops its third word rather than overflowing.
      xs: '400px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // Primary — deep navy / indigo
        ink: {
          950: '#050E1C',
          900: '#0A1A2F',
          800: '#10263F',
          700: '#16324F',
          600: '#1E4268',
          500: '#2A5A8A',
          400: '#4E7DAB',
          300: '#8FAAC6',
          200: '#C3D2E1',
          100: '#E1E8F0',
        },
        // Warm accent — restrained copper, used sparingly for emphasis only
        accent: {
          700: '#8C4E1B',
          600: '#A85F22',
          500: '#C4762F',
          400: '#D9924B',
          300: '#E7B384',
          200: '#F1D4B8',
          100: '#F9EDE1',
        },
        // Neutral surfaces
        mist: {
          50: '#FBFCFE',
          100: '#F5F8FC',
          200: '#EDF1F7',
          300: '#E2E8F1',
        },
        line: '#E2E8F1',
        'line-dark': 'rgba(255,255,255,0.12)',
      },
      fontFamily: {
        sans: ['Inter var', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        // Fluid editorial scale — mobile floor / desktop ceiling per the brief
        eyebrow: ['0.6875rem', { lineHeight: '1rem', letterSpacing: '0.18em' }],
        meta: ['0.8125rem', { lineHeight: '1.25rem', letterSpacing: '0.01em' }],
        display: ['clamp(2rem, 1.15rem + 4.2vw, 4rem)', { lineHeight: '1.04', letterSpacing: '-0.033em' }],
        heading: ['clamp(1.625rem, 1.15rem + 2.1vw, 2.75rem)', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        subhead: ['clamp(1.25rem, 1.05rem + 0.9vw, 1.625rem)', { lineHeight: '1.25', letterSpacing: '-0.015em' }],
        lede: ['clamp(1.0625rem, 1rem + 0.35vw, 1.1875rem)', { lineHeight: '1.65' }],
      },
      spacing: {
        section: 'clamp(4rem, 2.5rem + 6vw, 8.5rem)',
        'section-sm': 'clamp(2.75rem, 2rem + 3.5vw, 5rem)',
      },
      maxWidth: {
        container: '80rem',
        prose: '38rem',
      },
      borderRadius: {
        card: '1.125rem',
        pill: '999px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(10,26,47,0.04), 0 8px 24px -12px rgba(10,26,47,0.10)',
        'card-hover': '0 2px 4px rgba(10,26,47,0.05), 0 22px 48px -20px rgba(10,26,47,0.22)',
        lift: '0 30px 70px -40px rgba(5,14,28,0.55)',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      // Tailwind's default opacity scale skips 15/35/45/etc. A class like
      // `bg-white/92` silently generates NOTHING, which is how a navbar ends up
      // with no background at all. Full 5-step scale, so that cannot happen.
      opacity: Object.fromEntries(
        Array.from({ length: 21 }, (_, i) => [String(i * 5), String(i * 5 / 100)]),
      ),
      transitionDuration: {
        250: '250ms',
        400: '400ms',
        600: '600ms',
      },
      keyframes: {
        'fade-rise': {
          from: { opacity: '0', transform: 'translate3d(0, 18px, 0)' },
          to: { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'slide-down': {
          from: { opacity: '0', transform: 'translate3d(0,-8px,0)' },
          to: { opacity: '1', transform: 'translate3d(0,0,0)' },
        },
        'ken-burns': {
          from: { transform: 'scale(1) translate3d(0,0,0)' },
          to: { transform: 'scale(1.08) translate3d(0,-1%,0)' },
        },
      },
      animation: {
        'fade-rise': 'fade-rise 0.62s cubic-bezier(0.22,1,0.36,1) both',
        'fade-in': 'fade-in 0.5s ease both',
        'slide-down': 'slide-down 0.22s cubic-bezier(0.22,1,0.36,1) both',
      },
    },
  },
  plugins: [],
} satisfies Config;
