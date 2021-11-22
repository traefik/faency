import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { styled } from '../../stitches.config';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';

import { Input, InputProps, InputVariants } from './Input';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { Label } from '../Label';

import { MagnifyingGlassIcon, EyeOpenIcon } from '@radix-ui/react-icons';

const StyledEyeOpenIcon = styled(EyeOpenIcon, {
  '@hover': {
    '&:hover': {
      cursor: 'pointer',
    },
  },
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
      <Label htmlFor="small">Small</Label>
      <InputForStory id="small" size="small" {...args} />
    </Box>

    <Box>
      <Label htmlFor="default">Default</Label>
      <InputForStory id="default" {...args} />
    </Box>

    <Box>
      <Label htmlFor="large">Large</Label>
      <InputForStory id="large" size="large" {...args} />
    </Box>

    <Box>
      <Label htmlFor="ghost">Ghost</Label>
      <InputForStory id="ghost" variant="ghost" {...args} />
    </Box>

    <Box>
      <Label htmlFor="adornments">Adornments</Label>
      <InputForStory
        id="adornments"
        startAdornment={<MagnifyingGlassIcon />}
        endAdornment={<StyledEyeOpenIcon />}
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
        <Label htmlFor={type} key={type}>{type}</Label>
        <InputForStory id={type} {...args} type={type} />
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
    <Box>
      <Label htmlFor="small">
        Small
      </Label>
      <InputForStory size="small" {...args} />
    </Box>
    <Box>
      <Label htmlFor="default">
        Default
      </Label>
      <InputForStory id="default" {...args} />
    </Box>
    <Box>
      <Label htmlFor="large">
        Large
      </Label>
      <InputForStory id="large" size="large" {...args} />
    </Box>
    <Box>
      <Label htmlFor="invalid">
        Invalid
      </Label>
      <InputForStory id="invalid" state="invalid" {...args} />
    </Box>
    <Box>
      <Label htmlFor="disabled">
        Disabled
      </Label>
      <InputForStory id="disabled" disabled {...args} />
    </Box>
    <Box>
      <Label htmlFor="readonly">
        ReadOnly
      </Label>
      <InputForStory id="readonly" readOnly {...args} />
    </Box>
    <Box>
      <Label htmlFor="adornments">
        Adornments
      </Label>
      <InputForStory
        id="adornments"
        startAdornment={<MagnifyingGlassIcon />}
        endAdornment={<StyledEyeOpenIcon />}
        {...args}
      />
    </Box>
  </Flex>
);
Ghost.args = { defaultValue: 'value', variant: 'ghost' };

export const Adornments = Basic.bind({});

Adornments.args = {
  startAdornment: <MagnifyingGlassIcon />,
  endAdornment: <StyledEyeOpenIcon />,
};
Adornments.argTypes = {
  startAdornment: {
    options: ['search', 'eye'],
    mapping: {
      search: <MagnifyingGlassIcon />,
      eye: <StyledEyeOpenIcon />,
    },
  },
  endAdornment: {
    options: ['search', 'eye'],
    mapping: {
      search: <MagnifyingGlassIcon />,
      eye: <StyledEyeOpenIcon />,
    },
  },
};

export const Autofill: ComponentStory<typeof InputForStory> = (args) => (
  <form>
    <Flex direction="column" gap={2}>
      <Box>
        <Label htmlFor="small">
          Small
        </Label>
        <InputForStory id="small" name="ship-city" autoComplete="shipping locality" size="small" {...args} />
      </Box>
      <Box>
        <Label htmlFor="default">
          Default
        </Label>
        <InputForStory id="default" name="ship-organization" autoComplete="shipping organization" {...args} />
      </Box>
      <Box>
        <Label htmlFor="large">
          Large
        </Label>
        <InputForStory
          id="large"
          name="ship-address"
          autoComplete="shipping street-address"
          size="large"
          {...args}
        />
      </Box>
      <Box>
        <Label htmlFor="ghost">
          Ghost
        </Label>
        <InputForStory
          id="ghost"
          name="ship-city"
          autoComplete="shipping locality"
          variant="ghost"
          {...args}
        />
      </Box>
      <Box>
        <Label htmlFor="invalid">
          Invalid
        </Label>
        <InputForStory
          id="invalid"
          name="ship-zip"
          autoComplete="shipping postal-code"
          state="invalid"
          {...args}
        />
      </Box>
      <Box>
        <Label htmlFor="adornments">
          Adornments
        </Label>
        <InputForStory
          id="adornments"
          name="ship-country"
          autoComplete="shipping country"
          startAdornment={<MagnifyingGlassIcon />}
          endAdornment={<StyledEyeOpenIcon />}
          {...args}
        />
      </Box>
    </Flex>
  </form>
);
