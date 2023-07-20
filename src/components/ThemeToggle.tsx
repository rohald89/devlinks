'use client';

import { useTheme } from 'next-themes';
import { FC } from 'react';

interface ThemeToggleProps {}

const ThemeToggle: FC<ThemeToggleProps> = ({}) => {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        Toggle Theme
      </button>
    </div>
  );
};

export default ThemeToggle;
