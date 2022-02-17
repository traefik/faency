import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { Checkbox, CheckboxProps, CheckboxVariants } from './Checkbox';

const BaseCheckbox = (props: CheckboxProps): JSX.Element => <Checkbox {...props} />;
const CheckboxForStory = modifyVariantsForStory<
  CheckboxVariants,
  CheckboxProps & React.InputHTMLAttributes<any>
>(BaseCheckbox);

export default {
  title: 'Components/Checkbox',
  component: CheckboxForStory,
  argTypes: { onCheckedChange: { action: 'checkedChange' } },
} as ComponentMeta<typeof CheckboxForStory>;

const Template: ComponentStory<typeof CheckboxForStory> = (args) => <CheckboxForStory {...args} />;

export const Basic = Template.bind({});

Basic.args = {};

export const Size = Template.bind({});

Size.args = {
  size: 'large',
};

export const Disabled = Template.bind({});

Disabled.args = {
  disabled: true,
  checked: true,
  size: 'large',
};

const Customize: ComponentStory<typeof CheckboxForStory> = (args) => <CheckboxForStory css={{ c: '$hiContrast' }} {...args} />;