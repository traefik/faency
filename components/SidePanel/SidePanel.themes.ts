import { Property } from '@stitches/react/types/css';

import { ColorInfo } from '../../utils/getPrimaryColorInfo';

export namespace Theme {
  type Colors = {
    sidePanelBackground: Property.Color;
  };

  type Factory = (primaryColor?: ColorInfo) => Colors;

  export const getLight: Factory = () => ({
    sidePanelBackground: '$deepBlue2',
  });

  export const getDark: Factory = () => ({
    sidePanelBackground: '$deepBlue3',
  });
}
