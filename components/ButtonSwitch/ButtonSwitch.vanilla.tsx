import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { ComponentProps, forwardRef } from 'react';

import { CSSProps, processCSSProp } from '../../styles/cssProps';
import { useVanillaExtractTheme } from '../../styles/themeContext';
import { buttonSwitchContainer, buttonSwitchItem } from './ButtonSwitch.vanilla.css';

// Container Component
interface ButtonSwitchContainerVanillaProps
  extends ComponentProps<typeof ToggleGroupPrimitive.Root>,
    CSSProps {}

export const ButtonSwitchContainerVanilla = forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  ButtonSwitchContainerVanillaProps
>(({ className, css, style, ...props }, ref) => {
  const { colors } = useVanillaExtractTheme();

  const { style: cssStyles, vars } = processCSSProp(css, colors);

  const mergedStyles = {
    ...cssStyles,
    ...style,
    ...assignInlineVars(vars),
  };

  return (
    <ToggleGroupPrimitive.Root
      ref={ref}
      className={`${buttonSwitchContainer} ${className || ''}`.trim()}
      style={mergedStyles}
      {...props}
    />
  );
});

ButtonSwitchContainerVanilla.displayName = 'ButtonSwitchContainerVanilla';

// Item Component
interface ButtonSwitchItemVanillaProps
  extends ComponentProps<typeof ToggleGroupPrimitive.Item>,
    CSSProps {}

export const ButtonSwitchItemVanilla = forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  ButtonSwitchItemVanillaProps
>(({ className, css, style, ...props }, ref) => {
  const { colors } = useVanillaExtractTheme();

  const { style: cssStyles, vars } = processCSSProp(css, colors);

  const mergedStyles = {
    ...cssStyles,
    ...style,
    ...assignInlineVars(vars),
  };

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={`${buttonSwitchItem} ${className || ''}`.trim()}
      style={mergedStyles}
      {...props}
    />
  );
});

ButtonSwitchItemVanilla.displayName = 'ButtonSwitchItemVanilla';
