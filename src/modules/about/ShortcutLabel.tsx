import React from 'react';
import { Kbd } from '~/components/Kbd';

/* 
  ⌃  <- Control
  ⌥  <- Option
  ⌘  <- Command
  ⇧  <- Shift
*/

interface ShortcutLabelProps {
  label: string;
  keys: string[];
}

export const ShortcutLabel: React.FC<ShortcutLabelProps> = ({
  label,
  keys
}) => {
  return (
    <div className="flex items-center justify-between md:flex-row">
      <div className="mr-3 text-black dark:text-primary-200">{label}</div>
      <div className="flex space-x-1">
        {keys.map((key) => (
          <Kbd key={key}>{key}</Kbd>
        ))}
      </div>
    </div>
  );
};
