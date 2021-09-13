import tinycolor from 'tinycolor2';

export namespace Theme {
  type Colors = {};

  type Factory = (primaryColor: string) => Colors;

  export const getLight: Factory = (primaryColor) => ({
    checkboxIcon: '$deepBlue11',
    checkboxBg: 'transparent',
    checkboxCheckedBg: '$primary',
    checkboxBorder: '$primary',
    checkboxCheckedHoverBg: 'transparent',
    checkboxHoverBg: 'transparent',
    checkboxHoverBorder: '$primary',
    checkboxFocusBorder: '$primary',
    checkboxDisabledBg: '$deepBlue3',
    checkboxDisabledBorder: '$deepBlue5',
    checkboxIndicatorDisabledBg: tinycolor(primaryColor).setAlpha(0.6),
  });

  export const getDark: Factory = (primaryColor) => ({
    checkboxIcon: '$deepBlue1',
    checkboxBg: 'transparent',
    checkboxCheckedBg: '$primary',
    checkboxBorder: '$primary',
    checkboxCheckedHoverBg: tinycolor(primaryColor).lighten(10).toString(),
    checkboxHoverBg: '$deepBlue3',
    checkboxHoverBorder: '$primary',
    checkboxFocusBorder: '$primary',
    checkboxDisabledBg: tinycolor(primaryColor).setAlpha(0.6),
    checkboxDisabledBorder: 'transparent', //tinycolor(primaryColor).setAlpha(0.6),
    checkboxIndicatorDisabledBg: '$deepBlue1',
  });
}
