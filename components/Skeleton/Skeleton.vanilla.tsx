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
import { skeletonRecipe } from './Skeleton.vanilla.css';

type SkeletonRecipeVariants = NonNullable<RecipeVariants<typeof skeletonRecipe>>;

interface SkeletonVanillaOwnProps extends SkeletonRecipeVariants, CSSProps {}

export type SkeletonVanillaProps<C extends ElementType = 'div'> = PolymorphicComponentProps<
  C,
  SkeletonVanillaOwnProps
>;

type SkeletonVanillaComponent = PolymorphicComponent<'div', SkeletonVanillaProps<ElementType>>;

const SkeletonVanillaImpl = forwardRef(
  <C extends ElementType = 'div'>(
    { as, className, css, style, variant, ...props }: SkeletonVanillaProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as || 'div';
    const { colors } = useVanillaExtractTheme();
    const { style: cssStyles, vars } = processCSSProp(css, colors);

    const mergedStyles = {
      ...cssStyles,
      ...style,
      ...assignInlineVars(vars),
    };

    const recipeClass = skeletonRecipe({ variant });

    return (
      <Component
        ref={ref}
        className={`${recipeClass} ${className || ''}`.trim()}
        style={mergedStyles}
        {...props}
      />
    );
  },
);

SkeletonVanillaImpl.displayName = 'SkeletonVanilla';

export const SkeletonVanilla = SkeletonVanillaImpl as SkeletonVanillaComponent;
