import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { VariantProps } from '@stitches/react';

import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { Label } from './Label';
import { Box } from '../Box';
import { TextField } from '../TextField';

type LabelVariants = VariantProps<typeof Label>;
export interface LabelProps extends LabelVariants {}
const BaseLabel = (props: LabelProps): JSX.Element => <Label {...props} />;
export const LabelForStory = modifyVariantsForStory<
  LabelVariants,
  LabelProps & React.LabelHTMLAttributes<any>
>(BaseLabel);

export default {
  title: 'Components/Label',
  component: LabelForStory,
} as ComponentMeta<typeof LabelForStory>;

export const Basic: ComponentStory<typeof LabelForStory> = (args) => (
  <Box>
    <LabelForStory htmlFor="email" {...args}>
      Email
    </LabelForStory>
    <TextField id="email" name="email" type="email" />
  </Box>
);

Basic.args = {};
