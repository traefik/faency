import type * as Stitches from '@stitches/react';
import { createStitches, CSS as StitchesCSS } from '@stitches/react';

import { Theme as AccordionTheme } from './components/Accordion/Accordion.themes';
import { Theme as BadgeTheme } from './components/Badge/Badge.themes';
import { Theme as ButtonTheme } from './components/Button/Button.themes';
import { Theme as IconButtonTheme } from './components/IconButton/IconButton.themes';
import { Theme as SwitchTheme } from './components/Switch/Switch.themes';
import { Theme as CardTheme } from './components/Card/Card.themes';
import { Theme as CheckboxTheme } from './components/Checkbox/Checkbox.themes';
import { Theme as LinkTheme } from './components/Link/Link.themes';
import { Theme as RadioTheme } from './components/Radio/Radio.themes';
import { Theme as TextTheme } from './components/Text/Text.themes';
import { Theme as InputTheme } from './components/Input/Input.themes';
import { Theme as TableTheme } from './components/Table/Table.themes';
import { Theme as SelectTheme } from './components/Select/Select.themes';
import { Theme as SkeletonTheme } from './components/Skeleton/Skeleton.themes';
import { Theme as DialogTheme } from './components/Dialog/Dialog.themes';
import { Theme as NavigationTheme } from './components/Navigation/Navigation.themes';
import { Theme as TooltipTheme } from './components/Tooltip/Tooltip.themes';

import { lightColors, darkColors } from './colors';
import getPrimaryColorInfo from './utils/getPrimaryColorInfo';
import { Property } from '@stitches/react/types/css';

export type { VariantProps } from '@stitches/react';

// Only colors having color variations and corresponding alpha
export type PrimaryColor = 'neon' | 'blue' | 'orange' | 'red' | 'green' | 'deepBlue' | 'grayBlue';

const defaultPrimary: PrimaryColor = 'blue';

const defaultPrimaryColor = getPrimaryColorInfo(defaultPrimary, lightColors);

export const colors: Record<string, Property.Color> = {
  ...lightColors,

  // Semantic colors
  primary: defaultPrimary,
  contentBg: '$00dp',
  hiContrast: '$deepBlue11',
  loContrast: 'white',
  focusOutline: 'hsl(216, 100%, 64%)',
};

