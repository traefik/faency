import { Property } from '@stitches/react/types/css';
import tinycolor from 'tinycolor2';
import { ColorInfo } from '../../utils/getPrimaryColorInfo';

export namespace Theme {
  type Colors = {
    badgeInteractiveBackgroundActive: Property.Color;
    badgeInteractiveBackgroundHover: Property.Color;
  };

  type Factory = (primaryColor: ColorInfo) => Colors;

  export const getLight: Factory = () => ({
    badgeInteractiveBackgroundActive: tinycolor('black').setAlpha(0.1).toHslString(),
    badgeInteractiveBackgroundHover: tinycolor('black').setAlpha(0.05).toHslString(),
  });

  export const getDark: Factory = () => ({
    badgeInteractiveBackgroundActive: tinycolor('black').setAlpha(0.2).toHslString(),
    badgeInteractiveBackgroundHover: tinycolor('black').setAlpha(0.1).toHslString(),
  });
}
