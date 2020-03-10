import React, { ChangeEvent, KeyboardEvent, ReactNode, useEffect, useState, useRef } from 'react'
import { InputProps } from 'mdlz-prmtz'
import ArrowNav from 'react-arrow-nav'
import { DismissibleChip } from './DismissibleChip'
import styled from 'styled-components'
import { theme } from '../theme'
import { Box } from './Box'
import useClickOutside from '../hooks/use-click-outside'
import useKeyListener from '../hooks/use-key-listener'

const StyledInput = styled('input')`
  border: none;
  background: none;
  outline: none;
  flex-grow: 1;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  min-width: 40%;
  max-height: ${theme.sizes[3]};
  margin: 0 ${theme.space[1]} ${theme.space[1]} 0;
  color: ${(props: any): string => props.theme.colors.black};
`

const Container = styled('div')<{ hasFocus: boolean }>`
  position: relative;
  padding: ${theme.space[1]} 0 0 ${theme.space[1]};
  transition: box-shadow 360ms cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;
  border-radius: ${theme.radii[4]};
  display: flex;
  flex-wrap: wrap;
  background-color: ${(props: any): string => props.theme.colors.white};
  box-shadow: ${(props: any): string =>
    props.hasFocus ? `0 0 0 2px ${props.theme.colors.black}` : `0 0 0 1px ${props.theme.colors.gray}`};
`

const ChipsContainer = styled('div')`
  display: flex;
  flex-wrap: wrap;

  &:first-child {
    justify-items: flex-end;
    max-width: 60%;
  }

  > * {
    margin: 0 ${theme.space[1]} ${theme.space[1]} 0;
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

const CustomInput = ({ onEnter, ...props }: CustomInputType): JSX.Element => {
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

  return <StyledInput {...props} onChange={handleChange} onKeyPress={handlePressEnter} />
}

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

interface InputTagsProps {
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

export const InputTags = React.forwardRef<HTMLInputElement, InputTagsProps>(
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
    const selectRef = useRef<HTMLDivElement>(null)
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
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

    useClickOutside(selectRef, () => setSelectFocus(false))

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

    useEffect(() => {
      if (hasFocus) {
        setSelectFocus(true)
      }
    }, [hasFocus])

    return (
      <Container hasFocus={hasFocus}>
        <CustomInput
          ref={forwardedRef}
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

InputTags.displayName = 'InputTags'
