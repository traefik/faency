import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { LabelForStory } from './Label';
import { Box } from '../Box';
import { TextField } from '../TextField';

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
