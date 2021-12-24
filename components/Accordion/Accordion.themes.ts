import { Property } from '@stitches/react/types/css';
import { ColorInfo } from '../../utils/getPrimaryColorInfo';
import tinycolor from 'tinycolor2';

export namespace Theme {
  type Colors = {
    accordionBackground: Property.Color;
    accordionHoverShadow: Property.Color;
    accordionActiveShadow: Property.Color;
  };

  type Factory = (primaryColor: ColorInfo) => Colors;

  export const getLight: Factory = () => ({
    accordionBackground: 'white',
    accordionHoverShadow: tinycolor('black').setAlpha(0.05).toHslString(),
    accordionActiveShadow: tinycolor('black').setAlpha(0.2).toHslString(),
  });

  export const getDark: Factory = () => ({
    accordionBackground: '$deepBlue2',
    accordionHoverShadow: tinycolor('white').setAlpha(0.05).toHslString(),
    accordionActiveShadow: tinycolor('white').setAlpha(0.2).toHslString(),
  });
}
