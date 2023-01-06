import React from 'react';
import { motion } from 'framer-motion';
import { useTrackStore } from '~/stores/track.store';
import {
  CARD_DIMENSIONS,
  CARD_PADDINGS,
  FONT_SIZES,
  LAYOUTS
} from '~/lib/constants';
import { BackgroundImage } from './BackgroundImage';

interface CanvasProps {
  name: string;
  artists: string[];
  imageUrl: string;
  lines: string[];
  primaryColor: string;
  secondaryColor: string;
}

export const Canvas: React.FC<CanvasProps> = ({
  name,
  artists,
  imageUrl,
  lines,
  primaryColor,
  secondaryColor
}) => {
  const embed = useTrackStore((state) => state.embed);
  const Layout = LAYOUTS[embed.layout].component;
  const background = embed.theme.background ?? '#fff';
  const { aspectRatio } = CARD_DIMENSIONS[embed.dimension];
  const { value: fontSize } = FONT_SIZES[embed.fontSize];
  const { value: padding } = CARD_PADDINGS[embed.backgroundPadding];

  return (
    <motion.div
      layout
      className="relative mx-auto my-5 flex w-full max-w-[600px] overflow-x-auto overflow-y-hidden rounded-2xl md:mx-0 md:overflow-x-hidden"
    >
      <motion.div
        layout
        id="canvas"
        className="relative flex w-full min-w-[540px] select-none items-center justify-center"
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        animate={{ aspectRatio, padding, background }}
      >
        <BackgroundImage
          imageUrl={imageUrl}
          isVisible={embed.backgroundImageIsVisible}
        />
        <Layout
          name={name}
          artists={artists}
          imageUrl={imageUrl}
          fontSize={fontSize}
          lines={lines}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      </motion.div>
    </motion.div>
  );
};
