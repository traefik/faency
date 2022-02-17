import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { styled } from '../../stitches.config';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';

import { Input, InputProps, InputVariants } from './Input';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { Label } from '../Label';

import { MagnifyingGlassIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import ignoreArgType from '../../utils/ignoreArgType';

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

export const Basic: ComponentStory<typeof InputForStory> = ({ id, ...args }) => (
  <Flex direction="column" gap={2}>
    <Box>
      <Label htmlFor={`${id}-small`}>Small</Label>
      <InputForStory id={`${id}-small`} size="small" {...args} />
    </Box>

    <Box>
      <Label htmlFor={`${id}-default`}>Default</Label>
      <InputForStory id={`${id}-default`} {...args} />
    </Box>

    <Box>
      <Label htmlFor={`${id}-large`}>Large</Label>
      <InputForStory id={`${id}-large`} size="large" {...args} />
    </Box>

    <Box>
      <Label htmlFor={`${id}-ghost`}>Ghost</Label>
      <InputForStory id={`${id}-ghost`} variant="ghost" {...args} />
    </Box>

    <Box>
      <Label htmlFor={`${id}-adornments`}>Adornments</Label>
      <InputForStory
        id={`${id}-adornments`}
        startAdornment={<MagnifyingGlassIcon />}
        endAdornment={<StyledEyeOpenIcon />}
        {...args}
      />
    </Box>
  </Flex>
);
Basic.args = { placeholder: 'placeholder' };
ignoreArgType('id', Basic);

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
        <Label htmlFor={`types-${type}`} key={type}>{type}</Label>
        <InputForStory id={`types-${type}`} {...args} type={type} />
      </>
    ))}
  </Flex>
);

Types.args = {};

export const Invalid = Basic.bind({});
Invalid.args = { id: 'invalid', state: 'invalid' };
ignoreArgType('id', Invalid);

export const Disabled = Basic.bind({});

Disabled.args = { id: 'disabled', disabled: true, defaultValue: 'value' };
ignoreArgType('id', Disabled);

export const ReadOnly = Basic.bind({});
ReadOnly.args = { id: 'readonly', readOnly: true, defaultValue: 'value' };
ignoreArgType('id', ReadOnly);

export const Ghost: ComponentStory<typeof InputForStory> = (args) => (
  <Flex direction="column" gap={2}>
    <Box>
      <Label htmlFor="ghost-small">
        Small
      </Label>
      <InputForStory id="ghost-small" size="small" {...args} />
    </Box>
    <Box>
      <Label htmlFor="ghost-default">
        Default
      </Label>
      <InputForStory id="ghost-default" {...args} />
    </Box>
    <Box>
      <Label htmlFor="ghost-large">
        Large
      </Label>
      <InputForStory id="ghost-large" size="large" {...args} />
    </Box>
    <Box>
      <Label htmlFor="ghost-invalid">
        Invalid
      </Label>
      <InputForStory id="ghost-invalid" state="invalid" {...args} />
    </Box>
    <Box>
      <Label htmlFor="ghost-disabled">
        Disabled
      </Label>
      <InputForStory id="ghost-disabled" disabled {...args} />
    </Box>
    <Box>
      <Label htmlFor="ghost-readonly">
        ReadOnly
      </Label>
      <InputForStory id="ghost-readonly" readOnly {...args} />
    </Box>
    <Box>
      <Label htmlFor="ghost-adornments">
        Adornments
      </Label>
      <InputForStory
        id="ghost-adornments"
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
  id: 'adornments',
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
ignoreArgType('id', Adornments);

export const Autofill: ComponentStory<typeof InputForStory> = (args) => (
  <form>
    <Flex direction="column" gap={2}>
      <Box>
        <Label htmlFor="autofill-small">
          Small
        </Label>
        <InputForStory id="autofill-small" name="ship-city" autoComplete="shipping locality" size="small" {...args} />
      </Box>
      <Box>
        <Label htmlFor="autofill-default">
          Default
        </Label>
        <InputForStory id="autofill-default" name="ship-organization" autoComplete="shipping organization" {...args} />
      </Box>
      <Box>
        <Label htmlFor="autofill-large">
          Large
        </Label>
        <InputForStory
          id="autofill-large"
          name="ship-address"
          autoComplete="shipping street-address"
          size="large"
          {...args}
        />
      </Box>
      <Box>
        <Label htmlFor="autofill-ghost">
          Ghost
        </Label>
        <InputForStory
          id="autofill-ghost"
          name="ship-city"
          autoComplete="shipping locality"
          variant="ghost"
          {...args}
        />
      </Box>
      <Box>
        <Label htmlFor="autofill-invalid">
          Invalid
        </Label>
        <InputForStory
          id="autofill-invalid"
          name="ship-zip"
          autoComplete="shipping postal-code"
          state="invalid"
          {...args}
        />
      </Box>
      <Box>
        <Label htmlFor="autofill-adornments">
          Adornments
        </Label>
        <InputForStory
          id="autofill-adornments"
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

const Customize: ComponentStory<typeof InputForStory> = ({ id, ...args }) => (
  <InputForStory css={{ c: '$hiContrast' }} {...args} />
)