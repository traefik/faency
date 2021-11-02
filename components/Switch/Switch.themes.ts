import tinycolor from 'tinycolor2';
import { Property } from '@stitches/react/types/css';
export namespace Theme {
  type Colors = {
    switchBackground: Property.Color;
    switchThumb: Property.Color;
  };

  type Factory = (primaryColor: Property.Color) => Colors;

  export const getLight: Factory = () => ({
    switchBackground: tinycolor('black').setAlpha(0.2).toHslString(),
    switchActiveBackground: '$primary',
    switchThumb: tinycolor('white').setAlpha(0.87).toHslString(),
  });

  export const getDark: Factory = () => ({
    switchBackground: tinycolor('white').setAlpha(0.2).toHslString(),
    switchActiveBackground: '$primary',
    switchThumb: tinycolor('black').setAlpha(0.87).toHslString(),
  });
}
