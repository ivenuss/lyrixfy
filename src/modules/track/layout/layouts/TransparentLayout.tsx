import React from 'react';
import { motion } from 'framer-motion';
import { Logo } from '~/components/Logo';
import type { BasicLayoutProps } from './BasicLayout';

export const TransparentLayout: React.FC<BasicLayoutProps> = ({
  name,
  artists,
  imageUrl,
  lines,
  fontSize,
  secondaryColor
}) => (
  <motion.div
    layoutId="transparent-layout"
    className="z-[1] flex w-full flex-col space-y-14 text-base"
    animate={{
      color: secondaryColor,
      fontSize
    }}
  >
    <div className="flex items-center">
      <img
        src={imageUrl}
        alt="Album"
        draggable={false}
        className="mr-8 h-[7em] w-[7em]"
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="truncate text-[1.875em] font-semibold leading-tight">
          {name}
        </div>
        <div className="truncate text-[1.25em]">
          {artists.map((artist, i) => (
            <span key={i}>{(i ? ', ' : '') + artist}</span>
          ))}
        </div>
      </div>
    </div>
    <div className="flex flex-col">
      {lines.map((line, i) => (
        <div key={i} className="mb-1 text-[2.25em] font-bold leading-tight">
          {line}
        </div>
      ))}
    </div>
    <div>
      <Logo className="h-[2em]" />
    </div>
  </motion.div>
);
