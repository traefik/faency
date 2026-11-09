import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import React, { ComponentPropsWithoutRef, createContext, forwardRef, useContext } from 'react';

import { CSSProps, processCSSProp } from '../../styles/cssProps';
import { useVanillaExtractTheme } from '../../styles/themeContext';
import {
  segmentedControlItemRecipe,
  segmentedControlRecipe,
  SegmentedControlSize,
} from './SegmentedControl.vanilla.css';

export type { SegmentedControlSize };

const joinClassNames = (...classNames: (string | undefined)[]) =>
  classNames.filter(Boolean).join(' ');

const useCssProp = (css: CSSProps['css'], style?: React.CSSProperties) => {
  const { colors } = useVanillaExtractTheme();
  const { style: cssStyles, vars } = processCSSProp(css, colors);
  return { ...cssStyles, ...style, ...assignInlineVars(vars) };
};

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
        className={joinClassNames(segmentedControlRecipe({ fullWidth }), className)}
        style={useCssProp(css, style)}
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
      className={joinClassNames(segmentedControlItemRecipe({ size, fullWidth }), className)}
      style={useCssProp(css, style)}
      {...props}
    />
  );
});

SegmentedControlItemVanilla.displayName = 'SegmentedControlItemVanilla';
