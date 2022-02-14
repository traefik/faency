import { Property } from '@stitches/react/types/css';
import { ColorInfo } from '../../utils/getPrimaryColorInfo';

export namespace Theme {
  export type Colors = {
    toolbarItemFocusVisibleBg: Property.Color;
    toolbarItemFocusBorder: Property.Color
  };

  type Factory = (primaryColor: ColorInfo) => Colors;

  export const getLight: Factory = (primaryColor) => ({
    toolbarItemFocusVisibleBg: '$whiteA9',
    toolbarItemFocusBorder: primaryColor.helpers.pickScale(8),
  });

  export const getDark: Factory = (primaryColor) => ({
    toolbarItemFocusVisibleBg: '$whiteA4',
    toolbarItemFocusBorder: primaryColor.helpers.pickScale(11),
  });
}
