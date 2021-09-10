import { VariantProps } from '@stitches/react';
import { styled } from '../../stitches.config';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';

export const Box = styled('div', {
  // Reset
  boxSizing: 'border-box',
});

type BoxVariants = VariantProps<typeof Box>;
export interface BoxProps extends BoxVariants {}
const BaseBox = (props: BoxProps): JSX.Element => <Box {...props} />;
export const BoxForStory = modifyVariantsForStory<
  BoxVariants,
  BoxProps & React.HTMLAttributes<any>
>(BaseBox);
