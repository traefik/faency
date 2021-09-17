export namespace Theme {
  type Colors = {
    selectBg: string;
    selectBorder: string;
    selectFocusBg: string;
    selectFocusBorder: string;
    selectHoverBg: string;
    selectText: string;
    selectPlaceholder: string;
    selectDisabledText: string;
    selectDisabledBorder: string;
    selectReadOnlyBg: string;
  };

  type Factory = (primaryColor: string) => Colors;

  export const getLight: Factory = (primaryColor) => ({
    selectBg: '$deepBlue3',
    selectBorder: '$deepBlue6',
    selectFocusBg: '$deepBlue2',
    selectFocusBorder: '$deepBlue10',
    selectHoverBg: '$deepBlue2',
    selectText: '$deepBlue9',
    selectPlaceholder: '$deepBlue6',
    selectDisabledText: '$deepBlue5',
    selectDisabledBorder: '$deepBlue5',
    selectReadOnlyBg: '$deepBlue3',
  });

  export const getDark: Factory = (primaryColor) => ({
    selectBg: '$deepBlue3',
    selectBorder: '$deepBlue6',
    selectFocusBg: '$deepBlue1',
    selectFocusBorder: '$deepBlue9',
    selectHoverBg: '$deepBlue1',
    selectText: '$deepBlue9',
    selectPlaceholder: '$deepBlue6',
    selectDisabledText: '$deepBlue5',
    selectDisabledBorder: '$deepBlue4',
    selectReadOnlyBg: '$deepBlue2',
  });
}
