import tinycolor from 'tinycolor2';

export namespace Theme {
  type Colors = {
    dialogBackground: string;
  };

  type Factory = (primaryColor: string) => Colors;

  export const getLight: Factory = (primaryColor) => ({
    dialogBackground: '$deepBlue2',
  });

  export const getDark: Factory = (primaryColor) => ({
    dialogBackground: '$deepBlue3',
  });
}
