import { ElementType, forwardRef } from 'react';

import { CSSProps } from '@/styles/cssProps';
import { cx } from '@/styles/cx';
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicRef,
} from '@/styles/polymorphic';
import { useInlineStyle } from '@/styles/useInlineStyle';

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
    const mergedStyles = useInlineStyle(css, style);

    return (
      <Component ref={ref} className={cx(panelStyle, className)} style={mergedStyles} {...props} />
    );
  },
);

PanelVanillaComponentImpl.displayName = 'PanelVanilla';

export const PanelVanilla = PanelVanillaComponentImpl as PanelVanillaComponent;
