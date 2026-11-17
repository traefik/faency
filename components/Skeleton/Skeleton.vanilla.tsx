import { RecipeVariants } from '@vanilla-extract/recipes';
import { ElementType, forwardRef } from 'react';

import { CSSProps } from '../../styles/cssProps';
import { cx } from '../../styles/cx';
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicRef,
} from '../../styles/polymorphic';
import { useInlineStyle } from '../../styles/useInlineStyle';
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
    const mergedStyles = useInlineStyle(css, style);

    const recipeClass = skeletonRecipe({ variant });

    return (
      <Component ref={ref} className={cx(recipeClass, className)} style={mergedStyles} {...props} />
    );
  },
);

SkeletonVanillaImpl.displayName = 'SkeletonVanilla';

export const SkeletonVanilla = SkeletonVanillaImpl as SkeletonVanillaComponent;
