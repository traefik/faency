// State colors go in `background-image`, over `background-color`, so a custom base color keeps them; the first color is on top.
export const stateLayers = (...colors: string[]) =>
  colors.map((color) => `linear-gradient(${color}, ${color})`).join(', ');
