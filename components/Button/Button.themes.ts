import { Property } from '@stitches/react/types/css';
import tinycolor from 'tinycolor2';
import { ColorInfo } from '../../utils/getPrimaryColorInfo';

export namespace Theme {
  type Colors = {
    buttonPrimaryBg: Property.Color;
    buttonPrimaryText: Property.Color;
    buttonPrimaryFocusBorder: Property.Color;
    buttonPrimaryGhostHoverText: Property.Color;

    buttonSecondaryBg: Property.Color;
    buttonSecondaryText: Property.Color;
    buttonSecondaryBorder: Property.Color;
    buttonSecondaryFocusBorder: Property.Color;

    buttonRedBg: Property.Color;
    buttonRedText: Property.Color;
    buttonRedHoverText: Property.Color;
    buttonRedFocusBg: Property.Color;
  };

  type Factory = (primaryColor: ColorInfo) => Colors;

  export const getLight: Factory = (primaryColor) => ({
    buttonPrimaryBg: '$primary',
    buttonPrimaryText: 'white',
    buttonPrimaryFocusBorder: primaryColor.helpers.pickScale(6, { alpha: true }),
    buttonPrimaryGhostHoverText: '$deepBlue9',

    buttonSecondaryBg: 'transparent',
    buttonSecondaryText: 'hsla(0, 0%, 0%, 0.54)',
    buttonSecondaryBorder: '$grayBlue9',
    buttonSecondaryFocusBorder: tinycolor(primaryColor.value).setAlpha(0.19).toHslString(),

    buttonRedBg: '$red9',
    buttonRedText: '$loContrast',
    buttonRedHoverText: '$red10',
    buttonRedFocusBg: '$redA8',
  });

  export const getDark: Factory = (primaryColor) => ({
    buttonPrimaryBg: '$primary',
    buttonPrimaryText: '$deepBlue2',
    buttonPrimaryFocusBorder: primaryColor.helpers.pickScale(12, { alpha: true }),
    buttonPrimaryGhostHoverText: tinycolor(primaryColor.value).lighten(10).toHslString(),

    buttonSecondaryBg: 'transparent',
    buttonSecondaryText: tinycolor('white').setAlpha(0.74).toHslString(),
    buttonSecondaryBorder: '$grayBlue9',
    buttonSecondaryFocusBorder: '$primary',

    buttonRedBg: '$red10',
    buttonRedText: '$hiContrast',
    buttonRedHoverText: '$red10',
    buttonRedFocusBg: '$redA11',
  });
}
