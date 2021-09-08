export const getColorFromToken = (colorsConfig, token: string) => {
  if (token.startsWith('$')) {
    return colorsConfig[token.slice(1)];
  }

  return token;
};
