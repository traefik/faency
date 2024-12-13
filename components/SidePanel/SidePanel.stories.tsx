import { Meta, StoryFn } from '@storybook/react/*';
import { useState } from 'react';

import { Box } from '../Box';
import { Button } from '../Button';
import { Dialog, DialogContent, DialogOverlay, DialogPortal } from '../Dialog';
import { Text } from '../Text';
import { SidePanel } from './SidePanel';

const Component: Meta<typeof SidePanel> = {
  title: 'Components/SidePanel',
  component: SidePanel,
  argTypes: {
    side: {
      options: ['right', 'left', 'top', 'bottom'],
      control: { type: 'radio' },
    },
  },
};

const Content = ({ onClickBtn, ctaLabel }: { onClickBtn?: () => void; ctaLabel?: string }) => {
  const [count, setCount] = useState(1);

  return (
    <>
      <Text size={2} as="h3" css={{ mb: '$3' }}>
        Hello, World!
      </Text>
      {[...Array(count)].map((_, i) => (
        <Text key={i} css={{ mb: '$1' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </Text>
      ))}
      <Button
        css={{ mt: '$3' }}
        onClick={() => (onClickBtn ? onClickBtn() : setCount((c) => c + 1))}
      >
        {ctaLabel || 'Do some actions'}
      </Button>
    </>
  );
};

export const Basic: StoryFn<typeof SidePanel> = (args) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box>
        <Button onClick={() => setOpen(true)}>Open side panel</Button>
        <Box css={{ mt: '$4' }}>
          {[...Array(10)].map((_, i) => (
            <Text key={i} css={{ my: '$1' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </Text>
          ))}
        </Box>
      </Box>

      <SidePanel {...args} open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
        <Content />
      </SidePanel>
    </>
  );
};

Basic.args = {
  noOverlay: false,
  side: 'right',
  noCloseIcon: false,
};

export const CombinedWithModal: StoryFn<typeof SidePanel> = (args) => {
  const [open, setOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={(isModalOpen) => setModalOpen(isModalOpen)}>
        <DialogPortal>
          <DialogOverlay />
          <DialogContent>
            <Text css={{ m: '$2', mt: '$4' }}>This is a modal from the side panel</Text>
          </DialogContent>
        </DialogPortal>
      </Dialog>

      <SidePanel {...args} open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
        <Content ctaLabel="Open modal" onClickBtn={() => setModalOpen(true)} />
      </SidePanel>

      <Box>
        <Button onClick={() => setOpen(true)}>Open side panel</Button>
        <Box css={{ mt: '$4' }}>
          {[...Array(10)].map((_, i) => (
            <Text key={i} css={{ my: '$1' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </Text>
          ))}
        </Box>
      </Box>
    </>
  );
};

CombinedWithModal.args = {
  noOverlay: true,
  side: 'right',
  noCloseIcon: true,
};

export default Component;
