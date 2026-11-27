import tinycolor from 'tinycolor2';

import { darkColors, lightColors } from '@/colors';

// The Stitches item drew these at `opacity: 0.05` on a pseudo-element; here they are pre-mixed.
const tint = (color: string) => tinycolor(color).setAlpha(0.05).toHslString();

export const navigationLightTheme = {
  navButtonBg: 'transparent',
  navButtonHoverBg: tinycolor('black').setAlpha(0.04).toHslString(),
  navButtonHoverBg2: 'transparent',
  navButtonFocusBg: tinycolor('white').setAlpha(0.15).toHslString(),
  navButtonActiveBg: tinycolor('black').setAlpha(0.04).toHslString(),
  navButtonActiveBg2: 'transparent',
  navButtonText: tinycolor('black').setAlpha(0.54).toHslString(),
  navButtonHoverText: 'black',
  navButtonFocusText: 'black',
};

export const navigationDarkTheme = {
  navButtonBg: 'transparent',
  navButtonHoverBg: tinycolor('white').setAlpha(0.05).toHslString(),
  navButtonFocusBg: tinycolor('white').setAlpha(0.15).toHslString(),
  navButtonActiveBg: tinycolor('white').setAlpha(0.05).toHslString(),
  navButtonText: 'white',
  navButtonHoverText: 'white',
  navButtonFocusText: 'white',
};

export const getNavigationLightColors = (primaryColorName: string) => ({
  navButtonFocusBg2: tint(lightColors[`${primaryColorName}9`]),
  navButtonFocusBorder: lightColors[`${primaryColorName}8`],
});

export const getNavigationDarkColors = (primaryColorName: string) => {
  const primaryTint = tint(darkColors[`${primaryColorName}9`]);

  return {
    navButtonHoverBg2: primaryTint,
    navButtonFocusBg2: primaryTint,
    navButtonActiveBg2: primaryTint,
    navButtonFocusBorder: darkColors[`${primaryColorName}11`],
  };
};
