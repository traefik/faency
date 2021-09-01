import React from 'react';
import { Text } from './Text';
import { styled, VariantProps, CSS } from '../stitches.config';
import merge from 'lodash.merge';

const DEFAULT_TAG = 'h1';

type TextSizeVariants = Pick<VariantProps<typeof Text>, 'size'>;

type HeadingSizeVariants = '1' | '2' | '3' | '4';
type HeadingVariants = { size?: HeadingSizeVariants } & Omit<VariantProps<typeof Text>, 'size'>;
type HeadingProps = React.ComponentProps<typeof DEFAULT_TAG> &
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
      1: { fontWeight: 500, lineHeight: '20px' },
      2: { fontWeight: 500, lineHeight: '25px' },
      3: { fontWeight: 500, lineHeight: '33px' },
      4: { fontWeight: 500, lineHeight: '35px' },
    };

    return (
      <Text
        as={DEFAULT_TAG}
        {...textProps}
        ref={forwardedRef}
        size={textSize[size]}
        css={{
          fontVariantNumeric: 'proportional-nums',
          ...merge(textCss[size], props.css),
        }}
      />
    );
  }
);

// export const Heading = styled(
//   Text,
//   {
//     fontWeight: 500,
//   },
//   {
//     variants: {
//       // size: {
//       //   1: {
//       //     fontSize: '$10',
//       //   },
//       //   2: {
//       //     fontSize: '$7',
//       //   },
//       // },
//     },
//   },
//   {
//     defaultVariants: {
//       size: 1,
//       as: 'h2',
//     },
//   }
// );
