import { inputDarkTheme, inputLightTheme } from '@/components/Input/Input.theme';

const fromInputTheme = (input: typeof inputLightTheme) => ({
  selectBg: input.inputBg,
  selectBorder: input.inputBorder,
  selectFocusBg: input.inputFocusBg,
  selectFocusBorder: input.inputFocusBorder,
  selectHoverBg: input.inputHoverBg,
  selectText: input.inputText,
  selectPlaceholder: input.inputPlaceholder,
  selectDisabledText: input.inputDisabledText,
  selectInvalidBorder: input.inputInvalidBorder,
});

export const selectLightTheme = fromInputTheme(inputLightTheme);
export const selectDarkTheme = fromInputTheme(inputDarkTheme);
