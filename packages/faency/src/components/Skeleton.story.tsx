import React from 'react'
import { storiesOf } from '@storybook/react'
import { SkeletonBox, SkeletonText, SkeletonTextGroup } from './Skeleton'
import { Box } from './Box'
import { Card } from './Card'

storiesOf('Components|Skeleton', module).add('default', () => (
  <>
    <Card mb="4">
      <SkeletonText size={0} />
      <SkeletonText size={1} />
      <SkeletonText size={2} />
      <SkeletonText size={3} />
      <SkeletonText size={5} />
      <SkeletonText size={6} />
      <SkeletonText size={7} />
      <SkeletonText size={8} />
    </Card>
    <Card mb="4">
      <SkeletonTextGroup />
    </Card>
    <SkeletonBox mb="4" height={60} width={60} borderRadius={30} />
  </>
))
