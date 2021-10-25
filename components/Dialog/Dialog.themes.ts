import { Property } from '@stitches/react/types/css';

export namespace Theme {
  type Colors = {
    dialogBackground: Property.Color;
  };

  type Factory = (primaryColor?: Property.Color) => Colors;

  export const getLight: Factory = () => ({
    dialogBackground: '$deepBlue2',
  });

  export const getDark: Factory = () => ({
    dialogBackground: '$deepBlue3',
  });
}
