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

import { badgeDarkTheme, badgeLightTheme } from '../components/Badge/Badge.theme';
import { cardDarkTheme, cardLightTheme } from '../components/Card/Card.theme';
import { inputDarkTheme, inputLightTheme } from '../components/Input/Input.theme';
import { panelDarkTheme, panelLightTheme } from '../components/Panel/Panel.theme';
import { textareaDarkTheme, textareaLightTheme } from '../components/Textarea/Textarea.theme';
import * as deepBlue from './deepBlue';
import * as elevation from './elevation';
import * as grayBlue from './grayBlue';
import * as neon from './neon';
import * as orange from './orange';
import * as red from './red';

export const customColors = {
  ...elevation,
  ...deepBlue,
  ...grayBlue,
  ...neon,
  ...orange,
  ...red,
};

export type ColorMap = {
  [key: string]: string;
};

export const lightColors: ColorMap = Object.entries(customColors)
  .filter(([colorName]) => !colorName.includes('Dark'))
  .reduce(
    (acc, [, colors]) => ({
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
      // component-specific theme tokens
      ...badgeLightTheme,
      ...cardLightTheme,
      ...panelLightTheme,
      ...inputLightTheme,
      ...textareaLightTheme,
    },
  );

export const darkColors: ColorMap = Object.entries(customColors)
  .filter(([colorName]) => colorName.includes('Dark'))
  .reduce(
    (acc, [, colors]) => ({
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
      // component-specific theme tokens
      ...badgeDarkTheme,
      ...cardDarkTheme,
      ...panelDarkTheme,
      ...inputDarkTheme,
      ...textareaDarkTheme,
    },
  );

export * as deepBlue from './deepBlue';
export * as elevation from './elevation';
export * as grayBlue from './grayBlue';
export * as neon from './neon';
export * as orange from './orange';
export * as red from './red';
