import { storiesOf } from '@storybook/react'
import React, { useState } from 'react'
import { Box } from './Box'
import { InputTags } from './InputTags'
import { DismissibleChip } from './DismissibleChip'
import { Text } from './Text'

const InputTagsWithAutocomplete = (): JSX.Element => {
  const [tags, setTags] = useState(['Traefik', 'Compression'])
  const allOptions = ['Redirect Path', 'Redirect Regex', 'Redirect Scheme']
  const [options, setOptions] = useState(allOptions)
  const [submitted, saveSubmit] = useState<string[]>([])

  return (
    <>
      <InputTags
        placeholder="Input with autocomplete"
        tags={tags}
        options={options}
        onChange={(v): void => setOptions(() => allOptions.filter(o => o.includes(v)))}
        onSubmit={(v): void => saveSubmit(current => [...current, v])}
        onDeleteTag={(tag): void => setTags(current => current.filter(t => t !== tag))}
      />
      <Box mt={1}>
        <Text>Submitted: {JSON.stringify(submitted)}</Text>
      </Box>
    </>
  )
}

const InputTagsCustomTagRender = (): JSX.Element => {
  const [tags, setTags] = useState(['Traefik', 'Compression'])

  return (
    <InputTags
      placeholder="Custom Tag Render"
      tags={tags}
      renderTag={(tag, dismiss): JSX.Element => (
        <DismissibleChip key={tag} dismiss={(): void => dismiss(tag)} variant="purple">
          {tag}
        </DismissibleChip>
      )}
      onDeleteTag={(tag): void => setTags(current => current.filter(t => t !== tag))}
    />
  )
}

const InputTagsAddTagsFromInput = (): JSX.Element => {
  const [tags, setTags] = useState(['Traefik'])
  const allOptions = ['Traefik EE', 'Yaegi', 'Maesh']
  const [options, setOptions] = useState(allOptions)
  const [value, setValue] = useState('')
  const addTag = (v: string): void => v !== '' && setTags(current => (!current.includes(v) ? [...current, v] : current))
  const handleSubmit = (v: string): void => {
    addTag(v)
    setValue('')
  }

  const handleChange = (value: string): void => {
    setValue(value)
    setOptions(() => allOptions.filter(o => o.includes(value)))
  }

  return (
    <InputTags
      value={value}
      placeholder="Add tags from input submit with Autocomplete"
      tags={tags}
      options={options}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onDeleteTag={(tag): void => setTags(current => current.filter(t => t !== tag))}
    />
  )
}

storiesOf('Components|InputTags', module).add('default', () => (
  <Box>
    <Box mb={1}>
      <InputTagsWithAutocomplete />
    </Box>
    <Box mb={1}>
      <InputTagsCustomTagRender />
    </Box>
    <Box mb={1}>
      <InputTagsAddTagsFromInput />
    </Box>
  </Box>
))
