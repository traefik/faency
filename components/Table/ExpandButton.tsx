import { styled } from '../../stitches.config';

export const ExpandButton = styled('button', {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$1',
  cursor: 'pointer',
  '&:focus-visible': {
    outlineWidth: '2px',
    outlineStyle: 'solid',
    outlineColor: '$focusOutline',
    outlineOffset: '2px',
  },
});
