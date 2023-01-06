import React from 'react';
import clsx from 'clsx';
import useMeasure from 'react-use-measure';
import { motion } from 'framer-motion';

interface SearchResultsDropdownProps {
  isOpen: boolean;
  children: React.ReactNode;
}

export const SearchResultsDropdown: React.FC<SearchResultsDropdownProps> = ({
  isOpen,
  children
}) => {
  const [ref, { height }] = useMeasure();

  return (
    <div
      className={clsx(
        'm absolute z-30 mt-2.5 w-full overflow-y-hidden rounded-md bg-white p-2.5 shadow-md transition-[height] dark:bg-primary-800 md:p-4',
        isOpen ? 'block' : 'hidden'
      )}
    >
      <motion.div
        animate={{ height: height || 'auto' }}
        className="overflow-hidden"
      >
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
};
