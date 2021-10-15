export namespace Theme {
  type Colors = {
    wrapperBg: string;
    inputBg: string;
    inputBorder: string;
    inputFocusBg: string;
    inputFocusBorder: string;
    inputHoverBg: string;
    inputText: string;
    inputPlaceholder: string;
    inputDisabledText: string;
    inputDisabledBorder: string;
    inputReadOnlyBg: string;
  };

  type Factory = (primaryColor: string) => Colors;

  // @TODO: add colors to theme
  export const getLight: Factory = (primaryColor) => ({
    wrapperBg: 'hsl(240, 14%, 99%)',
    inputBg: 'hsla(0, 0%, 100%, 0)',
    inputBorder: '$deepBlue5',
    inputFocusBg: 'hsl(0, 0%, 100%)',
    inputFocusBorder: 'hsl(68, 53%, 48%)',
    inputHoverBg: 'hsla(68, 80%, 94%, 0.33)',
    inputText: 'hsla(0, 0%, 0%, 0.74)',
    inputTextFocused: 'hsl(0, 0%, 0%)',
    inputPlaceholder: 'hsla(0, 0%, 0%, 0.5)',
    // @TODO: waiting for mockups to update
    inputDisabledText: '$deepBlue5',
    inputDisabledBorder: '$deepBlue5',
    inputReadOnlyBg: '$deepBlue3',
  });

  export const getDark: Factory = (primaryColor) => ({
    wrapperBg: 'hsl(209, 38%, 12%)',
    inputBg: 'hsla(0, 0%, 100%, 0)',
    inputBorder: '$deepBlue7',
    inputFocusBg: 'hsla(0, 0%, 0%, 0.15)',
    inputFocusBorder: 'hsl(67, 78%, 84%)',
    inputHoverBg: 'hsla(68, 81%, 80%, 0.1)',
    inputText: 'hsla(0, 0%, 100%, 0.8)',
    inputTextFocused: 'hsl(0, 0%, 100%)',
    inputPlaceholder: 'hsla(0, 0%, 100%, 0.51)',
    // @TODO: waiting for mockups to update
    inputDisabledText: '$deepBlue5',
    inputDisabledBorder: '$deepBlue4',
    inputReadOnlyBg: '$deepBlue2',
  });
}