import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { Box } from './Box'
import { ToggleButton } from './ToggleButton'

storiesOf('Components|ToggleButton', module).add('default', () => {
  const [value, setValue] = useState('center')

  return (
    <>
      <Box sx={{ width: '135px', my: 6 }}>
        <ToggleButton
          onToggle={(): void => {
            setValue('left')
          }}
          isToggled={value === 'left'}
        >
          Left
        </ToggleButton>
        <ToggleButton
          onToggle={(): void => {
            setValue('center')
          }}
          isToggled={value === 'left'}
        >
          Center
        </ToggleButton>
        <ToggleButton
          onToggle={(): void => {
            setValue('right')
          }}
          isToggled={value === 'right'}
        >
          Right
        </ToggleButton>
      </Box>
    </>
  )
})
