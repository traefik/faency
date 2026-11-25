import tinycolor from 'tinycolor2';

import { darkColors, lightColors } from '@/colors';

export const linkLightTheme = {
  linkBlue: lightColors.blue11,
  linkBlueTextDecoration: lightColors.blue7,
  linkBlueFocusOutline: lightColors.blue8,
  linkContrastTextDecoration: lightColors.slate8,
  linkContrastFocusOutline: lightColors.slate8,
  linkSubtle: lightColors.deepBlue7,
  linkSubtleTextDecoration: lightColors.deepBlue5,
  linkSubtleHoverTextDecoration: lightColors.deepBlue7,
  linkSubtleFocusOutline: lightColors.deepBlue4,
};

export const linkDarkTheme = {
  linkBlue: darkColors.blue11,
  linkBlueTextDecoration: darkColors.blue8,
  linkBlueFocusOutline: darkColors.blue8,
  linkContrastTextDecoration: darkColors.slate8,
  linkContrastFocusOutline: darkColors.slate8,
  linkSubtle: darkColors.deepBlue6,
  linkSubtleTextDecoration: darkColors.deepBlue4,
  linkSubtleHoverTextDecoration: darkColors.deepBlue5,
  linkSubtleFocusOutline: darkColors.deepBlue3,
};

export const getLinkLightColors = (primary: string) => ({
  linkPrimary: tinycolor(primary).darken(26).toHslString(),
  linkPrimaryTextDecoration: tinycolor(primary).darken(16).toHslString(),
  linkPrimaryHoverTextDecoration: tinycolor(primary).darken(26).toHslString(),
  linkPrimaryFocusOutline: tinycolor(primary).darken(16).toHslString(),
});

export const getLinkDarkColors = (primary: string) => ({
  linkPrimaryTextDecoration: tinycolor(primary).lighten(16).toHslString(),
  linkPrimaryHoverTextDecoration: tinycolor(primary).darken(20).toHslString(),
  linkPrimaryFocusOutline: tinycolor(primary).lighten(16).toHslString(),
});
