import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface BounceTransitionProps {
  children?: React.ReactNode;
}

export const BounceTransition: React.FC<BounceTransitionProps> = ({
  children
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ y: 14, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -14, opacity: 0 }}
        transition={{ duration: 0.28 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
