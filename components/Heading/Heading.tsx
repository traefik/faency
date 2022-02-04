import React from 'react';
import { Text } from '../Text';
import { VariantProps, styled, FaencyComponentProps } from '../../stitches.config';

const DEFAULT_TAG = 'h1';

type TextSizeVariants = Pick<VariantProps<typeof Text>, 'size'>;

type HeadingSizeVariants = '1' | '2' | '3' | '4';

const StyledHeading = styled(Text, {
  fontVariantNumeric: 'proportional-nums',
  display: 'block',
  lineHeight: '1.25',
  fontWeight: '$medium',
});

export interface HeadingVariants extends Omit<
  VariantProps<typeof Text>,
  'size'
> { size?: HeadingSizeVariants }
export type HeadingProps = FaencyComponentProps<typeof StyledHeading> &
  HeadingVariants & { as?: any, children?: React.ReactNode };


export const Heading = React.forwardRef<React.ElementRef<typeof StyledHeading>, HeadingProps>(
  // '2' here is the default heading size variant
  (props, forwardedRef) => {
    // '2' here is the default heading size variant
    const { size = '1', ...textProps } = props;
    // This is the mapping of Heading Variants to Text variants
    const textSize: Record<HeadingSizeVariants, TextSizeVariants['size']> = {
      1: { '@initial': '4' },
      2: { '@initial': '6' },
      3: { '@initial': '7' },
      4: { '@initial': '10' },
    };
    return (
      <StyledHeading
        as={DEFAULT_TAG}
        ref={forwardedRef}
        size={textSize[size]}
        {...textProps}
      />
    );
  }
);
