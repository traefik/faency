// Plain TypeScript theme tokens for Button component
// Using plain TS file to avoid circular dependencies with runtime color references
// Tokens that depend on theme colors are defined in themes.css.ts with overrides

export const buttonLightTheme = {
  buttonPrimaryText: 'white',
  buttonSecondaryBg: 'transparent',
  buttonSecondaryText: 'hsla(0, 0%, 0%, 0.54)',
};

export const buttonDarkTheme = {
  buttonSecondaryBg: 'transparent',
  buttonSecondaryText: 'hsla(0, 0%, 100%, 0.74)',
};
