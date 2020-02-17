import React, { useState } from 'react'
import { render } from '@testing-library/react'
import { ToggleButton, ToggleButtonGroup } from './ToggleButton'

const Component: React.FC = () => {
  const [value, setValue] = useState<string>('center')

  return (
    <>
      <ToggleButtonGroup value={value} onChange={(value: any): void => setValue(value)}>
        <ToggleButton value="left">Left</ToggleButton>
        <ToggleButton value="center">Center</ToggleButton>
        <ToggleButton value="right">Right</ToggleButton>
      </ToggleButtonGroup>
    </>
  )
}

describe('ToggleButton component', () => {
  test('renders without crashing', () => {
    render(<Component />)
  })
})
