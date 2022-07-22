import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { styled } from '../../stitches.config';

export const ButtonSwitchContainer = styled(ToggleGroupPrimitive.Root, {
  display: 'inline-flex',
  bc: '$buttonSwitchContainerBg',
  borderRadius: '$3',
  p: '3px',
});

export const ButtonSwitchItem = styled(ToggleGroupPrimitive.Item, {
  display: 'inline-flex',
  bc: '$buttonSwitchOffBg',
  c: '$buttonSwitchOffColor',
  p: '$1',
  width: '$10',
  justifyContent: 'center',
  fontWeight: 600,
  border: 'none',
  position: 'relative',

  '&::before': {
    boxSizing: 'border-box',
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: '$3',
  },
  '&::after': {
    boxSizing: 'border-box',
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: '$3',
  },

  '@hover': {
    '&:hover': {
      cursor: 'pointer',
      '&::before': {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
      },
      '&::after': {
        opacity: 0.05,
      },
    },
  },

  '&:first-of-type': {
    mr: '-8px',
  },

  '&:last-of-type': {
    ml: '-8px',
  },

  '&[data-state=on]': {
    bc: '$buttonSwitchActiveBg',
    c: '$buttonSwitchActiveColor',
    borderRadius: '$3',
  },
});
