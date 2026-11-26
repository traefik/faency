import * as DialogPrimitive from '@radix-ui/react-dialog';
import React, { forwardRef } from 'react';

import { CSSProps } from '@/styles/cssProps';
import { cx } from '@/styles/cx';
import { RecipeVariantProps, splitVariants, withVariantKeys } from '@/styles/recipeVariants';
import { useInlineStyle } from '@/styles/useInlineStyle';

import { DialogCloseIconButtonVanilla } from '@/components/Dialog/Dialog.vanilla';
import { VisuallyHiddenVanilla } from '@/components/VisuallyHidden/VisuallyHidden.vanilla';

import { sidePanelContentRecipe, sidePanelOverlay } from './SidePanel.vanilla.css';

const sidePanelContentClass = withVariantKeys(sidePanelContentRecipe);

type SidePanelContentVariants = RecipeVariantProps<typeof sidePanelContentRecipe>;

export type SidePanelVanillaProps = Omit<DialogPrimitive.DialogContentProps, 'asChild'> &
  CSSProps &
  SidePanelContentVariants & {
    description?: string;
    noOverlay?: boolean;
    noCloseIcon?: boolean;
    closeLabel?: string;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange(open: boolean): void;
  };

export const SidePanelVanilla = forwardRef<HTMLDivElement, SidePanelVanillaProps>(
  (
    {
      description,
      noOverlay = false,
      noCloseIcon = false,
      closeLabel = 'Close',
      open,
      defaultOpen = false,
      onOpenChange,
      className,
      css,
      style,
      children,
      ...rest
    },
    ref,
  ) => {
    const [variants, props] = splitVariants(sidePanelContentRecipe, rest);

    return (
      <DialogPrimitive.Root open={open} onOpenChange={onOpenChange} defaultOpen={defaultOpen}>
        <DialogPrimitive.Portal>
          {!noOverlay && <DialogPrimitive.Overlay className={sidePanelOverlay} />}
          <DialogPrimitive.Content
            ref={ref}
            className={cx(sidePanelContentClass(variants), className)}
            style={useInlineStyle(css, style)}
            {...props}
          >
            {description ? (
              <VisuallyHiddenVanilla as={DialogPrimitive.Description}>
                {description}
              </VisuallyHiddenVanilla>
            ) : null}
            {children}
            {!noCloseIcon && <DialogCloseIconButtonVanilla aria-label={closeLabel} />}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    );
  },
);

SidePanelVanilla.displayName = 'SidePanelVanilla';
