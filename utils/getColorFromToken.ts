import { Property } from '@stitches/react/types/css';
import { config } from '..';

type ColorsConfig = { [color: string]: string };
type GetColorFromToken = (token: Property.Color, colorsConfig?: ColorsConfig) => string;

export const getColorFromToken: GetColorFromToken = (token, colorsConfig = config.theme.colors) => {
  if (token.startsWith('$')) {
    return getColorFromToken(token.replace('$', ''), colorsConfig);
  }

  const color = colorsConfig[token];

  if (color && color.startsWith('$')) {
    return getColorFromToken(color, colorsConfig);
  }

  return color;
};