const stitches = createStitches({
  theme: {
    colors: {
      ...colors,
      ...AccordionTheme.getLight(defaultPrimaryColor),
      ...BadgeTheme.getLight(defaultPrimaryColor),
      ...ButtonTheme.getLight(defaultPrimaryColor),
      ...SwitchTheme.getLight(defaultPrimaryColor),
      ...CardTheme.getLight(defaultPrimaryColor),
      ...CheckboxTheme.getLight(defaultPrimaryColor),
      ...LinkTheme.getLight(defaultPrimaryColor),
      ...RadioTheme.getLight(defaultPrimaryColor),
      ...InputTheme.getLight(defaultPrimaryColor),
      ...TableTheme.getLight(defaultPrimaryColor),
      ...TextTheme.getLight(defaultPrimaryColor),
      ...SelectTheme.getLight(defaultPrimaryColor),
      ...SkeletonTheme.getLight(defaultPrimaryColor),
      ...DialogTheme.getLight(defaultPrimaryColor),
      ...IconButtonTheme.getLight(defaultPrimaryColor),
      ...TooltipTheme.getLight(defaultPrimaryColor),
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
      7: '40px',
      8: '48px',
      9: '64px',
      10: '80px',
    },
    fontSizes: {
      0: '11px',
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
      11: '32px',
      12: '38px',
    },
    fontWeights: {
      light: 300,
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
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

    ta: (value: Stitches.PropertyValue<'textAlign'>) => ({ textAlign: value }),

    fd: (value: Stitches.PropertyValue<'flexDirection'>) => ({ flexDirection: value }),
    fw: (value: Stitches.PropertyValue<'flexWrap'>) => ({ flexWrap: value }),

    ai: (value: Stitches.PropertyValue<'alignItems'>) => ({ alignItems: value }),
    ac: (value: Stitches.PropertyValue<'alignContent'>) => ({ alignContent: value }),
    jc: (value: Stitches.PropertyValue<'justifyContent'>) => ({ justifyContent: value }),
    as: (value: Stitches.PropertyValue<'alignSelf'>) => ({ alignSelf: value }),
    fg: (value: Stitches.PropertyValue<'flexGrow'>) => ({ flexGrow: value }),
    fs: (value: Stitches.PropertyValue<'flexShrink'>) => ({ flexShrink: value }),
    fb: (value: Stitches.PropertyValue<'flexBasis'>) => ({ flexBasis: value }),

    bc: (value: Stitches.PropertyValue<'backgroundColor'>) => ({ backgroundColor: value }),

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

    bs: (value: Stitches.PropertyValue<'boxShadow'>) => ({ boxShadow: value }),

    c: (value: Stitches.PropertyValue<'color'>) => ({ color: value }),

    lh: (value: Stitches.PropertyValue<'lineHeight'>) => ({ lineHeight: value }),

    ox: (value: Stitches.PropertyValue<'overflowX'>) => ({ overflowX: value }),
    oy: (value: Stitches.PropertyValue<'overflowY'>) => ({ overflowY: value }),

    pe: (value: Stitches.PropertyValue<'pointerEvents'>) => ({ pointerEvents: value }),
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

export type CSS<T = typeof stitches.config> = StitchesCSS<T>;

export const { styled, css, createTheme, getCssText, globalCss, keyframes, config } = stitches;

export const utils = config.utils;

export const customColors = (primary: PrimaryColor) => {
  const darkPrimaryColor = getPrimaryColorInfo(primary, darkColors);

  const darkTheme = createTheme('dark', {
    colors: {
      ...darkColors,

      // Semantic colors
      primary: darkPrimaryColor.token,
      contentBg: '$00dp',
      hiContrast: 'white',
      loContrast: '$deepBlue2',
      ...AccordionTheme.getDark(darkPrimaryColor),
      ...BadgeTheme.getDark(darkPrimaryColor),
      ...ButtonTheme.getDark(darkPrimaryColor),
      ...IconButtonTheme.getDark(darkPrimaryColor),
      ...SwitchTheme.getDark(darkPrimaryColor),
      ...CardTheme.getDark(darkPrimaryColor),
      ...CheckboxTheme.getDark(darkPrimaryColor),
      ...LinkTheme.getDark(darkPrimaryColor),
      ...RadioTheme.getDark(darkPrimaryColor),
      ...InputTheme.getDark(darkPrimaryColor),
      ...TableTheme.getDark(darkPrimaryColor),
      ...TextTheme.getDark(darkPrimaryColor),
      ...SelectTheme.getDark(darkPrimaryColor),
      ...SkeletonTheme.getDark(darkPrimaryColor),
      ...DialogTheme.getDark(darkPrimaryColor),
      ...NavigationTheme.getDark(darkPrimaryColor),
      ...TooltipTheme.getDark(darkPrimaryColor),
    },
  });

  const lightPrimaryColor = getPrimaryColorInfo(primary, lightColors);

  const lightTheme = createTheme('light', {
    colors: {
      primary: lightPrimaryColor.token,
      ...AccordionTheme.getLight(lightPrimaryColor),
      ...BadgeTheme.getLight(lightPrimaryColor),
      ...ButtonTheme.getLight(lightPrimaryColor),
      ...IconButtonTheme.getLight(lightPrimaryColor),
      ...SwitchTheme.getLight(lightPrimaryColor),
      ...CardTheme.getLight(lightPrimaryColor),
      ...CheckboxTheme.getLight(lightPrimaryColor),
      ...LinkTheme.getLight(lightPrimaryColor),
      ...RadioTheme.getLight(lightPrimaryColor),
      ...InputTheme.getLight(lightPrimaryColor),
      ...TableTheme.getLight(lightPrimaryColor),
      ...TextTheme.getLight(lightPrimaryColor),
      ...SelectTheme.getLight(lightPrimaryColor),
      ...SkeletonTheme.getLight(lightPrimaryColor),
      ...DialogTheme.getLight(lightPrimaryColor),
      ...NavigationTheme.getLight(lightPrimaryColor),
      ...TooltipTheme.getLight(lightPrimaryColor),
    },
  });

  return {
    dark: darkTheme,
    light: lightTheme,
  };
};
