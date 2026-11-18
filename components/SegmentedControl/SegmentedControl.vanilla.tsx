import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import React, { ComponentPropsWithoutRef, createContext, forwardRef, useContext } from 'react';

import { CSSProps } from '@/styles/cssProps';
import { cx } from '@/styles/cx';
import { useInlineStyle } from '@/styles/useInlineStyle';

import {
  segmentedControlItemRecipe,
  segmentedControlRecipe,
  SegmentedControlSize,
} from './SegmentedControl.vanilla.css';

export type { SegmentedControlSize };

const SegmentedControlContext = createContext<{
  size: SegmentedControlSize;
  fullWidth: boolean;
}>({ size: 'medium', fullWidth: false });

export interface SegmentedControlVanillaProps
  extends Omit<ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>, 'asChild'>, CSSProps {
  size?: SegmentedControlSize;
  fullWidth?: boolean;
}

export const SegmentedControlVanilla = forwardRef<HTMLDivElement, SegmentedControlVanillaProps>(
  ({ size = 'medium', fullWidth = false, className, css, style, children, ...props }, ref) => (
    <SegmentedControlContext.Provider value={{ size, fullWidth }}>
      <RadioGroupPrimitive.Root
        ref={ref}
        orientation="horizontal"
        className={cx(segmentedControlRecipe({ fullWidth }), className)}
        style={useInlineStyle(css, style)}
        {...props}
      >
        {children}
      </RadioGroupPrimitive.Root>
    </SegmentedControlContext.Provider>
  ),
);

SegmentedControlVanilla.displayName = 'SegmentedControlVanilla';

export interface SegmentedControlItemVanillaProps
  extends Omit<ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>, 'asChild'>, CSSProps {}

export const SegmentedControlItemVanilla = forwardRef<
  HTMLButtonElement,
  SegmentedControlItemVanillaProps
>(({ className, css, style, ...props }, ref) => {
  const { size, fullWidth } = useContext(SegmentedControlContext);

  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cx(segmentedControlItemRecipe({ size, fullWidth }), className)}
      style={useInlineStyle(css, style)}
      {...props}
    />
  );
});

SegmentedControlItemVanilla.displayName = 'SegmentedControlItemVanilla';
