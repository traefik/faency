import { Property } from '@stitches/react/types/css';

export namespace Theme {
  type Colors = {
    textFieldBg: Property.Color;
    textFieldBorder: Property.Color;
    textFieldFocusBg: Property.Color;
    textFieldFocusBorder: Property.Color;
    textFieldHoverBg: Property.Color;
    textFieldText: Property.Color;
    textFieldPlaceholder: Property.Color;
    textFieldDisabledText: Property.Color;
    textFieldDisabledBorder: Property.Color;
    textFieldReadOnlyBg: Property.Color;
  };

  type Factory = (primaryColor?: Property.Color) => Colors;

  export const getLight: Factory = () => ({
    textFieldBg: '$deepBlue3',
    textFieldBorder: '$deepBlue6',
    textFieldFocusBg: '$deepBlue2',
    textFieldFocusBorder: '$deepBlue10',
    textFieldHoverBg: '$deepBlue2',
    textFieldText: '$deepBlue9',
    textFieldPlaceholder: '$deepBlue6',
    textFieldDisabledText: '$deepBlue5',
    textFieldDisabledBorder: '$deepBlue5',
    textFieldReadOnlyBg: '$deepBlue3',
  });

  export const getDark: Factory = () => ({
    textFieldBg: '$deepBlue3',
    textFieldBorder: '$deepBlue6',
    textFieldFocusBg: '$deepBlue1',
    textFieldFocusBorder: '$deepBlue9',
    textFieldHoverBg: '$deepBlue1',
    textFieldText: '$deepBlue9',
    textFieldPlaceholder: '$deepBlue6',
    textFieldDisabledText: '$deepBlue5',
    textFieldDisabledBorder: '$deepBlue4',
    textFieldReadOnlyBg: '$deepBlue2',
  });
}
