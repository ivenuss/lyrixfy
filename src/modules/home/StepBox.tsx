import React from 'react';

interface StepBoxProps {
  step: number;
  title: string;
  description: string;
}

export const StepBox: React.FC<StepBoxProps> = ({
  step,
  title,
  description
}) => (
  <div className="relative">
    <div className="absolute -top-3 -left-3 -z-10 select-none text-4xl font-black text-accent/40 dark:text-accent/50">
      {step}
    </div>
    <h4 className="mb-1 text-lg font-medium text-black dark:text-primary-100">
      {title}
    </h4>
    <div className="z-50 text-gray-600 dark:text-primary-300">
      {description}
    </div>
  </div>
);
