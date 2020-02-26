import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { Box } from './Box'
import { FormMessage } from './FormMessage'
import { Input } from './Input'

const hasOnlyLetters = (value: string): boolean => /^[a-zA-Z]+$/.test(value)

const InputValidationExample = (): JSX.Element => {
  const [value, setValue] = useState('123')

  return (
    <>
      <Input placeholder="Only letters input" value={value} onChange={(e): void => setValue(e.target.value)} mb={1} />
      {value && !hasOnlyLetters(value) && (
        <FormMessage message="Invalid input value. Only letters are allowed." variant="error" hasIcon />
      )}
    </>
  )
}

storiesOf('Components|FormMessage', module).add('default', () => (
  <Box>
    <Box mb={4}>
      <InputValidationExample />
    </Box>
    <Box mb={1}>
      <FormMessage message="Warning message." variant="warning" hasIcon />
    </Box>
    <Box mb={1}>
      <FormMessage message="Information message." variant="info" hasIcon />
    </Box>
    <Box mb={1}>
      <FormMessage message="Success message." variant="success" hasIcon />
    </Box>
  </Box>
))
