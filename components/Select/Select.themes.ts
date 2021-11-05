import { Property } from '@stitches/react/types/css';
import { ColorInfo } from '../../utils/getPrimaryColorInfo';
import tinycolor from 'tinycolor2';

export namespace Theme {
  type Colors = {
    selectBg: Property.Color;
    selectBorder: Property.Color;
    selectFocusBg: Property.Color;
    selectFocusBorder: Property.Color;
    selectHoverBg: Property.Color;
    selectText: Property.Color;
    selectPlaceholder: Property.Color;
    selectDisabledText: Property.Color;
    selectInvalidBorder: Property.Color;
  };

  type Factory = (primaryColor: ColorInfo) => Colors;

  export const getLight: Factory = (primaryColor) => ({
    selectBg: '$deepBlue1',
    selectBorder: '$grayBlue9',
    selectFocusBg: tinycolor('black').setAlpha(0.15).toHslString(),
    selectFocusBorder: primaryColor.helpers.pickScale(8),
    selectHoverBg: '$whiteA9',
    selectText: tinycolor('black').setAlpha(0.74).toHslString(),
    selectPlaceholder: '$blackA10',
    selectDisabledText: tinycolor('black').setAlpha(0.35).toHslString(),
    selectInvalidBorder: '$red9',
  });

  export const getDark: Factory = (primaryColor) => ({
    selectBg: '$grayBlue7',
    selectBorder: '$grayBlue9',
    selectFocusBg: tinycolor('black').setAlpha(0.15).toHslString(),
    selectFocusBorder: primaryColor.helpers.pickScale(11),
    selectHoverBg: '$whiteA4',
    selectText: tinycolor('white').setAlpha(0.8).toHslString(),
    selectPlaceholder: '$whiteA10',
    selectDisabledText: tinycolor('white').setAlpha(0.35).toHslString(),
    selectInvalidBorder: '$red9',
  });
}
