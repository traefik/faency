import { assignInlineVars } from '@vanilla-extract/dynamic';
import { ElementType, forwardRef } from 'react';

import { CSSProps, processCSSProp } from '../../styles/cssProps';
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicRef,
} from '../../styles/polymorphic';
import { useVanillaExtractTheme } from '../../styles/themeContext';
import { image } from './Image.vanilla.css';

export type ImageVanillaProps<C extends ElementType = 'img'> = PolymorphicComponentProps<
  C,
  CSSProps
>;

type ImageVanillaComponent = PolymorphicComponent<'img', ImageVanillaProps<ElementType>>;

const ImageVanillaImpl = forwardRef(
  <C extends ElementType = 'img'>(
    { as, className, css, style, ...props }: ImageVanillaProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as || 'img';
    const { colors } = useVanillaExtractTheme();
    const { style: cssStyles, vars } = processCSSProp(css, colors);

    const mergedStyles = {
      ...cssStyles,
      ...style,
      ...assignInlineVars(vars),
    };

    return (
      <Component
        ref={ref}
        className={`${image} ${className || ''}`.trim()}
        style={mergedStyles}
        {...props}
      />
    );
  },
);

ImageVanillaImpl.displayName = 'ImageVanilla';

export const ImageVanilla = ImageVanillaImpl as ImageVanillaComponent;
