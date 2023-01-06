import { Logo } from '~/components/Logo';
import { percentToHex } from '~/lib/other';

interface LayoutProps {
  name: string;
  albumSrc: string;
  artists: string[];
  lines: string[];
  isBackgroundVisible: boolean;
  bgOpacity: number;
  theme: {
    primary: string;
    secondary: string;
    background: string;
  };
}

const BasicLayoutPreview = ({
  theme,
  albumSrc,
  name,
  artists,
  lines
}: LayoutProps) => {
  return (
    <div
      className="z-10 my-auto h-fit w-full max-w-[100%] space-y-4 rounded-lg p-3 shadow-3xl backdrop-blur-sm"
      style={{ background: `${theme.primary}${percentToHex(80)}` }}
    >
      <div className="flex flex-row items-center space-x-2.5">
        <img alt="Album" src={albumSrc} className="h-10 w-10" />
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="truncate text-sm font-semibold leading-3">{name}</div>
          <div className="truncate text-xs">
            {artists.map((artist, i) => (
              <span key={i}>{(i ? ', ' : '') + artist}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        {lines.map((line, i) => (
          <div key={i} className="text-base font-bold leading-tight">
            {line}
          </div>
        ))}
      </div>

      <div>
        <Logo className="h-3" />
      </div>
    </div>
  );
};

const TransparentLayoutPreview = ({
  albumSrc,
  name,
  artists,
  lines
}: LayoutProps) => {
  return (
    <div className="z-10 my-auto h-fit w-full max-w-[100%] space-y-4 rounded-lg p-1">
      <div className="flex flex-row items-center space-x-2.5">
        <img alt="Album" src={albumSrc} className="h-10 w-10" />
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="truncate text-sm font-semibold leading-3">{name}</div>
          <div className="truncate text-xs">
            {artists.map((artist, i) => (
              <span key={i}>{(i ? ', ' : '') + artist}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        {lines.map((line, i) => (
          <div key={i} className="text-base font-bold leading-tight">
            {line}
          </div>
        ))}
      </div>

      <div>
        <Logo className="h-3" />
      </div>
    </div>
  );
};

const SimpleLayoutPreview = ({ name, lines, artists }: LayoutProps) => {
  return (
    <div className="relative flex w-full flex-col items-center justify-center text-center">
      <div className="mb-1.5 flex flex-col">
        {lines.map((line, i) => (
          <div key={i} className="mb-0.5 text-lg font-bold leading-tight">
            {line}
          </div>
        ))}
      </div>
      <div className="mb-4 w-9/12 truncate text-xs font-medium">
        {name} -{' '}
        {artists.map((artist, i) => (
          <span key={artist}>{(i ? ', ' : '') + artist}</span>
        ))}
      </div>
      <div>
        <Logo className="h-3" />
      </div>
    </div>
  );
};

export const HERO_LAYOUTS = {
  basic: {
    name: 'Basic',
    component: BasicLayoutPreview
  },
  transparent: {
    name: 'Transparent',
    component: TransparentLayoutPreview
  },
  simple: {
    name: 'Simple',
    component: SimpleLayoutPreview
  }
};
