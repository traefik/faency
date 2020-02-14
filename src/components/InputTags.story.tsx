import { storiesOf } from '@storybook/react'
import React from 'react'
import { Box } from './Box'
import { InputTags } from './InputTags'

storiesOf('Components|InputTags', module).add('default', () => (
  <Box>
    <InputTags placeholder="Placeholder" tags={['Traefik', 'Compression', 'asd', 'ccc', 'bbb', 'eee']} />
  </Box>
))
