// Plain TypeScript color tokens (no vanilla-extract)
// Can be safely imported by colors/index.ts for Stitches
export const cardLightTheme = {
  cardBackground: 'white',
  cardHoverBackground: 'rgba(0,0,0,.05)',
  cardHoverBorder: 'hsla(211, 100%, 50%, 0.6)', // Will be overridden with primary color
  cardActiveBackground: 'rgba(0,0,0,.03)',
  cardActiveBorder: 'hsl(211, 100%, 50%)', // Will be overridden with primary color
  innerCardBgColor: 'hsla(0, 0%, 0%, 0.04)',
};

export const cardDarkTheme = {
  cardBackground: 'hsl(209, 29%, 14%)', // deepBlue2
  cardHoverBackground: 'rgba(255,255,255,.12)',
  cardHoverBorder: 'hsla(211, 100%, 50%, 0.6)', // Will be overridden with primary color
  cardActiveBackground: 'rgba(255,255,255,.07)',
  cardActiveBorder: 'hsla(211, 100%, 50%, 0.4)', // Will be overridden with primary color
  innerCardBgColor: 'hsla(0, 0%, 100%, 0.07)',
};
