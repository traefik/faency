import { CaretSortIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import * as SelectPrimitive from '@radix-ui/react-select';
import { RecipeVariants } from '@vanilla-extract/recipes';
import React from 'react';

import { CSSProps } from '../../styles/cssProps';
import { cx } from '../../styles/cx';
import { useInlineStyle } from '../../styles/useInlineStyle';
import { useFieldControl } from '../Field/FieldContext';
import {
  selectContent,
  selectIcon,
  selectItemContent,
  selectItemDescriptionRecipe,
  selectItemIndicator,
  selectItemRecipe,
  selectLabelRecipe,
  selectScrollButton,
  selectSeparator,
  selectTriggerRecipe,
  selectValue,
  selectViewport,
} from './Select.vanilla.css';

type SelectTriggerVariants = NonNullable<RecipeVariants<typeof selectTriggerRecipe>>;
type SelectSize = NonNullable<SelectTriggerVariants['size']>;

const SelectSizeContext = React.createContext<SelectSize>('medium');

type SelectRootProps = Omit<
  SelectPrimitive.SelectProps,
  'children' | 'dir' | 'autoComplete' | 'onValueChange'
>;

export type SelectVanillaProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  keyof SelectRootProps | 'children' | 'type'
> &
  SelectRootProps &
  CSSProps & {
    onValueChange?: (value: string) => void;
    placeholder?: React.ReactNode;
    autoComplete?: string;
    size?: SelectTriggerVariants['size'];
    variant?: SelectTriggerVariants['variant'];
    state?: SelectTriggerVariants['state'];
    children?: React.ReactNode;
  };

export const SelectVanilla = React.forwardRef<HTMLButtonElement, SelectVanillaProps>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      open,
      defaultOpen,
      onOpenChange,
      name,
      form,
      required,
      autoComplete,
      disabled,
      placeholder,
      size = 'medium',
      variant,
      state,
      id,
      css,
      className,
      style,
      children,
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
      ...props
    },
    forwardedRef,
  ) => {
    const control = useFieldControl({
      id,
      disabled,
      invalid: state === 'invalid',
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
    });
    const inlineStyle = useInlineStyle(css, style);

    return (
      <SelectSizeContext.Provider value={size}>
        <SelectPrimitive.Root
          value={value}
          defaultValue={defaultValue}
          onValueChange={onValueChange}
          open={open}
          defaultOpen={defaultOpen}
          onOpenChange={onOpenChange}
          name={name}
          form={form}
          required={required}
          autoComplete={autoComplete}
          disabled={control.disabled}
        >
          <SelectPrimitive.Trigger
            ref={forwardedRef}
            id={control.id}
            aria-describedby={control['aria-describedby']}
            aria-invalid={control['aria-invalid']}
            className={cx(
              selectTriggerRecipe({
                size,
                variant,
                state: control.invalid ? 'invalid' : state,
              }),
              className,
            )}
            style={inlineStyle}
            {...props}
          >
            {/* Radix drops the className of Value. */}
            <span className={selectValue}>
              <SelectPrimitive.Value placeholder={placeholder} />
            </span>
            <SelectPrimitive.Icon className={selectIcon}>
              <CaretSortIcon />
            </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>
          <SelectPrimitive.Portal>
            <SelectPrimitive.Content
              className={selectContent}
              position="popper"
              sideOffset={4}
              collisionPadding={8}
            >
              <SelectPrimitive.ScrollUpButton className={selectScrollButton}>
                <ChevronUpIcon />
              </SelectPrimitive.ScrollUpButton>
              <SelectPrimitive.Viewport className={selectViewport}>
                {children}
              </SelectPrimitive.Viewport>
              <SelectPrimitive.ScrollDownButton className={selectScrollButton}>
                <ChevronDownIcon />
              </SelectPrimitive.ScrollDownButton>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>
      </SelectSizeContext.Provider>
    );
  },
);

SelectVanilla.displayName = 'SelectVanilla';

export type SelectItemVanillaProps = Omit<SelectPrimitive.SelectItemProps, 'asChild'> &
  CSSProps & {
    /** A second line under the item, shown in the list only. */
    description?: React.ReactNode;
  };

export const SelectItemVanilla = React.forwardRef<HTMLDivElement, SelectItemVanillaProps>(
  ({ description, children, css, className, style, ...props }, forwardedRef) => {
    const size = React.useContext(SelectSizeContext);
    const inlineStyle = useInlineStyle(css, style);

    return (
      <SelectPrimitive.Item
        ref={forwardedRef}
        className={cx(selectItemRecipe({ size }), className)}
        style={inlineStyle}
        {...props}
      >
        <span className={selectItemContent}>
          <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
          {description != null && (
            <span className={selectItemDescriptionRecipe({ size })}>{description}</span>
          )}
        </span>
        <span className={selectItemIndicator}>
          <SelectPrimitive.ItemIndicator>
            <CheckIcon />
          </SelectPrimitive.ItemIndicator>
        </span>
      </SelectPrimitive.Item>
    );
  },
);

SelectItemVanilla.displayName = 'SelectItemVanilla';

export type SelectGroupVanillaProps = Omit<SelectPrimitive.SelectGroupProps, 'asChild'> & CSSProps;

export const SelectGroupVanilla = React.forwardRef<HTMLDivElement, SelectGroupVanillaProps>(
  ({ css, style, ...props }, forwardedRef) => (
    <SelectPrimitive.Group ref={forwardedRef} style={useInlineStyle(css, style)} {...props} />
  ),
);

SelectGroupVanilla.displayName = 'SelectGroupVanilla';

export type SelectLabelVanillaProps = Omit<SelectPrimitive.SelectLabelProps, 'asChild'> & CSSProps;

export const SelectLabelVanilla = React.forwardRef<HTMLDivElement, SelectLabelVanillaProps>(
  ({ css, className, style, ...props }, forwardedRef) => {
    const size = React.useContext(SelectSizeContext);

    return (
      <SelectPrimitive.Label
        ref={forwardedRef}
        className={cx(selectLabelRecipe({ size }), className)}
        style={useInlineStyle(css, style)}
        {...props}
      />
    );
  },
);

SelectLabelVanilla.displayName = 'SelectLabelVanilla';

export type SelectSeparatorVanillaProps = Omit<SelectPrimitive.SelectSeparatorProps, 'asChild'> &
  CSSProps;

export const SelectSeparatorVanilla = React.forwardRef<HTMLDivElement, SelectSeparatorVanillaProps>(
  ({ css, className, style, ...props }, forwardedRef) => (
    <SelectPrimitive.Separator
      ref={forwardedRef}
      className={cx(selectSeparator, className)}
      style={useInlineStyle(css, style)}
      {...props}
    />
  ),
);

SelectSeparatorVanilla.displayName = 'SelectSeparatorVanilla';
