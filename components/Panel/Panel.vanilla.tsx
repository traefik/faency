import { assignInlineVars } from '@vanilla-extract/dynamic';
import { ElementType, forwardRef } from 'react';

import { CSSProps, processCSSProp } from '../../styles/cssProps';
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicRef,
} from '../../styles/polymorphic';
import { useVanillaExtractTheme } from '../../styles/themeContext';
import { panelStyle } from './Panel.vanilla.css';

export type PanelVanillaProps<C extends ElementType = 'div'> = PolymorphicComponentProps<
  C,
  CSSProps
>;

type PanelVanillaComponent = PolymorphicComponent<'div', PanelVanillaProps<ElementType>>;

const PanelVanillaComponentImpl = forwardRef(
  <C extends ElementType = 'div'>(
    { as, className, css, style, ...props }: PanelVanillaProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as || 'div';
    const { colors } = useVanillaExtractTheme();
    const { style: cssStyles, vars } = processCSSProp(css, colors);
    const mergedStyles = { ...cssStyles, ...style, ...assignInlineVars(vars) };

    return (
      <Component
        ref={ref}
        className={`${panelStyle} ${className || ''}`.trim()}
        style={mergedStyles}
        {...props}
      />
    );
  },
);

PanelVanillaComponentImpl.displayName = 'PanelVanilla';

export const PanelVanilla = PanelVanillaComponentImpl as PanelVanillaComponent;
