import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { VariantProps } from '@stitches/react';

import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { Label } from './Label';
import { Box } from '../Box';

type LabelVariants = VariantProps<typeof Label>;
type LabelProps = LabelVariants & {};

const BaseLabel = (props: LabelProps): JSX.Element => <Label {...props} />;
const LabelForStory = modifyVariantsForStory<
  LabelVariants,
  LabelProps & React.LabelHTMLAttributes<any>
>(BaseLabel);

export default {
  title: 'Components/Label',
  component: LabelForStory,
} as ComponentMeta<typeof LabelForStory>;

const Template: ComponentStory<typeof LabelForStory> = ({ id, ...args }) => (
  <Box>
    <LabelForStory htmlFor={id} css={{ mr: '$2' }} {...args}>
      Email
    </LabelForStory>
    <input id={id} name="email" type="email" />
  </Box>
);

export const Basic = Template.bind({});

Basic.args = {
  id: 'basic'
};

export const Capitalized = Template.bind({});

Capitalized.args = {
  id: 'capitalized',
}

export const Uppercased = Template.bind({});

Uppercased.args = {
  id: 'uppercased',
  transform: 'uppercase',
};

export const Error = Template.bind({});

Error.args = {
  id: 'error',
  variant: 'red',
};

