import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross1Icon } from '@radix-ui/react-icons';
import React, { ElementType, forwardRef } from 'react';

import { createPolymorphicPart } from '@/styles/createPolymorphicPart';
import { CSSProps } from '@/styles/cssProps';
import { cx } from '@/styles/cx';
import { PolymorphicComponentProps } from '@/styles/polymorphic';
import { RecipeVariantProps, splitVariants, withVariantKeys } from '@/styles/recipeVariants';
import { useInlineStyle } from '@/styles/useInlineStyle';

import {
  IconButtonVanilla,
  IconButtonVanillaProps,
} from '@/components/IconButton/IconButton.vanilla';

import { dialogCloseButton, dialogContentRecipe, dialogOverlay } from './Dialog.vanilla.css';

const dialogContentClass = withVariantKeys(dialogContentRecipe);

export const DialogVanilla = DialogPrimitive.Root;
export const DialogPortalVanilla = DialogPrimitive.Portal;

export type DialogTriggerVanillaProps<C extends ElementType = 'button'> = PolymorphicComponentProps<
  C,
  CSSProps
>;

export const DialogTriggerVanilla = createPolymorphicPart<'button'>(DialogPrimitive.Trigger, {
  displayName: 'DialogTriggerVanilla',
});

export type DialogClosePrimitiveVanillaProps<C extends ElementType = 'button'> =
  PolymorphicComponentProps<C, CSSProps>;

export const DialogClosePrimitiveVanilla = createPolymorphicPart<'button'>(DialogPrimitive.Close, {
  displayName: 'DialogClosePrimitiveVanilla',
});

export type DialogTitleVanillaProps<C extends ElementType = 'h2'> = PolymorphicComponentProps<
  C,
  CSSProps
>;

export const DialogTitleVanilla = createPolymorphicPart<'h2'>(DialogPrimitive.Title, {
  displayName: 'DialogTitleVanilla',
});

export type DialogDescriptionVanillaProps<C extends ElementType = 'p'> = PolymorphicComponentProps<
  C,
  CSSProps
>;

export const DialogDescriptionVanilla = createPolymorphicPart<'p'>(DialogPrimitive.Description, {
  displayName: 'DialogDescriptionVanilla',
});

type DialogOverlayOwnProps = Pick<DialogPrimitive.DialogOverlayProps, 'forceMount'>;

export type DialogOverlayVanillaProps<C extends ElementType = 'div'> = PolymorphicComponentProps<
  C,
  DialogOverlayOwnProps & CSSProps
>;

export const DialogOverlayVanilla = createPolymorphicPart<'div', DialogOverlayOwnProps>(
  DialogPrimitive.Overlay,
  { displayName: 'DialogOverlayVanilla', className: dialogOverlay },
);

export type DialogCloseIconButtonVanillaProps = Omit<IconButtonVanillaProps<'button'>, 'as'>;

export const DialogCloseIconButtonVanilla = forwardRef<
  HTMLButtonElement,
  DialogCloseIconButtonVanillaProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Close asChild>
    <IconButtonVanilla
      ref={ref}
      aria-label="Close"
      className={cx(dialogCloseButton, className)}
      {...props}
    >
      <Cross1Icon aria-hidden />
    </IconButtonVanilla>
  </DialogPrimitive.Close>
));

DialogCloseIconButtonVanilla.displayName = 'DialogCloseIconButtonVanilla';

type DialogContentVariants = RecipeVariantProps<typeof dialogContentRecipe>;

export type DialogContentVanillaProps = Omit<DialogPrimitive.DialogContentProps, 'asChild'> &
  CSSProps &
  DialogContentVariants & {
    closeLabel?: string;
    noCloseIcon?: boolean;
  };

export const DialogContentVanilla = forwardRef<HTMLDivElement, DialogContentVanillaProps>(
  (
    { closeLabel = 'Close', noCloseIcon = false, className, css, style, children, ...rest },
    ref,
  ) => {
    const [variants, props] = splitVariants(dialogContentRecipe, rest);

    return (
      <DialogPrimitive.Content
        ref={ref}
        className={cx(dialogContentClass(variants), className)}
        style={useInlineStyle(css, style)}
        {...props}
      >
        {children}
        {!noCloseIcon && <DialogCloseIconButtonVanilla aria-label={closeLabel} />}
      </DialogPrimitive.Content>
    );
  },
);

DialogContentVanilla.displayName = 'DialogContentVanilla';
