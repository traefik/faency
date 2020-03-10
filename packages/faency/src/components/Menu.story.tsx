import React from 'react'
import { storiesOf } from '@storybook/react'
import { Box } from './Box'
import {
  Menu,
  MenuItem,
  MenuItemSeparator,
  MenuItemLabel,
  MenuItemCheckbox,
  MenuItemRadioGroup,
  MenuItemRadio,
} from './Menu'

storiesOf('Components|Menu', module).add('default', () => {
  const [isChecked, setIsChecked] = React.useState(true)
  const [value, setValue] = React.useState('2')
  const targetRef = React.useRef()

  return (
    <>
      <Box mb="4" height="360px">
        <div ref={targetRef} />
        <Menu isOpen buttonRef={targetRef} unstable__disableLock>
          <MenuItem label="Simple item one" />
          <MenuItem label="Simple item two" />
          <MenuItem label="Simple item three" />
          <MenuItemSeparator />
          <MenuItemLabel>An item label</MenuItemLabel>
          <MenuItemSeparator />
          <MenuItemCheckbox label="Checkbox item" checked={isChecked} onChange={setIsChecked} />
          <MenuItemSeparator />
          <MenuItemRadioGroup value={value} onChange={setValue}>
            <MenuItemRadio value="1" label="Radio item one" />
            <MenuItemRadio value="2" label="Radio item two" />
            <MenuItemRadio value="3" label="Radio item three" />
          </MenuItemRadioGroup>
        </Menu>
      </Box>
    </>
  )
})
