import { Property } from '@stitches/react/types/css';
import tinycolor from 'tinycolor2';

import { ColorInfo } from '../../utils/getPrimaryColorInfo';

export namespace Theme {
  type Colors = {
    textSubtle: Property.Color;
    textDefault: Property.Color;
    textContrast: Property.Color;
    textInvalid: Property.Color;
    textRed: Property.Color;
  };

  type Factory = (primaryColor: ColorInfo) => Colors;

  export const getLight: Factory = () => ({
    textSubtle: tinycolor('black').setAlpha(0.51).toHslString(),
    textDefault: tinycolor('black').setAlpha(0.74).toHslString(),
    textContrast: 'black',
    textInvalid: '$red9',
    textRed: '$red10',
  });

  export const getDark: Factory = () => ({
    textSubtle: tinycolor('white').setAlpha(0.51).toHslString(),
    textDefault: tinycolor('white').setAlpha(0.74).toHslString(),
    textContrast: 'white',
    textInvalid: '$red9',
    textRed: '$red10',
  });
}
