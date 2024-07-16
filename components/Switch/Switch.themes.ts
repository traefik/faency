import { Property } from '@stitches/react/types/css';
import tinycolor from 'tinycolor2';

import { ColorInfo } from '../../utils/getPrimaryColorInfo';

export namespace Theme {
  type Colors = {
    switchBackground: Property.Color;
    switchActiveBackground: Property.Color;
    switchFocusBorder: Property.Color;
    switchThumb: Property.Color;
  };

  type Factory = (primaryColor: ColorInfo) => Colors;

  export const getLight: Factory = (primaryColor) => ({
    switchBackground: tinycolor('black').setAlpha(0.2).toHslString(),
    switchActiveBackground: '$primary',
    switchFocusBorder: primaryColor.helpers.pickScale(8),
    switchThumb: tinycolor('white').setAlpha(0.87).toHslString(),
  });

  export const getDark: Factory = (primaryColor) => ({
    switchBackground: tinycolor('white').setAlpha(0.2).toHslString(),
    switchActiveBackground: '$primary',
    switchFocusBorder: primaryColor.helpers.pickScale(11),
    switchThumb: tinycolor('black').setAlpha(0.87).toHslString(),
  });
}
