import { Property } from '@stitches/react/types/css';

export namespace Theme {
  type Colors = {
    textSubtle: Property.Color;
    textContrast: Property.Color;
  };

  type Factory = (primaryColor?: Property.Color) => Colors;

  export const getLight: Factory = () => ({
    textSubtle: '$deepBlue7',
    textContrast: '$hiContrast',
  });

  export const getDark: Factory = () => ({
    textSubtle: '$deepBlue6',
    textContrast: '$hiContrast',
  });
}
