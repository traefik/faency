import { Property } from '@stitches/react/types/css';
import tinycolor from 'tinycolor2';
import { ColorInfo } from '../../utils/getPrimaryColorInfo';

export namespace Theme {
  type Colors = {
    headingDefault: Property.Color;
  };

  type Factory = (primaryColor: ColorInfo) => Colors;

  export const getLight: Factory = () => ({
    headingDefault: tinycolor('black').setAlpha(0.74).toHslString(),
  });

  export const getDark: Factory = () => ({
    headingDefault: tinycolor('white').setAlpha(0.74).toHslString(),
  });
}
