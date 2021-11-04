import { Property } from '@stitches/react/types/css';
import tinycolor from 'tinycolor2';
import colors from '../../colors';
import { ColorInfo } from '../../utils/getPrimaryColorInfo';

export namespace Theme {
  type Colors = {
    badgeDefaultBackground: Property.Color;
    badgeDefaultText: Property.Color;
    badgeNeonBackground: Property.Color;
    badgeNeonText: Property.Color;
    badgeInteractiveBackground: Property.Color;
  };

  type Factory = (primaryColor: ColorInfo) => Colors;

  export const getLight: Factory = () => ({
    badgeDefaultBackground: '$slate7',
    badgeDefaultText: '$slate10',
    badgeNeonBackground: tinycolor(colors.neon.neon9).setAlpha(0.2).toHslString(),
    badgeNeonText: '$neon9',
    badgeInteractiveBackground: 'rgba(0,0,0,.05)',
  });

  export const getDark: Factory = () => ({
    badgeDefaultBackground: '$slate5',
    badgeDefaultText: '$slate10',
    badgePrimaryText: '$primary',
    badgeNeonBackground: '$neon11',
    badgeNeonText: '$neon7',
    badgeInteractiveBackground: tinycolor('black').setAlpha(0.1).toHslString(),
  });
}
