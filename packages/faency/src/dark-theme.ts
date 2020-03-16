import { theme as lightTheme } from './theme'

export const theme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    borderColor: lightTheme.colors.white,
    primaryHoverBg: lightTheme.colors.primary,
    primaryHoverText: lightTheme.colors.white,
    bg: 'hsl(222, 36%, 7%);',
    menuBg: 'hsl(222, 36%, 11%);',
    dark: lightTheme.colors.white,
    white: lightTheme.colors.black,
    whites: [...lightTheme.colors.blacks].reverse(),
    grays: [...lightTheme.colors.grays].reverse(),
    black: lightTheme.colors.grays[1],
    blacks: [...lightTheme.colors.whites].reverse(),
    blues: [...lightTheme.colors.blues].reverse(),
    lightBlues: [...lightTheme.colors.lightBlues].reverse(),
    greens: [...lightTheme.colors.greens].reverse(),
    reds: [...lightTheme.colors.reds].reverse(),
    purples: [...lightTheme.colors.purples].reverse(),
    oranges: [...lightTheme.colors.oranges].reverse(),
  },
} as const
