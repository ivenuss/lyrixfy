import React from 'react';
import { StepBox } from './StepBox';

export const Tutorial: React.FC = () => {
  return (
    <section className="mx-auto mb-8 flex max-w-screen-xs flex-col px-4">
      <h3 className="mb-8 text-center text-xl font-bold text-black dark:text-primary-100">
        How it works?
      </h3>

      <div className="grid grid-cols-1 gap-5 gap-y-10 px-2 sm:grid-cols-2 sm:px-0 md:gap-y-10">
        <StepBox
          step={1}
          title="Search for the song"
          description="Enter the name of the song whose lyrics you want to display in the search box."
        />
        <StepBox
          step={2}
          title="Choose lines"
          description="Choose the lines you would like to share. You can share up to 5 lines."
        />
        <StepBox
          step={3}
          title="Configurate"
          description="Customize the image with various styles like theme, size or opacity."
        />
        <StepBox
          step={4}
          title="Export, copy or share image"
          description="You can choose between different formats, copy the image to clipboard or share it directly"
        />
      </div>
    </section>
  );
};
