import tinycolor from 'tinycolor2';

import { darkColors, lightColors } from '@/colors';

export const checkboxLightTheme = {
  checkboxIcon: lightColors.deepBlue11,
  checkboxBg: 'transparent',
  checkboxBorder: lightColors.slate8,
  checkboxCheckedIcon: 'white',
  checkboxHoverBg: 'transparent',
  checkboxDisabledBg: lightColors.deepBlue3,
  checkboxDisabledBorder: lightColors.deepBlue5,
  checkboxDisabledIcon: lightColors.slate10,
  checkboxInvalidBorder: lightColors.red9,
};

export const checkboxDarkTheme = {
  checkboxIcon: darkColors.deepBlue1,
  checkboxBg: 'transparent',
  checkboxBorder: darkColors.slate9,
  checkboxCheckedIcon: darkColors.deepBlue1,
  checkboxHoverBg: darkColors.deepBlue3,
  checkboxDisabledBorder: 'transparent',
  checkboxDisabledIcon: darkColors.deepBlue1,
  checkboxInvalidBorder: darkColors.red9,
};

export const getCheckboxLightColors = (primary: string) => ({
  checkboxCheckedBg: primary,
  checkboxCheckedHoverBg: tinycolor(primary).darken().toHslString(),
  checkboxHoverBorder: primary,
  checkboxFocusBorder: primary,
});

export const getCheckboxDarkColors = (primary: string) => ({
  checkboxCheckedBg: primary,
  checkboxCheckedHoverBg: tinycolor(primary).lighten(10).toHslString(),
  checkboxHoverBorder: primary,
  checkboxFocusBorder: primary,
  checkboxDisabledBg: tinycolor(primary).setAlpha(0.6).toHslString(),
});
