import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Switch, SwitchProps, SwitchVariants } from './Switch';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';

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
