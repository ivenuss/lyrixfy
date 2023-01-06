import React from 'react';
import clsx from 'clsx';
import { useTrackStore, type FontSize } from '~/stores/track.store';
import { FONT_SIZES } from '~/lib/constants';

export const Font: React.FC = () => {
  const embed = useTrackStore((state) => state.embed);
  const setEmbed = useTrackStore((state) => state.setEmbed);

  return (
    <div className="flex flex-col">
      <h4 className="mb-2 text-lg font-medium text-black dark:text-primary-100">
        Font
      </h4>
      <div>
        <div className="mb-2 font-medium text-black dark:text-primary-200">
          Font size
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {Object.entries(FONT_SIZES).map(([id]) => (
            <button
              key={id}
              type="button"
              onClick={() => setEmbed({ ...embed, fontSize: id as FontSize })}
              className={clsx(
                'grid aspect-square h-8 place-items-center rounded-md text-sm font-bold transition-colors',
                embed.fontSize === id
                  ? 'bg-accent text-black dark:bg-accent dark:text-black'
                  : 'bg-gray-200 text-black dark:bg-primary-700 dark:text-primary-100'
              )}
            >
              {id.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
