import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const getUniqueFromRange = (min: number, max: number) => {
  return Math.floor(min + Math.random() * (max - min + 1));
};

export const LyricsSkeleton: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {[...Array(12)].map((_, i) => (
        <motion.div
          layout
          key={`lyrics-skeleton-${i}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ default: { ease: 'linear' }, delay: i * 0.04 }}
          style={{ width: `${getUniqueFromRange(20, 100)}%` }}
          className="mb-1 h-6 w-full rounded bg-gray-300 dark:bg-primary-700 sm:h-8 sm:rounded-md"
        />
      ))}
    </>
  );
};
