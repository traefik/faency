// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { VariantProps } from '../../stitches.config';
import ignoreArgType from '../../utils/ignoreArgType';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { Box } from '../Box';
import { BoxVanilla } from '../Box/Box.vanilla';
import { FlexVanilla } from '../Flex/Flex.vanilla';
import { H3 } from '../Heading';
import { Text } from '../Text';
import { Label } from './Label';
import { LabelVanilla } from './Label.vanilla';

type LabelVariants = VariantProps<typeof Label>;
type LabelProps = LabelVariants & NonNullable<unknown>;

const BaseLabel = (props: LabelProps): JSX.Element => <Label {...props} />;
const LabelForStory = modifyVariantsForStory<
  LabelVariants,
  LabelProps & React.LabelHTMLAttributes<any>
>(BaseLabel);

const Component: Meta<typeof LabelForStory> = {
  title: 'Components/Label',
  component: LabelForStory,
};

const Template: StoryFn<typeof LabelForStory> = ({ id, ...args }) => (
  <Box>
    <Label htmlFor={id} css={{ mr: '$2' }} {...args}>
      Email field
    </Label>
    <input id={id} name="email" type="email" />
  </Box>
);

export const Basic: StoryFn<typeof LabelForStory> = Template.bind({});

Basic.args = {
  id: 'basic',
};
ignoreArgType('id', Basic);

export const Capitalized: StoryFn<typeof LabelForStory> = Template.bind({});

Capitalized.args = {
  id: 'capitalize',
};
ignoreArgType('id', Capitalized);

export const CapitalizedWords: StoryFn<typeof LabelForStory> = Template.bind({});

CapitalizedWords.args = {
  id: 'capitalize-words',
  transform: 'capitalizeWords',
};
ignoreArgType('id', CapitalizedWords);

export const Uppercased: StoryFn<typeof LabelForStory> = Template.bind({});
Uppercased.args = {
  id: 'uppercase',
  transform: 'uppercase',
};
ignoreArgType('id', Uppercased);

export const Invalid: StoryFn<typeof LabelForStory> = Template.bind({});
Invalid.args = {
  id: 'invalidvariant',
  variant: 'invalid',
};
ignoreArgType('id', Invalid);

export const Disabled: StoryFn<typeof LabelForStory> = ({ id, ...args }) => (
  <Box>
    <Label htmlFor={id} css={{ mr: '$2' }} variant="subtle" {...args}>
      Email field
    </Label>
    <input id={id} name="email" type="email" disabled />
  </Box>
);
Disabled.args = {
  id: 'subtledisabled',
};
ignoreArgType('id', Disabled);

export const FocusContrast: StoryFn<typeof LabelForStory> = ({ id, ...args }) => {
  const [hasFocus, setHasFocus] = React.useState(false);

  const onFocus = React.useCallback(() => {
    setHasFocus(true);
  }, [setHasFocus]);

  const onBlur = React.useCallback(() => {
    setHasFocus(false);
  }, [setHasFocus]);

  return (
    <Box>
      <Label variant={hasFocus ? 'contrast' : 'default'} htmlFor={id} css={{ mr: '$2' }} {...args}>
        Email field
      </Label>
      <input id={id} name="email" type="email" onFocus={onFocus} onBlur={onBlur} />
    </Box>
  );
};
FocusContrast.args = {
  id: 'focuscontrastvariants',
};
ignoreArgType('id', FocusContrast);

