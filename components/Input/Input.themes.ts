export namespace Theme {
  type Colors = {
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

  export const getLight: Factory = (primaryColor) => ({
    inputBg: '$deepBlue3',
    inputBorder: '$deepBlue6',
    inputFocusBg: '$deepBlue2',
    inputFocusBorder: 'hsl(68, 53.3%, 47.8%)', // @TODO: add color inside neon theme palette
    inputHoverBg: '$deepBlue2',
    inputText: '$deepBlue9',
    inputPlaceholder: '$deepBlue6',
    inputDisabledText: '$deepBlue5',
    inputDisabledBorder: '$deepBlue5',
    inputReadOnlyBg: '$deepBlue3',
  });

  export const getDark: Factory = (primaryColor) => ({
    inputBg: '$deepBlue3',
    inputBorder: '$deepBlue6',
    inputFocusBg: '$deepBlue1',
    inputFocusBorder: '$neon5',
    inputHoverBg: '$deepBlue1',
    inputText: '$deepBlue9',
    inputPlaceholder: '$deepBlue6',
    inputDisabledText: '$deepBlue5',
    inputDisabledBorder: '$deepBlue4',
    inputReadOnlyBg: '$deepBlue2',
  });
}
