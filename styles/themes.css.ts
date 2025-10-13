import { createTheme } from '@vanilla-extract/css';

import { darkColors, lightColors } from '../colors';
import { badgeDarkTheme, badgeLightTheme } from '../components/Badge/Badge.theme.css';
import { tokens } from './tokens.css';

// Type for primary colors
export type PrimaryColor = 'neon' | 'blue' | 'orange' | 'red' | 'green' | 'deepBlue' | 'grayBlue';

// Base theme values shared across all variants
const baseThemeValues = {
  fonts: {
    rubik:
      'Rubik, -apple-system, system-ui, "Segoe UI", "Helvetica Neue", helvetica, arial, sans-serif',
  },
  space: {
    '1': '4px',
    '2': '8px',
    '3': '16px',
    '4': '20px',
    '5': '24px',
    '6': '32px',
    '7': '48px',
    '8': '64px',
    '9': '80px',
  },
  sizes: {
    '1': '4px',
    '2': '8px',
    '3': '16px',
    '4': '20px',
    '5': '24px',
    '6': '32px',
    '7': '40px',
    '8': '48px',
    '9': '64px',
    '10': '80px',
  },
  fontSizes: {
    '0': '11px',
    '1': '12px',
    '2': '13px',
    '3': '14px',
    '4': '16px',
    '5': '18px',
    '6': '20px',
    '7': '22px',
    '8': '24px',
    '9': '26px',
    '10': '28px',
    '11': '32px',
    '12': '38px',
  },
  fontWeights: {
    light: '300',
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
  },
  radii: {
    '1': '4px',
    '2': '6px',
    '3': '8px',
    '4': '12px',
    round: '50%',
    pill: '9999px',
  },
  zIndices: {
    '1': '100',
    '2': '200',
    '3': '300',
    '4': '400',
    max: '999',
  },
};

// Helper to extract color scale from color map
function extractColorScale(colorName: string, colors: typeof lightColors | typeof darkColors) {
  return {
    '1': colors[`${colorName}1`],
    '2': colors[`${colorName}2`],
    '3': colors[`${colorName}3`],
    '4': colors[`${colorName}4`],
    '5': colors[`${colorName}5`],
    '6': colors[`${colorName}6`],
    '7': colors[`${colorName}7`],
    '8': colors[`${colorName}8`],
    '9': colors[`${colorName}9`],
    '10': colors[`${colorName}10`],
    '11': colors[`${colorName}11`],
    '12': colors[`${colorName}12`],
    A1: colors[`${colorName}A1`],
    A2: colors[`${colorName}A2`],
    A3: colors[`${colorName}A3`],
    A4: colors[`${colorName}A4`],
    A5: colors[`${colorName}A5`],
    A6: colors[`${colorName}A6`],
    A7: colors[`${colorName}A7`],
    A8: colors[`${colorName}A8`],
    A9: colors[`${colorName}A9`],
    A10: colors[`${colorName}A10`],
    A11: colors[`${colorName}A11`],
    A12: colors[`${colorName}A12`],
  };
}

// Helper to extract just the scale without alpha
function extractSimpleColorScale(
  colorName: string,
  colors: typeof lightColors | typeof darkColors,
) {
  return {
    '1': colors[`${colorName}1`],
    '2': colors[`${colorName}2`],
    '3': colors[`${colorName}3`],
    '4': colors[`${colorName}4`],
    '5': colors[`${colorName}5`],
    '6': colors[`${colorName}6`],
    '7': colors[`${colorName}7`],
    '8': colors[`${colorName}8`],
    '9': colors[`${colorName}9`],
    '10': colors[`${colorName}10`],
    '11': colors[`${colorName}11`],
    '12': colors[`${colorName}12`],
  };
}

// Helper to create base colors object
function createBaseColors(colors: typeof lightColors | typeof darkColors) {
  return {
    neon: extractColorScale('neon', colors),
    blue: extractColorScale('blue', colors),
    orange: extractColorScale('orange', colors),
    red: extractColorScale('red', colors),
    green: extractColorScale('green', colors),
    deepBlue: extractColorScale('deepBlue', colors),
    grayBlue: extractColorScale('grayBlue', colors),
    gray: extractColorScale('gray', colors),
    slate: extractColorScale('slate', colors),
    purple: extractColorScale('purple', colors),
    whiteA: extractSimpleColorScale('whiteA', colors),
    blackA: extractSimpleColorScale('blackA', colors),

    // Elevation
    '00dp': colors['00dp'],
    '01dp': colors['01dp'],
    '02dp': colors['02dp'],
    '03dp': colors['03dp'],
    '04dp': colors['04dp'],
    '06dp': colors['06dp'],
    '08dp': colors['08dp'],
    '12dp': colors['12dp'],
    '16dp': colors['16dp'],
    '24dp': colors['24dp'],
  };
}

// ============================================================================
// LIGHT THEMES
// ============================================================================

const lightSemanticColors = {
  contentBg: lightColors['00dp'],
  hiContrast: lightColors.deepBlue11,
  loContrast: 'white',
  focusOutline: 'hsl(216, 100%, 64%)',
  divider: 'hsl(207, 10%, 82%)',
  background: '#fcfcfc',
  foreground: '#1a1a1a',
  muted: '#f4f4f4',
  mutedForeground: '#646464',
  card: '#ffffff',
  cardForeground: '#1a1a1a',
  popover: '#ffffff',
  popoverForeground: '#1a1a1a',
  border: '#e3e3e3',
  input: '#e3e3e3',
  accent: '#60a5fa',
  accentForeground: '#ffffff',
  destructive: '#dc2626',
  destructiveForeground: '#ffffff',
  ring: '#3b82f6',
  ...badgeLightTheme,
};

