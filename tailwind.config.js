/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
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
    },
  },
  plugins: [],
};
