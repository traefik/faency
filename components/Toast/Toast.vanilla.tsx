import {
  CheckCircledIcon,
  Cross2Icon,
  CrossCircledIcon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
} from '@radix-ui/react-icons';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import React, { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react';

import { CSSProps, processCSSProp } from '../../styles/cssProps';
import { useVanillaExtractTheme } from '../../styles/themeContext';
import { ButtonVanilla } from '../Button/Button.vanilla';
import { IconButtonVanilla } from '../IconButton/IconButton.vanilla';
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

const joinClassNames = (...classNames: (string | undefined)[]) =>
  classNames.filter(Boolean).join(' ');

const useCssProp = (css: CSSProps['css'], style?: React.CSSProperties) => {
  const { colors } = useVanillaExtractTheme();
  const { style: cssStyles, vars } = processCSSProp(css, colors);
  return { ...cssStyles, ...style, ...assignInlineVars(vars) };
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
    const mergedStyles = useCssProp(css, style);
    const resolvedIcon = icon === undefined ? DEFAULT_ICONS[variant] : icon;

    return (
      <ToastPrimitive.Root
        ref={ref}
        type={type ?? (variant === 'error' ? 'foreground' : 'background')}
        className={joinClassNames(toastRoot, className)}
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
      className={joinClassNames(toastTitle, className)}
      style={useCssProp(css, style)}
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
      className={joinClassNames(toastDescription, className)}
      style={useCssProp(css, style)}
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
        className={joinClassNames(toastAction, className)}
        {...props}
      />
    </ToastPrimitive.Action>
  ),
);

ToastActionVanilla.displayName = 'ToastActionVanilla';
