import { assignInlineVars } from '@vanilla-extract/dynamic';
import React, { forwardRef } from 'react';

import { CSSProps, processCSSProp } from '../../styles/cssProps';
import { resolveColor } from '../../styles/resolveColor';
import { useVanillaExtractTheme } from '../../styles/themeContext';
import { hiddenLabel, spinnerRecipe, svg, track } from './Spinner.vanilla.css';

export type SpinnerVanillaProps = Omit<
  React.HTMLAttributes<HTMLSpanElement>,
  'children' | 'color'
> &
  CSSProps & {
    size?: 'small' | 'medium' | 'large';
    /** A color token such as `$toneSuccessSolid` or `$gray11`, any CSS color, or `currentColor`. Defaults to primary. */
    color?: string;
    /** Announced to screen readers. */
    label?: string;
  };

export const SpinnerVanilla = forwardRef<HTMLSpanElement, SpinnerVanillaProps>(
  ({ size, color, label = 'Loading', className, css, style, ...props }, ref) => {
    const { colors } = useVanillaExtractTheme();
    const { style: cssStyles, vars } = processCSSProp(css, colors);
    const colorStyle = color ? { color: resolveColor(color, colors) } : undefined;

    return (
      <span
        ref={ref}
        role="status"
        className={`${spinnerRecipe({ size })} ${className || ''}`.trim()}
        style={{ ...colorStyle, ...cssStyles, ...style, ...assignInlineVars(vars) }}
        {...props}
      >
        <svg
          className={svg}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          aria-hidden
          focusable="false"
        >
          <circle className={track} cx="12" cy="12" r="9" />
          <path d="M12 3a9 9 0 0 1 9 9" />
        </svg>
        <span className={hiddenLabel}>{label}</span>
      </span>
    );
  },
);

SpinnerVanilla.displayName = 'SpinnerVanilla';
