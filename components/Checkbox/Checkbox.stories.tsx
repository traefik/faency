import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { Checkbox, CheckboxProps, CheckboxVariants } from './Checkbox';

const BaseCheckbox = (props: CheckboxProps): JSX.Element => <Checkbox {...props} />;
const CheckboxForStory = modifyVariantsForStory<
  CheckboxVariants,
  CheckboxProps & React.InputHTMLAttributes<any>
>(BaseCheckbox);

const Component: Meta<typeof CheckboxForStory> = {
  title: 'Components/Checkbox',
  component: CheckboxForStory,
  argTypes: { onCheckedChange: { action: 'checkedChange' } },
};

const Template: StoryFn<typeof CheckboxForStory> = (args) => <CheckboxForStory {...args} />;

export const Basic: StoryFn<typeof CheckboxForStory> = Template.bind({});

Basic.args = {};

export const Size: StoryFn<typeof CheckboxForStory> = Template.bind({});

Size.args = {
  size: 'large',
};

export const Disabled: StoryFn<typeof CheckboxForStory> = Template.bind({});

Disabled.args = {
  disabled: true,
  checked: true,
  size: 'large',
};

const Customize: StoryFn<typeof CheckboxForStory> = (args) => (
  <CheckboxForStory css={{ c: '$hiContrast' }} {...args} />
);

export default Component;
