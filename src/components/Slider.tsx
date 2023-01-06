import clsx from 'clsx';
import React from 'react';
import ReactSlider, { type ReactSliderProps } from 'react-slider';

const sliderCnSize = {
  small: ['h-1.5', '-top-[3px] h-3 w-3'],
  normal: ['h-2', '-top-1.5 h-5 w-5']
};

interface SliderProps extends ReactSliderProps {
  size?: keyof typeof sliderCnSize;
}

export const Slider: React.FC<SliderProps> = ({
  size = 'normal',
  ...props
}) => (
  <ReactSlider
    min={0}
    max={100}
    className="mb-4"
    ariaLabel="Slider"
    trackClassName={clsx(
      'rounded-full bg-gray-200 dark:bg-primary-600',
      sliderCnSize[size][0]
    )}
    thumbClassName={clsx(
      'my-auto rounded-full bg-black dark:bg-primary-200 hover:bg-accent dark:hover:bg-accent transition-transform cursor-grab active:cursor-grabbing hover:scale-105 active:scale-[1.15]',
      sliderCnSize[size][1]
    )}
    {...props}
  />
);
