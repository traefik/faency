import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { forwardRef } from 'react';

import { CSSProps, processCSSProp } from '../../styles/cssProps';
import { useVanillaExtractTheme } from '../../styles/themeContext';
import { buttonSwitchContainer, buttonSwitchItem } from './ButtonSwitch.vanilla.css';

// Container Component
type ButtonSwitchContainerVanillaProps = (
  | ToggleGroupPrimitive.ToggleGroupSingleProps
  | ToggleGroupPrimitive.ToggleGroupMultipleProps
) &
  CSSProps;

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
type ButtonSwitchItemVanillaProps = Omit<ToggleGroupPrimitive.ToggleGroupItemProps, 'css'> &
  CSSProps;

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
