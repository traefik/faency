import tinycolor from 'tinycolor2';
export namespace Theme {
  type Colors = {
    radioBorder: string;
    radioHoverBg: string;
    radioHoverBorder: string;
    radioFocusBorder: string;
    radioDisabledBg: string;
    radioDisabledBorder: string;
    radioIndicatorDisabledBg: string;
  };

  type Factory = (primaryColor: string) => Colors;

  export const getLight: Factory = (primaryColor) => ({
    radioIndicator: tinycolor(primaryColor).darken(20),
    radioBorder: '$deepBlue6',
    radioHoverBg: 'transparent',
    radioHoverBorder: tinycolor(primaryColor).darken(20),
    radioFocusBorder: tinycolor(primaryColor).darken(20),
    radioDisabledBg: '$deepBlue3',
    radioDisabledBorder: '$deepBlue5',
    radioIndicatorDisabledBg: tinycolor(primaryColor).setAlpha(0.6),
  });

  export const getDark: Factory = (primaryColor) => ({
    radioIndicator: '$primary',
    radioBorder: '$deepBlue6',
    radioHoverBg: '$deepBlue3',
    radioHoverBorder: '$primary',
    radioFocusBorder: '$primary',
    radioDisabledBg: '$deepBlue3',
    radioDisabledBorder: '$deepBlue4',
    radioIndicatorDisabledBg: tinycolor(primaryColor).setAlpha(0.6),
  });
}
