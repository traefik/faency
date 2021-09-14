import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Dialog, DialogContent } from './Dialog';
import { Text } from '../Text';
import { useState } from 'react';
import { Button } from '../Button';

export default {
  title: 'Components/Dialog',
  component: Dialog,
} as ComponentMeta<typeof Dialog>;

export const Basic: ComponentStory<typeof Dialog> = (args) => (
  <Dialog open={true}>
    <DialogContent>
      <Text size={2} as="h3" css={{ mb: '$3' }}>
        Hello, World!
      </Text>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Text>
    </DialogContent>
  </Dialog>
);

export const Actionable: ComponentStory<any> = (args) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
        <DialogContent>
          <Text size={2} as="h3" css={{ mb: '$3' }}>
            Hello, World!
          </Text>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </Text>
        </DialogContent>
      </Dialog>
    </>
  );
};
