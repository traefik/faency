import tinycolor from 'tinycolor2';
import { Property } from '@stitches/react/types/css';
export namespace Theme {
  type Colors = {
    navBg: Property.Color;
    navButtonBg: Property.Color;
    navButtonHoverBg: Property.Color;
    navButtonActiveBg: Property.Color;
    navButtonFocusBg: Property.Color;
    navButtonText: Property.Color;
    navButtonHoverText: Property.Color;
    navButtonActiveText: Property.Color;
    navButtonFocusText: Property.Color;
  };

  type Factory = (primaryColor: Property.Color) => Colors;

  export const getLight: Factory = (primaryColor) => ({
    navBg: 'white',
    navButtonBg: 'transparent',
    navButtonHoverBg: 'rgba(0, 0, 0, 0.04)',
    navButtonActiveBg: 'rgba(0, 0, 0, 0.04)',
    navButtonFocusBg: tinycolor(primaryColor).setAlpha(0.05).toString(),
    navButtonText: 'rgba(0, 0, 0, 0.54)',
    navButtonHoverText: 'rgba(0, 0, 0)',
    navButtonFocusText: 'rgba(0, 0, 0)',
    navButtonActiveText: tinycolor(primaryColor).darken(20).toString(),
  });

  export const getDark: Factory = (primaryColor) => ({
    navBg: '$deepBlue2',
    navButtonBg: 'transparent',
    navButtonHoverBg: tinycolor(primaryColor).setAlpha(0.1).toString(),
    navButtonActiveBg: tinycolor(primaryColor).setAlpha(0.1).toString(),
    navButtonFocusBg: tinycolor(primaryColor).setAlpha(0.1).toString(),
    navButtonText: 'white',
    navButtonHoverText: 'white',
    navButtonFocusText: 'white',
    navButtonActiveText: primaryColor,
  });
}
