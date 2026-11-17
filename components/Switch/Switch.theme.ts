import tinycolor from 'tinycolor2';

export const switchLightTheme = {
  switchBackground: tinycolor('black').setAlpha(0.2).toHslString(),
  switchThumb: tinycolor('white').setAlpha(0.87).toHslString(),
};

export const switchDarkTheme = {
  switchBackground: tinycolor('white').setAlpha(0.2).toHslString(),
  switchThumb: tinycolor('black').setAlpha(0.87).toHslString(),
};
