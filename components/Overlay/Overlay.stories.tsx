import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState, useCallback } from 'react';
import { useDebouncedCallback } from 'use-debounce/lib';
import { Overlay } from './Overlay';
import { Button } from '../Button';
import { Text } from '../Text';
import { Box } from '../Box';

export default {
  title: 'Components/Overlay',
  component: Overlay,
} as ComponentMeta<typeof Overlay>;

export const Absolute: ComponentStory<any> = (args) => (
  <Box css={{ bc: '$red9', width: '$8', height: '$8', border: '1px dashed $primary', position: 'relative' }}>
    <Overlay variant="absolute" {...args} />
  </Box>
)

export const Fixed: ComponentStory<any> = (args) => {
  const [showOverlay, setShowOverlay] = useState(false);


  const onClick = useCallback(
    () => {
      setShowOverlay(true);
    },
    [setShowOverlay],
  );

  const onClose = useCallback(
    () => {
      setShowOverlay(false);
    },
    [setShowOverlay],
  );

  return (
    <>
      <Button css={{ position: 'relative' }} onClick={onClick}>Show overlay</Button>
      {showOverlay && (
        <Overlay variant="fixed" css={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} {...args}>
          <Button css={{ position: 'relative' }} onClick={onClose}>Hide overlay</Button>
        </Overlay>
      )}
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
    </>
  );
};

export const ButtonOverlay: ComponentStory<any> = (args) => {
  const [loading, setLoading] = useState(false);

  const debounceLoading = useDebouncedCallback(
    () => {
      setLoading(false);
    },
    1000,
  );
  const onClick = useCallback(
    () => {
      setLoading(true);
      debounceLoading();
    },
    [setLoading, debounceLoading],
  );

  const stopPropagation = useCallback(
    (e) => e.stopPropagation(),
    [],
  );

  return (
    <Button css={{ position: 'relative' }} onClick={onClick}>
      Click
      {loading && (
        <Overlay variant="absolute" onClick={stopPropagation} css={{
          cursor: 'default', zIndex: 1, color: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Text css={{ color: 'currentColor' }}>Loading</Text>
        </Overlay>
      )}
    </Button>
  )
}
