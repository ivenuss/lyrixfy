import chroma, { type Color } from 'chroma-js';
import sortBy from 'lodash/sortBy';

const THRESHOLD_CONTRAST_RATIO = 1.0;
const MINIMUM_CONTRAST_RATIO = 4.5;

export interface TailwindPalette {
  [key: string]: {
    '50': string;
    '100': string;
    '200': string;
    '300': string;
    '400': string;
    '500': string;
    '600': string;
    '700': string;
    '800': string;
    '900': string;
  };
}

type Pair = {
  color: Color;
  score: number;
  contrast: number;
};

type ColorPairs = Array<Pair>;

const getRGBRange = (color: Color) => {
  const rgb = sortBy(color.rgb()).reverse();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [max, med, min] = rgb;
  return ((max ?? 0) - (min ?? 0)) / 10;
};

export const getColorPalette = (palette: Color[]) => {
  const pairs: ColorPairs = [];

  palette.forEach((dominantColor) => {
    palette.forEach((color) => {
      let contrast = chroma.contrast(dominantColor, color);

      if (contrast > THRESHOLD_CONTRAST_RATIO) {
        const range = getRGBRange(color);

        if (contrast < MINIMUM_CONTRAST_RATIO) {
          const delta = (MINIMUM_CONTRAST_RATIO - contrast) / 20;
          let lighten = dominantColor.brighten();

          while (contrast < MINIMUM_CONTRAST_RATIO) {
            const newColor = lighten
              ? color.brighten(delta)
              : color.darken(delta);

            if (newColor.hex() === color.hex()) {
              break;
            }

            const newContrast = chroma.contrast(dominantColor, newColor);
            if (newContrast < contrast) {
              lighten = lighten.brighten();
            }

            // eslint-disable-next-line no-param-reassign
            color = newColor;
            contrast = newContrast;
          }
        }

        const score = contrast + range;

        pairs.push({ color, score, contrast });
      }
    });
  });

  const max = pairs.reduce((prev, current) =>
    prev.score > current.score ? prev : current
  );
  const min = pairs.reduce((prev, current) =>
    prev.score < current.score ? prev : current
  );

  return {
    primary: max.color.set('hsl.l', 0.45).hex(),
    secondary: min.color.hex(),
    alternative: chroma.mix(max.color.hex(), 'black', 0.75, 'rgb').hex()
  };
};
