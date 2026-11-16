import { assignInlineVars } from '@vanilla-extract/dynamic';
import type React from 'react';

import { CSSProps, processCSSProp } from './cssProps';
import { useVanillaExtractTheme } from './themeContext';

export const useInlineStyle = (css: CSSProps['css'], style?: React.CSSProperties) => {
  const { colors } = useVanillaExtractTheme();
  const { style: cssStyles, vars } = processCSSProp(css, colors);
  return { ...cssStyles, ...style, ...assignInlineVars(vars) };
};
