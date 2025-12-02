// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { Flex } from '../Flex';
import { H2 } from '../Heading';
import { Text } from '../Text';
import { Panel } from './Panel';
import { PanelVanilla } from './Panel.vanilla';

const Component: Meta<typeof Panel> = {
  title: 'Components/Panel',
  component: Panel,
};

const panelContent = (
  <>
    <H2 css={{ mb: '$3' }}>Panel Title</H2>
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua.
    </Text>
  </>
);

export const Basic: StoryFn<typeof Panel> = () => (
  <Panel css={{ padding: '$4', maxWidth: '400px' }}>{panelContent}</Panel>
);

Basic.args = {};

export const Comparison: StoryFn = () => {
  return (
    <Flex css={{ gap: '$3', alignItems: 'flex-start' }}>
      <div>
        <Text css={{ mb: '$2', fontWeight: 'bold' }}>Stitches</Text>
        <Panel css={{ padding: '$4', maxWidth: '400px' }}>{panelContent}</Panel>
      </div>
      <div>
        <Text css={{ mb: '$2', fontWeight: 'bold' }}>Vanilla Extract</Text>
        <PanelVanilla css={{ padding: '$4', maxWidth: '400px' }}>{panelContent}</PanelVanilla>
      </div>
    </Flex>
  );
};

export default Component;
