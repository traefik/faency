import { ElementType, forwardRef } from 'react';

import { CSSProps } from '@/styles/cssProps';
import { cx } from '@/styles/cx';
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicRef,
} from '@/styles/polymorphic';
import { RecipeVariantProps, withVariantKeys } from '@/styles/recipeVariants';
import { useInlineStyle } from '@/styles/useInlineStyle';

import { iconButtonRecipe } from './IconButton.vanilla.css';

const iconButtonClass = withVariantKeys(iconButtonRecipe);

type IconButtonRecipeVariants = RecipeVariantProps<typeof iconButtonRecipe>;

interface IconButtonOwnProps extends IconButtonRecipeVariants, CSSProps {}

export type IconButtonVanillaProps<C extends ElementType = 'button'> = PolymorphicComponentProps<
  C,
  IconButtonOwnProps
>;

type IconButtonVanillaComponent = PolymorphicComponent<
  'button',
  IconButtonVanillaProps<ElementType>
>;

const IconButtonVanillaComponentImpl = forwardRef(
  <C extends ElementType = 'button'>(
    { as, className, css, style, size, variant, ...props }: IconButtonVanillaProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as || 'button';

    const mergedStyles = useInlineStyle(css, style);

    const recipeClass = iconButtonClass({ size, variant });

    return (
      <Component ref={ref} className={cx(recipeClass, className)} style={mergedStyles} {...props} />
    );
  },
);

IconButtonVanillaComponentImpl.displayName = 'IconButtonVanilla';

export const IconButtonVanilla = IconButtonVanillaComponentImpl as IconButtonVanillaComponent;
