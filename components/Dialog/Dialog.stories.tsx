import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Dialog, DialogContent } from './Dialog';
import { Text } from '../Text';
import { useState } from 'react';
import { Button } from '../Button';
import { Box } from '../Box';

export default {
  title: 'Components/Dialog',
  component: Dialog,
} as ComponentMeta<typeof Dialog>;

const Content: React.FC = () => {
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
      <Button css={{ mt: '$3' }} onClick={() => setCount((c) => c + 1)}>
        Add more text
      </Button>
    </>
  );
};

export const Basic: ComponentStory<any> = (args) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>

      <Box>
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

      <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
        <DialogContent>
          <Content />
        </DialogContent>
      </Dialog>
    </>
  );
};
