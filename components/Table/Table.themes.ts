import tinycolor from 'tinycolor2';
import { Property } from '@stitches/react/types/css';
import { ColorInfo } from '../../utils/getPrimaryColorInfo';

export namespace Theme {
  type Colors = {
    tableText: Property.Color;
    tableSubtleText: Property.Color;
    tableHoverBackground: Property.BackgroundColor;
    tableActiveText: Property.Color;
    tableActiveHoverText: Property.Color;
    tableHeaderLayerBackground: Property.BackgroundColor;
    tableFooterLayerBackground: Property.BackgroundColor;
    tableHeaderText: Property.Color;
    tableFooterText: Property.Color;
    tableHoverText: Property.Color;
    tableRowBorder: Property.BorderBottomColor;
  };

  type Factory = (primaryColor: ColorInfo) => Colors;

  export const getLight: Factory = (primaryColor) => ({
    tableText: tinycolor('black').setAlpha(0.74).toHslString(),
    tableSubtleText: tinycolor('black').setAlpha(0.51).toHslString(),
    tableHeaderLayerBackground: tinycolor('black').setAlpha(0.03).toHslString(),
    tableFooterLayerBackground: tinycolor('black').setAlpha(0.03).toHslString(),
    tableHeaderText: tinycolor('black').setAlpha(0.51).toHslString(),
    tableFooterText: tinycolor('black').setAlpha(0.51).toHslString(),
    tableHoverBackground: tinycolor('black').setAlpha(0.04).toHslString(),
    tableHoverText: tinycolor('black').setAlpha(0.74).toHslString(),
    tableActiveText: primaryColor.value,
    tableActiveHoverText: tinycolor(primaryColor.value).lighten(10).toHslString(),
    tableRowBorder: 'hsl(0, 0%, 87%)',
  });

  export const getDark: Factory = (primaryColor) => ({
    tableText: tinycolor('white').setAlpha(0.74).toHslString(),
    tableSubtleText: tinycolor('white').setAlpha(0.51).toHslString(),
    tableHeaderLayerBackground: tinycolor('white').setAlpha(0.02).toHslString(),
    tableFooterLayerBackground: tinycolor('white').setAlpha(0.02).toHslString(),
    tableHeaderText: tinycolor('white').setAlpha(0.51).toHslString(),
    tableFooterText: tinycolor('white').setAlpha(0.51).toHslString(),
    tableHoverBackground: tinycolor(primaryColor.value).setAlpha(0.04).toHslString(),
    tableHoverText: tinycolor('white').setAlpha(0.74).toHslString(),
    tableActiveText: '$primary',
    tableActiveHoverText: tinycolor(primaryColor.value).lighten(10).toHslString(),
    tableRowBorder: 'hsl(209, 21%, 23%)',
  });
}
