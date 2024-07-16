import { Property } from '@stitches/react/types/css';
import tinycolor from 'tinycolor2';

import { ColorInfo } from '../../utils/getPrimaryColorInfo';

export namespace Theme {
  export type Colors = {
    textareaBg: Property.Color;
    textareaBorder: Property.Color;
    textareaFocusBg: Property.Color;
    textareaFocusBorder: Property.Color;
    textareaHoverBg: Property.Color;
    textareaText: Property.Color;
    textareaPlaceholder: Property.Color;
    textareaDisabledText: Property.Color;
    textareaInvalidBorder: Property.Color;
  };

  type Factory = (primaryColor: ColorInfo) => Colors;

  export const getLight: Factory = (primaryColor) => ({
    textareaBg: '$deepBlue1',
    textareaBorder: '$grayBlue9',
    textareaFocusBg: tinycolor('black').setAlpha(0.15).toHslString(),
    textareaFocusBorder: primaryColor.helpers.pickScale(8),
    textareaHoverBg: '$whiteA9',
    textareaText: tinycolor('black').setAlpha(0.74).toHslString(),
    textareaPlaceholder: '$blackA10',
    textareaDisabledText: tinycolor('black').setAlpha(0.35).toHslString(),
    textareaInvalidBorder: '$red9',
  });

  export const getDark: Factory = (primaryColor) => ({
    textareaBg: '$grayBlue7',
    textareaBorder: '$grayBlue9',
    textareaFocusBg: tinycolor('black').setAlpha(0.15).toHslString(),
    textareaFocusBorder: primaryColor.helpers.pickScale(11),
    textareaHoverBg: '$whiteA4',
    textareaText: tinycolor('white').setAlpha(0.8).toHslString(),
    textareaPlaceholder: '$whiteA10',
    textareaDisabledText: tinycolor('white').setAlpha(0.35).toHslString(),
    textareaInvalidBorder: '$red9',
  });
}
