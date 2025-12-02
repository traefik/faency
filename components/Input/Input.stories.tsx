import { EyeOpenIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { styled } from '../../stitches.config';
import ignoreArgType from '../../utils/ignoreArgType';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { Label } from '../Label';
import { Text } from '../Text';
import { Input, InputProps, InputVariants } from './Input';
import { InputVanilla } from './Input.vanilla';

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

const Component: Meta<typeof InputForStory> = {
  title: 'Components/Input',
  component: InputForStory,
  argTypes: { onClick: { action: 'clicked' } },
};

export const Basic: StoryFn<typeof InputForStory> = ({ id, ...args }) => (
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

export const Types: StoryFn<typeof InputForStory> = ({ ...args }) => (
  <Flex direction="column" gap={2}>
    {INPUT_TYPES.map((type) => (
      <Box key={type}>
        <Label htmlFor={`types-${type}`}>{type}</Label>
        <InputForStory id={`types-${type}`} {...args} type={type} />
      </Box>
    ))}
  </Flex>
);

Types.args = {};

export const Invalid: StoryFn<typeof InputForStory> = Basic.bind({});
Invalid.args = { id: 'invalid', state: 'invalid' };
ignoreArgType('id', Invalid);

export const Disabled: StoryFn<typeof InputForStory> = Basic.bind({});

Disabled.args = { id: 'disabled', disabled: true, defaultValue: 'value' };
ignoreArgType('id', Disabled);

export const ReadOnly: StoryFn<typeof InputForStory> = Basic.bind({});
ReadOnly.args = { id: 'readonly', readOnly: true, defaultValue: 'value' };
ignoreArgType('id', ReadOnly);

export const Ghost: StoryFn<typeof InputForStory> = (args) => (
  <Flex direction="column" gap={2}>
    <Box>
      <Label htmlFor="ghost-small">Small</Label>
      <InputForStory id="ghost-small" size="small" {...args} />
    </Box>
    <Box>
      <Label htmlFor="ghost-default">Default</Label>
      <InputForStory id="ghost-default" {...args} />
    </Box>
    <Box>
      <Label htmlFor="ghost-large">Large</Label>
      <InputForStory id="ghost-large" size="large" {...args} />
    </Box>
    <Box>
      <Label htmlFor="ghost-invalid">Invalid</Label>
      <InputForStory id="ghost-invalid" state="invalid" {...args} />
    </Box>
    <Box>
      <Label htmlFor="ghost-disabled">Disabled</Label>
      <InputForStory id="ghost-disabled" disabled {...args} />
    </Box>
    <Box>
      <Label htmlFor="ghost-readonly">ReadOnly</Label>
      <InputForStory id="ghost-readonly" readOnly {...args} />
    </Box>
    <Box>
      <Label htmlFor="ghost-adornments">Adornments</Label>
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

export const Adornments: StoryFn<typeof InputForStory> = Basic.bind({});
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

export const Autofill: StoryFn<typeof InputForStory> = (args) => (
  <form>
    <Flex direction="column" gap={2}>
      <Box>
        <Label htmlFor="autofill-small">Small</Label>
        <InputForStory
          id="autofill-small"
          name="ship-city"
          autoComplete="shipping locality"
          size="small"
          {...args}
        />
      </Box>
      <Box>
        <Label htmlFor="autofill-default">Default</Label>
        <InputForStory
          id="autofill-default"
          name="ship-organization"
          autoComplete="shipping organization"
          {...args}
        />
      </Box>
      <Box>
        <Label htmlFor="autofill-large">Large</Label>
        <InputForStory
          id="autofill-large"
          name="ship-address"
          autoComplete="shipping street-address"
          size="large"
          {...args}
        />
      </Box>
      <Box>
        <Label htmlFor="autofill-ghost">Ghost</Label>
        <InputForStory
          id="autofill-ghost"
          name="ship-city"
          autoComplete="shipping locality"
          variant="ghost"
          {...args}
        />
      </Box>
      <Box>
        <Label htmlFor="autofill-invalid">Invalid</Label>
        <InputForStory
          id="autofill-invalid"
          name="ship-zip"
          autoComplete="shipping postal-code"
          state="invalid"
          {...args}
        />
      </Box>
      <Box>
        <Label htmlFor="autofill-adornments">Adornments</Label>
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

export const Comparison: StoryFn = () => {
  return (
    <Flex css={{ gap: '$3' }}>
      {/* Stitches Column */}
      <Flex css={{ flex: 1, flexDirection: 'column', gap: '$3' }}>
        <Text weight="medium">Stitches</Text>

        <Box>
          <Label htmlFor="stitches-small">Small</Label>
          <Input id="stitches-small" size="small" placeholder="Small input" />
        </Box>

        <Box>
          <Label htmlFor="stitches-default">Default</Label>
          <Input id="stitches-default" placeholder="Default input" />
        </Box>

        <Box>
          <Label htmlFor="stitches-large">Large</Label>
          <Input id="stitches-large" size="large" placeholder="Large input" />
        </Box>

        <Box>
          <Label htmlFor="stitches-ghost">Ghost</Label>
          <Input id="stitches-ghost" variant="ghost" placeholder="Ghost input" />
        </Box>

        <Box>
          <Label htmlFor="stitches-invalid">Invalid</Label>
          <Input id="stitches-invalid" state="invalid" placeholder="Invalid input" />
        </Box>

        <Box>
          <Label htmlFor="stitches-disabled">Disabled</Label>
          <Input id="stitches-disabled" disabled defaultValue="Disabled input" />
        </Box>

        <Box>
          <Label htmlFor="stitches-adornments">Adornments</Label>
          <Input
            id="stitches-adornments"
            startAdornment={<MagnifyingGlassIcon />}
            endAdornment={<StyledEyeOpenIcon />}
            placeholder="With adornments"
          />
        </Box>
      </Flex>

      {/* Vanilla Extract Column */}
      <Flex css={{ flex: 1, flexDirection: 'column', gap: '$3' }}>
        <Text weight="medium">Vanilla Extract</Text>

        <Box>
          <Label htmlFor="vanilla-small">Small</Label>
          <InputVanilla id="vanilla-small" size="small" placeholder="Small input" />
        </Box>

        <Box>
          <Label htmlFor="vanilla-default">Default</Label>
          <InputVanilla id="vanilla-default" placeholder="Default input" />
        </Box>

        <Box>
          <Label htmlFor="vanilla-large">Large</Label>
          <InputVanilla id="vanilla-large" size="large" placeholder="Large input" />
        </Box>

        <Box>
          <Label htmlFor="vanilla-ghost">Ghost</Label>
          <InputVanilla id="vanilla-ghost" variant="ghost" placeholder="Ghost input" />
        </Box>

        <Box>
          <Label htmlFor="vanilla-invalid">Invalid</Label>
          <InputVanilla id="vanilla-invalid" state="invalid" placeholder="Invalid input" />
        </Box>

        <Box>
          <Label htmlFor="vanilla-disabled">Disabled</Label>
          <InputVanilla id="vanilla-disabled" disabled defaultValue="Disabled input" />
        </Box>

        <Box>
          <Label htmlFor="vanilla-adornments">Adornments</Label>
          <InputVanilla
            id="vanilla-adornments"
            startAdornment={<MagnifyingGlassIcon />}
            endAdornment={<StyledEyeOpenIcon />}
            placeholder="With adornments"
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Component;
