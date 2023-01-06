import React from 'react';
import clsx from 'clsx';
import { CARD_PADDINGS } from '~/lib/constants';
import { useTrackStore, type PaddingType } from '~/stores/track.store';

export const BackgroundPadding: React.FC = () => {
  const embed = useTrackStore((state) => state.embed);
  const setEmbed = useTrackStore((state) => state.setEmbed);

  return (
    <div className="flex flex-col">
      <div className="mb-2 font-medium text-black dark:text-primary-200">
        Padding
      </div>
      <div className="flex flex-row flex-wrap space-x-2">
        {Object.entries(CARD_PADDINGS).map(([id, { name }]) => (
          <button
            key={id}
            type="button"
            onClick={() =>
              setEmbed({ ...embed, backgroundPadding: id as PaddingType })
            }
            className={clsx('rounded px-2 font-medium transition-colors', {
              'bg-gray-200 text-black dark:bg-primary-700 dark:text-primary-100':
                id !== embed.backgroundPadding,
              'bg-accent text-black': id === embed.backgroundPadding
            })}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
};
