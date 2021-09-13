import { VariantProps } from '@stitches/react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { styled } from '../../stitches.config';
import { Text } from '../Text';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';

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

type LabelVariants = VariantProps<typeof Label>;
export interface LabelProps extends LabelVariants {}
const BaseLabel = (props: LabelProps): JSX.Element => <Label {...props} />;
export const LabelForStory = modifyVariantsForStory<
  LabelVariants,
  LabelProps & React.LabelHTMLAttributes<any>
>(BaseLabel);
