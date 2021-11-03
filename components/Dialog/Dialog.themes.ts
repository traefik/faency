import { Property } from '@stitches/react/types/css';
import { ColorInfo } from '../../stitches.config';

export namespace Theme {
  type Colors = {
    dialogBackground: Property.Color;
  };

  type Factory = (primaryColor?: ColorInfo) => Colors;

  export const getLight: Factory = () => ({
    dialogBackground: '$deepBlue2',
  });

  export const getDark: Factory = () => ({
    dialogBackground: '$deepBlue3',
  });
}
