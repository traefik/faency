import { createThemeContract } from '@vanilla-extract/css';

// Helper to create a 12-step color scale
const colorScale = () => ({
  '1': null,
  '2': null,
  '3': null,
  '4': null,
  '5': null,
  '6': null,
  '7': null,
  '8': null,
  '9': null,
  '10': null,
  '11': null,
  '12': null,
});

// Helper to create a color scale with alpha variants
const colorScaleWithAlpha = () => ({
  ...colorScale(),
  A1: null,
  A2: null,
  A3: null,
  A4: null,
  A5: null,
  A6: null,
  A7: null,
  A8: null,
  A9: null,
  A10: null,
  A11: null,
  A12: null,
});

export const tokens = createThemeContract({
  colors: {
    // Semantic colors
    primary: null,
    contentBg: null,
    hiContrast: null,
    loContrast: null,
    focusOutline: null,
    divider: null,
    background: null,
    foreground: null,
    muted: null,
    mutedForeground: null,
    card: null,
    cardForeground: null,
    popover: null,
    popoverForeground: null,
    border: null,
    input: null,
    accent: null,
    accentForeground: null,
    destructive: null,
    destructiveForeground: null,
    ring: null,

    // Custom color scales (Primary color options)
    neon: colorScaleWithAlpha(),
    blue: colorScaleWithAlpha(),
    orange: colorScaleWithAlpha(),
    red: colorScaleWithAlpha(),
    green: colorScaleWithAlpha(),
    deepBlue: colorScaleWithAlpha(),
    grayBlue: colorScaleWithAlpha(),

    // Radix UI color scales
    gray: colorScaleWithAlpha(),
    slate: colorScaleWithAlpha(),
    purple: colorScaleWithAlpha(),

    // Special alpha colors
    whiteA: colorScale(),
    blackA: colorScale(),

    // Elevation colors
    '00dp': null,
    '01dp': null,
    '02dp': null,
    '03dp': null,
    '04dp': null,
    '05dp': null,
    '06dp': null,
    '08dp': null,
    '12dp': null,
    '16dp': null,
    '24dp': null,

    // Component-specific tokens - Badge
    badgeInteractiveBackgroundHover: null,
    badgeInteractiveBackgroundActive: null,

    // Component-specific tokens - Card
    cardBackground: null,
    cardHoverBackground: null,
    cardHoverBorder: null,
    cardActiveBackground: null,
    cardActiveBorder: null,
    innerCardBgColor: null,

    // Component-specific tokens - Text
    textSubtle: null,
    textDefault: null,
    textContrast: null,
    textInvalid: null,
    textRed: null,

    // Component-specific tokens - Heading
    headingDefault: null,

    // Component-specific tokens - Panel
    panelShadowLight: null,
    // Component-specific tokens - Input
    inputBg: null,
    inputBorder: null,
    inputFocusBg: null,
    inputFocusBorder: null,
    inputHoverBg: null,
    inputText: null,
    inputPlaceholder: null,
    inputDisabledText: null,
    inputInvalidBorder: null,

    // Component-specific tokens - Textarea
    textareaBg: null,
    textareaBorder: null,
    textareaFocusBg: null,
    textareaFocusBorder: null,
    textareaHoverBg: null,
    textareaText: null,
    textareaPlaceholder: null,
    textareaDisabledText: null,
    textareaInvalidBorder: null,

    // Component-specific tokens - Button
    buttonPrimaryText: null,
    buttonPrimaryFocusBorder: null,
    buttonPrimaryFocusBg: null,
    buttonPrimaryGhostHoverText: null,
    buttonSecondaryBg: null,
    buttonSecondaryText: null,
    buttonSecondaryBorder: null,
    buttonSecondaryFocusBorder: null,
    buttonRedBg: null,
    buttonRedText: null,
    buttonRedHoverText: null,
    buttonRedFocusBg: null,

    // Component-specific tokens - IconButton
    iconButtonBackground: null,
    iconButtonHoverBorder: null,
    iconButtonHoverBackground: null,
    iconButtonFocusBorder: null,

    // Component-specific tokens - ButtonSwitch
    buttonSwitchContainerBg: null,
    buttonSwitchActiveBg: null,
    buttonSwitchOffBg: null,
    buttonSwitchOffColor: null,
    buttonSwitchActiveColor: null,
  },
  fonts: {
    rubik: null,
  },
  space: {
    '1': null,
    '2': null,
    '3': null,
    '4': null,
    '5': null,
    '6': null,
    '7': null,
    '8': null,
    '9': null,
  },
  sizes: {
    '1': null,
    '2': null,
    '3': null,
    '4': null,
    '5': null,
    '6': null,
    '7': null,
    '8': null,
    '9': null,
    '10': null,
  },
  fontSizes: {
    '0': null,
    '1': null,
    '2': null,
    '3': null,
    '4': null,
    '5': null,
    '6': null,
    '7': null,
    '8': null,
    '9': null,
    '10': null,
    '11': null,
    '12': null,
  },
  fontWeights: {
    light: null,
    regular: null,
    medium: null,
    semiBold: null,
    bold: null,
  },
  radii: {
    '1': null,
    '2': null,
    '3': null,
    '4': null,
    round: null,
    pill: null,
  },
  zIndices: {
    '1': null,
    '2': null,
    '3': null,
    '4': null,
    max: null,
  },
});
