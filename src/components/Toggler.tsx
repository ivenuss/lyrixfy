import React from 'react';
import clsx from 'clsx';

export const togglerColorClassnames = {
  primary: [
    ['bg-gray-300 dark:bg-primary-600', 'bgaccent dark:bg-accent'],
    'bg-white dark:bg-primary-100'
  ],
  transparent: [['bg-white/40', 'bg-black/20'], 'bg-white dark:bg-primary-100']
} as const;

const togglerSizeClassnames = {
  small: ['h-3 w-6', 'w-2 h-2', ['translate-x-0.5', 'translate-x-3.5']],
  normal: ['h-6 w-11', 'w-4 h-4', ['translate-x-1', 'translate-x-6']]
} as const;

interface TogglerProps {
  color?: keyof typeof togglerColorClassnames;
  size?: keyof typeof togglerSizeClassnames;
  isActive: boolean;
  onChange: (value: boolean) => void;
}

export const Toggler: React.FC<TogglerProps> = ({
  color = 'primary',
  size = 'normal',
  isActive,
  onChange
}) => {
  const [wrapperColor, trackerColor] = togglerColorClassnames[color];
  const [wrapperSizeCn, trackerSizeCn, trackerTrajectorySizeCn] =
    togglerSizeClassnames[size];

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isActive}
      aria-label="Toggler"
      onClick={() => onChange(!isActive)}
      className={clsx(
        'relative inline-flex flex-none items-center rounded-full shadow-xl',
        wrapperSizeCn,
        [wrapperColor[Number(isActive)]]
      )}
    >
      <span
        className={clsx(
          'inline-block transform rounded-full transition duration-200 ease-in-out',
          trackerSizeCn,
          trackerColor,
          [trackerTrajectorySizeCn[Number(isActive)]]
        )}
      />
    </button>
  );
};
