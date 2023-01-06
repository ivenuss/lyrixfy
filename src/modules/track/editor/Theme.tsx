import React, { useCallback, useEffect, useMemo } from 'react';
import clsx from 'clsx';
import { useTrackStore } from '~/stores/track.store';
import { api } from '~/lib/api';
import type { TrackColors, TrackDetails } from '~/types/spotify';

interface ThemeProps {
  track: TrackDetails;
}

export type ThemeType = {
  primary: string;
  secondary: string;
  background: string;
};

const DEFAULT_THEME = 0;

export const getThemes = (
  colors: TrackColors
): [ThemeType, ThemeType, ThemeType, ThemeType] => [
  {
    primary: colors.primary,
    secondary: colors.secondary,
    background: colors.primary
  },
  {
    primary: colors.alternative,
    secondary: colors.primaryBright,
    background: colors.alternative
  },
  { primary: '#eeeeee', secondary: '#000000', background: '#eeeeee' },
  { primary: '#282828', secondary: '#ffffff', background: '#000000' }
];

export const Theme: React.FC<ThemeProps> = ({ track }) => {
  const embed = useTrackStore((state) => state.embed);
  const setEmbed = useTrackStore((state) => state.setEmbed);

  const { data: colors } = api.spotify.getColorPalette.useQuery(
    { imageUrl: track.image.url },
    { enabled: !!track.image.url }
  );

  const themes = useMemo(() => (colors ? getThemes(colors) : []), [colors]);

  useEffect(() => {
    if (embed.theme.id === null && themes.length) {
      setEmbed({
        ...embed,
        theme: {
          id: DEFAULT_THEME,
          primary: themes[DEFAULT_THEME].primary,
          secondary: themes[DEFAULT_THEME].secondary,
          background: themes[DEFAULT_THEME].background
        }
      });
    }
  }, [embed, themes, setEmbed]);

  const handleChangeTheme = useCallback(
    (id: number, { primary, secondary, background }: ThemeType) => {
      setEmbed({
        ...embed,
        theme: { id, primary, secondary, background }
      });
    },
    [embed, setEmbed]
  );

  const renderSkeletonButtons = useCallback(() => {
    return [...Array(themes.length)].map((_, i) => (
      <div
        key={i}
        className="h-9 w-9 animate-pulse rounded-full bg-gray-300 shadow-md dark:bg-primary-600"
      />
    ));
  }, [themes.length]);

  const renderThemeButtons = useCallback(() => {
    return themes.map((theme, i) => (
      <button
        key={i}
        type="button"
        aria-label={`Theme ${i}`}
        onClick={() => handleChangeTheme(i, theme)}
        style={{ background: theme.primary }}
        className={clsx(
          'relative h-9 w-9 rounded-full shadow-md transition active:scale-95',
          embed.theme.id === i
            ? 'ring-2 ring-accent-dark ring-offset-2 ring-offset-gray-100 dark:ring-accent dark:ring-offset-primary-900'
            : 'hover:ring-4 hover:ring-gray-300 dark:hover:ring-primary-700'
        )}
      />
    ));
  }, [embed.theme.id, handleChangeTheme, themes]);

  return (
    <div className="flex flex-col">
      <div className="mb-2 text-lg font-medium text-black dark:text-primary-100">
        Theme
      </div>
      <div className="bottom-20 flex space-x-3">
        {colors ? renderThemeButtons() : renderSkeletonButtons()}
      </div>
    </div>
  );
};
