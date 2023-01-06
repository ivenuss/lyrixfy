import React from 'react';
import { motion } from 'framer-motion';
import { Logo } from '~/components/Logo';
import type { BasicLayoutProps } from './BasicLayout';

export const SimpleLayout: React.FC<BasicLayoutProps> = ({
  name,
  artists,
  lines,
  fontSize,
  secondaryColor
}) => (
  <motion.div
    layoutId="simple-layout"
    className="z-[1] m-auto flex w-full flex-col space-y-8 p-10"
    animate={{
      fontSize,
      color: secondaryColor
    }}
  >
    <div className="flex flex-col items-center justify-center text-center">
      <div className="mb-3 flex flex-col">
        {lines.map((line, i) => (
          <div key={i} className="text-[2.25em] font-bold leading-tight">
            {line}
          </div>
        ))}
      </div>
      <div className="max-w-[60%] overflow-hidden">
        <div className="truncate text-[1.25em] font-semibold leading-tight">
          {name}
          {' - '}
          {artists.map((artist, i) => `${(i ? ', ' : '') + artist}`)}
        </div>
      </div>
    </div>

    <Logo className="h-[1.5em]" />
  </motion.div>
);
