import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Box } from './Box';
import { ToggleButtonGroup, ToggleButton } from './ToggleButton';

function ToggleButtonGroupStory() {
  const [value, setValue] = useState('center');

  return (
    <>
      <Box width="135px" my={6}>
        <ToggleButtonGroup value={value} onChange={value => setValue(value)}>
          <ToggleButton value="left">Left</ToggleButton>
          <ToggleButton value="center">Center</ToggleButton>
          <ToggleButton value="right">Right</ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </>
  );
}

storiesOf('Components|ToggleButton', module).add('default', () => <ToggleButtonGroupStory />);