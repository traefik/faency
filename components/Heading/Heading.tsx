import { styled } from '../../stitches.config';

const HEADING_BASE_STYLES = {
  fontFamily: '$rubik',
  fontVariantNumeric: 'proportional-nums',
  display: 'block',
  lineHeight: '1.25',
  fontWeight: '$medium',
  color: '$headingDefault',
  variants: {
    transform: {
      uppercase: {
        textTransform: 'uppercase',
      },
      capitalize: {
        // WARNING: this will only work with block elements (display block/inline-block)
        // @see https://developer.mozilla.org/en-US/docs/Web/CSS/::first-letter
        display: 'block',
        '&::first-letter': {
          textTransform: 'uppercase',
        },
      },
      capitalizeWords: {
        textTransform: 'capitalize',
      },
    },
  },
};

export const H1 = styled('h1', {
  ...HEADING_BASE_STYLES,
  fontSize: '$12',
});

export const H2 = styled('h2', {
  ...HEADING_BASE_STYLES,
  fontSize: '$10',
});

export const H3 = styled('h3', {
  ...HEADING_BASE_STYLES,
  fontSize: '$8',
});

export const H4 = styled('h4', {
  ...HEADING_BASE_STYLES,
  fontSize: '$7',
});

export const H5 = styled('h5', {
  ...HEADING_BASE_STYLES,
  fontSize: '$6',
});

export const H6 = styled('h6', {
  ...HEADING_BASE_STYLES,
  fontSize: '$4',
});
