import React, { useCallback, useEffect, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Flex } from '../Flex';
import { Label } from '../Label';
import { Text } from '../Text';
import { Popover, PopoverTrigger, PopoverContent } from '../Popover';
import { TextField, TextFieldProps, TextFieldVariants } from './TextField';
import {
  MagnifyingGlassIcon,
  InfoCircledIcon,
  CopyIcon,
  CheckCircledIcon,
} from '@radix-ui/react-icons';
import { styled } from '../../stitches.config';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import ignoreArgType from '../../utils/ignoreArgType';

const BaseTextField = (props: TextFieldProps): JSX.Element => <TextField {...props} />;
const TextFieldForStory = modifyVariantsForStory<
  TextFieldVariants,
  TextFieldProps & React.InputHTMLAttributes<any>
>(BaseTextField);

export default {
  title: 'Components/TextField',
  component: TextFieldForStory,
  argTypes: { onClick: { action: 'clicked' } },
} as ComponentMeta<typeof TextFieldForStory>;

const Template: ComponentStory<typeof TextFieldForStory> = (args) => (
  <TextFieldForStory {...args} />
);

export const Basic: ComponentStory<typeof TextFieldForStory> = ({ id, ...args }) => (
  <Flex direction="column" gap={2}>
    <TextFieldForStory
      size="small"
      id={`'${id}-small'`}
      label="small"
      placeholder="placeholder"
      {...args}
    />
    <TextFieldForStory id={`'${id}-basic'`} label="basic" placeholder="placeholder" {...args} />
    <TextFieldForStory
      size="large"
      id={`'${id}-large'`}
      label="large"
      placeholder="placeholder"
      {...args}
    />
    <TextFieldForStory
      state="invalid"
      id={`'${id}-invalid'`}
      label="invalid"
      placeholder="placeholder"
      {...args}
    />
    <TextFieldForStory
      startAdornment={<MagnifyingGlassIcon />}
      id={`'${id}-search'`}
      label="search"
      placeholder="Search..."
      {...args}
    />
  </Flex>
);

Basic.args = {
  id: 'basic',
};
ignoreArgType('id', Basic);

export const PasswordType = Template.bind({});
PasswordType.args = { type: 'password', id: 'passwordtype', label: 'password' };
ignoreArgType('id', PasswordType);

export const Clearable = Basic.bind({});
Clearable.args = { id: 'clearable', clearable: true };
ignoreArgType('id', Clearable);

export const Disabled = Basic.bind({});
Disabled.args = { id: 'disabled', disabled: true };
ignoreArgType('id', Disabled);

export const ReadOnly = Basic.bind({});
ReadOnly.args = { id: 'readonly', readOnly: true };
ignoreArgType('id', ReadOnly);

const StyledCopyIcon = styled(CopyIcon, {
  '@hover': {
    '&:hover': {
      cursor: 'pointer',
    },
  },
});

export const ReadOnlyCopy: ComponentStory<typeof TextFieldForStory> = (args) => {
  const toCopy = 'Text to copy';
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
      <TextFieldForStory
        id={`readOnly-copy`}
        label="readOnly Copy"
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

export const Display: ComponentStory<typeof TextFieldForStory> = ({ id, ...args }) => (
  <Flex direction="column" gap={2}>
    <TextFieldForStory
      id={`${id}-disabled`}
      label="disabled"
      placeholder="placeholder"
      value="disabled"
      disabled
      {...args}
    />
    <TextFieldForStory
      id={`${id}-readOnly`}
      label="readOnly"
      placeholder="placeholder"
      value="readOnly"
      readOnly
      {...args}
    />
  </Flex>
);

Display.args = {
  id: 'display',
};
ignoreArgType('id', Display);

export const DisplayClearable = Display.bind({});
DisplayClearable.args = {
  id: 'displayclearable',
  clearable: true,
};
ignoreArgType('id', DisplayClearable);

export const LabelComponent: ComponentStory<typeof TextFieldForStory> = ({ id, ...args }) => (
  <Flex direction="column" gap={2}>
    <TextFieldForStory id={`${id}-basic`} {...args} />
    <TextFieldForStory id={`${id}-invalid`} state="invalid" {...args} />
    <TextFieldForStory id={`${id}-disabled`} value="disabled" disabled {...args} />
  </Flex>
);

const StyledInfoCircledIcon = styled(InfoCircledIcon, {
  ml: '$2',
  '@hover': {
    '&:hover': {
      cursor: 'pointer',
    },
  },
});

const label = (props) => (
  <Label {...props}>
    <Flex align="center">
      Field Label
      <Popover>
        <PopoverTrigger asChild>
          <StyledInfoCircledIcon />
        </PopoverTrigger>
        <PopoverContent css={{ p: '$3' }}>
          <Text as="p" css={{ color: 'currentColor' }}>
            More information
          </Text>
        </PopoverContent>
      </Popover>
    </Flex>
  </Label>
);

LabelComponent.args = {
  id: 'labelcomponent',
  label: label,
};
ignoreArgType('id', LabelComponent);

const Customize: ComponentStory<typeof TextFieldForStory> = (args) => (
  <TextFieldForStory css={{ c: '$hiContrast' }} {...args} />
);
