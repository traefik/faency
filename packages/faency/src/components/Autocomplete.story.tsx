import { storiesOf } from '@storybook/react'
import React, { useState, useEffect } from 'react'
import { Box } from './Box'
import { Heading } from './Heading'
import { Autocomplete } from './Autocomplete'
import { DismissibleChip } from './DismissibleChip'

const filterCaseInsensitive = (value: string, values: string[]): string[] =>
  values.filter(v => v.toLowerCase().includes(value.toLowerCase()))

const data: string[] = [
  'Replica Group #1',
  'Replica Group #1 > Replica #1',
  'Replica Group #1 > Replica #2',
  'Replica Group #1 > Replica #3',
  'Replica Group #2',
  'Replica Group #2 > Replica #1',
  'Replica Group #2 > Replica #2',
  'Replica Group #3',
  'Replica Group #3 > Replica #1',
  'Replica Group #3 > Replica #2',
  'Replica Group #3 > Replica #3',
]

const SimpleAutocomplete = (): JSX.Element => {
  const [value, setValue] = useState<string | undefined>()
  const [options, setOptions] = useState<string[] | undefined>()

  const handleSubmit = (v: string): void => {
    setValue(v)
  }

  const handleInputChange = (v: string): void => {
    const newOptions = v.length ? filterCaseInsensitive(v, data) : []
    setOptions(newOptions)
  }

  return (
    <Autocomplete
      value={value}
      placeholder="Search... (typing 'r' for example)"
      options={options}
      onChange={handleSubmit}
      onInputChange={handleInputChange}
    />
  )
}

const AutocompleteWithTags = (): JSX.Element => {
  const [value, setValue] = useState<string | undefined>()
  const [options, setOptions] = useState<string[] | undefined>()
  const [tags, setTags] = useState<string[] | undefined>(['Traefik', 'Compression'])

  const handleSubmit = (v: string): void => {
    setValue(v)
  }

  const handleInputChange = (v: string): void => {
    const newOptions = v.length ? filterCaseInsensitive(v, data) : []
    setOptions(newOptions)
  }

  return (
    <Autocomplete
      value={value}
      placeholder="Search... (typing 'r' for example)"
      options={options}
      onChange={handleSubmit}
      onInputChange={handleInputChange}
      tags={tags}
      onDeleteTag={(tag): void => setTags(current => current.filter(t => t !== tag))}
    />
  )
}

const AutocompleteCustomTagRender = (): JSX.Element => {
  const [value, setValue] = useState<string | undefined>()
  const [options, setOptions] = useState<string[] | undefined>()
  const [tags, setTags] = useState(['Traefik', 'Compression'])

  const handleSubmit = (v: string): void => {
    setValue(v)
  }

  const handleInputChange = (v: string): void => {
    const newOptions = v.length ? filterCaseInsensitive(v, data) : []
    setOptions(newOptions)
  }

  return (
    <Autocomplete
      value={value}
      placeholder="Search... (typing 'r' for example)"
      onChange={handleSubmit}
      onInputChange={handleInputChange}
      tags={tags}
      options={options}
      renderTag={(tag, dismiss): JSX.Element => (
        <DismissibleChip key={tag} dismiss={(): void => dismiss(tag)} variant="purple">
          {tag}
        </DismissibleChip>
      )}
      onDeleteTag={(tag): void => setTags(current => current.filter(t => t !== tag))}
    />
  )
}

const AutocompleteAddTagsFromInput = (): JSX.Element => {
  const [tags, setTags] = useState(['Traefik'])
  const allOptions = ['Traefik EE', 'Yaegi', 'Maesh']
  const [options, setOptions] = useState(allOptions)
  const [value, setValue] = useState('')
  const addTag = (v: string): void => v !== '' && setTags(current => (!current.includes(v) ? [...current, v] : current))
  const filterSelectedOptions = (currentOptions: string[]): string[] =>
    currentOptions.filter((o: string) => !tags.includes(o))
  const getOptions = (v?: string): string[] => {
    const selectedOptions = filterSelectedOptions(allOptions)
    const currentValue = typeof v !== 'undefined' ? v : value
    return filterCaseInsensitive(currentValue, selectedOptions)
  }
  const handleSubmit = (v: string): void => {
    addTag(v)
    setValue('')
  }

  const handleChange = (value: string): void => {
    setValue(value)
    setOptions(() => getOptions(value))
  }

  useEffect(() => {
    setOptions(() => getOptions())
  }, [tags])

  return (
    <Autocomplete
      value={value}
      placeholder="Add tags from input submit with Autocomplete"
      tags={tags}
      options={options}
      onInputChange={handleChange}
      onChange={handleSubmit}
      onDeleteTag={(tag): void => setTags(current => current.filter(t => t !== tag))}
    />
  )
}

storiesOf('Components|Autocomplete', module).add('default', () => (
  <Box>
    <Box mb={1}>
      <Heading>Simple Autocomplete</Heading>
      <SimpleAutocomplete />
    </Box>
    <Box mb={1}>
      <Heading>Autocomplete With Tags</Heading>
      <AutocompleteWithTags />
    </Box>
    <Box mb={1}>
      <Heading>Autocomplete With Custom Tags</Heading>
      <AutocompleteCustomTagRender />
    </Box>
    <Box mb={1}>
      <Heading>Autocomplete Adding Tags</Heading>
      <AutocompleteAddTagsFromInput />
    </Box>
  </Box>
))
