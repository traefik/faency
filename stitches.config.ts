import type * as Stitches from '@stitches/react';
import {createStitches, CSS as StitchesCSS} from '@stitches/react';
import {
  blackA,
  blue,
  blueA,
  blueDark,
  blueDarkA,
  gray,
  grayA,
  grayDark,
  grayDarkA,
  green,
  greenA,
  greenDark,
  greenDarkA,
  orangeA,
  orangeDarkA,
  redA,
  redDarkA,
  slate,
  slateA,
  slateDark,
  slateDarkA,
  whiteA,
} from '@radix-ui/colors';
import {getColorFromToken} from './utils/getColorFromToken';
import {Theme as ButtonTheme} from './components/Button/Button.themes';
import {Theme as CardTheme} from './components/Card/Card.themes';

export type {VariantProps} from '@stitches/react';

const red = {
  red1: 'hsl(359 100% 99.0%)',
  red2: 'hsl(359 100% 98.0%)',
  red3: 'hsl(360 100% 95.4%)',
  red4: 'hsl(359 100% 92.2%)',
  red5: 'hsl(358 100% 88.1%)',
  red6: 'hsl(357 100% 82.4%)',
  red7: 'hsl(354 100% 73.8%)',
  red8: 'hsl(347 100% 60.0%)',
  red9: 'hsl(351, 100%, 42.0%)',
  red10: 'hsl(351, 100%, 40.0%)',
  red11: 'hsl(351, 100%, 36.0%)',
  red12: 'hsl(354 50.0% 16.0%)',
};

const redDark = {
  red1: 'hsl(347 23.0% 9.8%)',
  red2: 'hsl(357 34.4% 12.0%)',
  red3: 'hsl(356 43.4% 16.4%)',
  red4: 'hsl(356 47.6% 19.2%)',
  red5: 'hsl(356 51.1% 21.9%)',
  red6: 'hsl(356 55.2% 25.9%)',
  red7: 'hsl(357 60.2% 31.8%)',
  red8: 'hsl(358 65.0% 40.4%)',
  red9: 'hsl(358 75.0% 59.0%)',
  red10: 'hsl(347, 100%, 60.0%)',
  red11: 'hsl(347 100% 72.0%)',
  red12: 'hsl(351 89.0% 96.0%)',
};

const orange = {
  orange1: 'hsl(31 70.0% 99.0%)',
  orange2: 'hsl(30 100% 96.1%)',
  orange3: 'hsl(32 100% 93.6%)',
  orange4: 'hsl(33 100% 90.6%)',
  orange5: 'hsl(33 100% 86.6%)',
  orange6: 'hsl(34 100% 81.2%)',
  orange7: 'hsl(34 100% 73.4%)',
  orange8: 'hsl(35 100% 62.0%)',
  orange9: 'hsl(31 100% 41.0%)',
  orange10: 'hsl(31, 85.0%, 39.0%)',
  orange11: 'hsl(31, 70.0%, 30.0%)',
  orange12: 'hsl(15 60.0% 17.0%)',
};

const orangeDark = {
  orange1: 'hsl(35 100% 7.2%)',
  orange2: 'hsl(35 100% 8.0%)',
  orange3: 'hsl(34 87.5% 11.4%)',
  orange4: 'hsl(33 84.1% 14.0%)',
  orange5: 'hsl(33 83.6% 16.6%)',
  orange6: 'hsl(33 85.7% 19.8%)',
  orange7: 'hsl(34 91.5% 23.9%)',
  orange8: 'hsl(35 100% 29.0%)',
  orange9: 'hsl(24 94.0% 50.0%)',
  orange10: 'hsl(35, 100%, 50.0%)',
  orange11: 'hsl(35 100% 62.2%)',
  orange12: 'hsl(24 97.0% 93.2%)',
};

const neon = {
  neon1: 'hsl(67, 76.0%, 99.0%)',
  neon2: 'hsl(68 75.6% 92.0%)',
  neon3: 'hsl(68 76.7% 89.9%)',
  neon4: 'hsl(68 77.4% 87.2%)',
  neon5: 'hsl(68 78.0% 83.7%)',
  neon6: 'hsl(68 78.4% 78.8%)',
  neon7: 'hsl(68 78.7% 71.4%)',
  neon8: 'hsl(68, 79.0%, 60.0%)',
  neon9: 'hsl(68, 79.0%, 34.5%)',
  neon10: 'hsl(68 70.8% 31.6%)',
  neon11: 'hsl(67, 54.0%, 24.0%)',
  neon12: 'hsl(68, 53.0%, 12.0%)',
};

const neonDark = {
  neon1: 'hsl(67, 76%, 99%)',
  neon2: 'hsl(68 75.6% 92%)',
  neon3: 'hsl(68 76.7% 89.9%)',
  neon4: 'hsl(68 77.4% 87.2%)',
  neon5: 'hsl(68 78% 83.7%)',
  neon6: 'hsl(68 78.4% 78.8%)',
  neon7: 'hsl(68 78.7% 71.4%)',
  neon8: 'hsl(68, 79%, 60%)',
  neon9: 'hsl(68, 79%, 34.5%)',
  neon10: 'hsl(68 70.8% 31.6%)',
  neon11: 'hsl(67, 54%, 24%)',
  neon12: 'hsl(68, 53%, 12%)',
};

