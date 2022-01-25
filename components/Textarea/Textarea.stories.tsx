import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';

import { Textarea, TextareaProps, TextareaVariants } from './Textarea';
import { Box } from '../Box';
import { Flex } from '../Flex';
import ignoreArgType from '../../utils/ignoreArgType';

const BaseTextarea = (props: TextareaProps): JSX.Element => <Textarea {...props} />;

const TextareaForStory = modifyVariantsForStory<
  TextareaVariants,
  TextareaProps
>(BaseTextarea);

export default {
  title: 'Components/Textarea',
  component: TextareaForStory,
} as ComponentMeta<typeof TextareaForStory>;



const Template: ComponentStory<typeof TextareaForStory> = (args) => (
  <Box>
    <TextareaForStory {...args} />
  </Box>
);

export const Basic = Template.bind({});
Basic.args = {
  id: 'basic-textarea',
  placeholder: 'Basic',
};
ignoreArgType('id', Basic);

export const RowsCols = Template.bind({});
RowsCols.args = {
  id: 'rowscols-textarea',
  label: 'RowCols',
  cols: 64,
  rows: 16,
}
ignoreArgType('id', RowsCols);

export const Resize = Template.bind({});
Resize.args = {
  id: 'resize-textarea',
  label: 'Resize',
  resize: 'both',
};
ignoreArgType('id', Resize);
Resize.argTypes = {
  resize: {
    control: 'inline-radio',
    options: ['both', 'vertical', 'horizontal', 'none']
  }
}

export const Labelled = Template.bind({});
Labelled.args = {
  id: 'labelled-textarea',
  label: 'Labelled',
}
ignoreArgType('id', Labelled);

export const Invalid = Template.bind({});
Invalid.args = {
  id: 'invalid-textarea',
  label: 'Invalid',
  state: 'invalid',
}
ignoreArgType('id', Invalid);


export const Disabled = Template.bind({});
Disabled.args = { id: 'disabled-textarea', label: 'disabled', disabled: true, defaultValue: 'default value' };
ignoreArgType('id', Disabled);

export const ReadOnly = Template.bind({});
ReadOnly.args = { id: 'readonly-textarea', readOnly: true, defaultValue: 'default value' };
ignoreArgType('id', ReadOnly);

export const Ghost: ComponentStory<typeof TextareaForStory> = (args) => (
  <Flex direction="column" gap={2}>
    <TextareaForStory id="ghost-textarea" label='Ghost textarea' {...args} />
    <TextareaForStory id="ghost-invalid-textarea" label="Ghost invalid textarea" state="invalid" {...args} />
    <TextareaForStory id="ghost-disabled-textarea" label="Ghost disabled textarea" disabled {...args} />
    <TextareaForStory id="ghost-readonly-textarea" label="Ghost readonly textarea" readOnly {...args} />
  </Flex>
);
Ghost.args = { defaultValue: 'default value', variant: 'ghost', rows: 2 };
