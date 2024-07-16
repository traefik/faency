import { Property } from '@stitches/react/types/css';

import { ColorInfo } from '../../utils/getPrimaryColorInfo';

export namespace Theme {
  type Colors = {
    tooltipContentBg: Property.Color;
    tooltipText: Property.Color;
  };

  type Factory = (primaryColor: ColorInfo) => Colors;

  export const getLight: Factory = () => ({
    tooltipContentBg: '$primary',
    tooltipText: 'white',
  });

  export const getDark: Factory = () => ({
    tooltipContentBg: '$primary',
    tooltipText: '$deepBlue2',
  });
}
