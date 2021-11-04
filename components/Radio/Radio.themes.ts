import { Property } from '@stitches/react/types/css';
import tinycolor from 'tinycolor2';
import { ColorInfo } from '../../stitches.config';
export namespace Theme {
  type Colors = {
    radioBorder: Property.Color;
    radioHoverBg: Property.Color;
    radioHoverBorder: Property.Color;
    radioFocusBorder: Property.Color;
    radioDisabledBg: Property.Color;
    radioDisabledBorder: Property.Color;
    radioIndicatorDisabledBg: Property.Color;
  };

  type Factory = (primaryColor: ColorInfo) => Colors;

  export const getLight: Factory = (primaryColor) => ({
    radioIndicator: tinycolor(primaryColor.value).darken(20).toHslString(),
    radioBorder: '$deepBlue6',
    radioHoverBg: 'transparent',
    radioHoverBorder: tinycolor(primaryColor.value).darken(20).toHslString(),
    radioFocusBorder: tinycolor(primaryColor.value).darken(20).toHslString(),
    radioDisabledBg: '$deepBlue3',
    radioDisabledBorder: '$deepBlue5',
    radioIndicatorDisabledBg: tinycolor(primaryColor.value).setAlpha(0.6).toHslString(),
  });

  export const getDark: Factory = (primaryColor) => ({
    radioIndicator: '$primary',
    radioBorder: '$deepBlue6',
    radioHoverBg: '$deepBlue3',
    radioHoverBorder: '$primary',
    radioFocusBorder: '$primary',
    radioDisabledBg: '$deepBlue3',
    radioDisabledBorder: '$deepBlue4',
    radioIndicatorDisabledBg: tinycolor(primaryColor.value).setAlpha(0.6).toHslString(),
  });
}
