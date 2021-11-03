import { Property } from '@stitches/react/types/css';
import { ColorInfo } from '../../stitches.config';

export namespace Theme {
  type Colors = {
    iconButtonBackground: Property.Color;
    iconButtonHoverBorder: Property.Color;
    iconButtonHoverBackground: Property.Color;
    iconButtonFocusBorder: Property.Color;
  };

  type Factory = (primaryColor?: ColorInfo) => Colors;

  export const getLight: Factory = () => ({
    iconButtonBackground: 'white',
    iconButtonHoverBorder: '$slate9',
    iconButtonHoverBackground: '$slateA3',
    iconButtonFocusBorder: '$slate10',
  });

  export const getDark: Factory = () => ({
    iconButtonBackground: '$deepBlue2',
    iconButtonHoverBorder: '$deepBlue6',
    iconButtonHoverBackground: '$slateA4',
    iconButtonFocusBorder: '$deepBlue7',
  });
}
