import React, { useState, useCallback } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';

import { Textarea, TextareaProps, TextareaVariants } from './Textarea';
import { Box } from '../Box';
import { Flex } from '../Flex';
import ignoreArgType from '../../utils/ignoreArgType';
import { CopyIcon, CheckCircledIcon, InfoCircledIcon } from '@radix-ui/react-icons';
import { styled } from '../../stitches.config';

const BaseTextarea = (props: TextareaProps): JSX.Element => <Textarea {...props} />;

const TextareaForStory = modifyVariantsForStory<TextareaVariants, TextareaProps>(BaseTextarea);

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
};
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
    options: ['both', 'vertical', 'horizontal', 'none'],
  },
};

export const Labelled = Template.bind({});
Labelled.args = {
  id: 'labelled-textarea',
  label: 'Labelled',
};
ignoreArgType('id', Labelled);

export const Invalid = Template.bind({});
Invalid.args = {
  id: 'invalid-textarea',
  label: 'Invalid',
  state: 'invalid',
};
ignoreArgType('id', Invalid);

export const Disabled = Template.bind({});
Disabled.args = {
  id: 'disabled-textarea',
  label: 'disabled',
  disabled: true,
  defaultValue: 'default value',
};
ignoreArgType('id', Disabled);

export const ReadOnly = Template.bind({});
ReadOnly.args = { id: 'readonly-textarea', readOnly: true, defaultValue: 'default value' };
ignoreArgType('id', ReadOnly);

export const Ghost: ComponentStory<typeof TextareaForStory> = (args) => (
  <Flex direction="column" gap={2}>
    <TextareaForStory id="ghost-textarea" label="Ghost textarea" {...args} />
    <TextareaForStory
      id="ghost-invalid-textarea"
      label="Ghost invalid textarea"
      state="invalid"
      {...args}
    />
    <TextareaForStory
      id="ghost-disabled-textarea"
      label="Ghost disabled textarea"
      disabled
      {...args}
    />
    <TextareaForStory
      id="ghost-readonly-textarea"
      label="Ghost readonly textarea"
      readOnly
      {...args}
    />
  </Flex>
);
Ghost.args = { defaultValue: 'default value', variant: 'ghost', rows: 2 };

const StyledCopyIcon = styled(CopyIcon, {
  '@hover': {
    '&:hover': {
      cursor: 'pointer',
    },
  },
});

export const EndAdornment = Template.bind({});
EndAdornment.args = {
  endAdornment: <InfoCircledIcon />,
};

export const ReadOnlyCopy: ComponentStory<typeof TextareaForStory> = (args) => {
  const toCopy = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
  laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
  voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
  non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    await navigator.clipboard.writeText(toCopy);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [toCopy, setCopied]);

  return (
    <Flex direction="column" gap={2}>
      <TextareaForStory
        id={`readOnly-copy`}
        label="readOnly Copy"
        rows={10}
        cols={40}
        value={toCopy}
        readOnly
        endAdornment={
          copied ? (
            <CheckCircledIcon aria-label="Copied" />
          ) : (
            <StyledCopyIcon aria-label="Copy" onClick={onCopy} />
          )
        }
        {...args}
      />
    </Flex>
  );
};

const Customize: ComponentStory<typeof TextareaForStory> = (args) => (
  <Textarea {...args} css={{ c: '$hiContrast' }} />
);
