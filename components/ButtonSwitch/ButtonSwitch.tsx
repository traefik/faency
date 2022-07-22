import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { CSS, styled, VariantProps } from '../../stitches.config';

export const ButtonSwitchContainer = styled(ToggleGroupPrimitive.Root, {
  display: 'inline-flex',
  bc: '$buttonSwitchContainerBg',
  borderRadius: '$3',
  p: '3px',
});

export const ButtonSwitchItem = styled(ToggleGroupPrimitive.Item, {
  display: 'inline-flex',
  cursor: 'pointer',
  bc: '$buttonSwitchOffBg',
  c: '$buttonSwitchOffColor',
  p: '$1',
  width: '$10',
  justifyContent: 'center',
  fontWeight: 600,
  border: 'none',

  '&[data-state=on]': {
    bc: '$buttonSwitchActiveBg',
    c: '$buttonSwitchActiveColor',
    borderRadius: '$3',
  },
});
