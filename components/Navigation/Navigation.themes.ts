import tinycolor from 'tinycolor2';
import { Property } from '@stitches/react/types/css';
import { ColorInfo } from '../../utils/getPrimaryColorInfo';
export namespace Theme {
  type Colors = {
    navButtonBg: Property.Color;
    navButtonHoverBg: Property.Color;
    navButtonHoverBg2: Property.Color;
    navButtonFocusBg: Property.Color;
    navButtonFocusBg2: Property.Color;
    navButtonFocusBorder: Property.Color;
    navButtonText: Property.Color;
    navButtonHoverText: Property.Color;
    navButtonActiveText: Property.Color;
    navButtonFocusText: Property.Color;
  };

  type Factory = (primaryColor: ColorInfo) => Colors;

  export const getLight: Factory = (primaryColor) => ({
    navButtonBg: 'transparent',
    navButtonHoverBg: tinycolor('black').setAlpha(0.04).toHslString(),
    navButtonHoverBg2: 'transparent',
    navButtonFocusBg: tinycolor('white').setAlpha(0.15).toHslString(),
    navButtonFocusBg2: '$primary',
    navButtonFocusBorder: primaryColor.helpers.pickScale(8),
    navButtonActiveBg: tinycolor('black').setAlpha(0.04).toHslString(),
    navButtonActiveBg2: 'transparent',
    navButtonText: tinycolor('black').setAlpha(0.54).toHslString(),
    navButtonHoverText: 'black',
    navButtonFocusText: 'black',
    navButtonActiveText: '$primary',
  });

  export const getDark: Factory = (primaryColor) => ({
    navButtonBg: 'transparent',
    navButtonHoverBg: tinycolor('white').setAlpha(0.05).toHslString(),
    navButtonHoverBg2: '$primary',
    navButtonFocusBg: tinycolor('white').setAlpha(0.15).toHslString(),
    navButtonFocusBg2: '$primary',
    navButtonFocusBorder: primaryColor.helpers.pickScale(11),
    navButtonActiveBg: tinycolor('white').setAlpha(0.05).toHslString(),
    navButtonActiveBg2: '$primary',
    navButtonText: 'white',
    navButtonHoverText: 'white',
    navButtonFocusText: 'white',
    navButtonActiveText: '$primary',
  });
}
