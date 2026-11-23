import * as VisuallyHiddenPrimitive from '@radix-ui/react-visually-hidden';
import { ElementType } from 'react';

import { createPolymorphicPart } from '@/styles/createPolymorphicPart';
import { CSSProps } from '@/styles/cssProps';
import { PolymorphicComponentProps } from '@/styles/polymorphic';

export type VisuallyHiddenVanillaProps<C extends ElementType = 'span'> = PolymorphicComponentProps<
  C,
  CSSProps
>;

export const VisuallyHiddenVanilla = createPolymorphicPart<'span'>(VisuallyHiddenPrimitive.Root, {
  displayName: 'VisuallyHiddenVanilla',
});
