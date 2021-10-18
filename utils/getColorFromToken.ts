type ColorsConfig = { [color: string]: string };
type GetColorFromToken = (colorsConfig: ColorsConfig, token: string) => string;

export const getColorFromToken: GetColorFromToken = (colorsConfig, token) => {
  if (token.startsWith('$')) {
    return getColorFromToken(colorsConfig, token.slice(1));
  }

  const color = colorsConfig[token];

  if (color && color.startsWith('$')) {
    return getColorFromToken(colorsConfig, color);
  }

  return color;
};
