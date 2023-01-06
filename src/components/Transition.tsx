import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

interface TransitionProps {
  children?: React.ReactNode;
}

export const Transition: React.FC<TransitionProps> = ({ children }) => {
  const router = useRouter();

  return (
    <motion.div
      key={router.route}
      initial="pageInitial"
      animate="pageAnimate"
      exit="exit"
      transition={{ duration: 0.3 }}
      variants={{
        pageInitial: { opacity: 0 },
        pageAnimate: { opacity: 1 },
        exit: { opacity: 0 }
      }}
    >
      {children}
    </motion.div>
  );
};
