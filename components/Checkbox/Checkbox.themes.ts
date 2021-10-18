import tinycolor from 'tinycolor2';
import { Property } from '@stitches/react/types/css';

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

  type Factory = (primaryColor: string) => Colors;

  export const getLight: Factory = (primaryColor) => ({
    checkboxIcon: '$deepBlue11',
    checkboxBg: 'transparent',
    checkboxBorder: '$slate8',
    checkboxCheckedBg: '$primary',
    checkboxCheckedIcon: 'white',
    checkboxCheckedHoverBg: tinycolor(primaryColor).darken().toString(),
    checkboxHoverBg: 'transparent',
    checkboxHoverBorder: '$primary',
    checkboxFocusBorder: '$primary',
    checkboxDisabledBg: '$deepBlue3',
    checkboxDisabledBorder: '$deepBlue5',
    checkboxIndicatorDisabledBg: tinycolor(primaryColor).setAlpha(0.6).toString(),
  });

  export const getDark: Factory = (primaryColor) => ({
    checkboxIcon: '$deepBlue1',
    checkboxBg: 'transparent',
    checkboxCheckedBg: '$primary',
    checkboxBorder: '$slate9',
    checkboxCheckedIcon: '$deepBlue1',
    checkboxCheckedHoverBg: tinycolor(primaryColor).lighten(10).toString(),
    checkboxHoverBg: '$deepBlue3',
    checkboxHoverBorder: '$primary',
    checkboxFocusBorder: '$primary',
    checkboxDisabledBg: tinycolor(primaryColor).setAlpha(0.6).toString(),
    checkboxDisabledBorder: 'transparent',
    checkboxIndicatorDisabledBg: '$deepBlue1',
  });
}
