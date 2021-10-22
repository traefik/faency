import { Property } from '@stitches/react/types/css';

export namespace Theme {
  type Colors = {
    textSubtle: Property.Color;
    textContrast: Property.Color;
  };

  type Factory = (primaryColor: string) => Colors;

  export const getLight: Factory = (primaryColor) => ({
    textSubtle: '$deepBlue7',
    textContrast: '$hiContrast',
  });

  export const getDark: Factory = (primaryColor) => ({
    textSubtle: '$deepBlue6',
    textContrast: '$hiContrast',
  });
}
