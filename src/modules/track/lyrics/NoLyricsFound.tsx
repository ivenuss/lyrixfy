import React from 'react';
import { motion } from 'framer-motion';
import { ButtonLink } from '~/components/ButtonLink';

export const NoLyricsFound: React.FC = () => (
  <motion.div
    layout
    initial={{ y: 14, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: -14, opacity: 0 }}
    transition={{ default: { ease: 'linear' } }}
    className="mt-6 flex flex-col text-center md:mt-12"
  >
    <h1 className="mb-1 text-xl font-bold text-black dark:text-primary-100 md:text-2xl">
      Not Found
    </h1>

    <p className="mb-6 text-gray-600 dark:text-primary-300">
      Looks like we don&apos;t have the lyrics for this song.
    </p>

    <ButtonLink href="/" className="mx-auto">
      Find another song
    </ButtonLink>
  </motion.div>
);
