import { Property } from '@stitches/react/types/css';

import { ColorInfo } from '../../utils/getPrimaryColorInfo';

export namespace Theme {
  export type Colors = {
    listItemHoverBg: Property.Color;
    listItemActiveBg: Property.Color;
    listItemFocusBorder: Property.Color;
  };

  type Factory = (primaryColor: ColorInfo) => Colors;

  export const getLight: Factory = (primaryColor) => ({
    listItemHoverBg: '$whiteA9',
    listItemActiveBg: '$whiteA8',
    listItemFocusBorder: primaryColor.helpers.pickScale(8),
  });

  export const getDark: Factory = (primaryColor) => ({
    listItemHoverBg: '$whiteA4',
    listItemActiveBg: '$whiteA3',
    listItemFocusBorder: primaryColor.helpers.pickScale(11),
  });
}
