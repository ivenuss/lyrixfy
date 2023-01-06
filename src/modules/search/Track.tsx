import React from 'react';
import clsx from 'clsx';
import Link, { type LinkProps } from 'next/link';
import { motion } from 'framer-motion';
import type { QueryTrack } from '~/server/api/client';

export type TrackProps = Omit<LinkProps, 'href'> & {
  isActive: boolean;
  track: QueryTrack;
  onSearch: () => void;
};

export const Track: React.FC<TrackProps> = ({ isActive, track, onSearch }) => (
  <Link
    href={`/track/${track.id}`}
    onClick={() => onSearch()}
    className={clsx(
      'relative flex w-full cursor-pointer items-center rounded-md px-2 py-2 md:px-3 md:py-2'
    )}
  >
    <img
      src={track.image.url}
      className="mr-3.5 block h-10 w-10 rounded bg-gray-100 dark:bg-primary-700"
      alt={`${track.title}'s album cover`}
    />

    <div
      className={clsx('flex flex-col overflow-hidden text-left leading-4', {
        'md:w-4/5': isActive
      })}
    >
      <div className="w-full truncate font-medium text-black dark:text-primary-100">
        {track.title}
      </div>
      <div className="w-full truncate text-sm text-gray-600 dark:text-primary-300">
        {track.authors.map((author, i) => (
          <span key={i}>{(i ? ', ' : '') + author.name}</span>
        ))}
      </div>
    </div>

    {isActive && (
      <motion.div
        layoutId="underline"
        transition={{ duration: 0.17 }}
        className="absolute left-0 right-0 -z-[1] flex h-full w-full rounded-md bg-gray-100 dark:bg-primary-700"
      >
        <div className="my-auto ml-auto mr-4 hidden md:block">
          <kbd className="grid h-6 w-6 place-content-center rounded-md bg-gray-200 text-lg text-gray-700 dark:bg-primary-800/50 dark:text-primary-200">
            ↵
          </kbd>
        </div>
      </motion.div>
    )}
  </Link>
);
