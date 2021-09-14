import * as LabelPrimitive from '@radix-ui/react-label';
import { styled } from '../../stitches.config';
import { Text } from '../Text';

export const Label = styled(LabelPrimitive.Root, Text, {
  display: 'inline-block',
  verticalAlign: 'middle',
  cursor: 'default',
  textTransform: 'uppercase',
  fontWeight: 500,
  lineHeight: 2.18,
  defaultVariants: {
    size: '0',
    variant: 'subtle',
  },
});
