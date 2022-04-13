import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Skeleton, SkeletonProps, SkeletonVariants } from './Skeleton';
import { Flex } from '../Flex';
import { Box } from '../Box';
import { H1, H2, H3, H4, H5, H6 } from '../Heading';
import { Text as FaencyText } from '../Text';
import { Avatar } from '../Avatar';
import { Badge as FaencyBadge } from '../Badge';
import { Bubble } from '../Bubble';
import { Button as FaencyButton } from '../Button';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { Cross1Icon } from '@radix-ui/react-icons';

const BaseSkeleton = (props: SkeletonProps): JSX.Element => <Skeleton {...props} />;
const SkeletonForStory = modifyVariantsForStory<SkeletonVariants, SkeletonProps>(BaseSkeleton);

export default {
  title: 'Components/Skeleton',
  component: SkeletonForStory,
} as ComponentMeta<typeof SkeletonForStory>;

export const Square: ComponentStory<typeof SkeletonForStory> = () => (
  <Flex align="center" direction="row" gap="3">
    <Skeleton variant="square" css={{ size: '$3' }} />
    <Skeleton variant="square" css={{ size: '$6' }} />
    <Skeleton variant="square" css={{ size: '$9' }} />
  </Flex>
)


export const Circle: ComponentStory<typeof SkeletonForStory> = () => (
  <Flex align="center" direction="row" gap="3">
    <Skeleton variant="circle" css={{ size: '$3' }} />
    <Skeleton variant="circle" css={{ size: '$6' }} />
    <Skeleton variant="circle" css={{ size: '$9' }} />
  </Flex>
)

export const Badge: ComponentStory<typeof SkeletonForStory> = () => (
  <Flex align="center" direction="row" gap="3">
    <Skeleton variant="badge" css={{ height: '$5', width: '$6' }} />
    <Skeleton variant="badge" css={{ height: '$5', width: '$8' }} />
    <Skeleton variant="badge" css={{ height: '$5', width: '$10' }} />
  </Flex>
)

export const Button: ComponentStory<typeof SkeletonForStory> = () => (
  <Flex align="center" direction="row" gap="3">
    <Skeleton variant="button" css={{ height: '$5', width: '$6' }} />
    <Skeleton variant="button" css={{ height: '$5', width: '$8' }} />
    <Skeleton variant="button" css={{ height: '$5', width: '$10' }} />
  </Flex>
)

export const Text: ComponentStory<typeof SkeletonForStory> = () => (
  <Flex align="center" direction="row" gap="3">
    <Skeleton variant="text" css={{ height: '$5', width: '$6' }} />
    <Skeleton variant="text" css={{ height: '$5', width: '$8' }} />
    <Skeleton variant="text" css={{ height: '$5', width: '$10' }} />
  </Flex>
);

const TEXT_SIZES = ['3', '6', '9', '12'] as const;

export const Typographies: ComponentStory<typeof SkeletonForStory> = () => (
  <Flex gap="3" direction="column">
    <H1>
      <Skeleton variant="text" />
    </H1>
    <H2>
      <Skeleton variant="text" />
    </H2>
    <H3>
      <Skeleton variant="text" />
    </H3>
    <H4>
      <Skeleton variant="text" />
    </H4>
    <H5>
      <Skeleton variant="text" />
    </H5>
    <H6>
      <Skeleton variant="text" />
    </H6>

    {TEXT_SIZES.map((size) => (
      <FaencyText size={size}>
        <Skeleton variant="text" />
      </FaencyText>
    ))}
  </Flex>
);

const AVATAR_SIZES = ['1', '2', '3', '4', '5', '6'] as const

export const Avatars: ComponentStory<typeof SkeletonForStory> = () => (
  <Flex gap="3" align="center">
    {AVATAR_SIZES.map((size) => (
      <Flex gap="3" align="center" direction="column">
        <Skeleton variant="circle">
          <Avatar size={size} />
        </Skeleton>
        <Skeleton variant="square">
          <Avatar size={size} />
        </Skeleton>
      </Flex>
    ))}
  </Flex>
);

export const ButtonInferred: ComponentStory<typeof SkeletonForStory> = () => (
  <Flex gap="3" direction="column">
    <Skeleton variant="button">
      <FaencyButton css={{ width: 60 }} size="small" />
    </Skeleton>
    <Skeleton variant="button">
      <FaencyButton css={{ width: 90 }} size="medium" />
    </Skeleton>
    <Skeleton variant="button">
      <FaencyButton css={{ width: 120 }} size="large" />
    </Skeleton>
  </Flex>
)

export const BadgeInferred: ComponentStory<typeof SkeletonForStory> = () => (
  <Flex gap="3" direction="column">
    <Skeleton variant="badge">
      <FaencyBadge css={{ width: 60 }} size="small" />
    </Skeleton>
    <Skeleton variant="badge">
      <FaencyBadge css={{ width: 140 }} size="large" />
    </Skeleton>
  </Flex>
)

export const BubbleInferred: ComponentStory<typeof SkeletonForStory> = () => (
  <Flex gap="3" direction="column">
    <Skeleton variant="circle">
      <Bubble noAnimation size="x-small" />
    </Skeleton>
    <Skeleton variant="circle">
      <Bubble noAnimation size="small" />
    </Skeleton>
    <Skeleton variant="circle">
      <Bubble noAnimation size="medium" />
    </Skeleton>
    <Skeleton variant="circle">
      <Bubble noAnimation size="large" />
    </Skeleton>
    <Skeleton variant="circle">
      <Bubble noAnimation size="x-large" />
    </Skeleton>
  </Flex>
);

export const CustomInferred: ComponentStory<typeof SkeletonForStory> = (args) => (
  <Flex gap="3" direction="column">
    <Skeleton {...args}>
      <Box css={{ width: 35, height: 20 }} />
    </Skeleton>
    <Skeleton {...args}>
      <Cross1Icon />
    </Skeleton>
  </Flex>
);
CustomInferred.args = {
  variant: 'square',
};
CustomInferred.argTypes = {
  variant: {
    options: ['square', 'circle', 'badge', 'button', 'text'],
    control: 'inline-radio',
  },
};

export const Customs: ComponentStory<typeof SkeletonForStory> = () => (
  <Flex direction="column" gap={3}>
    <Skeleton css={{ width: '30%' }} />
    <Skeleton css={{ width: '20%' }} />
    <Flex gap={3}>
      <Flex direction="column" gap={2} css={{ flex: 1 }}>
        {Array(10)
          .fill(0)
          .map(() => (
            <Skeleton variant="text" />
          ))}
      </Flex>
      <Flex direction="column" gap={2} css={{ flex: 1 }}>
        {Array(10)
          .fill(0)
          .map(() => (
            <Skeleton variant="text" />
          ))}
      </Flex>
    </Flex>
    <Skeleton css={{ width: '20%' }} />
    <Flex gap={3}>
      <Skeleton css={{ height: '400px', flex: 1 }} />
      <Skeleton css={{ height: '300px', flex: 1 }} />
      <Skeleton css={{ height: '350px', flex: 1 }} />
    </Flex>
  </Flex>
);
