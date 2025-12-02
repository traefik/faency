import tinycolor from 'tinycolor2';

// Plain TypeScript color tokens (no vanilla-extract)
// Using default blue primary color for static tokens
export const textareaLightTheme = {
  textareaBg: 'hsl(240, 14.0%, 99.0%)', // $deepBlue1
  textareaBorder: 'hsl(208, 9.0%, 73.0%)', // $grayBlue9
  textareaFocusBg: tinycolor('black').setAlpha(0.15).toHslString(),
  textareaFocusBorder: 'hsl(206, 100%, 50%)', // blue8
  textareaHoverBg: 'hsla(0, 0%, 100%, 0.372)', // $whiteA9
  textareaText: tinycolor('black').setAlpha(0.74).toHslString(),
  textareaPlaceholder: 'hsla(0, 0%, 0%, 0.498)', // $blackA10
  textareaDisabledText: tinycolor('black').setAlpha(0.35).toHslString(),
  textareaInvalidBorder: 'hsl(358, 75%, 59%)', // $red9
};

export const textareaDarkTheme = {
  textareaBg: 'hsl(209, 38.0%, 12.0%)', // $grayBlue7 dark
  textareaBorder: 'hsl(208, 11.0%, 45.0%)', // $grayBlue9 dark
  textareaFocusBg: tinycolor('black').setAlpha(0.15).toHslString(),
  textareaFocusBorder: 'hsl(206, 100%, 70%)', // blue11
  textareaHoverBg: 'hsla(0, 0%, 100%, 0.104)', // $whiteA4
  textareaText: tinycolor('white').setAlpha(0.8).toHslString(),
  textareaPlaceholder: 'hsla(0, 0%, 100%, 0.455)', // $whiteA10
  textareaDisabledText: tinycolor('white').setAlpha(0.35).toHslString(),
  textareaInvalidBorder: 'hsl(358, 75%, 59%)', // $red9
};
