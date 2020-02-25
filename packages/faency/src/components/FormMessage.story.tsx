import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { Box } from './Box'
import { FormMessage } from './FormMessage'
import { Input } from './Input'
import Icon from 'react-eva-icons'

const hasOnlyLetters = (value: string): boolean => /^[a-zA-Z]+$/.test(value)

const InputValidationExample = (): JSX.Element => {
  const [value, setValue] = useState('123')

  return (
    <>
      <Input placeholder="Only letters input" value={value} onChange={(e): void => setValue(e.target.value)} mb={1} />
      {value && !hasOnlyLetters(value) && (
        <FormMessage
          message="Invalid input value. Only letters are allowed."
          icon={<Icon name="alert-triangle" color="#FFF" />}
        />
      )}
    </>
  )
}

storiesOf('Components|FormMessage', module).add('default', () => (
  <Box>
    <InputValidationExample />
  </Box>
))