export const deepBlue = {
  deepBlue1: 'hsl(180, 9%, 98%)',
  deepBlue2: 'hsl(180, 7%, 92%)',
  deepBlue3: 'hsl(183 8% 85%)',
  deepBlue4: 'hsl(187 8% 76%)',
  deepBlue5: 'hsl(192 9% 65%)',
  deepBlue6: 'hsl(197 10% 51%)',
  deepBlue7: 'hsl(208, 11%, 45%)',
  deepBlue8: 'hsl(208, 16%, 36%)',
  deepBlue9: 'hsl(208, 24%, 27%)',
  deepBlue10: 'hsl(208, 40%, 18%)',
  deepBlue11: 'hsl(209, 88%, 9%)',
  deepBlue12: 'hsl(208, 89%, 7%)',
};

export const deepBlueDark = {
  deepBlue12: 'hsl(180, 9%, 98%)',
  deepBlue11: 'hsl(180 7% 92%)',
  deepBlue10: 'hsl(183 8% 85%)',
  deepBlue9: 'hsl(187 8% 76%)',
  deepBlue8: 'hsl(192 9% 65%)',
  deepBlue7: 'hsl(197 10% 51%)',
  deepBlue6: 'hsl(208, 11%, 45%)',
  deepBlue5: 'hsl(208, 16%, 36%)',
  deepBlue4: 'hsl(208, 24%, 27%)',
  deepBlue3: 'hsl(208, 40%, 18%)',
  deepBlue2: 'hsl(209, 88%, 9%)',
  deepBlue1: 'hsl(208, 89%, 7%)',
};

const defaultPrimary = '$blue8';

const colors = {
  ...gray,
  ...red,
  ...blue,
  ...green,
  ...orange,
  ...slate,
  ...neon,
  ...deepBlue,

  ...grayA,
  ...redA,
  ...blueA,
  ...greenA,
  ...orangeA,
  ...slateA,
  ...whiteA,
  ...blackA,

  // Semantic colors
  primary: defaultPrimary,
  contentBg: '$deepBlue1', // to delete
  hiContrast: '$deepBlue11',
  loContrast: 'white',
  focusOutline: 'hsl(216, 100%, 64%)',
};

const primaryColor = getColorFromToken(colors, defaultPrimary);

