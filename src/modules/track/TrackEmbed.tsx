import React, { useState } from 'react';
import clsx from 'clsx';
import { format } from 'date-fns';
import { ChevronDown } from 'react-feather';
import { copyTextToClipboard } from '~/lib/other';
import type { TrackDetails } from '~/types/spotify';

interface TrackEmbedProps {
  track: TrackDetails;
  isCollapsed?: boolean;
}

export const TrackEmbed: React.FC<TrackEmbedProps> = ({
  track,
  isCollapsed
}) => {
  const [collapsed, setCollapsed] = useState(isCollapsed);

  return (
    <div
      className={clsx(
        'rounded-lg bg-white shadow transition-[padding] dark:bg-primary-800',
        collapsed ? 'p-2.5' : 'p-2.5 md:p-4'
      )}
    >
      <div className="flex space-x-3 md:space-x-5">
        <img
          width={track.image.width}
          height={track.image.height}
          src={track.image.url}
          alt={`${track.name}'s album cover`}
          className={clsx(
            'rounded-md border border-gray-200 transition-[width,height] duration-300 dark:border-primary-700',
            collapsed ? 'h-12 w-12' : 'h-20 w-20 md:h-32 md:w-32'
          )}
        />

        <div
          className={clsx('flex flex-1 flex-col transition-[margin]', {
            'my-auto': collapsed
          })}
        >
          <div className={clsx({ 'mb-2 md:mb-5': !collapsed })}>
            <h2
              className={clsx(
                'font-bold leading-tight text-black dark:text-primary-100',
                collapsed ? 'mb-0.5 text-base' : 'mb-1 text-lg md:text-2xl'
              )}
            >
              {track.name}
            </h2>

            <div
              className={clsx(
                'text-gray-600 dark:text-primary-200',
                collapsed ? 'text-xs' : 'text-xs md:text-sm'
              )}
            >
              {track.artists.map((artist, i) => (
                <span key={i}>{(i ? ', ' : '') + artist.name}</span>
              ))}
              {' • '}
              <span>{format(track.duration, 'hh:mm')}</span>
            </div>
          </div>

          {!collapsed && (
            <footer className="flex space-x-2.5 md:mt-auto">
              <button
                type="button"
                onClick={() =>
                  copyTextToClipboard(
                    `${process.env.NEXT_PUBLIC_SITE_URL}/track/${track.id}`,
                    'Copied URL to clipboard'
                  )
                }
                className="text-xs uppercase text-gray-500 transition-colors hover:text-gray-600 dark:text-primary-300 dark:hover:text-primary-200"
              >
                Share
              </button>
              <a
                href={track.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase text-gray-500 transition-colors hover:text-gray-600 dark:text-primary-300 dark:hover:text-primary-200"
              >
                Play on Spotify
              </a>
            </footer>
          )}
        </div>

        <button
          type="button"
          aria-label="Collapse button"
          onClick={() => setCollapsed((c) => !c)}
          className="ml-auto mb-auto rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 dark:text-primary-300 dark:hover:bg-primary-700"
        >
          <ChevronDown
            className={clsx('text-2xl transition', {
              'rotate-180': !collapsed
            })}
          />
        </button>
      </div>
    </div>
  );
};
