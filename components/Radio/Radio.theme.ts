import tinycolor from 'tinycolor2';

import { darkColors, lightColors } from '@/colors';

export const radioLightTheme = {
  radioBorder: lightColors.grayBlue9,
  radioDisabledBg: lightColors.deepBlue3,
  radioInvalidBorder: lightColors.red9,
};

export const radioDarkTheme = {
  radioBorder: darkColors.grayBlue9,
  radioDisabledBg: darkColors.deepBlue3,
  radioInvalidBorder: darkColors.red9,
};

export const getRadioColors = (primary: string) => ({
  radioIndicator: primary,
  radioHoverBorder: primary,
  radioFocusBorder: primary,
  radioIndicatorDisabledBg: tinycolor(primary).setAlpha(0.6).toHslString(),
});
