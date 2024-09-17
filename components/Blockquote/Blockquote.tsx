import { CSS, styled, VariantProps } from '../../stitches.config';
import { Text } from '../Text';

export const Blockquote = styled(Text, {
  borderLeft: '2px solid $textDefault',
  p: '$2 $3',
});

export type BlockquoteVariants = VariantProps<typeof Blockquote>;
export type BlockquoteProps = BlockquoteVariants & { css?: CSS };
