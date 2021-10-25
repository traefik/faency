import { Property } from '@stitches/react/types/css';
import tinycolor from 'tinycolor2';

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
    buttonRedHoverBg: Property.Color;
    buttonRedFocusBg: Property.Color;
  };

  type Factory = (primaryColor: Property.Color) => Colors;

  export const getLight: Factory = (primaryColor: Property.Color) => ({
    buttonPrimaryBg: '$primary',
    buttonPrimaryText: 'white',
    buttonPrimaryFocusBorder: '$neonA6',
    buttonPrimaryGhostHoverText: '$deepBlue9',
    buttonPrimaryGhostText: '$primary',

    buttonSecondaryBg: 'transparent',
    buttonSecondaryText: 'hsla(0, 0%, 0%, 0.54)',
    buttonSecondaryBorder: '$grayBlue9',
    buttonSecondaryFocusBorder: tinycolor(primaryColor).setAlpha(0.19).toHslString(),
    buttonSecondaryGhostHoverText: '$deepBlue7',
    buttonSecondaryGhostText: '$deepBlue6',

    buttonRedBg: '$red9',
    buttonRedText: '$loContrast',
    buttonRedHoverBg: '$red10',
    buttonRedFocusBg: `$colors$redA8`,
  });

  export const getDark: Factory = (primaryColor) => ({
    buttonPrimaryBg: '$primary',
    buttonPrimaryText: '$deepBlue2',
    buttonPrimaryFocusBorder: '$neonA12',
    buttonPrimaryGhostHoverText: tinycolor(primaryColor).lighten(10).toString(),
    buttonPrimaryGhostText: '$primary',

    buttonSecondaryBg: 'transparent',
    buttonSecondaryText: 'hsla(0, 0%, 100%, 0.74)',
    buttonSecondaryBorder: '$grayBlue9',
    buttonSecondaryFocusBorder: '$primary',
    buttonSecondaryGhostHoverText: '$deepBlue6',
    buttonSecondaryGhostText: '$deepBlue7',

    buttonRedBg: '$red10',
    buttonRedText: '$hiContrast',
    buttonRedHoverBg: '$red11',
    buttonRedFocusBg: `$colors$redA11`,
  });
}
