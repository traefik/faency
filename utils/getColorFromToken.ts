type ColorsConfig = { [color: string]: string };
type GetColorFromToken = (colorsConfig: ColorsConfig, token: string) => string;

export const getColorFromToken: GetColorFromToken = (colorsConfig, token) => {
  if (token.startsWith('$')) {
    return colorsConfig[token.slice(1)];
  }

  return token;
};
