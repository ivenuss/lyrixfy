import React, { useReducer } from 'react';
import clsx from 'clsx';
import { Configurator } from './Configurator';
import { Canvas } from './Canvas';
import type { HERO_LAYOUTS } from './Layouts';
import { getThemes } from '../../track/editor/Theme';

type TrackMockup = {
  name: string;
  artists: string[];
  albumSrc: string;
  lines: string[];
  colors: [string, string, string, string];
};

const TRACK_MOCKUPS: TrackMockup[] = [
  {
    name: 'Mirror',
    artists: ['Kendrick Lamar'],
    albumSrc:
      'https://i.scdn.co/image/ab67616d0000b2732e02117d76426a08ac7c174f',
    lines: ["I choose me, I'm sorry"],
    colors: ['#432D19', '#855932', '#C28B5C', '#F8F2EC']
  },
  {
    name: 'Snowchild',
    artists: ['The Weeknd'],
    albumSrc:
      'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36',
    lines: ['She never need a man, she what a man need'],
    colors: ['#5C2200', '#B84300', '#FF711F', '#FFEFE5']
  },
  {
    name: 'One Kiss (with Dua Lipa)',
    artists: ['Calvin Harris', 'Dua Lipa'],
    albumSrc:
      'https://i.scdn.co/image/ab67616d0000b273d09f96d82310d4d77c14c108',
    lines: ['One kiss is all it takes', "Fallin' in love with me"],
    colors: ['#02155A', '#042AB4', '#2352FA', '#E6EBFE']
  },
  {
    name: '2 Much',
    artists: ['Justin Bieber'],
    albumSrc:
      'https://i.scdn.co/image/ab67616d0000b273e6f407c7f3a0ec98845e4431',
    lines: ["'Cause eternity with you ain't long enough"],
    colors: ['#324318', '#648731', '#99C45A', '#F3F8EC']
  },
  {
    name: 'GONE, GONE / THANK YOU',
    artists: ['Tyler', 'The Creator'],
    albumSrc:
      'https://i.scdn.co/image/ab67616d0000b2737005885df706891a3c182a57',
    lines: ["But I don't ever want to fall in love again"],
    colors: ['#991E43', '#DA4471', '#FBEAEF', '#4D0F22']
  }
];

export type HeroTrack = typeof TRACK_MOCKUPS[number];

export type THeroInitialState = {
  layout: keyof typeof HERO_LAYOUTS;
  track: number;
  theme: number;
  bgOpacity: number;
  isBgImageVisible: boolean;
};

export type HeroActionType =
  | 'NEXT_TRACK'
  | 'PREV_TRACK'
  | 'SET_THEME'
  | 'SET_LAYOUT'
  | 'SET_BG_OPACITY'
  | 'TOGGLE_BG_IMG_VISIBILITY';

const HeroInitialState: THeroInitialState = {
  layout: 'basic',
  track: 0,
  theme: 0,
  bgOpacity: 100,
  isBgImageVisible: true
};

const reducer = (
  state: THeroInitialState,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: { type: HeroActionType; payload?: any }
) => {
  switch (action.type) {
    case 'NEXT_TRACK': {
      return { ...state, track: (state.track + 1) % TRACK_MOCKUPS.length };
    }
    case 'PREV_TRACK': {
      return {
        ...state,
        track: (state.track + TRACK_MOCKUPS.length - 1) % TRACK_MOCKUPS.length
      };
    }
    case 'SET_THEME': {
      return { ...state, theme: action.payload };
    }
    case 'SET_LAYOUT': {
      return {
        ...state,
        layout: action.payload as THeroInitialState['layout']
      };
    }
    case 'SET_BG_OPACITY': {
      return { ...state, bgOpacity: action.payload };
    }
    case 'TOGGLE_BG_IMG_VISIBILITY': {
      return {
        ...state,
        isBgImageVisible: !state.isBgImageVisible
      };
    }
    default:
      return state;
  }
};

const SeparatorIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => (
  <svg
    viewBox="0 0 13 22"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    className={clsx('h-6', className)}
  >
    <g opacity=".5" fill="currentColor">
      <circle cx="2" cy="2" r="2" />
      <circle cx="2" cy="11" r="2" />
      <circle cx="2" cy="20" r="2" />
      <circle cx="11" cy="2" r="2" />
      <circle cx="11" cy="11" r="2" />
      <circle cx="11" cy="20" r="2" />
    </g>
  </svg>
);

export const Hero: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, HeroInitialState);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const track = TRACK_MOCKUPS[state.track]!;

  const themes = getThemes({
    alternative: track.colors[0],
    primary: track.colors[1],
    primaryBright: track.colors[2],
    secondary: track.colors[3]
  });

  return (
    <div className="flex grid-cols-[1fr_min-content_1fr] flex-col items-center gap-5 md:grid">
      <Canvas state={state} themes={themes} track={track} />
      <SeparatorIcon className="my-auto rotate-90 text-gray-500 transition-transform dark:text-primary-300 md:rotate-0" />
      <Configurator state={state} dispatch={dispatch} themes={themes} />
    </div>
  );
};
