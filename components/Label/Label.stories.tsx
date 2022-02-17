import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { VariantProps } from '../../stitches.config';

import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { Label } from './Label';
import { Box } from '../Box';
import ignoreArgType from '../../utils/ignoreArgType';

type LabelVariants = VariantProps<typeof Label>;
type LabelProps = LabelVariants & {};

const BaseLabel = (props: LabelProps): JSX.Element => <Label {...props} />;
const LabelForStory = modifyVariantsForStory<
  LabelVariants,
  LabelProps & React.LabelHTMLAttributes<any>
>(BaseLabel);

export default {
  title: 'Components/Label',
  component: LabelForStory,
} as ComponentMeta<typeof LabelForStory>;

const Template: ComponentStory<typeof LabelForStory> = ({ id, ...args }) => (
  <Box>
    <Label htmlFor={id} css={{ mr: '$2' }} {...args}>
      Email field
    </Label>
    <input id={id} name="email" type="email" />
  </Box>
);

export const Basic = Template.bind({});

Basic.args = {
  id: 'basic',
};
ignoreArgType('id', Basic);

export const Capitalized = Template.bind({});

Capitalized.args = {
  id: 'capitalize',
};
ignoreArgType('id', Capitalized);

export const CapitalizedWords = Template.bind({});

CapitalizedWords.args = {
  id: 'capitalize-words',
  transform: 'capitalizeWords'
};
ignoreArgType('id', CapitalizedWords);

export const Uppercased = Template.bind({});
Uppercased.args = {
  id: 'uppercase',
  transform: 'uppercase',
};
ignoreArgType('id', Uppercased);

export const Invalid = Template.bind({});
Invalid.args = {
  id: 'invalidvariant',
  variant: 'invalid',
};
ignoreArgType('id', Invalid);

export const Disabled: ComponentStory<typeof LabelForStory> = ({ id, ...args }) => (
  <Box>
    <Label htmlFor={id} css={{ mr: '$2' }} variant="subtle" {...args}>
      Email field
    </Label>
    <input id={id} name="email" type="email" disabled />
  </Box>
);
Disabled.args = {
  id: 'subtledisabled'
}
ignoreArgType('id', Disabled);

export const FocusContrast: ComponentStory<typeof LabelForStory> = ({ id, ...args }) => {
  const [hasFocus, setHasFocus] = React.useState(false);

  const onFocus = React.useCallback(() => {
    setHasFocus(true);
  }, [setHasFocus])

  const onBlur = React.useCallback(() => {
    setHasFocus(false);
  }, [setHasFocus])

  return (
    <Box>
      <Label variant={hasFocus ? 'contrast' : 'default'} htmlFor={id} css={{ mr: '$2' }} {...args}>
        Email field
      </Label>
      <input id={id} name="email" type="email" onFocus={onFocus} onBlur={onBlur} />
    </Box>
  );
}
FocusContrast.args = {
  id: 'focuscontrastvariants'
}
ignoreArgType('id', FocusContrast)