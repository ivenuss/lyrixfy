import React from 'react';
import type { TrackDetails } from '~/types/spotify';
import { Dimension } from './Dimension';
import { Background } from './Background';
import { Theme } from './Theme';
import { Export } from './Export';
import { Font } from './Font';
import { Layout } from './Layout';

interface EditorProps {
  track: TrackDetails;
}

export const Editor: React.FC<EditorProps> = ({ track }) => (
  <aside className="top-20 my-5 flex w-full min-w-[320px] flex-col space-y-8 md:max-w-md md:space-y-4">
    <Theme track={track} />
    <Layout />
    <Dimension />
    <Font />
    <Background />
    <Export track={track} />
  </aside>
);
