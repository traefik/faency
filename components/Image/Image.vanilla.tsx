import { ElementType, forwardRef } from 'react';

import { CSSProps } from '@/styles/cssProps';
import { cx } from '@/styles/cx';
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicRef,
} from '@/styles/polymorphic';
import { useInlineStyle } from '@/styles/useInlineStyle';

import { image } from './Image.vanilla.css';

export type ImageVanillaProps<C extends ElementType = 'img'> = PolymorphicComponentProps<
  C,
  CSSProps
>;

type ImageVanillaComponent = PolymorphicComponent<'img', CSSProps>;

const ImageVanillaImpl = forwardRef(
  <C extends ElementType = 'img'>(
    { as, className, css, style, ...props }: ImageVanillaProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as || 'img';
    const mergedStyles = useInlineStyle(css, style);

    return <Component ref={ref} className={cx(image, className)} style={mergedStyles} {...props} />;
  },
);

ImageVanillaImpl.displayName = 'ImageVanilla';

export const ImageVanilla = ImageVanillaImpl as ImageVanillaComponent;
