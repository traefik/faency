import tinycolor from 'tinycolor2';

export const accordionLightTheme = {
  accordionHoverShadow: tinycolor('black').setAlpha(0.05).toHslString(),
  accordionActiveShadow: tinycolor('black').setAlpha(0.2).toHslString(),
  accordionText: tinycolor('black').setAlpha(0.74).toHslString(),
  accordionLabel: tinycolor('black').setAlpha(0.51).toHslString(),
};

export const accordionDarkTheme = {
  accordionHoverShadow: tinycolor('white').setAlpha(0.05).toHslString(),
  accordionActiveShadow: tinycolor('white').setAlpha(0.2).toHslString(),
  accordionText: tinycolor('white').setAlpha(0.74).toHslString(),
  accordionLabel: tinycolor('white').setAlpha(0.51).toHslString(),
};
