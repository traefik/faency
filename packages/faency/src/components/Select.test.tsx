import React from 'react'
import { render } from '@testing-library/react'
import { Select, OptionGroup, Option } from './Select'

describe('Select component', () => {
  test('renders without crashing', () => {
    render(
      <Select>
        <Option value="option1" label="Option 1" />
        <Option value="option2" label="Option 2" />
        <Option disabled value="option3" label="Option 3" />
        <OptionGroup label="Group 1">
          <Option value="option4" label="Option 4" />
          <Option value="option5" label="Option 5" />
        </OptionGroup>
        <Option value="option6" label="Option 6" />
      </Select>,
    )
  })
})
