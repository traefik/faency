import { createTheme } from '@vanilla-extract/css';
import tinycolor from 'tinycolor2';

import { darkColors, lightColors } from '../colors';
import { badgeDarkTheme, badgeLightTheme } from '../components/Badge/Badge.theme.css';
import { buttonDarkTheme, buttonLightTheme } from '../components/Button/Button.theme.css';
import {
  buttonSwitchDarkTheme,
  buttonSwitchLightTheme,
} from '../components/ButtonSwitch/ButtonSwitch.theme.css';
import { cardDarkTheme, cardLightTheme } from '../components/Card/Card.theme.css';
import {
  codeBlockDarkTheme,
  codeBlockLightTheme,
} from '../components/CodeBlock/CodeBlock.theme.css';
import { comboboxDarkTheme, comboboxLightTheme } from '../components/Combobox/Combobox.theme.css';
import { headingDarkTheme, headingLightTheme } from '../components/Heading/Heading.theme.css';
import {
  iconButtonDarkTheme,
  iconButtonLightTheme,
} from '../components/IconButton/IconButton.theme.css';
import { inputDarkTheme, inputLightTheme } from '../components/Input/Input.theme.css';
import { panelDarkTheme, panelLightTheme } from '../components/Panel/Panel.theme.css';
import {
  segmentedControlDarkTheme,
  segmentedControlLightTheme,
} from '../components/SegmentedControl/SegmentedControl.theme.css';
import { skeletonDarkTheme, skeletonLightTheme } from '../components/Skeleton/Skeleton.theme.css';
import {
  getTableDarkColors,
  getTableLightColors,
  tableDarkTheme,
  tableLightTheme,
} from '../components/Table/Table.theme.css';
import { textDarkTheme, textLightTheme } from '../components/Text/Text.theme.css';
import { textareaDarkTheme, textareaLightTheme } from '../components/Textarea/Textarea.theme.css';
import { toastDarkTheme, toastLightTheme } from '../components/Toast/Toast.theme.css';
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
    button: '8px',
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
    '05dp': colors['05dp'],
    '06dp': colors['06dp'],
    '08dp': colors['08dp'],
    '12dp': colors['12dp'],
    '16dp': colors['16dp'],
    '24dp': colors['24dp'],
  };
}

// Helper functions to generate button theme colors based on primary color
function getButtonLightColors(primaryColorName: string) {
  return {
    buttonPrimaryFocusBorder: lightColors[`${primaryColorName}A6`],
    buttonPrimaryFocusBg: tinycolor(lightColors[`${primaryColorName}9`]).lighten(10).toHslString(),
    buttonPrimaryGhostHoverText: lightColors.deepBlue9,
    buttonSecondaryBorder: lightColors.grayBlue9,
    buttonSecondaryFocusBorder: tinycolor(lightColors[`${primaryColorName}9`])
      .setAlpha(0.19)
      .toHslString(),
    buttonRedBg: lightColors.red9,
    buttonRedFocusBg: lightColors.redA8,
  };
}

function getButtonDarkColors(primaryColorName: string) {
  return {
    buttonPrimaryFocusBorder: darkColors[`${primaryColorName}A12`],
    buttonPrimaryFocusBg: tinycolor(darkColors[`${primaryColorName}9`]).lighten(10).toHslString(),
    buttonPrimaryGhostHoverText: tinycolor(darkColors[`${primaryColorName}9`])
      .lighten(10)
      .toHslString(),
    buttonSecondaryBorder: darkColors.grayBlue9,
    buttonSecondaryFocusBorder: darkColors[`${primaryColorName}9`],
    buttonRedBg: darkColors.red10,
    buttonRedFocusBg: darkColors.redA11,
  };
}

// Helper functions to generate ButtonSwitch theme colors based on primary color
function getButtonSwitchLightColors(primaryColorName: string) {
  return {
    buttonSwitchActiveBg: lightColors[`${primaryColorName}9`],
  };
}

function getButtonSwitchDarkColors(primaryColorName: string) {
  return {
    buttonSwitchActiveBg: darkColors[`${primaryColorName}9`],
  };
}

function createToneColors(colors: typeof lightColors | typeof darkColors) {
  return {
    toneSuccessSolid: colors.green9,
    toneSuccessText: colors.green11,
    toneSuccessSurface: colors.green3,
    toneSuccessBorder: colors.green7,
    toneWarningSolid: colors.orange9,
    toneWarningText: colors.orange11,
    toneWarningSurface: colors.orange3,
    toneWarningBorder: colors.orange7,
    toneDangerSolid: colors.red9,
    toneDangerText: colors.red11,
    toneDangerSurface: colors.red3,
    toneDangerBorder: colors.red7,
    toneInfoSolid: colors.blue9,
    toneInfoText: colors.blue11,
    toneInfoSurface: colors.blue3,
    toneInfoBorder: colors.blue7,
    toneNeutralSolid: colors.gray9,
    toneNeutralText: tokens.colors.textSubtle,
    toneNeutralSurface: colors.gray3,
    toneNeutralBorder: colors.gray7,
  };
}

