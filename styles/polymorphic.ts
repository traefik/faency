import { ComponentPropsWithRef, ElementType } from 'react';

/**
 * Extracts the correct ref type for any element type.
 * @example PolymorphicRef<'button'> → React.Ref<HTMLButtonElement>
 */
export type PolymorphicRef<C extends ElementType> = ComponentPropsWithRef<C>['ref'];

/**
 * Creates a polymorphic component props type that merges:
 * - The 'as' prop for element type selection
 * - Custom component props
 * - Native HTML/SVG props for the selected element
 *
 * @template C - The element type (defaults to 'div')
 * @template Props - Custom component props to merge
 *
 * @example
 * // Simple usage with just CSSProps
 * type BoxProps<C extends ElementType = 'div'> = PolymorphicComponentProps<C, CSSProps>;
 *
 * // Usage with custom props
 * interface ButtonOwnProps extends CSSProps {
 *   variant?: 'primary' | 'secondary';
 *   size?: 'small' | 'medium' | 'large';
 * }
 * type ButtonProps<C extends ElementType = 'button'> = PolymorphicComponentProps<C, ButtonOwnProps>;
 */
export type PolymorphicComponentProps<C extends ElementType, Props = object> = {
  as?: C;
} & Props &
  Omit<ComponentPropsWithRef<C>, keyof Props | 'as'>;

/**
 * Type for a polymorphic component function signature.
 * Use this for the final exported component type after casting from forwardRef.
 *
 * @template C - The default element type
 * @template Props - The component's props type (should use PolymorphicComponentProps)
 *
 * @example
 * type BoxComponent = PolymorphicComponent<'div', BoxProps>;
 *
 * const BoxImpl = forwardRef(...);
 * export const Box = BoxImpl as BoxComponent;
 */
export type PolymorphicComponent<
  C extends ElementType = 'div',
  Props extends PolymorphicComponentProps<any, any> = PolymorphicComponentProps<C>,
> = <E extends ElementType = C>(props: Props & { as?: E }) => React.ReactElement | null;
