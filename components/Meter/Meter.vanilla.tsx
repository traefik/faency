import { assignInlineVars } from '@vanilla-extract/dynamic';
import React, { forwardRef } from 'react';

import { CSSProps, processCSSProp } from '../../styles/cssProps';
import { resolveColor } from '../../styles/resolveColor';
import { useVanillaExtractTheme } from '../../styles/themeContext';
import {
  caption,
  captionLabel,
  captionValue,
  root,
  segment,
  trackRecipe,
} from './Meter.vanilla.css';

export type MeterSegmentVanilla = {
  value: number;
  /** A color token such as `$chartStatusGood`, or any CSS color. Defaults to the chart series colors. */
  color?: string;
  /** Shown as a tooltip and read with the meter, e.g. "404: 30". */
  label?: string;
};

type MeterValueProps = Omit<MeterSegmentVanilla, 'label'> & { segments?: never };
type MeterSegmentsProps = { segments: MeterSegmentVanilla[]; value?: never; color?: never };

export type MeterVanillaProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'color'> &
  CSSProps &
  (MeterValueProps | MeterSegmentsProps) & {
    /** Defaults to 100 with `value`, and to the sum of the values with `segments`. */
    max?: number;
    /** Caption above the bar, on the left. Also the meter's accessible name. */
    label?: string;
    /** Caption above the bar, on the right, e.g. "42 GB / 100 GB". */
    valueLabel?: string;
    size?: 'small' | 'medium' | 'large';
  };

// TODO: replace the native `title` on segments with TooltipVanilla once it exists.
export const MeterVanilla = forwardRef<HTMLDivElement, MeterVanillaProps>(
  (
    {
      value,
      color,
      segments,
      max,
      label,
      valueLabel,
      size,
      className,
      css,
      style,
      'aria-label': ariaLabel,
      ...props
    },
    ref,
  ) => {
    const { colors } = useVanillaExtractTheme();
    const { style: cssStyles, vars } = processCSSProp(css, colors);

    const items: MeterSegmentVanilla[] = segments ?? [{ value: value ?? 0, color }];
    const values = items.map((s) => Math.max(0, s.value));
    const total = max ?? (segments ? values.reduce((sum, v) => sum + v, 0) : 100);

    let remaining = total;
    const widths = values.map((v) => {
      const shown = Math.min(v, Math.max(0, remaining));
      remaining -= shown;
      return total > 0 ? (shown / total) * 100 : 0;
    });

    const name = ariaLabel ?? label;
    const ariaProps =
      items.length === 1
        ? {
            role: 'meter',
            'aria-valuenow': Math.min(values[0], total),
            'aria-valuemin': 0,
            'aria-valuemax': total,
            'aria-valuetext': valueLabel ?? items[0].label,
            'aria-label': name ?? items[0].label,
          }
        : {
            role: 'img',
            'aria-label':
              ariaLabel ??
              [label, items.map((s) => s.label ?? String(s.value)).join(', ')]
                .filter(Boolean)
                .join(': '),
          };

    return (
      <div
        ref={ref}
        className={`${root} ${className || ''}`.trim()}
        style={{ ...cssStyles, ...style, ...assignInlineVars(vars) }}
        {...props}
      >
        {(label || valueLabel) && (
          // Hidden from assistive tech: the meter's name and value text already carry it.
          <div className={caption} aria-hidden>
            {label && <span className={captionLabel}>{label}</span>}
            {valueLabel && <span className={captionValue}>{valueLabel}</span>}
          </div>
        )}
        <div className={trackRecipe({ size })} {...ariaProps}>
          {items.map((s, i) => (
            <div
              key={i}
              className={segment}
              title={s.label}
              style={{
                width: `${widths[i]}%`,
                backgroundColor: s.color && resolveColor(s.color, colors),
              }}
            />
          ))}
        </div>
      </div>
    );
  },
);

MeterVanilla.displayName = 'MeterVanilla';
