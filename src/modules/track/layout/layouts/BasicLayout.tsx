import React from 'react';
import { motion } from 'framer-motion';
import { Logo } from '~/components/Logo';
import { percentToHex } from '~/lib/other';

export interface BasicLayoutProps {
  name: string;
  artists: string[];
  imageUrl: string;
  fontSize: string;
  lines: string[];
  primaryColor: string;
  secondaryColor: string;
}

export const BasicLayout: React.FC<BasicLayoutProps> = ({
  name,
  artists,
  imageUrl,
  fontSize,
  lines,
  primaryColor,
  secondaryColor
}) => (
  <motion.div
    layoutId="basic-layout"
    className="z-[1] m-auto w-full space-y-12 rounded-xl p-10 shadow-3xl"
    animate={{
      fontSize,
      color: secondaryColor,
      backgroundColor: `${primaryColor}${percentToHex(85)}`
    }}
  >
    <div className="flex items-center">
      <img
        src={imageUrl}
        alt="Album"
        draggable={false}
        className="mr-6 h-[7em] w-[7em]"
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="truncate text-[1.5em] font-semibold leading-tight">
          {name}
        </div>
        <div className="truncate text-[1.125em]">
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
