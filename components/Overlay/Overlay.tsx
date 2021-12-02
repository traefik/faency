import { styled, css } from '../../stitches.config';

export const overlayStyles = css({
  backgroundColor: 'hsla(0, 0%, 0%, 0.7)',
  inset: 0,
  variants: {
    variant: {
      fixed: {
        position: 'fixed',
      },
      absolute: {
        position: 'absolute',
      }
    }
  }
});

export const Overlay = styled('div', overlayStyles);
