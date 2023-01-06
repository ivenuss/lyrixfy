import React from 'react';
import { Slider } from '~/components/Slider';
import { TogglerLabel } from '~/components/TogglerLabel';
import { useTrackStore } from '~/stores/track.store';
import { CustomBackgroundDropzone } from './CustomBackgroundDropzone';
import { BackgroundPadding } from './BackgroundPadding';

export const Background: React.FC = () => {
  const embed = useTrackStore((state) => state.embed);
  const setEmbed = useTrackStore((state) => state.setEmbed);

  return (
    <div className="my-3 flex flex-col">
      <h4 className="mb-2 text-lg font-medium text-black dark:text-primary-100">
        Background
      </h4>

      <div className="flex flex-col space-y-3">
        <div className="flex flex-col">
          <div className="mb-3 flex items-center justify-between">
            <div className="font-medium text-black dark:text-primary-200">
              Opacity
            </div>
            <div className="p- text-sm text-gray-600 dark:text-primary-200">
              {embed.backgroundImageOpacity}%
            </div>
          </div>
          <Slider
            value={embed.backgroundImageOpacity}
            onChange={(v) => setEmbed({ ...embed, backgroundImageOpacity: v })}
          />
        </div>

        <BackgroundPadding />

        <TogglerLabel
          isActive={embed.backgroundImageIsVisible}
          onChange={(t) => setEmbed({ ...embed, backgroundImageIsVisible: t })}
          title="Show background image"
          description="Display a background image"
        />

        <CustomBackgroundDropzone />
      </div>
    </div>
  );
};
