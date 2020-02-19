import { storiesOf } from '@storybook/react'
import React, { useMemo, useState } from 'react'
import { Box } from './Box'
import { InputTags } from './InputTags'
import { DismissableChip } from './DismissableChip'
import { Text } from './Text'

const InputTagsWithAutocomplete = () => {
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
        onChange={v => setOptions(() => allOptions.filter(o => o.includes(v)))}
        onSubmit={v => saveSubmit(current => [...current, v])}
        onDeleteTag={(tag) => setTags(current => current.filter(t => t !== tag))}
      />
      <Box mt={1}>
        <Text>Submitted: {JSON.stringify(submitted)}</Text>
      </Box>
    </>
  )
}

const InputTagsCustomTagRender = () => {
  const [tags, setTags] = useState(['Traefik', 'Compression'])

  return (
    <InputTags
      placeholder="Custom Tag Render"
      tags={tags}
      renderTag={(tag, dismiss) => (
        <DismissableChip key={tag} dismiss={() => dismiss(tag)} variant="purple">
          {tag}
        </DismissableChip>
      )}
      onDeleteTag={(tag) => setTags(current => current.filter(t => t !== tag))}
    />
  )
}

const InputTagsAddTagsFromInput = () => {
  const [tags, setTags] = useState(['Traefik'])
  const memoTags = useMemo(() => tags, [tags])
  const allOptions = ['Traefik EE', 'Yaegi', 'Maesh']
  const [options, setOptions] = useState(allOptions)
  const [value, setValue] = useState('asdasdasdasd')
  const addTag = (v: string) => v !== '' && setTags(current => (!current.includes(v) ? [...current, v] : current))
  const handleSubmit = (v: string) => {
    addTag(v)
    setValue('')
  }

  const handleChange = (value: string) => {
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
      onDeleteTag={tag => setTags(current => current.filter(t => t !== tag))}
    />
  )
}

storiesOf('Components|InputTags', module).add('default', () => (
  <Box>
    <Box mb={1}>
      <InputTagsWithAutocomplete/>
    </Box>
    <Box mb={1}>
      <InputTagsCustomTagRender/>
    </Box>
    <Box mb={1}>
      <InputTagsAddTagsFromInput/>
    </Box>
  </Box>
))
