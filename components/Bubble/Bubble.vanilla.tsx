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
import { bubbleRecipe } from './Bubble.vanilla.css';

type BubbleRecipeVariants = NonNullable<RecipeVariants<typeof bubbleRecipe>>;

interface BubbleOwnProps extends BubbleRecipeVariants, CSSProps {}

export type BubbleVanillaProps<C extends ElementType = 'div'> = PolymorphicComponentProps<
  C,
  BubbleOwnProps
>;

type BubbleVanillaComponent = PolymorphicComponent<'div', BubbleVanillaProps<ElementType>>;

const BubbleVanillaComponentImpl = forwardRef(
  <C extends ElementType = 'div'>(
    { as, className, css, style, size, variant, noAnimation, ...props }: BubbleVanillaProps<C>,
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

    const recipeClass = bubbleRecipe({ size, variant, noAnimation });

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

BubbleVanillaComponentImpl.displayName = 'BubbleVanilla';

export const BubbleVanilla = BubbleVanillaComponentImpl as BubbleVanillaComponent;
