import React from 'react';
import clsx from 'clsx';
import { useTrackStore, type DimensionType } from '~/stores/track.store';
import { CARD_DIMENSIONS } from '~/lib/constants';

export const Dimension: React.FC = () => {
  const embed = useTrackStore((state) => state.embed);
  const setEmbed = useTrackStore((state) => state.setEmbed);

  return (
    <div className="flex flex-col">
      <h4 className="mb-2 text-lg font-medium text-black dark:text-primary-100">
        Dimension
      </h4>
      <div className="flex flex-wrap items-center gap-1.5">
        {Object.entries(CARD_DIMENSIONS).map(([id, { name, icon: Icon }]) => (
          <button
            key={id}
            type="button"
            onClick={() =>
              setEmbed({ ...embed, dimension: id as DimensionType })
            }
            className={clsx(
              'flex items-center rounded-md border-2 p-2 py-1.5',
              embed.dimension === id
                ? 'border-accent'
                : 'border-gray-300 dark:border-primary-600'
            )}
          >
            <Icon className="mr-2 h-5 w-5 text-gray-600 dark:text-primary-300" />
            <span className="text-black dark:text-primary-200">{name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
