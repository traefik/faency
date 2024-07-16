import { Property } from '@stitches/react/types/css';

import { ColorMap } from '../colors';
import { PrimaryColor } from '../stitches.config';

type ColorScale = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type PickScale = (scale: ColorScale, options?: { alpha: boolean }) => Property.Color;

export type ColorInfo = {
  name: PrimaryColor;
  token: Property.Color;
  value: string;
  helpers: {
    pickScale: PickScale;
  };
};

const getPrimaryColorInfo = (primaryColor: PrimaryColor, colors: ColorMap): ColorInfo => ({
  name: primaryColor,
  value: colors[`${primaryColor}9`],
  token: `$${primaryColor}9`,
  helpers: {
    pickScale: (scale, options = { alpha: false }) =>
      `$${primaryColor}${options.alpha ? 'A' : ''}${scale}`,
  },
});

export default getPrimaryColorInfo;
