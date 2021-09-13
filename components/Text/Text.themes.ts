export namespace Theme {
  type Colors = {
    textSubtle: string;
    textContrast: string;
  };

  type Factory = (primaryColor: string) => Colors;

  export const getLight: Factory = (primaryColor) => ({
    textSubtle: '$deepBlue7',
    textContrast: '$hiContrast',
  });

  export const getDark: Factory = (primaryColor) => ({
    textSubtle: '$deepBlue6',
    textContrast: '$hiContrast',
  });
}
