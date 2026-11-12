import { assignInlineVars } from '@vanilla-extract/dynamic';
import type React from 'react';

import { CSSProps, processCSSProp } from '../../styles/cssProps';
import { useVanillaExtractTheme } from '../../styles/themeContext';

export const cx = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(' ');

export const useInlineStyle = (css: CSSProps['css'], style?: React.CSSProperties) => {
  const { colors } = useVanillaExtractTheme();
  const { style: cssStyles, vars } = processCSSProp(css, colors);
  return { ...cssStyles, ...style, ...assignInlineVars(vars) };
};
