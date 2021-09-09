export namespace Theme {
  type Colors = {
    textFieldBg: string;
    textFieldBorder: string;
    textFieldFocusBg: string;
    textFieldFocusBorder: string;
    textFieldHoverBg: string;
    textFieldText: string;
    textFieldPlaceholder: string;
    textFieldDisabledBg: string;
    textFieldDisabledText: string;
    textFieldDisabledBorder: string;
    textFieldReadOnlyBg: string;
  };

  type Factory = (primaryColor: string) => Colors;

  export const getLight: Factory = (primaryColor) => ({
    textFieldBg: '$deepBlue3',
    textFieldBorder: '$deepBlue6',
    textFieldFocusBg: '$deepBlue2',
    textFieldFocusBorder: '$deepBlue10',
    textFieldHoverBg: '$deepBlue2',
    textFieldText: '$deepBlue9',
    textFieldPlaceholder: '$deepBlue6',
    textFieldDisabledBg: '$deepBlue1',
    textFieldDisabledText: '$deepBlue5',
    textFieldDisabledBorder: '$deepBlue5',
    textFieldReadOnlyBg: '$deepBlue3',
  });

  export const getDark: Factory = (primaryColor) => ({
    textFieldBg: '$deepBlue2',
    textFieldBorder: '$deepBlue6',
    textFieldFocusBg: '$deepBlue1',
    textFieldFocusBorder: '$deepBlue9',
    textFieldHoverBg: '$deepBlue1',
    textFieldText: '$deepBlue9',
    textFieldPlaceholder: '$deepBlue6',
    textFieldDisabledBg: '$deepBlue2',
    textFieldDisabledText: '$deepBlue5',
    textFieldDisabledBorder: '$deepBlue4',
    textFieldReadOnlyBg: '$deepBlue2',
  });
}
