import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTrackStore } from '~/stores/track.store';

interface BackgroundImageProps {
  isVisible: boolean;
  imageUrl: string;
}

export const BackgroundImage: React.FC<BackgroundImageProps> = ({
  isVisible,
  imageUrl
}) => {
  const embed = useTrackStore((state) => state.embed);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          key={embed.backgroundImage?.url || imageUrl}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <img
            alt="Background"
            src={embed.backgroundImage?.url || imageUrl}
            style={{ opacity: embed.backgroundImageOpacity / 100 }}
            className="absolute top-0 left-0 bottom-0 right-0 h-full w-full object-cover"
          />

          <div
            className="absolute top-0 left-0 h-full w-full"
            style={{
              background: `rgb(0,0,0, ${embed.backgroundImageOpacity / 200})`
            }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
