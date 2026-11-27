import { inputDarkTheme, inputLightTheme } from '@/components/Input/Input.theme';

const fromInputTheme = (input: typeof inputLightTheme) => ({
  selectBg: input.inputBg,
  selectBorder: input.inputBorder,
  selectFocusBorder: input.inputFocusBorder,
  selectHoverBg: input.inputHoverBg,
  selectText: input.inputText,
  selectPlaceholder: input.inputPlaceholder,
  selectDisabledText: input.inputDisabledText,
  selectInvalidBorder: input.inputInvalidBorder,
  selectInvalidHoverTint: input.inputInvalidHoverTint,
});

export const selectLightTheme = fromInputTheme(inputLightTheme);
export const selectDarkTheme = fromInputTheme(inputDarkTheme);
