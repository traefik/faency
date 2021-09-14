import React from 'react';
import { VariantProps } from '@stitches/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Radio, RadioVariants, RadioProps, RadioGroup } from './Radio';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';

const BaseRadio = (props: RadioProps): JSX.Element => <Radio {...props} />;
const RadioForStory = modifyVariantsForStory<RadioVariants, RadioProps>(BaseRadio);

export type RadioGroupVariants = VariantProps<typeof RadioGroup>;
export interface RadioGroupProps extends RadioGroupVariants {}
const BaseRadioGroup = (props: RadioGroupProps): JSX.Element => <RadioGroup {...props} />;
export const RadioGroupForStory = modifyVariantsForStory<
  RadioGroupVariants,
  RadioGroupProps & React.InputHTMLAttributes<any>
>(BaseRadioGroup);

export default {
  title: 'Components/Radio',
  component: RadioForStory,
} as ComponentMeta<typeof RadioForStory>;

const Template: ComponentStory<typeof RadioForStory> = ({ value, ...args }) => (
  <RadioGroupForStory defaultValue="1">
    <RadioForStory value="1" css={{ mr: '$5' }} {...args} />
    <RadioForStory value="2" css={{ mr: '$5' }} {...args} />
  </RadioGroupForStory>
);

export const Basic = Template.bind({});

Basic.args = {};

export const Size = Template.bind({});

Size.args = {
  size: '2',
};

export const Disabled = Template.bind({});

Disabled.args = {
  disabled: true,
  size: 2,
};
