import { storiesOf } from '@storybook/react'
import React from 'react'
import { Box } from './Box'
import { InputTags } from './InputTags'
import { DismissableChip } from './DismissableChip'

storiesOf('Components|InputTags', module).add('default', () => (
  <Box>
    <Box mb={1}>
      <InputTags placeholder="Default render" tags={['Traefik', 'Compression', 'Nodes', 'Kubernetes', 'Controller']}/>
    </Box>
    <Box>
      <InputTags placeholder="Custom Tag Render" tags={['Traefik', 'Compression']} renderTag={({ tag, removeTag }) => (
        <DismissableChip key={tag} dismiss={removeTag}>
          {tag}
        </DismissableChip>
      )}/>
    </Box>
  </Box>
))
