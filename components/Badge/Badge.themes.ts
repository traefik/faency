import { Property } from '@stitches/react/types/css';
import tinycolor from 'tinycolor2';
import { getColorFromToken } from '../../utils/getColorFromToken';

export namespace Theme {
  type Colors = {
    badgeDefaultBackground: Property.Color;
    badgeDefaultText: Property.Color;
    badgeNeonBackground: Property.Color;
    badgeNeonText: Property.Color;
    badgeInteractiveBackground: Property.Color;
  };

  type Factory = (primaryColor: Property.Color) => Colors;

  export const getLight: Factory = (primaryColor: Property.Color) => ({
    badgeDefaultBackground: '$slate7',
    badgeDefaultText: '$slate10',
    badgeNeonBackground: tinycolor(getColorFromToken(primaryColor)).setAlpha(0.2).toHslString(),
    badgeNeonText: '$neon9',
    badgeInteractiveBackground: 'rgba(0,0,0,.05)',
  });

  export const getDark: Factory = (primaryColor) => ({
    badgeDefaultBackground: '$slate5',
    badgeDefaultText: '$slate10',
    badgePrimaryBackground: tinycolor(primaryColor).lighten(20),
    badgePrimaryText: '$primary',
    badgeNeonBackground: '$neon11',
    badgeNeonText: '$neon7',
    badgeInteractiveBackground: 'rgba(255,255,255,.1)',
  });
}
