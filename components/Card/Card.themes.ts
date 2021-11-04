import tinycolor from 'tinycolor2';
import { Property } from '@stitches/react/types/css';
import { ColorInfo } from '../../stitches.config';

export namespace Theme {
  type Colors = {
    cardBackground: Property.Color;
    cardBorder: Property.Color;
    cardShadow: Property.Color;
    cardHoverBackground: Property.Color;
    cardHoverBorder: Property.Color;
    cardActiveBackground: Property.Color;
    cardActiveBorder: Property.Color;
    cardGhostBackground: Property.Color;
  };

  type Factory = (primaryColor: ColorInfo) => Colors;

  export const getLight: Factory = (primaryColor) => ({
    cardBackground: 'white',
    cardBorder: '$deepBlue3',
    cardShadow: 'rgba(0,0,0,.1)',
    cardHoverBackground: 'rgba(0,0,0,.05)',
    cardHoverBorder: tinycolor(primaryColor.value).setAlpha(0.6).toHslString(),
    cardActiveBackground: 'rgba(0,0,0,.03)',
    cardActiveBorder: '$primary',
    cardGhostBackground: '$deepBlue2',
  });

  export const getDark: Factory = (primaryColor) => ({
    cardBackground: '$deepBlue2',
    cardBorder: '$deepBlue3',
    cardShadow: 'transparent',
    cardHoverBackground: 'rgba(255,255,255,.12)',
    cardHoverBorder: tinycolor(primaryColor.value).setAlpha(0.6).toHslString(),
    cardActiveBackground: 'rgba(255,255,255,.07)',
    cardActiveBorder: tinycolor(primaryColor.value).setAlpha(0.4).toHslString(),
    cardGhostBackground: '$deepBlue1',
  });
}
