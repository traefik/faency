import * as elevation from './elevation';
import * as deepBlue from './deepBlue';
import * as grayBlue from './grayBlue';
import * as neon from './neon';
import * as orange from './orange';
import * as red from './red';

import {
  blackA,
  blue,
  blueA,
  blueDark,
  blueDarkA,
  gray,
  grayA,
  grayDark,
  grayDarkA,
  green,
  greenA,
  greenDark,
  greenDarkA,
  purple,
  purpleA,
  purpleDark,
  purpleDarkA,
  slate,
  slateA,
  slateDark,
  slateDarkA,
  whiteA,
} from '@radix-ui/colors';

const customColors = {
  ...elevation,
  ...deepBlue,
  ...grayBlue,
  ...neon,
  ...orange,
  ...red,
};

type ColorMap = {
  [key: string]: string;
};

export const lightColors: ColorMap = Object.entries(customColors)
  .filter(([colorName]) => !colorName.includes('Dark'))
  .reduce(
    (acc, [_, colors]) => ({
      ...acc,
      ...colors,
    }),
    {
      // radix colors
      ...gray,
      ...grayA,
      ...blue,
      ...blueA,
      ...green,
      ...greenA,
      ...slate,
      ...slateA,
      ...purple,
      ...purpleA,
      ...whiteA,
      ...blackA,
    }
  );

export const darkColors: ColorMap = Object.entries(customColors)
  .filter(([colorName]) => colorName.includes('Dark'))
  .reduce(
    (acc, [_, colors]) => ({
      ...acc,
      ...colors,
    }),
    {
      // radix colors
      ...grayDark,
      ...grayDarkA,
      ...blueDark,
      ...blueDarkA,
      ...greenDark,
      ...greenDarkA,
      ...slateDark,
      ...slateDarkA,
      ...purpleDark,
      ...purpleDarkA,
      ...whiteA,
      ...blackA,
    }
  );

export * as elevation from './elevation';
export * as deepBlue from './deepBlue';
export * as grayBlue from './grayBlue';
export * as neon from './neon';
export * as orange from './orange';
export * as red from './red';

export default customColors;
