import React from 'react'
import { storiesOf } from '@storybook/react'
import { Text } from './Text'
import { Box } from './Box'
import { Select, Option, OptionGroup } from './Select'

storiesOf('Components|Select', module).add('default', () => (
  <Box ml={6}>
    <Box mb="4">
      <Text as="p">Uncontrolled default size</Text>
      <Select mt={4}>
        <Option value="option1" label="Option 1" />
        <Option value="option2" label="Option 2" />
        <Option disabled value="option3" label="Option 3" />
        <OptionGroup label="Group 1">
          <Option value="option4" label="Option 4" />
          <Option value="option5" label="Option 5" />
        </OptionGroup>
        <Option value="option6" label="Option 6" />
      </Select>
    </Box>

    <Box mb="4">
      <Text as="p">Uncontrolled size 1</Text>
      <Select mt={4} size={1}>
        <Option value="option1" label="Option 1" />
        <Option value="option2" label="Option 2" />
        <Option value="option3" label="Option 3" />
        <OptionGroup label="Group 1">
          <Option value="option4" label="Option 4" />
          <Option value="option5" label="Option 5" />
        </OptionGroup>
        <Option value="option6" label="Option 6" />
      </Select>
    </Box>

    <Box mb="4">
      <Text as="p">Disabled</Text>
      <Select mt={4} disabled>
        <Option value="option1" label="Option 1" />
        <Option value="option2" label="Option 2" />
        <Option value="option3" label="Option 3" />
        <OptionGroup label="Group 1">
          <Option value="option4" label="Option 4" />
          <Option value="option5" label="Option 5" />
        </OptionGroup>
        <Option value="option6" label="Option 6" />
      </Select>
    </Box>

    <Box mb="4">
      <Text as="p">Ghost</Text>
      <Select mt={4} variant="ghost">
        <Option value="option1" label="Option 1" />
        <Option value="option2" label="Option 2" />
        <Option value="option3" label="Option 3" />
        <OptionGroup label="Group 1">
          <Option value="option4" label="Option 4" />
          <Option value="option5" label="Option 5" />
        </OptionGroup>
        <Option value="option6" label="Option 6" />
      </Select>
    </Box>

    <Box mb="4">
      <Text as="p">Shadow</Text>
      <Select mt={4} variant="shadow">
        <Option value="option1" label="Option 1" />
        <Option value="option2" label="Option 2" />
        <Option value="option3" label="Option 3" />
        <OptionGroup label="Group 1">
          <Option value="option4" label="Option 4" />
          <Option value="option5" label="Option 5" />
        </OptionGroup>
        <Option value="option6" label="Option 6" />
      </Select>
    </Box>
  </Box>
))
