import * as AvatarPrimitive from '@radix-ui/react-avatar';
import React, { forwardRef } from 'react';

import { CSSProps } from '@/styles/cssProps';
import { cx } from '@/styles/cx';
import { RecipeVariantProps, withVariantKeys } from '@/styles/recipeVariants';
import { useInlineStyle } from '@/styles/useInlineStyle';

import { avatarFallbackRecipe, avatarImage, avatarRecipe } from './Avatar.vanilla.css';

const avatarClass = withVariantKeys(avatarRecipe);
const avatarFallbackClass = withVariantKeys(avatarFallbackRecipe);

type AvatarRecipeVariants = RecipeVariantProps<typeof avatarRecipe>;

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
>(({ alt, src, fallback, size, variant, shape, css, style, className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cx(avatarClass({ size, variant, shape }), className)}
    style={useInlineStyle(css, style)}
    {...props}
  >
    <AvatarPrimitive.Image className={avatarImage} alt={alt} src={src} />
    <AvatarPrimitive.Fallback className={avatarFallbackClass({ size })}>
      {fallback}
    </AvatarPrimitive.Fallback>
  </AvatarPrimitive.Root>
));

AvatarVanillaComponent.displayName = 'AvatarVanilla';

export const AvatarVanilla = AvatarVanillaComponent;
