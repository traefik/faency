import { Property } from '@stitches/react/types/css';
import tinycolor from 'tinycolor2';

import { ColorInfo } from '../../utils/getPrimaryColorInfo';

export namespace Theme {
  export type Colors = {
    inputBg: Property.Color;
    inputBorder: Property.Color;
    inputFocusBg: Property.Color;
    inputFocusBorder: Property.Color;
    inputHoverBg: Property.Color;
    inputText: Property.Color;
    inputPlaceholder: Property.Color;
    inputDisabledText: Property.Color;
    inputInvalidBorder: Property.Color;
  };

  type Factory = (primaryColor: ColorInfo) => Colors;

  export const getLight: Factory = (primaryColor) => ({
    inputBg: '$deepBlue1',
    inputBorder: '$grayBlue9',
    inputFocusBg: tinycolor('black').setAlpha(0.15).toHslString(),
    inputFocusBorder: primaryColor.helpers.pickScale(8),
    inputHoverBg: '$whiteA9',
    inputText: tinycolor('black').setAlpha(0.74).toHslString(),
    inputPlaceholder: '$blackA10',
    inputDisabledText: tinycolor('black').setAlpha(0.35).toHslString(),
    inputInvalidBorder: '$red9',
  });

  export const getDark: Factory = (primaryColor) => ({
    inputBg: '$grayBlue7',
    inputBorder: '$grayBlue9',
    inputFocusBg: tinycolor('black').setAlpha(0.15).toHslString(),
    inputFocusBorder: primaryColor.helpers.pickScale(11),
    inputHoverBg: '$whiteA4',
    inputText: tinycolor('white').setAlpha(0.8).toHslString(),
    inputPlaceholder: '$whiteA10',
    inputDisabledText: tinycolor('white').setAlpha(0.35).toHslString(),
    inputInvalidBorder: '$red9',
  });
}
