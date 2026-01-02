import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { RecipeVariants } from '@vanilla-extract/recipes';
import React, { forwardRef } from 'react';

import { CSSProps, processCSSProp } from '../../styles/cssProps';
import { useVanillaExtractTheme } from '../../styles/themeContext';
import { avatarFallbackRecipe, avatarImage, avatarRecipe } from './Avatar.vanilla.css';

type AvatarRecipeVariants = NonNullable<RecipeVariants<typeof avatarRecipe>>;

interface AvatarOwnProps extends AvatarRecipeVariants, CSSProps {
  alt?: string;
  src?: string;
  fallback?: React.ReactNode;
  wrapperCss?: CSSProps['css'];
}

export type AvatarVanillaProps = Omit<
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
  keyof AvatarOwnProps
> &
  AvatarOwnProps;

const AvatarVanillaComponent = forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarVanillaProps
>(({ alt, src, fallback, size, variant, shape, css, style, wrapperCss, ...props }, ref) => {
  const { colors } = useVanillaExtractTheme();

  const { style: cssStyles, vars } = processCSSProp(css, colors);
  const { style: wrapperCssStyles, vars: wrapperVars } = processCSSProp(wrapperCss, colors);

  const mergedStyles = {
    ...cssStyles,
    ...style,
    ...assignInlineVars(vars),
  };

  const wrapperMergedStyles = {
    ...wrapperCssStyles,
    position: 'relative' as const,
    height: 'fit-content' as const,
    width: 'fit-content' as const,
    ...assignInlineVars(wrapperVars),
  };

  const recipeClass = avatarRecipe({ size, variant, shape });
  const fallbackRecipeClass = avatarFallbackRecipe({ size });

  return (
    <div style={wrapperMergedStyles}>
      <AvatarPrimitive.Root ref={ref} className={recipeClass} style={mergedStyles} {...props}>
        <AvatarPrimitive.Image className={avatarImage} alt={alt} src={src} />
        <AvatarPrimitive.Fallback className={fallbackRecipeClass}>
          {fallback}
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>
    </div>
  );
});

AvatarVanillaComponent.displayName = 'AvatarVanilla';

export const AvatarVanilla = AvatarVanillaComponent;
