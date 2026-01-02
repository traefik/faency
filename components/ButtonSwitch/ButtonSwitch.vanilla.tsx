import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { ElementType, forwardRef } from 'react';

import { CSSProps, processCSSProp } from '../../styles/cssProps';
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicRef,
} from '../../styles/polymorphic';
import { useVanillaExtractTheme } from '../../styles/themeContext';
import { buttonSwitchContainer, buttonSwitchItem } from './ButtonSwitch.vanilla.css';

// Container Component
interface ButtonSwitchContainerOwnProps extends CSSProps {
  type?: 'single' | 'multiple';
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: any) => void;
  disabled?: boolean;
  rovingFocus?: boolean;
  loop?: boolean;
  orientation?: 'horizontal' | 'vertical';
  dir?: 'ltr' | 'rtl';
}

export type ButtonSwitchContainerVanillaProps<C extends ElementType = 'div'> =
  PolymorphicComponentProps<C, ButtonSwitchContainerOwnProps>;

type ButtonSwitchContainerVanillaComponent = PolymorphicComponent<
  'div',
  ButtonSwitchContainerVanillaProps<ElementType>
>;

const ButtonSwitchContainerVanillaImpl = forwardRef(
  <C extends ElementType = 'div'>(
    { as, className, css, style, children, ...props }: ButtonSwitchContainerVanillaProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = (as || 'div') as any;
    const { colors } = useVanillaExtractTheme();

    const { style: cssStyles, vars } = processCSSProp(css, colors);

    const mergedStyles = {
      ...cssStyles,
      ...style,
      ...assignInlineVars(vars),
    };

    if (as) {
      return (
        <Component
          ref={ref}
          className={`${buttonSwitchContainer} ${className || ''}`.trim()}
          style={mergedStyles}
          role="group"
          {...props}
        >
          {children}
        </Component>
      );
    }

    return (
      <ToggleGroupPrimitive.Root
        ref={ref as any}
        className={`${buttonSwitchContainer} ${className || ''}`.trim()}
        style={mergedStyles}
        {...(props as any)}
      >
        {children}
      </ToggleGroupPrimitive.Root>
    );
  },
);

ButtonSwitchContainerVanillaImpl.displayName = 'ButtonSwitchContainerVanilla';

export const ButtonSwitchContainerVanilla =
  ButtonSwitchContainerVanillaImpl as ButtonSwitchContainerVanillaComponent;

// Item Component
interface ButtonSwitchItemOwnProps extends CSSProps {
  value: string;
  disabled?: boolean;
}

export type ButtonSwitchItemVanillaProps<C extends ElementType = 'button'> =
  PolymorphicComponentProps<C, ButtonSwitchItemOwnProps>;

type ButtonSwitchItemVanillaComponent = PolymorphicComponent<
  'button',
  ButtonSwitchItemVanillaProps<ElementType>
>;

const ButtonSwitchItemVanillaImpl = forwardRef(
  <C extends ElementType = 'button'>(
    { as, className, css, style, children, ...props }: ButtonSwitchItemVanillaProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = (as || 'button') as any;
    const { colors } = useVanillaExtractTheme();

    const { style: cssStyles, vars } = processCSSProp(css, colors);

    const mergedStyles = {
      ...cssStyles,
      ...style,
      ...assignInlineVars(vars),
    };

    if (as) {
      return (
        <Component
          ref={ref}
          className={`${buttonSwitchItem} ${className || ''}`.trim()}
          style={mergedStyles}
          role="radio"
          {...props}
        >
          {children}
        </Component>
      );
    }

    return (
      <ToggleGroupPrimitive.Item
        ref={ref as any}
        className={`${buttonSwitchItem} ${className || ''}`.trim()}
        style={mergedStyles}
        {...(props as any)}
      >
        {children}
      </ToggleGroupPrimitive.Item>
    );
  },
);

ButtonSwitchItemVanillaImpl.displayName = 'ButtonSwitchItemVanilla';

export const ButtonSwitchItemVanilla =
  ButtonSwitchItemVanillaImpl as ButtonSwitchItemVanillaComponent;
