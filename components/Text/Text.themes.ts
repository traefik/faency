import { Property } from '@stitches/react/types/css';
import { ColorInfo } from '../../utils/getPrimaryColorInfo';

export namespace Theme {
  type Colors = {
    textSubtle: Property.Color;
    textDefault: Property.Color;
    textContrast: Property.Color;
  };

  type Factory = (primaryColor: ColorInfo) => Colors;

  export const getLight: Factory = (primaryColor) => ({
    textSubtle: 'hsla(0, 0%, 0%, 0.51)',
    textDefault: 'hsla(0, 0%, 0%, 0.74)',
    textContrast: 'hsl(0, 0%, 0%)',
  });

  export const getDark: Factory = (primaryColor) => ({
    textSubtle: 'hsla(0, 0%, 100%, 0.51)',
    textDefault: 'hsla(0, 0%, 100%, 0.74)',
    textContrast: 'hsl(0, 0%, 100%)',
  });
}
