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
import { iconButtonRecipe } from './IconButton.vanilla.css';

type IconButtonRecipeVariants = RecipeVariants<typeof iconButtonRecipe>;

interface IconButtonOwnProps extends Omit<IconButtonRecipeVariants, never>, CSSProps {}

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

    const { colors } = useVanillaExtractTheme();

    const { style: cssStyles, vars } = processCSSProp(css, colors);

    const mergedStyles = {
      ...cssStyles,
      ...style,
      ...assignInlineVars(vars),
    };

    const recipeClass = iconButtonRecipe({ size, variant });

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

IconButtonVanillaComponentImpl.displayName = 'IconButtonVanilla';

export const IconButtonVanilla = IconButtonVanillaComponentImpl as IconButtonVanillaComponent;
