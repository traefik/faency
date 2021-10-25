import { config } from '..';

type ColorsConfig = { [color: string]: string };
type GetColorFromTokenArgs = [token: string] | [colorsConfig: ColorsConfig, token: string];
type GetColorFromToken = (...args: GetColorFromTokenArgs) => string;

export const getColorFromToken: GetColorFromToken = (...args) => {
  const colorsConfig = args.length === 2 ? args[0] : config.theme.colors;
  const colorName = args.length === 2 ? args[1] : args[0];

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

  return color;
};