export const Comparison: StoryFn = () => (
  <FlexVanilla direction="column" gap={6}>
    <BoxVanilla>
      <H3 css={{ marginBottom: '$4' }}>Stitches Version</H3>
      <FlexVanilla direction="column" gap={4}>
        <BoxVanilla>
          <H3 css={{ marginBottom: '$2', fontSize: '$4' }}>Transform Variants</H3>
          <FlexVanilla direction="column" gap={2}>
            <Box>
              <Label htmlFor="stitches-capitalize" css={{ mr: '$2' }}>
                Email field
              </Label>
              <input id="stitches-capitalize" type="email" />
            </Box>
            <Box>
              <Label
                htmlFor="stitches-capitalize-words"
                css={{ mr: '$2' }}
                transform="capitalizeWords"
              >
                Email field
              </Label>
              <input id="stitches-capitalize-words" type="email" />
            </Box>
            <Box>
              <Label htmlFor="stitches-uppercase" css={{ mr: '$2' }} transform="uppercase">
                Email field
              </Label>
              <input id="stitches-uppercase" type="email" />
            </Box>
          </FlexVanilla>
        </BoxVanilla>
        <Text size="1" variant="subtle" css={{ marginTop: '$1' }}>
          Default: size=0, variant=subtle, transform=capitalize, weight=medium, lineHeight=2.18
        </Text>
        <BoxVanilla>
          <H3 css={{ marginBottom: '$2', fontSize: '$4' }}>Color Variants</H3>
          <FlexVanilla direction="column" gap={2}>
            <Box>
              <Label htmlFor="stitches-default" css={{ mr: '$2' }} variant="default">
                Default variant
              </Label>
              <input id="stitches-default" type="email" />
            </Box>
            <Box>
              <Label htmlFor="stitches-subtle" css={{ mr: '$2' }} variant="subtle">
                Subtle variant
              </Label>
              <input id="stitches-subtle" type="email" />
            </Box>
            <Box>
              <Label htmlFor="stitches-contrast" css={{ mr: '$2' }} variant="contrast">
                Contrast variant
              </Label>
              <input id="stitches-contrast" type="email" />
            </Box>
            <Box>
              <Label htmlFor="stitches-invalid" css={{ mr: '$2' }} variant="invalid">
                Invalid variant
              </Label>
              <input id="stitches-invalid" type="email" />
            </Box>
          </FlexVanilla>
        </BoxVanilla>
      </FlexVanilla>
    </BoxVanilla>

    <BoxVanilla>
      <H3 css={{ marginBottom: '$4' }}>Vanilla Extract Version</H3>
      <FlexVanilla direction="column" gap={4}>
        <BoxVanilla>
          <H3 css={{ marginBottom: '$2', fontSize: '$4' }}>Transform Variants</H3>
          <FlexVanilla direction="column" gap={2}>
            <BoxVanilla>
              <LabelVanilla htmlFor="vanilla-capitalize" css={{ mr: '$2' }}>
                Email field
              </LabelVanilla>
              <input id="vanilla-capitalize" type="email" />
            </BoxVanilla>
            <BoxVanilla>
              <LabelVanilla
                htmlFor="vanilla-capitalize-words"
                css={{ mr: '$2' }}
                transform="capitalizeWords"
              >
                Email field
              </LabelVanilla>
              <input id="vanilla-capitalize-words" type="email" />
            </BoxVanilla>
            <BoxVanilla>
              <LabelVanilla htmlFor="vanilla-uppercase" css={{ mr: '$2' }} transform="uppercase">
                Email field
              </LabelVanilla>
              <input id="vanilla-uppercase" type="email" />
            </BoxVanilla>
          </FlexVanilla>
        </BoxVanilla>
        <Text size="1" variant="subtle" css={{ marginTop: '$1' }}>
          Default: size=0, variant=subtle, transform=capitalize, weight=medium, lineHeight=2.18
        </Text>
        <BoxVanilla>
          <H3 css={{ marginBottom: '$2', fontSize: '$4' }}>Color Variants</H3>
          <FlexVanilla direction="column" gap={2}>
            <BoxVanilla>
              <LabelVanilla htmlFor="vanilla-default" css={{ mr: '$2' }} variant="default">
                Default variant
              </LabelVanilla>
              <input id="vanilla-default" type="email" />
            </BoxVanilla>
            <BoxVanilla>
              <LabelVanilla htmlFor="vanilla-subtle" css={{ mr: '$2' }} variant="subtle">
                Subtle variant
              </LabelVanilla>
              <input id="vanilla-subtle" type="email" />
            </BoxVanilla>
            <BoxVanilla>
              <LabelVanilla htmlFor="vanilla-contrast" css={{ mr: '$2' }} variant="contrast">
                Contrast variant
              </LabelVanilla>
              <input id="vanilla-contrast" type="email" />
            </BoxVanilla>
            <BoxVanilla>
              <LabelVanilla htmlFor="vanilla-invalid" css={{ mr: '$2' }} variant="invalid">
                Invalid variant
              </LabelVanilla>
              <input id="vanilla-invalid" type="email" />
            </BoxVanilla>
          </FlexVanilla>
        </BoxVanilla>
      </FlexVanilla>
    </BoxVanilla>
  </FlexVanilla>
);

export default Component;
