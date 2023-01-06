import React from 'react';
import clsx from 'clsx';

interface KbdProps {
  children?: React.ReactNode;
}

export const Kbd: React.FC<KbdProps> = ({ children }) => {
  return (
    <kbd
      className={clsx(
        'min-h-[14px] cursor-default select-none rounded bg-gray-300 px-1.5 pb-1.5 text-center text-sm font-medium text-black shadow-gray-400 dark:bg-primary-700 dark:text-primary-100 dark:shadow-black/70',
        'shadow-[inset_0_-4px_0] active:translate-y-0.5 active:pb-0.5 active:text-gray-600 active:shadow-[inset_0_-2px] active:shadow-gray-400/50 dark:active:text-primary-300 dark:active:shadow-black/50'
      )}
    >
      {children}
    </kbd>
  );
};
