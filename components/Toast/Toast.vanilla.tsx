import {
  CheckCircledIcon,
  Cross2Icon,
  CrossCircledIcon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
} from '@radix-ui/react-icons';
import * as ToastPrimitive from '@radix-ui/react-toast';
import React, { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react';

import { CSSProps } from '@/styles/cssProps';
import { cx } from '@/styles/cx';
import { useInlineStyle } from '@/styles/useInlineStyle';

import { ButtonVanilla } from '@/components/Button/Button.vanilla';
import { IconButtonVanilla } from '@/components/IconButton/IconButton.vanilla';

import {
  toastAction,
  toastClose,
  toastContent,
  toastDescription,
  toastIconRecipe,
  toastRoot,
  toastTitle,
  ToastVariant,
} from './Toast.vanilla.css';

export type { ToastVariant };

const DEFAULT_ICONS: Record<ToastVariant, ReactNode> = {
  gray: null,
  info: <InfoCircledIcon />,
  success: <CheckCircledIcon />,
  warning: <ExclamationTriangleIcon />,
  error: <CrossCircledIcon />,
};

export interface ToastVanillaProps
  extends Omit<ComponentPropsWithoutRef<typeof ToastPrimitive.Root>, 'asChild'>, CSSProps {
  variant?: ToastVariant;
  /** Replaces the variant icon. Pass `null` to show no icon. */
  icon?: ReactNode;
  closeLabel?: string;
}

export const ToastVanilla = forwardRef<HTMLLIElement, ToastVanillaProps>(
  (
    {
      variant = 'gray',
      icon,
      closeLabel = 'Close',
      type,
      className,
      css,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const mergedStyles = useInlineStyle(css, style);
    const resolvedIcon = icon === undefined ? DEFAULT_ICONS[variant] : icon;

    return (
      <ToastPrimitive.Root
        ref={ref}
        type={type ?? (variant === 'error' ? 'foreground' : 'background')}
        className={cx(toastRoot, className)}
        style={mergedStyles}
        {...props}
      >
        {resolvedIcon ? (
          <span className={toastIconRecipe({ variant })} aria-hidden>
            {resolvedIcon}
          </span>
        ) : null}
        <div className={toastContent}>{children}</div>
        <ToastPrimitive.Close asChild>
          <IconButtonVanilla size="1" aria-label={closeLabel} className={toastClose}>
            <Cross2Icon aria-hidden />
          </IconButtonVanilla>
        </ToastPrimitive.Close>
      </ToastPrimitive.Root>
    );
  },
);

ToastVanilla.displayName = 'ToastVanilla';

export interface ToastTitleVanillaProps
  extends Omit<ComponentPropsWithoutRef<typeof ToastPrimitive.Title>, 'asChild'>, CSSProps {}

export const ToastTitleVanilla = forwardRef<HTMLDivElement, ToastTitleVanillaProps>(
  ({ className, css, style, ...props }, ref) => (
    <ToastPrimitive.Title
      ref={ref}
      className={cx(toastTitle, className)}
      style={useInlineStyle(css, style)}
      {...props}
    />
  ),
);

ToastTitleVanilla.displayName = 'ToastTitleVanilla';

export interface ToastDescriptionVanillaProps
  extends Omit<ComponentPropsWithoutRef<typeof ToastPrimitive.Description>, 'asChild'>, CSSProps {}

export const ToastDescriptionVanilla = forwardRef<HTMLDivElement, ToastDescriptionVanillaProps>(
  ({ className, css, style, ...props }, ref) => (
    <ToastPrimitive.Description
      ref={ref}
      className={cx(toastDescription, className)}
      style={useInlineStyle(css, style)}
      {...props}
    />
  ),
);

ToastDescriptionVanilla.displayName = 'ToastDescriptionVanilla';

export interface ToastActionVanillaProps
  extends Omit<ComponentPropsWithoutRef<typeof ToastPrimitive.Action>, 'asChild'>, CSSProps {}

export const ToastActionVanilla = forwardRef<HTMLButtonElement, ToastActionVanillaProps>(
  ({ altText, className, css, ...props }, ref) => (
    <ToastPrimitive.Action altText={altText} asChild>
      <ButtonVanilla
        ref={ref}
        variant="secondary"
        size="small"
        css={css}
        className={cx(toastAction, className)}
        {...props}
      />
    </ToastPrimitive.Action>
  ),
);

ToastActionVanilla.displayName = 'ToastActionVanilla';
