import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Skeleton, SkeletonProps, SkeletonVariants } from './Skeleton';
import { Flex } from '../Flex';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';

const BaseSkeleton = (props: SkeletonProps): JSX.Element => <Skeleton {...props} />;
export const SkeletonForStory = modifyVariantsForStory<SkeletonVariants, SkeletonProps>(
  BaseSkeleton
);

export default {
  title: 'Components/Skeleton',
  component: SkeletonForStory,
} as ComponentMeta<typeof SkeletonForStory>;

export const Avatars: ComponentStory<typeof SkeletonForStory> = () => (
  <Flex css={{ gap: '$3', alignItems: 'center' }}>
    <Skeleton variant="avatar1" />
    <Skeleton variant="avatar2" />
    <Skeleton variant="avatar3" />
    <Skeleton variant="avatar4" />
    <Skeleton variant="avatar5" />
    <Skeleton variant="avatar6" />
  </Flex>
);

export const Typographies: ComponentStory<typeof SkeletonForStory> = () => (
  <Flex css={{ gap: '$3', flexDirection: 'column' }}>
    <Skeleton variant="title" />
    <Skeleton variant="heading" />
    <Skeleton variant="text" />
  </Flex>
);

export const Button: ComponentStory<typeof SkeletonForStory> = () => <Skeleton variant="button" />;

export const Customs: ComponentStory<typeof SkeletonForStory> = () => (
  <Flex direction="column" gap={3}>
    <Skeleton variant="title" css={{ width: '30%' }} />
    <Skeleton variant="heading" css={{ width: '20%' }} />
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
    <Skeleton variant="heading" css={{ width: '20%' }} />
    <Flex gap={3}>
      <Skeleton css={{ height: '400px', flex: 1 }} />
      <Skeleton css={{ height: '300px', flex: 1 }} />
      <Skeleton css={{ height: '350px', flex: 1 }} />
    </Flex>
  </Flex>
);
