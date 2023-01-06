import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { ThemeType } from '~/modules/track/editor/Theme';
import { HERO_LAYOUTS } from './Layouts';
import type { THeroInitialState, HeroTrack } from './Hero';

interface CanvasProps {
  state: THeroInitialState;
  track: HeroTrack;
  themes: [ThemeType, ThemeType, ThemeType, ThemeType];
}

export const Canvas: React.FC<CanvasProps> = ({ state, track, themes }) => {
  const theme = themes[state.theme] || themes[0];
  const CurrentLayout = HERO_LAYOUTS[state.layout].component;

  return (
    <div className="aspect-square w-full max-w-xs flex-1 overflow-hidden rounded-4xl bg-white p-4 shadow dark:bg-primary-800 md:max-w-none">
      <motion.div
        layout
        layoutId={`hero-${state.layout}`}
        className="relative flex h-full w-full overflow-hidden rounded-3xl p-4 shadow"
        animate={{ color: theme.secondary, background: theme.background }}
      >
        <AnimatePresence>
          {state.isBgImageVisible && (
            <motion.div
              layout
              key={track.albumSrc}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.img
                alt="Background image"
                src={track.albumSrc}
                animate={{ opacity: state.bgOpacity / 100 }}
                className="absolute top-0 left-0 h-full w-full object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <CurrentLayout
          theme={theme}
          name={track.name}
          albumSrc={track.albumSrc}
          artists={track.artists}
          lines={track.lines}
          bgOpacity={state.bgOpacity}
          isBackgroundVisible={state.isBgImageVisible}
        />
      </motion.div>
    </div>
  );
};
