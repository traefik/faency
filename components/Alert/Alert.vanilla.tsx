import { ElementType, forwardRef } from 'react';

import { CSSProps } from '@/styles/cssProps';
import { cx } from '@/styles/cx';
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicRef,
} from '@/styles/polymorphic';
import { RecipeVariantProps, withVariantKeys } from '@/styles/recipeVariants';

import { CardVanilla, CardVanillaProps } from '@/components/Card/Card.vanilla';

import { alertRecipe } from './Alert.vanilla.css';

const alertClass = withVariantKeys(alertRecipe);

type AlertOwnProps = Pick<CardVanillaProps, 'elevation' | 'active' | 'interactive'> &
  RecipeVariantProps<typeof alertRecipe> &
  CSSProps;

export type AlertVanillaProps<C extends ElementType = 'div'> = PolymorphicComponentProps<
  C,
  AlertOwnProps
>;

type AlertVanillaComponent = PolymorphicComponent<'div', AlertVanillaProps<ElementType>>;

const AlertVanillaComponentImpl = forwardRef(
  <C extends ElementType = 'div'>(
    { variant, className, ...props }: AlertVanillaProps<C>,
    ref?: PolymorphicRef<C>,
  ) => <CardVanilla ref={ref} className={cx(alertClass({ variant }), className)} {...props} />,
);

AlertVanillaComponentImpl.displayName = 'AlertVanilla';

export const AlertVanilla = AlertVanillaComponentImpl as AlertVanillaComponent;
