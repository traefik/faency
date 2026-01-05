import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { RecipeVariants } from '@vanilla-extract/recipes';
import React, { forwardRef } from 'react';

import { CSSProps } from '../../styles/cssProps';
import { BoxVanilla } from '../Box/Box.vanilla';
import { avatarFallbackRecipe, avatarImage, avatarRecipe } from './Avatar.vanilla.css';

type AvatarRecipeVariants = NonNullable<RecipeVariants<typeof avatarRecipe>>;

interface AvatarOwnProps extends AvatarRecipeVariants, CSSProps {
  alt?: string;
  src?: string;
  fallback?: React.ReactNode;
}

export type AvatarVanillaProps = Omit<
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
  keyof AvatarOwnProps
> &
  AvatarOwnProps;

const AvatarVanillaComponent = forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarVanillaProps
>(({ alt, src, fallback, size, variant, shape, css, style, ...props }, ref) => {
  const recipeClass = avatarRecipe({ size, variant, shape });
  const fallbackRecipeClass = avatarFallbackRecipe({ size });

  // This CSS will be processed by the Box component
  const wrapperCss = {
    ...css,
    position: 'relative' as const,
    height: 'fit-content' as const,
    width: 'fit-content' as const,
  };

  return (
    <BoxVanilla css={wrapperCss} style={style}>
      <AvatarPrimitive.Root ref={ref} className={recipeClass} {...props}>
        <AvatarPrimitive.Image className={avatarImage} alt={alt} src={src} />
        <AvatarPrimitive.Fallback className={fallbackRecipeClass}>
          {fallback}
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>
    </BoxVanilla>
  );
});

AvatarVanillaComponent.displayName = 'AvatarVanilla';

export const AvatarVanilla = AvatarVanillaComponent;
