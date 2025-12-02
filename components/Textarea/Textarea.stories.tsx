import { CheckCircledIcon, CopyIcon, InfoCircledIcon } from '@radix-ui/react-icons';
// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React, { useCallback, useState } from 'react';

import { styled } from '../../stitches.config';
import ignoreArgType from '../../utils/ignoreArgType';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { Text } from '../Text';
import { Textarea, TextareaProps, TextareaVariants } from './Textarea';
import { TextareaVanilla } from './Textarea.vanilla';

const BaseTextarea = (props: TextareaProps): JSX.Element => <Textarea {...props} />;

const TextareaForStory = modifyVariantsForStory<TextareaVariants, TextareaProps>(BaseTextarea);

const Component: Meta<typeof TextareaForStory> = {
  title: 'Components/Textarea',
  component: TextareaForStory,
};

const Template: StoryFn<typeof TextareaForStory> = (args) => (
  <Box>
    <TextareaForStory {...args} />
  </Box>
);

export const Basic: StoryFn<typeof TextareaForStory> = Template.bind({});
Basic.args = {
  id: 'basic-textarea',
  placeholder: 'Basic',
};
ignoreArgType('id', Basic);

export const RowsCols: StoryFn<typeof TextareaForStory> = Template.bind({});
RowsCols.args = {
  id: 'rowscols-textarea',
  label: 'RowCols',
  cols: 64,
  rows: 16,
};
ignoreArgType('id', RowsCols);

export const Resize: StoryFn<typeof TextareaForStory> = Template.bind({});
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

export const Labelled: StoryFn<typeof TextareaForStory> = Template.bind({});
Labelled.args = {
  id: 'labelled-textarea',
  label: 'Labelled',
};
ignoreArgType('id', Labelled);

export const Invalid: StoryFn<typeof TextareaForStory> = Template.bind({});
Invalid.args = {
  id: 'invalid-textarea',
  label: 'Invalid',
  state: 'invalid',
};
ignoreArgType('id', Invalid);

export const Disabled: StoryFn<typeof TextareaForStory> = Template.bind({});
Disabled.args = {
  id: 'disabled-textarea',
  label: 'disabled',
  disabled: true,
  defaultValue: 'default value',
};
ignoreArgType('id', Disabled);

export const ReadOnly: StoryFn<typeof TextareaForStory> = Template.bind({});
ReadOnly.args = { id: 'readonly-textarea', readOnly: true, defaultValue: 'default value' };
ignoreArgType('id', ReadOnly);

export const Ghost: StoryFn<typeof TextareaForStory> = (args) => (
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

export const EndAdornment: StoryFn<typeof TextareaForStory> = Template.bind({});
EndAdornment.args = {
  endAdornment: <InfoCircledIcon />,
};

export const ReadOnlyCopy: StoryFn<typeof TextareaForStory> = (args) => {
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

export const Comparison: StoryFn = () => {
  return (
    <Flex css={{ gap: '$3' }}>
      {/* Stitches Column */}
      <Flex css={{ flex: 1, flexDirection: 'column', gap: '$3' }}>
        <Text weight="medium">Stitches</Text>

        <Textarea id="stitches-basic" label="Basic" placeholder="Basic textarea" rows={4} />
        <Textarea
          id="stitches-invalid"
          state="invalid"
          label="Invalid"
          placeholder="Invalid textarea"
          rows={4}
        />
        <Textarea
          id="stitches-disabled"
          disabled
          label="Disabled"
          defaultValue="Disabled textarea"
          rows={4}
        />
        <Textarea
          id="stitches-ghost"
          variant="ghost"
          label="Ghost"
          placeholder="Ghost variant"
          rows={4}
        />
        <Textarea
          id="stitches-resize-none"
          resize="none"
          label="No Resize"
          placeholder="Cannot resize"
          rows={4}
        />
        <Textarea
          id="stitches-resize-vertical"
          resize="vertical"
          label="Vertical Resize"
          placeholder="Vertical resize only"
          rows={4}
        />
      </Flex>

      {/* Vanilla Extract Column */}
      <Flex css={{ flex: 1, flexDirection: 'column', gap: '$3' }}>
        <Text weight="medium">Vanilla Extract</Text>

        <TextareaVanilla id="vanilla-basic" label="Basic" placeholder="Basic textarea" rows={4} />
        <TextareaVanilla
          id="vanilla-invalid"
          state="invalid"
          label="Invalid"
          placeholder="Invalid textarea"
          rows={4}
        />
        <TextareaVanilla
          id="vanilla-disabled"
          disabled
          label="Disabled"
          defaultValue="Disabled textarea"
          rows={4}
        />
        <TextareaVanilla
          id="vanilla-ghost"
          variant="ghost"
          label="Ghost"
          placeholder="Ghost variant"
          rows={4}
        />
        <TextareaVanilla
          id="vanilla-resize-none"
          resize="none"
          label="No Resize"
          placeholder="Cannot resize"
          rows={4}
        />
        <TextareaVanilla
          id="vanilla-resize-vertical"
          resize="vertical"
          label="Vertical Resize"
          placeholder="Vertical resize only"
          rows={4}
        />
      </Flex>
    </Flex>
  );
};

export default Component;
