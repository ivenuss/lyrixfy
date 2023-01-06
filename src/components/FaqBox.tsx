import React from 'react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'react-feather';

interface FaqBoxProps {
  isOpen: boolean;
  onToggle: () => void;
  title: string;
  description: string;
}

export const FaqBox: React.FC<FaqBoxProps> = ({
  isOpen,
  onToggle,
  title,
  description
}) => (
  <motion.div
    className={clsx(
      'flex flex-col rounded-md transition-colors duration-200 ease-out',
      isOpen
        ? 'bg-accent text-black dark:text-black'
        : 'bg-gray-200 text-black dark:bg-primary-700 dark:text-primary-100'
    )}
  >
    <button
      type="button"
      onClick={onToggle}
      className="flex justify-between rounded-md p-4 py-3"
    >
      <h4 className="text-left font-medium leading-tight">{title}</h4>

      <div
        className={clsx('my-auto transition-transform', {
          'rotate-180': isOpen
        })}
      >
        <ChevronDown
          className={clsx(
            'h-5 w-5',
            isOpen ? 'text-black' : 'text-accent-dark dark:text-accent'
          )}
        />
      </div>
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="content"
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={{
            open: { opacity: 1, height: 'auto' },
            collapsed: { opacity: 0, height: 0 }
          }}
          transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
          className="overflow-hidden"
        >
          <motion.div
            transition={{ duration: 0.8 }}
            className="px-4 pt-3 pb-8 text-sm md:text-base"
          >
            {description}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);
