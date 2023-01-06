import { FaTiktok } from 'react-icons/fa';
import { Facebook, Instagram, Maximize2 } from 'react-feather';
import { LyricsSubpage } from '~/modules/track/lyrics/LyricsSubpage';
import { EditorSubpage } from '~/modules/track/editor/EditorSubpage';
import * as Layouts from '~/modules/track/layout/layouts/layouts';

export const TOAST_LIMIT = 5;
export const MAX_SELECT_LINES = 5;
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

export const TWITTER_TWEETS = {
  query: '#Lyrixfy',
  searchQery: 'Lyrixfy'
};

export const SHORTCUTS = {
  SEARCH: 'command+k, ctrl+k',
  TOGGLE_THEME: 'command+alt+d, ctrl+alt+d',
  COPY_IMAGE_TO_CLIPBOARD: 'command+shift+c, ctrl+shift+c',
  EXPORT_AS_PNG: 'command+shift+e, ctrl+shift+e',
  EXPORT_AS_JPG: 'command+shift+x, ctrl+shift+x',
  EXPORT_AS_SVG: 'command+shift+s, ctrl+shift+s'
};

export const CARD_PADDINGS = {
  '16': { value: '16px', name: '16' },
  '32': { value: '32px', name: '32' },
  '44': { value: '44px', name: '44' },
  '64': { value: '64px', name: '64' },
  '80': { value: '80px', name: '80' },
  '128': { value: '128px', name: '128' }
};

export const CARD_DIMENSIONS = {
  auto: {
    name: 'Auto',
    aspectRatio: 'auto',
    icon: Maximize2
  },
  ig_post: {
    name: 'Instagram Post',
    aspectRatio: 'auto 1/1',
    icon: Instagram
  },
  ig_story: {
    name: 'Instagram Stories',
    aspectRatio: 'auto 9/16',
    icon: Instagram
  },
  tiktok: {
    name: 'TikTok',
    aspectRatio: 'auto 9/16',
    icon: FaTiktok
  },
  facebook_vertical: {
    name: 'Facebook Vertical',
    aspectRatio: 'auto 1080/1350',
    icon: Facebook
  }
} as const;

export const TRACK_PAGES = {
  LYRICS: LyricsSubpage,
  EDITOR: EditorSubpage
};

export const LAYOUTS = {
  basic: {
    name: 'Basic',
    component: Layouts.BasicLayout
  },
  transparent: {
    name: 'Transparent',
    component: Layouts.TransparentLayout
  },
  simple: {
    name: 'Simple',
    component: Layouts.SimpleLayout
  }
};

export const FONT_SIZES = {
  XS: { name: 'Small', value: '12px' },
  S: { name: 'Small', value: '14px' },
  M: { name: 'Medium', value: '16px' },
  L: { name: 'Large', value: '18px' },
  XL: { name: 'Very large', value: '20px' }
};
