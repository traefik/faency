import { Property } from '@stitches/react/types/css';
import tinycolor from 'tinycolor2';

import { ColorInfo } from '../../utils/getPrimaryColorInfo';
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
    radioIndicator: '$primary',
    radioBorder: '$grayBlue9',
    radioHoverBg: 'transparent',
    radioHoverBorder: '$primary',
    radioFocusBorder: '$primary',
    radioDisabledBg: '$deepBlue3',
    radioDisabledBorder: '$deepBlue5',
    radioIndicatorDisabledBg: tinycolor(primaryColor.value).setAlpha(0.6).toHslString(),
  });

  export const getDark: Factory = (primaryColor) => ({
    radioIndicator: '$primary',
    radioBorder: '$grayBlue9',
    radioHoverBg: '$deepBlue3',
    radioHoverBorder: '$primary',
    radioFocusBorder: '$primary',
    radioDisabledBg: '$deepBlue3',
    radioDisabledBorder: '$deepBlue4',
    radioIndicatorDisabledBg: tinycolor(primaryColor.value).setAlpha(0.6).toHslString(),
  });
}
