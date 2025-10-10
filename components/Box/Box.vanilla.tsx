import { assignInlineVars } from '@vanilla-extract/dynamic';
import { forwardRef } from 'react';

import { CSSProps, processCSSProp } from '../../styles/cssProps';
import { useVanillaExtractTheme } from '../../styles/themeContext';
import { box } from './Box.vanilla.css';

interface BoxProps extends React.HTMLAttributes<HTMLDivElement>, CSSProps {
  as?: keyof JSX.IntrinsicElements;
}

export const BoxVanilla = forwardRef<HTMLDivElement, BoxProps>(
  ({ as: Component = 'div', className, css, style, ...props }, ref) => {
    const Element = Component as 'div';

    const { colors } = useVanillaExtractTheme();

    const { style: cssStyles, vars } = processCSSProp(css, colors);

    const mergedStyles = {
      ...cssStyles,
      ...style,
      ...assignInlineVars(vars),
    };

    return (
      <Element
        ref={ref}
        className={`${box} ${className || ''}`.trim()}
        style={mergedStyles}
        {...props}
      />
    );
  },
);

BoxVanilla.displayName = 'BoxVanilla';
