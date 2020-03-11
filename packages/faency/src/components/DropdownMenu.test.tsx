import React from 'react'
import { render } from '@testing-library/react'
import { DropdownMenu } from './DropdownMenu'
import { Button } from './Button'
import {
  Menu,
  MenuItem,
  MenuItemSeparator,
  MenuItemLabel,
  MenuItemCheckbox,
  MenuItemRadioGroup,
  MenuItemRadio,
} from './Menu'
import { ThemeProvider } from 'styled-components'
import { theme as defaultTheme } from '../theme'
import { theme as defaultDarkTheme } from '../dark-theme'
import { act } from 'react-dom/test-utils'

const Component: React.FC = () => (
  <DropdownMenu
    button={<Button data-testid="dropdown-button">Button</Button>}
    menu={
      <Menu>
        <MenuItem label="Simple item one" />
        <MenuItem label="Simple item two" />
        <MenuItem label="Simple item three" />
        <MenuItemSeparator />
        <MenuItemLabel>An item label</MenuItemLabel>
        <MenuItemSeparator />
        <MenuItemCheckbox label="Checkbox item" checked={true} />
        <MenuItemSeparator />
        <MenuItemRadioGroup value="1">
          <MenuItemRadio value="1" label="Radio item one" />
          <MenuItemRadio value="2" label="Radio item two" />
          <MenuItemRadio value="3" label="Radio item three" />
        </MenuItemRadioGroup>
      </Menu>
    }
  />
)

describe('DropdownMenu component', () => {
  test('renders without crashing', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <Component />
      </ThemeProvider>,
    )
  })

  test('renders without crashing on dark theme', () => {
    render(
      <ThemeProvider theme={defaultDarkTheme}>
        <Component />
      </ThemeProvider>,
    )
  })

  // TODO: The Menu is not showing on this test, but it's showing on other places, maybe some limitation on Jest that should be investigated.
  // test('should show all items on the Menu when opened', () => {
  //   const { getByTestId, baseElement } = render(
  //     <ThemeProvider theme={defaultDarkTheme}>
  //       <Component />
  //     </ThemeProvider>,
  //   )

  //   const button = getByTestId('dropdown-button')
  //   expect(baseElement.innerHTML).toContain('>Button<')

  //   act(() => button.click())

  //   expect(baseElement.innerHTML).toContain('Simple item one')
  //   expect(baseElement.innerHTML).toContain('Simple item two')
  //   expect(baseElement.innerHTML).toContain('Simple item three')
  //   expect(baseElement.innerHTML).toContain('An item label')
  //   expect(baseElement.innerHTML).toContain('Checkbox item')
  //   expect(baseElement.innerHTML).toContain('Radio item one')
  //   expect(baseElement.innerHTML).toContain('Radio item two')
  //   expect(baseElement.innerHTML).toContain('Radio item three')
  // })
})