const chartStatusColors = {
  chartStatusGood: '#0ca30c',
  chartStatusWarning: '#fab219',
  chartStatusSerious: '#ec835a',
  chartStatusCritical: '#d03b3b',
};

const chartLightColors = {
  chartSeries1: '#2a78d6',
  chartSeries2: '#eb6834',
  chartSeries3: '#1baf7a',
  ...chartStatusColors,
  chartGrid: '#e1e0d9',
  chartAxis: '#898781',
};

const chartDarkColors = {
  chartSeries1: '#3987e5',
  chartSeries2: '#d95926',
  chartSeries3: '#199e70',
  ...chartStatusColors,
  chartGrid: '#2c2c2a',
  chartAxis: '#898781',
};

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
  ...cardLightTheme,
  ...codeBlockLightTheme,
  ...panelLightTheme,
  ...textLightTheme,
  textInvalid: lightColors.red11,
  textRed: lightColors.red10,
  ...headingLightTheme,
  ...iconButtonLightTheme,
  ...inputLightTheme,
  ...textareaLightTheme,
  ...buttonLightTheme,
  buttonPrimaryText: 'white',
  buttonRedText: 'white',
  buttonRedHoverText: lightColors.red10,
  ...buttonSwitchLightTheme,
  buttonSwitchContainerBg: lightColors['02dp'],
  buttonSwitchOffColor: lightColors.deepBlue11,
  iconButtonHoverBorder: lightColors.slate9,
  iconButtonHoverBackground: lightColors.slateA3,
  iconButtonFocusBorder: lightColors.slate10,
  ...skeletonLightTheme,
  ...segmentedControlLightTheme,
  ...comboboxLightTheme,
  ...toastLightTheme,
  meterTrackBg: lightColors.grayA3,
  ...createToneColors(lightColors),
  ...chartLightColors,
  ...tableLightTheme,
};

export const lightThemeBlue = createTheme(tokens, {
  colors: {
    primary: lightColors.blue9, // Set primary to the actual color value
    ...lightSemanticColors,
    ...getButtonLightColors('blue'),
    ...getButtonSwitchLightColors('blue'),
    ...getTableLightColors(lightColors.blue9),
    ...createBaseColors(lightColors),
  },
  ...baseThemeValues,
});

export const lightThemeNeon = createTheme(tokens, {
  colors: {
    primary: lightColors.neon9, // Set primary to the actual color value
    ...lightSemanticColors,
    ...getButtonLightColors('neon'),
    ...getButtonSwitchLightColors('neon'),
    ...getTableLightColors(lightColors.neon9),
    ...createBaseColors(lightColors),
  },
  ...baseThemeValues,
});

export const lightThemeOrange = createTheme(tokens, {
  colors: {
    primary: lightColors.orange9, // Set primary to the actual color value
    ...lightSemanticColors,
    ...getButtonLightColors('orange'),
    ...getButtonSwitchLightColors('orange'),
    ...getTableLightColors(lightColors.orange9),
    ...createBaseColors(lightColors),
  },
  ...baseThemeValues,
});

export const lightThemeRed = createTheme(tokens, {
  colors: {
    primary: lightColors.red9, // Set primary to the actual color value
    ...lightSemanticColors,
    ...getButtonLightColors('red'),
    ...getButtonSwitchLightColors('red'),
    ...getTableLightColors(lightColors.red9),
    ...createBaseColors(lightColors),
  },
  ...baseThemeValues,
});

export const lightThemeGreen = createTheme(tokens, {
  colors: {
    primary: lightColors.green9, // Set primary to the actual color value
    ...lightSemanticColors,
    ...getButtonLightColors('green'),
    ...getButtonSwitchLightColors('green'),
    ...getTableLightColors(lightColors.green9),
    ...createBaseColors(lightColors),
  },
  ...baseThemeValues,
});

export const lightThemeDeepBlue = createTheme(tokens, {
  colors: {
    primary: lightColors.deepBlue9, // Set primary to the actual color value
    ...lightSemanticColors,
    ...getButtonLightColors('deepBlue'),
    ...getButtonSwitchLightColors('deepBlue'),
    ...getTableLightColors(lightColors.deepBlue9),
    ...createBaseColors(lightColors),
  },
  ...baseThemeValues,
});

