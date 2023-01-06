import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { useHotkeys } from 'react-hotkeys-hook';
import { Monitor, Moon, Sun } from 'react-feather';
import { AnimatePresence, motion } from 'framer-motion';
import { SHORTCUTS } from '~/lib/constants';

const THEMES = [
  {
    icon: Moon,
    name: 'dark',
    title: 'Dark'
  },
  {
    icon: Sun,
    name: 'light',
    title: 'Light'
  },
  {
    icon: Monitor,
    name: 'system',
    title: 'System'
  }
] as const;

export const ThemeToggle: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();

  const currThemeIndex = THEMES.findIndex(({ name }) => name === theme);

  const currTheme = THEMES[currThemeIndex] ?? THEMES[2];
  const nextTheme =
    THEMES[currThemeIndex === THEMES.length - 1 ? 0 : currThemeIndex + 1] ??
    THEMES[2];

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  useHotkeys(SHORTCUTS.TOGGLE_THEME, () => setTheme(nextTheme.name), [
    nextTheme.name
  ]);

  if (!mounted) return <div className="m-1.5 h-6 w-6" />;

  const ThemeIcon = currTheme.icon;

  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.button
        type="button"
        aria-label="Theme toggler"
        onClick={() => setTheme(nextTheme.name)}
        className="relative ml-auto overflow-hidden rounded-lg p-1.5 text-sm text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:text-primary-300 dark:hover:bg-primary-800 dark:focus:ring-primary-700"
      >
        <motion.div
          key={`${currTheme.name}-icon`}
          initial={{ y: -15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 15, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <ThemeIcon className="h-5 w-5" />
        </motion.div>
      </motion.button>
    </AnimatePresence>
  );
};
