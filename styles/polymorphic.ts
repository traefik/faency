import { ComponentPropsWithRef, ElementType, ReactElement } from 'react';

export type PolymorphicRef<C extends ElementType> = ComponentPropsWithRef<C>['ref'];

/**
 * `as`, the component's own props, and the native props of the `as` element.
 * @example type BoxProps<C extends ElementType = 'div'> = PolymorphicComponentProps<C, CSSProps>;
 */
export type PolymorphicComponentProps<C extends ElementType, Props = object> = {
  as?: C;
} & Props &
  Omit<ComponentPropsWithRef<C>, keyof Props | 'as'>;

/**
 * Exported type of a polymorphic component: allowed props follow the `as` element.
 * @example export const Box = BoxImpl as PolymorphicComponent<'div', CSSProps>;
 */
export type PolymorphicComponent<C extends ElementType = 'div', OwnProps = object> = {
  <E extends ElementType = C>(props: PolymorphicComponentProps<E, OwnProps>): ReactElement | null;
  displayName?: string;
};
