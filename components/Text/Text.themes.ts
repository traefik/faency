export namespace Theme {
  type Colors = {};

  type Factory = (primaryColor: string) => Colors;

  export const getLight: Factory = (primaryColor) => ({
    textLoContrast: '$deepBlue7',
    textContrast: '$hiContrast',
  });

  export const getDark: Factory = (primaryColor) => ({
    textLoContrast: '$deepBlue6',
    textContrast: '$hiContrast',
  });
}
