import { Property } from '@stitches/react/types/css';
import tinycolor from 'tinycolor2';

import { ColorInfo } from '../../utils/getPrimaryColorInfo';

export namespace Theme {
  type Colors = {
    checkboxIcon: Property.Color;
    checkboxBg: Property.Color;
    checkboxCheckedBg: Property.Color;
    checkboxBorder: Property.Color;
    checkboxCheckedIcon: Property.Color;
    checkboxCheckedHoverBg: Property.Color;
    checkboxHoverBg: Property.Color;
    checkboxHoverBorder: Property.Color;
    checkboxFocusBorder: Property.Color;
    checkboxDisabledBg: Property.Color;
    checkboxDisabledBorder: Property.Color;
    checkboxIndicatorDisabledBg: Property.Color;
  };

  type Factory = (primaryColor: ColorInfo) => Colors;

  export const getLight: Factory = (primaryColor) => ({
    checkboxIcon: '$deepBlue11',
    checkboxBg: 'transparent',
    checkboxBorder: '$slate8',
    checkboxCheckedBg: '$primary',
    checkboxCheckedIcon: 'white',
    checkboxCheckedHoverBg: tinycolor(primaryColor.value).darken().toHslString(),
    checkboxHoverBg: 'transparent',
    checkboxHoverBorder: '$primary',
    checkboxFocusBorder: '$primary',
    checkboxDisabledBg: '$deepBlue3',
    checkboxDisabledBorder: '$deepBlue5',
    checkboxIndicatorDisabledBg: tinycolor(primaryColor.value).setAlpha(0.6).toHslString(),
  });

  export const getDark: Factory = (primaryColor) => ({
    checkboxIcon: '$deepBlue1',
    checkboxBg: 'transparent',
    checkboxCheckedBg: '$primary',
    checkboxBorder: '$slate9',
    checkboxCheckedIcon: '$deepBlue1',
    checkboxCheckedHoverBg: tinycolor(primaryColor.value).lighten(10).toHslString(),
    checkboxHoverBg: '$deepBlue3',
    checkboxHoverBorder: '$primary',
    checkboxFocusBorder: '$primary',
    checkboxDisabledBg: tinycolor(primaryColor.value).setAlpha(0.6).toHslString(),
    checkboxDisabledBorder: 'transparent',
    checkboxIndicatorDisabledBg: '$deepBlue1',
  });
}