export const lightThemeGrayBlue = createTheme(tokens, {
  colors: {
    primary: lightColors.grayBlue9, // Set primary to the actual color value
    ...lightSemanticColors,
    ...getButtonLightColors('grayBlue'),
    ...getButtonSwitchLightColors('grayBlue'),
    ...getTableLightColors(lightColors.grayBlue9),
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
  ...cardDarkTheme,
  ...codeBlockDarkTheme,
  ...panelDarkTheme,
  ...textDarkTheme,
  textInvalid: darkColors.red11,
  textRed: darkColors.red10,
  ...headingDarkTheme,
  ...iconButtonDarkTheme,
  ...inputDarkTheme,
  ...textareaDarkTheme,
  ...buttonDarkTheme,
  buttonPrimaryText: darkColors.deepBlue2,
  buttonRedText: 'white',
  buttonRedHoverText: darkColors.red10,
  ...buttonSwitchDarkTheme,
  buttonSwitchContainerBg: darkColors['02dp'],
  buttonSwitchOffColor: 'white',
  buttonSwitchActiveColor: darkColors.deepBlue2,
  iconButtonBackground: darkColors.deepBlue2,
  iconButtonHoverBorder: darkColors.deepBlue6,
  iconButtonHoverBackground: darkColors.slateA4,
  iconButtonFocusBorder: darkColors.deepBlue7,
  ...skeletonDarkTheme,
  ...segmentedControlDarkTheme,
  ...comboboxDarkTheme,
  ...toastDarkTheme,
  meterTrackBg: darkColors.grayA3,
  ...createToneColors(darkColors),
  ...chartDarkColors,
  ...tableDarkTheme,
};

export const darkThemeBlue = createTheme(tokens, {
  colors: {
    primary: darkColors.blue9, // Set primary to the actual color value
    ...darkSemanticColors,
    ...getButtonDarkColors('blue'),
    ...getButtonSwitchDarkColors('blue'),
    ...getTableDarkColors(darkColors.blue9),
    ...createBaseColors(darkColors),
  },
  ...baseThemeValues,
});

export const darkThemeNeon = createTheme(tokens, {
  colors: {
    primary: darkColors.neon9, // Set primary to the actual color value
    ...darkSemanticColors,
    ...getButtonDarkColors('neon'),
    ...getButtonSwitchDarkColors('neon'),
    ...getTableDarkColors(darkColors.neon9),
    ...createBaseColors(darkColors),
  },
  ...baseThemeValues,
});

export const darkThemeOrange = createTheme(tokens, {
  colors: {
    primary: darkColors.orange9, // Set primary to the actual color value
    ...darkSemanticColors,
    ...getButtonDarkColors('orange'),
    ...getButtonSwitchDarkColors('orange'),
    ...getTableDarkColors(darkColors.orange9),
    ...createBaseColors(darkColors),
  },
  ...baseThemeValues,
});

export const darkThemeRed = createTheme(tokens, {
  colors: {
    primary: darkColors.red9, // Set primary to the actual color value
    ...darkSemanticColors,
    ...getButtonDarkColors('red'),
    ...getButtonSwitchDarkColors('red'),
    ...getTableDarkColors(darkColors.red9),
    ...createBaseColors(darkColors),
  },
  ...baseThemeValues,
});

export const darkThemeGreen = createTheme(tokens, {
  colors: {
    primary: darkColors.green9, // Set primary to the actual color value
    ...darkSemanticColors,
    ...getButtonDarkColors('green'),
    ...getButtonSwitchDarkColors('green'),
    ...getTableDarkColors(darkColors.green9),
    ...createBaseColors(darkColors),
  },
  ...baseThemeValues,
});

export const darkThemeDeepBlue = createTheme(tokens, {
  colors: {
    primary: darkColors.deepBlue9, // Set primary to the actual color value
    ...darkSemanticColors,
    ...getButtonDarkColors('deepBlue'),
    ...getButtonSwitchDarkColors('deepBlue'),
    ...getTableDarkColors(darkColors.deepBlue9),
    ...createBaseColors(darkColors),
  },
  ...baseThemeValues,
});

export const darkThemeGrayBlue = createTheme(tokens, {
  colors: {
    primary: darkColors.grayBlue9, // Set primary to the actual color value
    ...darkSemanticColors,
    ...getButtonDarkColors('grayBlue'),
    ...getButtonSwitchDarkColors('grayBlue'),
    ...getTableDarkColors(darkColors.grayBlue9),
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
