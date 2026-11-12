// Plain TypeScript, no vanilla-extract, mirroring Table.themes.ts (Stitches).
import tinycolor from 'tinycolor2';

export const tableLightTheme = {
  tableText: 'hsla(0, 0%, 0%, 0.74)',
  tableSubtleText: 'hsla(0, 0%, 0%, 0.51)',
  tableHeaderLayerBackground: 'hsla(0, 0%, 0%, 0.03)',
  tableFooterLayerBackground: 'hsla(0, 0%, 0%, 0.03)',
  tableHeaderText: 'hsla(0, 0%, 0%, 0.51)',
  tableFooterText: 'hsla(0, 0%, 0%, 0.51)',
  tableHoverBackground: 'hsla(0, 0%, 0%, 0.04)',
  tableHoverText: 'hsla(0, 0%, 0%, 0.74)',
  tableRowBorder: 'hsl(0, 0%, 87%)',
};

export const tableDarkTheme = {
  tableText: 'hsla(0, 0%, 100%, 0.74)',
  tableSubtleText: 'hsla(0, 0%, 100%, 0.51)',
  tableHeaderLayerBackground: 'hsla(0, 0%, 100%, 0.02)',
  tableFooterLayerBackground: 'hsla(0, 0%, 100%, 0.02)',
  tableHeaderText: 'hsla(0, 0%, 100%, 0.51)',
  tableFooterText: 'hsla(0, 0%, 100%, 0.51)',
  tableHoverText: 'hsla(0, 0%, 100%, 0.74)',
  tableRowBorder: 'hsl(209, 21%, 23%)',
};

export const getTableLightColors = (primary: string) => ({
  tableActiveText: primary,
  tableActiveHoverText: tinycolor(primary).lighten(10).toHslString(),
});

export const getTableDarkColors = (primary: string) => ({
  tableActiveText: primary,
  tableActiveHoverText: tinycolor(primary).lighten(10).toHslString(),
  tableHoverBackground: tinycolor(primary).setAlpha(0.04).toHslString(),
});
