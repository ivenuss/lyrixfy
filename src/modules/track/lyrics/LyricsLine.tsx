import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface LyricsLineProps {
  index: number;
  words: string;
  isSelected: boolean;
  isAvailable: boolean;
  onSelect: (e: React.MouseEvent) => void;
}

export const LyricsLine: React.FC<LyricsLineProps> = ({
  index,
  words,
  isSelected,
  isAvailable,
  onSelect
}) => (
  <motion.li
    key={index}
    onClick={onSelect}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ default: { ease: 'linear' }, delay: index * 0.04 }}
    className="group relative select-none hover:cursor-pointer"
  >
    <div
      className={clsx(
        'mr-4 rounded-md p-0.5 px-2 text-xl font-bold leading-snug transition-colors duration-200 sm:text-2xl',
        isSelected
          ? 'bg-black text-white dark:bg-primary-300 dark:text-black'
          : 'text-gray-800 dark:text-primary-100',
        {
          'bg-gray-300 text-black dark:bg-primary-700 dark:text-primary-200':
            isAvailable
        }
      )}
    >
      {words}
    </div>
  </motion.li>
);
