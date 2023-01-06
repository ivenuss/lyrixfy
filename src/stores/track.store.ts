import create from 'zustand';
import type {
  LAYOUTS,
  CARD_DIMENSIONS,
  FONT_SIZES,
  TRACK_PAGES,
  CARD_PADDINGS
} from '~/lib/constants';

export type FontSize = keyof typeof FONT_SIZES;
export type TrackPage = keyof typeof TRACK_PAGES;
export type LayoutType = keyof typeof LAYOUTS;
export type PaddingType = keyof typeof CARD_PADDINGS;
export type DimensionType = keyof typeof CARD_DIMENSIONS;

interface TrackStore {
  embed: TrackEmbed;
  resetEmbed: () => void;
  setEmbed: (embed: Partial<TrackEmbed>) => void;
}

export type TrackEmbed = {
  currentPage: TrackPage;
  layout: LayoutType;
  fontSize: FontSize;
  backgroundPadding: PaddingType;
  backgroundImageOpacity: number;
  backgroundImageIsVisible: boolean;
  backgroundImage: {
    name: string;
    url: string;
    size: number;
  } | null;
  dimension: DimensionType;
  theme: {
    id: number | null;
    primary: string;
    secondary: string;
    background: string;
  };
  lines: {
    id: number;
    words: string;
  }[];
};

const INITIAL_EMBED_STATE: TrackEmbed = {
  currentPage: 'LYRICS',
  layout: 'basic',
  dimension: 'auto',
  fontSize: 'M',
  backgroundPadding: '32',
  backgroundImageOpacity: 100,
  backgroundImageIsVisible: false,
  backgroundImage: null,
  theme: {
    id: null,
    primary: '#000000',
    secondary: '#ffffff',
    background: '#ffffff'
  },
  lines: []
};

export const useTrackStore = create<TrackStore>((set) => ({
  embed: INITIAL_EMBED_STATE,
  resetEmbed: () => {
    return set((state) => ({ ...state, embed: { ...INITIAL_EMBED_STATE } }));
  },
  setEmbed: (embed) => {
    return set((state) => ({ ...state, embed: { ...state.embed, ...embed } }));
  }
}));
