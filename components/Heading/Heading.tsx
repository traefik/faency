import React from 'react';
import { Text } from '../Text';
import { VariantProps, CSS } from '../../stitches.config';
import merge from 'lodash.merge';

const DEFAULT_TAG = 'h1';

type TextSizeVariants = Pick<VariantProps<typeof Text>, 'size'>;

type HeadingSizeVariants = '1' | '2' | '3' | '4';
export type HeadingVariants = { size?: HeadingSizeVariants } & Omit<
  VariantProps<typeof Text>,
  'size'
>;
export type HeadingProps = React.ComponentProps<typeof DEFAULT_TAG> &
  HeadingVariants & { css?: CSS; as?: any };

export const Heading = React.forwardRef<React.ElementRef<typeof DEFAULT_TAG>, HeadingProps>(
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

    // This is the mapping of Heading Variants to Text css
    const textCss: Record<HeadingSizeVariants, CSS> = {
      1: { fontWeight: '$medium', lineHeight: '20px' },
      2: { fontWeight: '$medium', lineHeight: '25px' },
      3: { fontWeight: '$medium', lineHeight: '33px' },
      4: { fontWeight: '$medium', lineHeight: '35px' },
    };

    return (
      <Text
        as={DEFAULT_TAG}
        {...textProps}
        ref={forwardedRef}
        size={textSize[size]}
        css={{
          fontVariantNumeric: 'proportional-nums',
          display: 'block',
          ...(merge(textCss[size], props.css) as object),
        }}
      />
    );
  }
);