export const lightThemeBlue = createTheme(tokens, {
  colors: {
    primary: lightColors.blue9, // Set primary to the actual color value
    ...lightSemanticColors,
    ...createBaseColors(lightColors),
  },
  ...baseThemeValues,
});

export const lightThemeNeon = createTheme(tokens, {
  colors: {
    primary: lightColors.neon9, // Set primary to the actual color value
    ...lightSemanticColors,
    ...createBaseColors(lightColors),
  },
  ...baseThemeValues,
});

export const lightThemeOrange = createTheme(tokens, {
  colors: {
    primary: lightColors.orange9, // Set primary to the actual color value
    ...lightSemanticColors,
    ...createBaseColors(lightColors),
  },
  ...baseThemeValues,
});

export const lightThemeRed = createTheme(tokens, {
  colors: {
    primary: lightColors.red9, // Set primary to the actual color value
    ...lightSemanticColors,
    ...createBaseColors(lightColors),
  },
  ...baseThemeValues,
});

export const lightThemeGreen = createTheme(tokens, {
  colors: {
    primary: lightColors.green9, // Set primary to the actual color value
    ...lightSemanticColors,
    ...createBaseColors(lightColors),
  },
  ...baseThemeValues,
});

export const lightThemeDeepBlue = createTheme(tokens, {
  colors: {
    primary: lightColors.deepBlue9, // Set primary to the actual color value
    ...lightSemanticColors,
    ...createBaseColors(lightColors),
  },
  ...baseThemeValues,
});

export const lightThemeGrayBlue = createTheme(tokens, {
  colors: {
    primary: lightColors.grayBlue9, // Set primary to the actual color value
    ...lightSemanticColors,
    ...createBaseColors(lightColors),
  },
  ...baseThemeValues,
});

// ============================================================================
// DARK THEMES
// ============================================================================

const darkSemanticColors = {
  contentBg: darkColors['00dp'],
  hiContrast: 'white',
  loContrast: darkColors.deepBlue2,
  focusOutline: 'hsl(216, 100%, 64%)',
  divider: 'hsl(209, 29%, 19%)',
  background: '#0a0a0a',
  foreground: '#ffffff',
  muted: '#1a1a1a',
  mutedForeground: '#b4b4b4',
  card: '#1a1a1a',
  cardForeground: '#ffffff',
  popover: '#1a1a1a',
  popoverForeground: '#ffffff',
  border: '#3a3a3a',
  input: '#3a3a3a',
  accent: '#3b82f6',
  accentForeground: '#ffffff',
  destructive: '#dc2626',
  destructiveForeground: '#ffffff',
  ring: '#60a5fa',
  ...badgeDarkTheme,
};

export const darkThemeBlue = createTheme(tokens, {
  colors: {
    primary: darkColors.blue9, // Set primary to the actual color value
    ...darkSemanticColors,
    ...createBaseColors(darkColors),
  },
  ...baseThemeValues,
});

export const darkThemeNeon = createTheme(tokens, {
  colors: {
    primary: darkColors.neon9, // Set primary to the actual color value
    ...darkSemanticColors,
    ...createBaseColors(darkColors),
  },
  ...baseThemeValues,
});

export const darkThemeOrange = createTheme(tokens, {
  colors: {
    primary: darkColors.orange9, // Set primary to the actual color value
    ...darkSemanticColors,
    ...createBaseColors(darkColors),
  },
  ...baseThemeValues,
});

export const darkThemeRed = createTheme(tokens, {
  colors: {
    primary: darkColors.red9, // Set primary to the actual color value
    ...darkSemanticColors,
    ...createBaseColors(darkColors),
  },
  ...baseThemeValues,
});

export const darkThemeGreen = createTheme(tokens, {
  colors: {
    primary: darkColors.green9, // Set primary to the actual color value
    ...darkSemanticColors,
    ...createBaseColors(darkColors),
  },
  ...baseThemeValues,
});

export const darkThemeDeepBlue = createTheme(tokens, {
  colors: {
    primary: darkColors.deepBlue9, // Set primary to the actual color value
    ...darkSemanticColors,
    ...createBaseColors(darkColors),
  },
  ...baseThemeValues,
});

export const darkThemeGrayBlue = createTheme(tokens, {
  colors: {
    primary: darkColors.grayBlue9, // Set primary to the actual color value
    ...darkSemanticColors,
    ...createBaseColors(darkColors),
  },
  ...baseThemeValues,
});

// ============================================================================
// THEME MAP FOR EASY LOOKUP
// ============================================================================

export const themes = {
  light: {
    neon: lightThemeNeon,
    blue: lightThemeBlue,
    orange: lightThemeOrange,
    red: lightThemeRed,
    green: lightThemeGreen,
    deepBlue: lightThemeDeepBlue,
    grayBlue: lightThemeGrayBlue,
  },
  dark: {
    neon: darkThemeNeon,
    blue: darkThemeBlue,
    orange: darkThemeOrange,
    red: darkThemeRed,
    green: darkThemeGreen,
    deepBlue: darkThemeDeepBlue,
    grayBlue: darkThemeGrayBlue,
  },
};

// Default exports for backward compatibility
export const lightTheme = lightThemeBlue;
export const darkTheme = darkThemeBlue;
