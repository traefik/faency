import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Switch, SwitchProps, SwitchVariants } from './Switch';
import { Flex } from '../Flex';
import { Label } from '../Label';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import ignoreArgType from '../../utils/ignoreArgType';

const BaseSwitch = (props: SwitchProps): JSX.Element => <Switch {...props} />;
const SwitchForStory = modifyVariantsForStory<
  SwitchVariants,
  SwitchProps & React.InputHTMLAttributes<any>
>(BaseSwitch);

export default {
  title: 'Components/Switch',
  component: SwitchForStory,
  argTypes: { onClick: { action: 'clicked' } },
} as ComponentMeta<typeof SwitchForStory>;

const Template: ComponentStory<typeof SwitchForStory> = (args) => <SwitchForStory {...args} />;

export const Basic = Template.bind({});

Basic.args = {};

export const Large = Template.bind({});

Large.args = { size: '2' };

export const Disabled = Template.bind({});

Disabled.args = { disabled: true };

export const Labelled: ComponentStory<typeof SwitchForStory> = ({ id, ...args }) => (
  <Flex align="center">
    <Label variant="contrast" htmlFor={id}>label</Label>
    <SwitchForStory id={id} {...args} />
  </Flex>
);
Labelled.args = {
  id: 'labelled',
};
ignoreArgType('id', Labelled);

interface ExtendedSwitchProps extends React.ComponentProps<typeof SwitchForStory> {
  invalid?: boolean
}

export const LabelAndTitle: ComponentStory<(props: ExtendedSwitchProps) => JSX.Element> = ({ id, onFocus, onBlur, invalid, disabled, ...args }) => {
  const [hasFocus, setHasFocus] = React.useState(false);

  const titleVariant = React.useMemo(() => {
    if (disabled) {
      return 'subtle'
    }
    if (invalid) {
      return 'invalid'
    }
    if (hasFocus) {
      return 'contrast'
    }
    return 'default'
  }, [invalid, disabled, hasFocus])

  const labelVariant = React.useMemo(() => {
    if (invalid) {
      return 'invalid'
    }
    if (disabled) {
      return 'subtle'
    }
    return 'contrast'
  }, [invalid, disabled]
  );


  const handleFocus = React.useCallback(
    (e) => {
      if (onFocus) {
        onFocus(e)
      }
      setHasFocus(true)
    },
    [onFocus, setHasFocus],
  )

  const handleBlur = React.useCallback(
    (e) => {
      if (onBlur) {
        onBlur(e)
      }
      setHasFocus(false)
    },
    [onBlur, setHasFocus],
  )

  return (
    <>
      <Label htmlFor={id} variant={titleVariant}>title</Label>
      <Flex align="center">
        <Label variant={labelVariant} htmlFor={id}>label</Label>
        <SwitchForStory id={id} disabled={disabled} onBlur={handleBlur} onFocus={handleFocus} {...args} />
      </Flex>
    </>
  );
}
LabelAndTitle.args = {
  id: 'label-title',
  invalid: false,
  disabled: false,
}
ignoreArgType('id', LabelAndTitle);

const Customize: ComponentStory<typeof SwitchForStory> = (args) => <SwitchForStory css={{ c: '$hiContrast' }} {...args} />;