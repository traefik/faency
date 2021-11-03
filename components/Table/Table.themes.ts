import tinycolor from 'tinycolor2';
import { Property } from '@stitches/react/types/css';
import { ColorInfo } from '../../stitches.config';

export namespace Theme {
  type Colors = {
    tableText: Property.Color;
    tableHoverBackground: Property.BackgroundColor;
    tableActiveText: Property.Color;
    tableActiveHoverText: Property.Color;
  };

  type Factory = (primaryColor: ColorInfo) => Colors;

  export const getLight: Factory = (primaryColor) => ({
    tableText: '$deepBlue9',
    tableHoverBackground: '$deepBlue1',
    tableActiveText: '$deepBlue9',
    tableActiveHoverText: '$deepBlue7',
  });

  export const getDark: Factory = (primaryColor) => ({
    tableText: '$deepBlue9',
    tableHoverBackground: '$deepBlue1',
    tableActiveText: '$primary',
    tableActiveHoverText: tinycolor(primaryColor.value).lighten(10).toString(),
  });
}
