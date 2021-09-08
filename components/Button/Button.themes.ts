import tinycolor from 'tinycolor2';

type ButtonTheme = {
  buttonPrimaryBg: string;
  buttonPrimaryHoverBg: string;
  buttonPrimaryText: string;
  buttonPrimaryGhostHoverText: string;
  buttonSecondaryBg: string;
  buttonSecondaryHoverBg: string;
  buttonSecondaryText: string;
  buttonSecondaryGhostHoverText: string;
  buttonSecondaryGhostText: string;
  buttonRedBg: string;
  buttonRedHoverBg: string;
  buttonRedText: string;
};
type ThemeGetter = (primaryColor: string) => ButtonTheme;

export const getLight: ThemeGetter = (primaryColor) => ({
  buttonPrimaryBg: '$deepBlue11',
  buttonPrimaryHoverBg: '$deepBlue9',
  buttonPrimaryText: '$primary',
  buttonPrimaryGhostHoverText: '$primary',
  buttonPrimaryGhostText: tinycolor(primaryColor).darken(10).toString(),

  buttonSecondaryBg: '$deepBlue3',
  buttonSecondaryHoverBg: '$deepBlue4',
  buttonSecondaryText: '$hiContrast',
  buttonSecondaryGhostHoverText: '$deepBlue7',
  buttonSecondaryGhostText: '$deepBlue6',

  buttonRedBg: '$red9',
  buttonRedHoverBg: '$red10',
  buttonRedText: '$loContrast',
});

export const getDark: ThemeGetter = (primaryColor) => ({
  buttonPrimaryBg: '$primary',
  buttonPrimaryHoverBg: tinycolor(primaryColor).lighten(10).toString(),
  buttonPrimaryText: '$deepBlue2',
  buttonPrimaryGhostHoverText: '$primary',
  buttonPrimaryGhostText: tinycolor(primaryColor).lighten(10).toString(),

  buttonSecondaryBg: '$deepBlue4',
  buttonSecondaryHoverBg: '$deepBlue5',
  buttonSecondaryText: '$hiContrast',
  buttonSecondaryGhostHoverText: '$deepBlue6',
  buttonSecondaryGhostText: '$deepBlue7',

  buttonRedBg: '$red10',
  buttonRedHoverBg: '$red11',
  buttonRedText: '$hiContrast',
});
