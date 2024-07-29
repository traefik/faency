import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import ignoreArgType from '../../utils/ignoreArgType';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { Flex } from '../Flex';
import { Label } from '../Label';
import { Switch, SwitchProps, SwitchVariants } from './Switch';

const BaseSwitch = (props: SwitchProps): JSX.Element => <Switch {...props} />;
const SwitchForStory = modifyVariantsForStory<
  SwitchVariants,
  SwitchProps & React.InputHTMLAttributes<any>
>(BaseSwitch);

const Component: Meta<typeof SwitchForStory> = {
  title: 'Components/Switch',
  component: SwitchForStory,
  argTypes: { onClick: { action: 'clicked' } },
};

const Template: StoryFn<typeof SwitchForStory> = (args) => <SwitchForStory {...args} />;

export const Basic: StoryFn<typeof SwitchForStory> = Template.bind({});

Basic.args = {};

export const Large: StoryFn<typeof SwitchForStory> = Template.bind({});

Large.args = { size: '2' };

export const Disabled: StoryFn<typeof SwitchForStory> = Template.bind({});

Disabled.args = { disabled: true };

export const Labelled: StoryFn<typeof SwitchForStory> = ({ id, ...args }) => (
  <Flex align="center">
    <Label variant="contrast" htmlFor={id}>
      label
    </Label>
    <SwitchForStory id={id} {...args} />
  </Flex>
);
Labelled.args = {
  id: 'labelled',
};
ignoreArgType('id', Labelled);

interface ExtendedSwitchProps extends React.ComponentProps<typeof SwitchForStory> {
  invalid?: boolean;
}

export const LabelAndTitle: StoryFn<(props: ExtendedSwitchProps) => JSX.Element> = ({
  id,
  onFocus,
  onBlur,
  invalid,
  disabled,
  ...args
}) => {
  const [hasFocus, setHasFocus] = React.useState(false);

  const titleVariant = React.useMemo(() => {
    if (disabled) {
      return 'subtle';
    }
    if (invalid) {
      return 'invalid';
    }
    if (hasFocus) {
      return 'contrast';
    }
    return 'default';
  }, [invalid, disabled, hasFocus]);

  const labelVariant = React.useMemo(() => {
    if (invalid) {
      return 'invalid';
    }
    if (disabled) {
      return 'subtle';
    }
    return 'contrast';
  }, [invalid, disabled]);

  const handleFocus = React.useCallback(
    (e: React.FocusEvent<HTMLButtonElement>) => {
      if (onFocus) {
        onFocus(e);
      }
      setHasFocus(true);
    },
    [onFocus, setHasFocus],
  );

  const handleBlur = React.useCallback(
    (e: React.FocusEvent<HTMLButtonElement>) => {
      if (onBlur) {
        onBlur(e);
      }
      setHasFocus(false);
    },
    [onBlur, setHasFocus],
  );

  return (
    <>
      <Label htmlFor={id} variant={titleVariant}>
        title
      </Label>
      <Flex align="center">
        <Label variant={labelVariant} htmlFor={id}>
          label
        </Label>
        <SwitchForStory
          id={id}
          disabled={disabled}
          onBlur={handleBlur}
          onFocus={handleFocus}
          {...args}
        />
      </Flex>
    </>
  );
};
LabelAndTitle.args = {
  id: 'label-title',
  invalid: false,
  disabled: false,
};
ignoreArgType('id', LabelAndTitle);

export default Component;
