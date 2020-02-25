import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { Box } from './Box'
import { FormError } from './FormError'
import { Input } from './Input'

const hasOnlyLetters = (value: string): boolean => /^[a-zA-Z]+$/.test(value)

const InputValidationExample = (): JSX.Element => {
  const [value, setValue] = useState('123')

  return (
    <>
      <Input placeholder="Only letters input" value={value} onChange={(e): void => setValue(e.target.value)} mb={1} />
      {value && !hasOnlyLetters(value) && <FormError message="Invalid input value. Only letters are allowed." />}
    </>
  )
}

storiesOf('Components|Input', module).add('default', () => (
  <Box>
    <InputValidationExample />
  </Box>
))
