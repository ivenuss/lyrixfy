import clsx from 'clsx';
import React from 'react';
import { LAYOUTS } from '~/lib/constants';
import { useTrackStore, type LayoutType } from '~/stores/track.store';

export const Layout: React.FC = () => {
  const embed = useTrackStore((state) => state.embed);
  const setEmbed = useTrackStore((state) => state.setEmbed);

  return (
    <div className="flex flex-col">
      <h4 className="mb-2 text-lg font-medium text-black dark:text-primary-100">
        Layout
      </h4>
      <div>
        <div className="flex flex-row space-x-4">
          {Object.entries(LAYOUTS).map(([id, { name }]) => (
            <button
              key={id}
              type="button"
              onClick={() => setEmbed({ ...embed, layout: id as LayoutType })}
              className={clsx({
                'text-accent-dark underline dark:text-accent':
                  id === embed.layout
              })}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
