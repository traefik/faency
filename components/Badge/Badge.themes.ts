import { Property } from '@stitches/react/types/css';
import tinycolor from 'tinycolor2';
import colors from '../../colors';
import { ColorInfo } from '../../utils/getPrimaryColorInfo';

export namespace Theme {
  type Colors = {
    badgeInteractiveBackground: Property.Color;
  };

  type Factory = (primaryColor: ColorInfo) => Colors;

  export const getLight: Factory = () => ({
    badgeInteractiveBackground: tinycolor('black').setAlpha(0.05).toHslString(),
  });

  export const getDark: Factory = () => ({
    badgeInteractiveBackground: tinycolor('black').setAlpha(0.1).toHslString(),
  });
}
