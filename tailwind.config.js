/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    fontSize: {
      'heading-md': [
        '2rem',
        {
          lineHeight: '150%',
          fontWeight: '700',
        },
      ],
      'heading-sm': [
        '1rem',
        {
          lineHeight: '150%',
          fontWeight: '600',
        },
      ],
      'body-md': [
        '1rem',
        {
          lineHeight: '150%',
        },
      ],
      'body-sm': [
        '.75rem',
        {
          lineHeight: '150%',
        },
      ],
    },
    extend: {
      colors: {
        primary: {
          600: 'hsl(var(--primary))',
          300: '#BEADFF',
          100: '#EFEBFF',
        },
        gray: {
          900: '#333333',
          500: '#737373',
          300: 'D9D9D9',
          100: '#FAFAFA',
        },
        error: 'FF3939',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
      },
      boxShadow: {
        active: '0px 0px 32px 0px rgba(99, 60, 255, 0.25)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