const stitches = createStitches({
  theme: {
    colors: {
      ...colors,
      ...ButtonTheme.getLight(primaryColor),
      ...CardTheme.getLight(primaryColor),
    },
    fonts: {
      rubik:
        'Rubik, -apple-system, system-ui, "Segoe UI", "Helvetica Neue", helvetica, arial, sans-serif',
    },
    space: {
      1: '4px',
      2: '8px',
      3: '16px',
      4: '20px',
      5: '24px',
      6: '32px',
      7: '48px',
      8: '64px',
      9: '80px',
    },
    sizes: {
      1: '4px',
      2: '8px',
      3: '16px',
      4: '20px',
      5: '24px',
      6: '32px',
      7: '48px',
      8: '64px',
      9: '80px',
    },
    fontSizes: {
      1: '12px',
      2: '13px',
      3: '14px',
      4: '16px',
      5: '18px',
      6: '20px',
      7: '22px',
      8: '24px',
      9: '26px',
      10: '28px',
    },
    radii: {
      1: '4px',
      2: '6px',
      3: '8px',
      4: '12px',
      round: '50%',
      pill: '9999px',
    },
    zIndices: {
      1: '100',
      2: '200',
      3: '300',
      4: '400',
      max: '999',
    },
  },
  media: {
    bp1: '(min-width: 520px)',
    bp2: '(min-width: 900px)',
    bp3: '(min-width: 1200px)',
    bp4: '(min-width: 1800px)',
    motion: '(prefers-reduced-motion)',
    hover: '(any-hover: hover)',
    dark: '(prefers-color-scheme: dark)',
    light: '(prefers-color-scheme: light)',
  },
  utils: {
    p: (value: Stitches.PropertyValue<'padding'>) => ({
      padding: value,
    }),
    pt: (value: Stitches.PropertyValue<'paddingTop'>) => ({
      paddingTop: value,
    }),
    pr: (value: Stitches.PropertyValue<'paddingRight'>) => ({
      paddingRight: value,
    }),
    pb: (value: Stitches.PropertyValue<'paddingBottom'>) => ({
      paddingBottom: value,
    }),
    pl: (value: Stitches.PropertyValue<'paddingLeft'>) => ({
      paddingLeft: value,
    }),
    px: (value: Stitches.PropertyValue<'paddingLeft'>) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value: Stitches.PropertyValue<'paddingTop'>) => ({
      paddingTop: value,
      paddingBottom: value,
    }),

    m: (value: Stitches.PropertyValue<'margin'>) => ({
      margin: value,
    }),
    mt: (value: Stitches.PropertyValue<'marginTop'>) => ({
      marginTop: value,
    }),
    mr: (value: Stitches.PropertyValue<'marginRight'>) => ({
      marginRight: value,
    }),
    mb: (value: Stitches.PropertyValue<'marginBottom'>) => ({
      marginBottom: value,
    }),
    ml: (value: Stitches.PropertyValue<'marginLeft'>) => ({
      marginLeft: value,
    }),
    mx: (value: Stitches.PropertyValue<'marginLeft'>) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value: Stitches.PropertyValue<'marginTop'>) => ({
      marginTop: value,
      marginBottom: value,
    }),

    ta: (value: Stitches.PropertyValue<'textAlign'>) => ({textAlign: value}),

    fd: (value: Stitches.PropertyValue<'flexDirection'>) => ({flexDirection: value}),
    fw: (value: Stitches.PropertyValue<'flexWrap'>) => ({flexWrap: value}),

    ai: (value: Stitches.PropertyValue<'alignItems'>) => ({alignItems: value}),
    ac: (value: Stitches.PropertyValue<'alignContent'>) => ({alignContent: value}),
    jc: (value: Stitches.PropertyValue<'justifyContent'>) => ({justifyContent: value}),
    as: (value: Stitches.PropertyValue<'alignSelf'>) => ({alignSelf: value}),
    fg: (value: Stitches.PropertyValue<'flexGrow'>) => ({flexGrow: value}),
    fs: (value: Stitches.PropertyValue<'flexShrink'>) => ({flexShrink: value}),
    fb: (value: Stitches.PropertyValue<'flexBasis'>) => ({flexBasis: value}),

    bc: (value: Stitches.PropertyValue<'backgroundColor'>) => ({
      backgroundColor: value,
    }),

    br: (value: Stitches.PropertyValue<'borderRadius'>) => ({
      borderRadius: value,
    }),
    btrr: (value: Stitches.PropertyValue<'borderTopRightRadius'>) => ({
      borderTopRightRadius: value,
    }),
    bbrr: (value: Stitches.PropertyValue<'borderBottomRightRadius'>) => ({
      borderBottomRightRadius: value,
    }),
    bblr: (value: Stitches.PropertyValue<'borderBottomLeftRadius'>) => ({
      borderBottomLeftRadius: value,
    }),
    btlr: (value: Stitches.PropertyValue<'borderTopLeftRadius'>) => ({
      borderTopLeftRadius: value,
    }),

    bs: (value: Stitches.PropertyValue<'boxShadow'>) => ({boxShadow: value}),

    lh: (value: Stitches.PropertyValue<'lineHeight'>) => ({lineHeight: value}),

    ox: (value: Stitches.PropertyValue<'overflowX'>) => ({overflowX: value}),
    oy: (value: Stitches.PropertyValue<'overflowY'>) => ({overflowY: value}),

    pe: (value: Stitches.PropertyValue<'pointerEvents'>) => ({pointerEvents: value}),
    us: (value: Stitches.PropertyValue<'userSelect'>) => ({
      WebkitUserSelect: value,
      userSelect: value,
    }),

    userSelect: (value: Stitches.PropertyValue<'userSelect'>) => ({
      WebkitUserSelect: value,
      userSelect: value,
    }),

    size: (value: Stitches.PropertyValue<'width'>) => ({
      width: value,
      height: value,
    }),

    appearance: (value: Stitches.PropertyValue<'appearance'>) => ({
      WebkitAppearance: value,
      appearance: value,
    }),
    backgroundClip: (value: Stitches.PropertyValue<'backgroundClip'>) => ({
      WebkitBackgroundClip: value,
      backgroundClip: value,
    }),
  },
});

export type CSS = StitchesCSS<typeof stitches.config>;

export const {styled, css, createTheme, getCssText, globalCss, keyframes, config} = stitches;

export const utils = config.utils;

export const customColors = (primary: string) => {
  const primaryColor = getColorFromToken(config.theme.colors, primary);
  const darkTheme = createTheme('dark', {
    colors: {
      ...grayDark,
      ...redDark,
      ...blueDark,
      ...greenDark,
      ...orangeDark,
      ...slateDark,
      ...neonDark,
      ...deepBlueDark,

      ...grayDarkA,
      ...redDarkA,
      ...blueDarkA,
      ...greenDarkA,
      ...orangeDarkA,
      ...slateDarkA,

      // Semantic colors
      primary,
      contentBg: '$deepBlue3', // to delete
      hiContrast: 'white',
      loContrast: '$deepBlue2',

      ...ButtonTheme.getDark(primaryColor),
      ...CardTheme.getDark(primaryColor),
    },
  });

  const lightTheme = createTheme('light', {
    colors: {
      primary,
      ...ButtonTheme.getLight(primaryColor),
      ...CardTheme.getLight(primaryColor),
    },
  });

  return {
    dark: darkTheme,
    light: lightTheme,
  };
};
