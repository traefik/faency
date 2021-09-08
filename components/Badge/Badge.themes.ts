import tinycolor from 'tinycolor2';

export namespace Theme {
  type Colors = {
    badgeDefaultBackground: string
    badgeDefaultText: string
    badgeNeonBackground: string
    badgeNeonText: string
    badgeInteractiveBackground: string
  };

  type Factory = (primaryColor: string) => Colors;

  export const getLight: Factory = (primaryColor) => ({
    badgeDefaultBackground: '$slate7',
    badgeDefaultText: '$slate10',
    badgeNeonBackground: '$neon7',
    badgeNeonText: '$neon9',
    badgeInteractiveBackground: "rgba(0,0,0,.05)",
  })

  export const getDark: Factory = (primaryColor) => ({
    badgeDefaultBackground: '$slate5',
    badgeDefaultText: '$slate10',
    badgePrimaryBackground: tinycolor(primaryColor).lighten(20),
    badgePrimaryText: '$primary',
    badgeNeonBackground: '$neon11',
    badgeNeonText: '$neon7',
    badgeInteractiveBackground: "rgba(255,255,255,.1)",
  })
}
