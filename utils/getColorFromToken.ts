import tinycolor from 'tinycolor2';
import { config } from '..';

type ColorsConfig = { [color: string]: string };
type GetColorFromTokenOneParam = (token: string) => string;
type GetColorFromTokenTwoParam = (colorsConfig: ColorsConfig, token: string) => string;
type GetColorFromToken = GetColorFromTokenTwoParam & GetColorFromTokenOneParam;

export const getColorFromToken: GetColorFromToken = (...args) => {
  const colorsConfig = args.length === 2 ? args[0] : config.theme.colors;
  const colorName = args.length === 2 ? args[1] : args[0];
  console.log('getColorFromToken()', { colorName, colorsConfig });

  if (!colorsConfig || typeof colorName !== 'string') {
    throw new Error('missing required params');
  }

  if (colorName.startsWith('$')) {
    return getColorFromToken(colorsConfig, colorName.replace('$', ''));
  }

  const color = colorsConfig[colorName];

  if (color && color.startsWith('$')) {
    return getColorFromToken(colorsConfig, color);
  }

  console.log('color', colorName, color);

  return color;
};
