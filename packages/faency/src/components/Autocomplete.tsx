import React, { ChangeEvent, KeyboardEvent, ReactNode, useEffect, useState, useRef } from 'react'
import { InputProps } from '@modulz/primitives'
import { getInputBorderStyle } from '../components/Input'
import { ArrowNav } from './ArrowNav'
import { DismissibleChip } from './DismissibleChip'
import styled from 'styled-components'
import mergeRefs from 'react-merge-refs'
import { theme, ThemeType } from '../theme'
import { Box } from './Box'
import useClickOutside from '../hooks/use-click-outside'
import useKeyListener from '../hooks/use-key-listener'

type StyledInputProps = {
  theme: ThemeType
}
const StyledInput = styled('input')`
  border: none;
  background: none;
  outline: none;
  flex-grow: 1;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  min-width: 40%;
  max-height: ${theme.sizes[3]};
  margin: 0 12px 12px 0;
  color: ${(props: StyledInputProps): string => props.theme.colors.black};
`

type ContainerProps = {
  theme: ThemeType
  hasFocus: boolean
}
const Container = styled('div')<{ hasFocus: boolean }>`
  position: relative;
  padding: 12px 0 0 12px;
  transition: box-shadow 360ms cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;
  border-radius: ${theme.radii[1]};
  display: flex;
  flex-wrap: wrap;
  background-color: ${(props: ContainerProps): string => props.theme.colors.white};
  transition: all 0.36s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${(props: ContainerProps): string =>
    getInputBorderStyle({
      mode: props.hasFocus ? 'focus' : 'normal',
      variant: 'shadow',
      error: false,
      themeContext: theme,
    })};

  &:hover {
    box-shadow: ${(props: ContainerProps): string =>
      getInputBorderStyle({
        mode: props.hasFocus ? 'focus' : 'hover',
        variant: 'shadow',
        error: false,
        themeContext: theme,
      })};
  }
`

const ChipsContainer = styled('div')`
  display: flex;
  flex-wrap: wrap;

  &:first-child {
    justify-items: flex-end;
    max-width: 60%;
  }

  > * {
    margin: 0 12px 12px 0;
  }
`

const SelectContainer = styled(Box)`
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  margin-top: 3px;
  background: ${theme.colors.white};
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.3);
  z-index: 10;
`

const SelectItem = styled(Box)`
  padding: ${theme.space[1]};
  transition: all 100ms ease-in;

  &:hover,
  &:focus {
    outline: none;
    background: ${theme.colors.blue};
    color: ${theme.colors.white};
    cursor: pointer;
  }
`

type CustomInputType = InputProps & {
  onEnter?: (value: string) => void
}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputType>(({ onEnter, ...props }, forwardedRef) => {
  const [value, setValue] = useState(props.value as string)

  const handlePressEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && onEnter) {
      onEnter(value)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value)
    if (props.onChange) {
      props.onChange(e)
    }
  }

  return <StyledInput ref={forwardedRef} {...props} onChange={handleChange} onKeyPress={handlePressEnter} />
})

CustomInput.displayName = 'CustomInput'

type RenderTagType = (tag: string, onDeleteTag?: (tag: string) => void) => ReactNode

const defaultRenderTag: RenderTagType = (tag, onDeleteTag) => (
  <DismissibleChip key={tag} dismiss={(): void => onDeleteTag && onDeleteTag(tag)}>
    {tag}
  </DismissibleChip>
)

type RenderOptionType = (tag: string, onClick: (v: string) => void) => ReactNode

const defaultRenderOption: RenderOptionType = (option, onClick) => (
  <SelectItem
    key={option}
    onClick={(): void => onClick(option)}
    onKeyPress={(e: KeyboardEvent): false | void => e.key === 'Enter' && onClick(option)}
  >
    {option}
  </SelectItem>
)

export type AutocompleteProps = {
  value?: string
  placeholder?: string
  tags?: string[]
  options?: string[]
  maxInlineTags?: number
  renderTag?: RenderTagType
  renderOption?: RenderOptionType
  onInputChange?: (value: string) => void
  onChange?: (value: string) => void
  onDeleteTag?: (tag: string) => void
}

export const Autocomplete = React.forwardRef<HTMLInputElement, AutocompleteProps>(
  (
    {
      value = '',
      placeholder = '',
      tags = [],
      options = [],
      maxInlineTags = 3,
      renderTag = defaultRenderTag,
      renderOption = defaultRenderOption,
      onInputChange,
      onChange,
      onDeleteTag,
    },
    forwardedRef,
  ) => {
    const [hasFocus, setFocus] = useState(false)
    const [selectFocus, setSelectFocus] = useState(false)
    const [inputValue, setValue] = useState(value)
    const inputRef = useRef<HTMLInputElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const selectRef = useRef<HTMLDivElement>(null)

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
      setSelectFocus(true)
      setValue(e.target.value)
      if (onInputChange) {
        onInputChange(e.target.value)
      }
    }

    const handleOptionSelection = (value: string): void => {
      if (onChange) {
        onChange(value)
      }
      setSelectFocus(false)
    }

    useClickOutside(selectRef, () => {
      setSelectFocus(false)
    })

    useClickOutside(containerRef, () => {
      setFocus(false)
    })

    useKeyListener(key => {
      if (key === 'Tab') {
        setSelectFocus(false)
      }

      if (hasFocus && key === 'ArrowDown') {
        const arrowNavContainer = selectRef.current?.firstChild

        if (arrowNavContainer && arrowNavContainer.firstChild instanceof HTMLElement) {
          arrowNavContainer.firstChild.focus()
        }
      }
    })

    useEffect(() => {
      setValue(value)
    }, [value, setValue])

    return (
      <Container ref={containerRef} hasFocus={hasFocus} onClick={(): void => inputRef.current?.focus()}>
        <CustomInput
          ref={mergeRefs([inputRef, forwardedRef])}
          onEnter={onChange}
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          onClick={(): void => setSelectFocus(true)}
          onFocus={(): void => setFocus(true)}
          onBlur={(): void => setFocus(false)}
        />
        {tags.length > 0 && (
          <>
            <ChipsContainer>
              {tags.map((tag, index) => index < maxInlineTags && renderTag(tag, onDeleteTag))}
            </ChipsContainer>
            <ChipsContainer>
              {tags.map((tag, index) => index >= maxInlineTags && renderTag(tag, onDeleteTag))}
            </ChipsContainer>
          </>
        )}
        {selectFocus && options.length > 0 && (
          <SelectContainer ref={selectRef}>
            <ArrowNav>{options.map(option => renderOption(option, handleOptionSelection))}</ArrowNav>
          </SelectContainer>
        )}
      </Container>
    )
  },
)

Autocomplete.displayName = 'Autocomplete'
