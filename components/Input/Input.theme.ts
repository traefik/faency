import tinycolor from 'tinycolor2';

// Plain TypeScript color tokens (no vanilla-extract)
// Using default blue primary color for static tokens
export const inputLightTheme = {
  inputBg: 'hsl(240, 14.0%, 99.0%)', // $deepBlue1
  inputBorder: 'hsl(208, 9.0%, 73.0%)', // $grayBlue9
  inputFocusBg: tinycolor('black').setAlpha(0.15).toHslString(),
  inputFocusBorder: 'hsl(206, 100%, 50%)', // blue8
  inputHoverBg: 'hsla(0, 0%, 100%, 0.372)', // $whiteA9
  inputText: tinycolor('black').setAlpha(0.74).toHslString(),
  inputPlaceholder: 'hsla(0, 0%, 0%, 0.498)', // $blackA10
  inputDisabledText: tinycolor('black').setAlpha(0.35).toHslString(),
  inputInvalidBorder: 'hsl(358, 75%, 59%)', // $red9
};

export const inputDarkTheme = {
  inputBg: 'hsl(209, 38.0%, 12.0%)', // $grayBlue7 dark
  inputBorder: 'hsl(208, 11.0%, 45.0%)', // $grayBlue9 dark
  inputFocusBg: tinycolor('black').setAlpha(0.15).toHslString(),
  inputFocusBorder: 'hsl(206, 100%, 70%)', // blue11
  inputHoverBg: 'hsla(0, 0%, 100%, 0.104)', // $whiteA4
  inputText: tinycolor('white').setAlpha(0.8).toHslString(),
  inputPlaceholder: 'hsla(0, 0%, 100%, 0.455)', // $whiteA10
  inputDisabledText: tinycolor('white').setAlpha(0.35).toHslString(),
  inputInvalidBorder: 'hsl(358, 75%, 59%)', // $red9
};
