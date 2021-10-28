import { Property } from '@stitches/react/types/css';
import { tokenToPropertyName } from './tokenToPropertyName';

type ColorsConfig = { [color: string]: string };
type GetColorFromToken = (token: Property.Color, colorsConfig: ColorsConfig) => string;

export const getColorFromToken: GetColorFromToken = (token, colorsConfig) => {
  if (token.startsWith('$')) {
    const propertyName = tokenToPropertyName(token);
    return getColorFromToken(propertyName, colorsConfig);
  }

  const color = colorsConfig?.[token];

  if (color && color.startsWith('$')) {
    return getColorFromToken(color, colorsConfig);
  }

  return color;
};
