import { Property } from '@stitches/react/types/css';
import tinycolor from 'tinycolor2';

export namespace Theme {
  type Colors = {
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

  type Factory = (primaryColor?: Property.Color) => Colors;

  export const getLight: Factory = () => ({
    inputBg: 'hsl(240, 14%, 99%)',
    inputBorder: '$grayBlue9',
    inputFocusBg: tinycolor('black').setAlpha(0.15).toHslString(),
    inputFocusBorder: '$neon8',
    inputHoverBg: '$whiteA9',
    inputText: tinycolor('black').setAlpha(0.74).toHslString(),
    inputPlaceholder: '$blackA10',
    inputDisabledText: tinycolor('black').setAlpha(0.35).toHslString(),
    inputInvalidBorder: '$red9',
  });

  export const getDark: Factory = () => ({
    inputBg: '#131f2a',
    inputBorder: '$grayBlue9',
    inputFocusBg: tinycolor('black').setAlpha(0.15).toHslString(),
    inputFocusBorder: '$neon11',
    inputHoverBg: '$whiteA4',
    inputText: tinycolor('white').setAlpha(0.8).toHslString(),
    inputPlaceholder: '$whiteA10',
    inputDisabledText: tinycolor('white').setAlpha(0.35).toHslString(),
    inputInvalidBorder: '$red9',
  });
}
