export namespace Theme {
  type Colors = {
    switchBackground: string;
    switchHoverThumb: string;
    switchThumb: string;
    switchFocusThumb: string;
    switchHoverActiveThumb: string;
    switchActiveBackground: string;
    switchDisabledThumb: string
  };

  type Factory = (primaryColor: string) => Colors;

  export const getLight: Factory = (primaryColor) => ({
    switchBackground: 'hsla(0, 0%, 0%, 0.2)',
    switchHoverThumb: 'hsla(68, 53%, 36%, 0.51)',
    switchThumb: 'hsla(0, 0%, 100%, 0.87)',
    switchFocusThumb: 'hsla(68, 53%, 36%)',
    switchHoverActiveThumb: 'hsla(0, 0%, 0%, 0.2)',
    switchActiveBackground: 'hsl(68, 53%, 36%)',
    switchDisabledThumb: 'hsla(0, 0%, 100%, 0.26)'
  });

  export const getDark: Factory = (primaryColor) => ({
    switchBackground: 'hsla(0, 0%, 100%, 0.2)',
    switchHoverThumb: 'hsla(68, 79%, 60%, 0.51)',
    switchThumb: 'hsla(0, 0%, 0%, 0.87)',
    switchFocusThumb: 'hsla(68, 79%, 60%)',
    switchHoverActiveThumb: 'hsla(0, 0%, 100%, 0.2)',
    switchActiveBackground: 'hsl(68, 79%, 60%)',
    switchDisabledThumb: 'hsla(0, 0%, 100%, 0.26)'
  });
}
