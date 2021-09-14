import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Heading, HeadingProps, HeadingVariants } from './Heading';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';

type BaseHeadingProps = HeadingVariants & {};
const BaseHeading = (props: BaseHeadingProps): JSX.Element => <Heading {...props} />;
export const HeadingForStory = modifyVariantsForStory<HeadingVariants, HeadingProps>(BaseHeading);

export default {
  title: 'Components/Heading',
  component: HeadingForStory,
} as ComponentMeta<typeof HeadingForStory>;

const Template: ComponentStory<typeof HeadingForStory> = (args) => (
  <HeadingForStory {...args}>Title {args?.size}</HeadingForStory>
);

export const Basic = Template.bind({});

Basic.args = {};

export const Size: ComponentStory<typeof HeadingForStory> = ({ size, ...args }) => (
  <>
    <Template {...args} size="1" />
    <Template {...args} size="2" />
    <Template {...args} size="3" />
    <Template {...args} size="4" />
  </>
);
