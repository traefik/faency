import { assignInlineVars } from '@vanilla-extract/dynamic';
import { forwardRef } from 'react';

import { CSSProps, processCSSProp } from '../../styles/cssProps';
import { useVanillaExtractTheme } from '../../styles/themeContext';
import { panelStyle } from './Panel.vanilla.css';

export type PanelVanillaProps = React.ComponentProps<'div'> & CSSProps;

export const PanelVanilla = forwardRef<HTMLDivElement, PanelVanillaProps>(
  ({ className, css, style, ...props }, ref) => {
    const { colors } = useVanillaExtractTheme();
    const { style: cssStyles, vars } = processCSSProp(css, colors);
    const mergedStyles = { ...cssStyles, ...style, ...assignInlineVars(vars) };

    return (
      <div
        ref={ref}
        className={`${panelStyle} ${className || ''}`.trim()}
        style={mergedStyles}
        {...props}
      />
    );
  },
);

PanelVanilla.displayName = 'PanelVanilla';
