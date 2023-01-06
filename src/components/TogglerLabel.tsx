import React from 'react';
import { Toggler } from './Toggler';

interface TogglerLabelProps {
  isActive: boolean;
  onChange: (b: boolean) => void;
  title: string;
  description: string;
}

export const TogglerLabel: React.FC<TogglerLabelProps> = ({
  isActive,
  onChange,
  title,
  description
}) => (
  <div className="flex items-center">
    <Toggler isActive={isActive} onChange={onChange} />

    <div className="ml-3.5 leading-tight">
      <div className="font-medium text-black dark:text-primary-100">
        {title}
      </div>
      <span className="mb-1 text-[0.9rem] text-sm text-gray-600 dark:text-primary-300">
        {description}
      </span>
    </div>
  </div>
);
