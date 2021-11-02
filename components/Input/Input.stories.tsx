import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { styled } from '../../stitches.config';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';

import { IconButton } from '../IconButton';
import { Input, InputProps, InputVariants } from './Input';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { Label } from '../Label';

import { MagnifyingGlassIcon, EyeOpenIcon } from '@radix-ui/react-icons';

const StyledMagnifyingGlassIcon = styled(MagnifyingGlassIcon, {
  color: '$slate10', // follow iconbutton default color
});

const StyledEyeOpenIcon = styled(EyeOpenIcon, {
  color: '$slate10', // follow iconbutton default color
});

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

const Template: ComponentStory<typeof InputForStory> = (args) => <InputForStory {...args} />;

export const Basic: ComponentStory<typeof InputForStory> = (args) => (
  <Flex direction="column" gap={2}>
    <Box>
      <Label>Small</Label>
      <InputForStory size="small" {...args} />
    </Box>

    <Box>
      <Label>Default</Label>
      <InputForStory {...args} />
    </Box>

    <Box>
      <Label>Large</Label>
      <InputForStory size="large" {...args} />
    </Box>

    <Box>
      <Label>Ghost</Label>
      <InputForStory variant="ghost" {...args} />
    </Box>

    <Box>
      <Label>Adornments</Label>
      <InputForStory
        startAdornment={<StyledMagnifyingGlassIcon />}
        endAdornment={
          <IconButton>
            <StyledEyeOpenIcon />
          </IconButton>
        }
        {...args}
      />
    </Box>
  </Flex>
);
Basic.args = { placeholder: 'placeholder' };

const INPUT_TYPES = [
  'button',
  'checkbox',
  'reset',
  'submit',
  'color',
  'file',
  'password',
  'radio',
  'range',
  'date',
  'datetime-local',
  'month',
  'time',
  'week',
  'email',
  'number',
  'search',
  'tel',
  'text',
  'url',
];

export const Types: ComponentStory<typeof InputForStory> = ({ type, ...args }) => (
  <Flex direction="column" gap={2}>
    {INPUT_TYPES.map((type) => (
      <>
        <Label key={type}>{type}</Label>
        <InputForStory {...args} type={type} />
      </>
    ))}
  </Flex>
);

Types.args = {};

export const Invalid = Basic.bind({});
Invalid.args = { state: 'invalid' };

export const Disabled = Basic.bind({});

Disabled.args = { disabled: true, defaultValue: 'value' };

export const ReadOnly = Basic.bind({});

ReadOnly.args = { readOnly: true, defaultValue: 'value' };

export const Ghost: ComponentStory<typeof InputForStory> = (args) => (
  <Flex direction="column" gap={2}>
    <Label>
      Small
      <InputForStory size="small" {...args} />
    </Label>
    <Label>
      Default
      <InputForStory {...args} />
    </Label>
    <Label>
      Large
      <InputForStory size="large" {...args} />
    </Label>
    <Label>
      Invalid
      <InputForStory state="invalid" {...args} />
    </Label>
    <Label>
      Disabled
      <InputForStory disabled {...args} />
    </Label>
    <Label>
      ReadOnly
      <InputForStory readOnly {...args} />
    </Label>
    <Label>
      Adornments
      <InputForStory
        startAdornment={<StyledMagnifyingGlassIcon />}
        endAdornment={
          <IconButton>
            <StyledEyeOpenIcon />
          </IconButton>
        }
        {...args}
      />
    </Label>
  </Flex>
);
Ghost.args = { defaultValue: 'value', variant: 'ghost' };

export const Adornments = Basic.bind({});

Adornments.args = {
  startAdornment: <StyledMagnifyingGlassIcon />,
  endAdornment: (
    <IconButton>
      <StyledEyeOpenIcon />
    </IconButton>
  ),
};
Adornments.argTypes = {
  startAdornment: {
    options: ['search', 'iconbutton'],
    mapping: {
      search: <StyledMagnifyingGlassIcon />,
      iconbutton: (
        <IconButton>
          <StyledEyeOpenIcon />
        </IconButton>
      ),
    },
  },
  endAdornment: {
    options: ['search', 'iconbutton'],
    mapping: {
      search: <StyledMagnifyingGlassIcon />,
      iconbutton: (
        <IconButton>
          <StyledEyeOpenIcon />
        </IconButton>
      ),
    },
  },
};

export const Autofill: ComponentStory<typeof InputForStory> = (args) => (
  <form>
    <Flex direction="column" gap={2}>
      <Label>
        Small
        <InputForStory name="ship-city" autoComplete="shipping locality" size="small" {...args} />
      </Label>
      <Label>
        Default
        <InputForStory name="ship-organization" autoComplete="shipping organization" {...args} />
      </Label>
      <Label>
        Large
        <InputForStory
          name="ship-address"
          autoComplete="shipping street-address"
          size="large"
          {...args}
        />
      </Label>
      <Label>
        Ghost
        <InputForStory
          name="ship-city"
          autoComplete="shipping locality"
          variant="ghost"
          {...args}
        />
      </Label>
      <Label>
        Invalid
        <InputForStory
          name="ship-zip"
          autoComplete="shipping postal-code"
          state="invalid"
          {...args}
        />
      </Label>
      <Label>
        Adornments
        <InputForStory
          name="ship-country"
          autoComplete="shipping country"
          startAdornment={<StyledMagnifyingGlassIcon />}
          endAdornment={
            <IconButton>
              <StyledEyeOpenIcon />
            </IconButton>
          }
          {...args}
        />
      </Label>
    </Flex>
  </form>
);
