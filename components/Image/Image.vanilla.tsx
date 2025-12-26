import { assignInlineVars } from '@vanilla-extract/dynamic';
import { forwardRef } from 'react';

import { CSSProps, processCSSProp } from '../../styles/cssProps';
import { useVanillaExtractTheme } from '../../styles/themeContext';
import { image } from './Image.vanilla.css';

export interface ImageVanillaProps extends React.ImgHTMLAttributes<HTMLImageElement>, CSSProps {}

export const ImageVanilla = forwardRef<HTMLImageElement, ImageVanillaProps>(
  ({ className, css, style, ...props }, ref) => {
    const { colors } = useVanillaExtractTheme();
    const { style: cssStyles, vars } = processCSSProp(css, colors);

    const mergedStyles = {
      ...cssStyles,
      ...style,
      ...assignInlineVars(vars),
    };

    return (
      <img
        ref={ref}
        className={`${image} ${className || ''}`.trim()}
        style={mergedStyles}
        {...props}
      />
    );
  },
);

ImageVanilla.displayName = 'ImageVanilla';
