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

const AlertVanillaComponentImpl = forwardRef(
  // Not generic: TS can't match a generic `as` against CardVanilla's; the export cast types `as`.
  (
    { variant, className, ...props }: AlertVanillaProps<ElementType>,
    ref?: PolymorphicRef<ElementType>,
  ) => <CardVanilla ref={ref} className={cx(alertClass({ variant }), className)} {...props} />,
);

AlertVanillaComponentImpl.displayName = 'AlertVanilla';

export const AlertVanilla = AlertVanillaComponentImpl as PolymorphicComponent<'div', AlertOwnProps>;
