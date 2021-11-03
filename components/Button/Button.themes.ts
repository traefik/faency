import { Property } from '@stitches/react/types/css';
import tinycolor from 'tinycolor2';
import { ColorInfo } from '../../stitches.config';

export namespace Theme {
  type Colors = {
    buttonPrimaryBg: Property.Color;
    buttonPrimaryText: Property.Color;
    buttonPrimaryFocusBorder: Property.Color;
    buttonPrimaryGhostHoverText: Property.Color;
    buttonPrimaryGhostText: Property.Color;

    buttonSecondaryBg: Property.Color;
    buttonSecondaryText: Property.Color;
    buttonSecondaryBorder: Property.Color;
    buttonSecondaryFocusBorder: Property.Color;
    buttonSecondaryGhostHoverText: Property.Color;
    buttonSecondaryGhostText: Property.Color;

    buttonRedBg: Property.Color;
    buttonRedText: Property.Color;
    buttonRedHoverText: Property.Color;
    buttonRedFocusBg: Property.Color;
  };

  type Factory = (primaryColor: ColorInfo) => Colors;

  export const getLight: Factory = (primaryColor) => ({
    buttonPrimaryBg: '$primary',
    buttonPrimaryText: 'white',
    buttonPrimaryFocusBorder: `$${primaryColor.name}A6`,
    buttonPrimaryGhostHoverText: '$deepBlue9',
    buttonPrimaryGhostText: '$primary',

    buttonSecondaryBg: 'transparent',
    buttonSecondaryText: 'hsla(0, 0%, 0%, 0.54)',
    buttonSecondaryBorder: '$grayBlue9',
    buttonSecondaryFocusBorder: tinycolor(primaryColor.value).setAlpha(0.19).toHslString(),
    buttonSecondaryGhostHoverText: '$deepBlue7',
    buttonSecondaryGhostText: '$deepBlue6',

    buttonRedBg: '$red9',
    buttonRedText: '$loContrast',
    buttonRedHoverText: '$red10',
    buttonRedFocusBg: '$redA8',
  });

  export const getDark: Factory = (primaryColor) => ({
    buttonPrimaryBg: '$primary',
    buttonPrimaryText: '$deepBlue2',
    buttonPrimaryFocusBorder: `$${primaryColor.name}A12`,
    buttonPrimaryGhostHoverText: tinycolor(primaryColor.value).lighten(10).toString(),
    buttonPrimaryGhostText: '$primary',

    buttonSecondaryBg: 'transparent',
    buttonSecondaryText: tinycolor('white').setAlpha(0.74).toHslString(),
    buttonSecondaryBorder: '$grayBlue9',
    buttonSecondaryFocusBorder: '$primary',
    buttonSecondaryGhostHoverText: '$deepBlue6',
    buttonSecondaryGhostText: '$deepBlue7',

    buttonRedBg: '$red10',
    buttonRedText: '$hiContrast',
    buttonRedHoverText: '$red10',
    buttonRedFocusBg: '$redA11',
  });
}
