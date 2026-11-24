import React from 'react';

/**
 * Radix Tabs calls `focus()` on mouse down, which browsers treat as keyboard focus and show the
 * focus ring for. Focusing first without it turns the Radix call into a no-op.
 */
export const focusTriggerOnMouseDown = (
  event: React.MouseEvent<HTMLElement>,
  disabled: boolean | undefined,
  onMouseDown: React.MouseEventHandler<HTMLElement> | undefined,
) => {
  onMouseDown?.(event);

  if (!event.defaultPrevented && !disabled && event.button === 0 && !event.ctrlKey) {
    event.currentTarget.focus({ focusVisible: false } as FocusOptions);
  }
};
