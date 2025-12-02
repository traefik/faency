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
import { paragraphRecipe } from './Paragraph.vanilla.css';

type ParagraphRecipeVariants = RecipeVariants<typeof paragraphRecipe>;

interface ParagraphOwnProps extends Omit<ParagraphRecipeVariants, never>, CSSProps {}

export type ParagraphVanillaProps<C extends ElementType = 'p'> = PolymorphicComponentProps<
  C,
  ParagraphOwnProps
>;

type ParagraphVanillaComponent = PolymorphicComponent<'p', ParagraphVanillaProps<ElementType>>;

const ParagraphVanillaComponentImpl = forwardRef(
  <C extends ElementType = 'p'>(
    { as, size, className, css, style, ...props }: ParagraphVanillaProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as || 'p';

    const { colors } = useVanillaExtractTheme();

    const { style: cssStyles, vars } = processCSSProp(css, colors);

    const mergedStyles = {
      ...cssStyles,
      ...style,
      ...assignInlineVars(vars),
    };

    const recipeClass = paragraphRecipe({ size });

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

ParagraphVanillaComponentImpl.displayName = 'ParagraphVanilla';

export const ParagraphVanilla = ParagraphVanillaComponentImpl as ParagraphVanillaComponent;
