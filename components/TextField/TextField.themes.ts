import tinycolor from 'tinycolor2';

export namespace Theme {
  type Colors = {
    textFieldBg: string;
  };

  type Factory = (primaryColor: string) => Colors;

  export const getLight: Factory = (primaryColor) => ({
    textFieldBg: 'grey',
    textFieldBorder: '$deepBlue3',
  });

  export const getDark: Factory = (primaryColor) => ({
    textFieldBg: '$deepBlue2',
    textFieldBorder: '$deepBlue3',
  });
}
