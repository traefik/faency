import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MagnifyingGlassIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { IconButton } from '../IconButton';
import { Input, InputProps, InputVariants } from './Input';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { Flex } from '../Flex';

const BaseInput = (props: InputProps): JSX.Element => <Input {...props} />;
const InputForStory = modifyVariantsForStory<
  InputVariants,
  InputProps & React.InputHTMLAttributes<any>
>(BaseInput);

export default {
  title: 'Components/Input',
  component: InputForStory,
  argTypes: { onClick: { action: 'clicked' } },
} as ComponentMeta<typeof InputForStory>;

const Template: ComponentStory<typeof InputForStory> = (args) => (
  <InputForStory {...args} />
);

export const Basic: ComponentStory<typeof InputForStory> = (args) => (
  <Flex direction="column" gap={2}>
    <label>Default
      <InputForStory {...args} />
    </label>
    <label>Large
      <InputForStory size="large" {...args} />
    </label>
    <label>Ghost
      <InputForStory variant="ghost" {...args} />
    </label>
    <label>Adornments
      <InputForStory
        startAdornment={<MagnifyingGlassIcon />}
        endAdornment={<IconButton><EyeOpenIcon /></IconButton>}
        {...args} />
    </label>
  </Flex>
);
Basic.args = { placeholder: 'placeholder' };

const INPUT_TYPES = [
  'button', 'checkbox', 'reset', 'submit',
  'color', 'file', 'password', 'radio', 'range',
  'date', "datetime-local", "month", 'time', 'week',
  'email', 'number', 'search', 'tel', 'text', 'url'
];

export const Types: ComponentStory<typeof InputForStory> = ({ type, ...args }) => (
  <Flex direction="column" gap={2}>
    {INPUT_TYPES.map((type) => (
      <label key={type}>{type}
        <InputForStory {...args} type={type} />
      </label>
    ))}
  </Flex>
)

Types.args = {};

export const Invalid = Basic.bind({});
Invalid.args = { state: 'invalid' };

export const Disabled = Basic.bind({});

Disabled.args = { disabled: true, value: 'value' };

export const ReadOnly = Basic.bind({});

ReadOnly.args = { readOnly: true, value: 'value' };

export const Ghost = Basic.bind({});

Ghost.args = { variant: 'ghost' };

export const Adornments = Basic.bind({});

Adornments.args = {
  startAdornment: <MagnifyingGlassIcon />,
  endAdornment: <IconButton><EyeOpenIcon /></IconButton>
}