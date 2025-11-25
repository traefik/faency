import { assignInlineVars } from '@vanilla-extract/dynamic';
import { RecipeVariants } from '@vanilla-extract/recipes';
import { ElementType, forwardRef } from 'react';

import { CSSProps, processCSSProp } from '../../styles/cssProps';
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicRef,
} from '../../styles/polymorphic';
import { useVanillaExtractTheme } from '../../styles/themeContext';
import {
  h1Recipe,
  h1Style,
  h2Recipe,
  h2Style,
  h3Recipe,
  h3Style,
  h4Recipe,
  h4Style,
  h5Recipe,
  h5Style,
  h6Recipe,
  h6Style,
} from './Heading.vanilla.css';

type HeadingRecipeVariants = RecipeVariants<typeof h1Recipe>;

interface HeadingOwnProps extends Omit<HeadingRecipeVariants, never>, CSSProps {}

type HeadingProps<C extends ElementType> = PolymorphicComponentProps<C, HeadingOwnProps>;

function createHeadingComponent<C extends ElementType>(
  defaultElement: C,
  recipe: typeof h1Recipe,
  baseStyle: string,
  displayName: string,
) {
  type HeadingComponent = PolymorphicComponent<C, HeadingProps<ElementType>>;

  const HeadingImpl = forwardRef(
    <E extends ElementType = C>(
      { as, className, css, style, transform, ...props }: HeadingProps<E>,
      ref?: PolymorphicRef<E>,
    ) => {
      const Component = (as || defaultElement) as ElementType;
      const { colors } = useVanillaExtractTheme();
      const { style: cssStyles, vars } = processCSSProp(css, colors);

      const mergedStyles = {
        ...cssStyles,
        ...style,
        ...assignInlineVars(vars),
      };

      const recipeClass = recipe({ transform });
      const combinedClassName = transform
        ? `${recipeClass} ${className || ''}`.trim()
        : `${baseStyle} ${className || ''}`.trim();

      return <Component ref={ref} className={combinedClassName} style={mergedStyles} {...props} />;
    },
  );

  HeadingImpl.displayName = displayName;

  return HeadingImpl as HeadingComponent;
}

export type H1VanillaProps<C extends ElementType = 'h1'> = HeadingProps<C>;
export type H2VanillaProps<C extends ElementType = 'h2'> = HeadingProps<C>;
export type H3VanillaProps<C extends ElementType = 'h3'> = HeadingProps<C>;
export type H4VanillaProps<C extends ElementType = 'h4'> = HeadingProps<C>;
export type H5VanillaProps<C extends ElementType = 'h5'> = HeadingProps<C>;
export type H6VanillaProps<C extends ElementType = 'h6'> = HeadingProps<C>;

export const H1Vanilla = createHeadingComponent<'h1'>('h1', h1Recipe, h1Style, 'H1Vanilla');
export const H2Vanilla = createHeadingComponent<'h2'>('h2', h2Recipe, h2Style, 'H2Vanilla');
export const H3Vanilla = createHeadingComponent<'h3'>('h3', h3Recipe, h3Style, 'H3Vanilla');
export const H4Vanilla = createHeadingComponent<'h4'>('h4', h4Recipe, h4Style, 'H4Vanilla');
export const H5Vanilla = createHeadingComponent<'h5'>('h5', h5Recipe, h5Style, 'H5Vanilla');
export const H6Vanilla = createHeadingComponent<'h6'>('h6', h6Recipe, h6Style, 'H6Vanilla');
