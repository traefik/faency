import { VariantProps } from '@stitches/react';
import { forwardRef } from 'markdown-to-jsx/node_modules/@types/react';
import { styled } from '../../stitches.config';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';

import { Input, InputProps, InputVariants } from '../Input';


// handles error specific layout + search layout
export const TextField = React.forwardRef<
  React.ElementRef<typeof Input>,
  InputProps
>(({ }, ref) => {
  error && ()
    <>
    // displays icons correctly
    <InputField startIcon={ } endIcon={ } />
  </>
})

export type TextFieldVariants = VariantProps<typeof TextField>;
export type TextFieldProps = TextFieldVariants & {};
