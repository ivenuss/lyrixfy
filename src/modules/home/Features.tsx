import React from 'react';
import { Layers, Music, Share2, Sliders } from 'react-feather';
import { FeatureBox } from './FeatureBox';

const Features: React.FC = () => (
  <section
    id="features"
    className="mx-auto mb-8 flex max-w-screen-xs scroll-mt-20 flex-col px-4"
  >
    <h3 className="mb-8 text-center text-xl font-bold text-black dark:text-primary-100">
      What features do we offer?
    </h3>

    <div className="grid grid-cols-1 gap-5 gap-y-10 md:grid-cols-2 md:gap-y-8">
      <FeatureBox
        icon={Sliders}
        title="Customize your look"
        description="Choose between multiple variants of customization"
      />
      <FeatureBox
        icon={Layers}
        title="Multiple themes"
        description="Do you want to stand out from the crowd? We offer various themes you can choose from."
      />
      <FeatureBox
        icon={Music}
        title="Wide selection"
        description="We offer you any song that is listed on Spotify and has support for lyrics"
      />
      <FeatureBox
        icon={Share2}
        title="Share your lyrics"
        description="Share your images across all platforms and gain more popularity"
      />
    </div>
  </section>
);

export default Features;
