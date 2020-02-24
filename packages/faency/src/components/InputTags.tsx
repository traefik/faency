import React, { ChangeEvent, KeyboardEvent, ReactNode, useEffect, useState } from 'react'
import { DismissibleChip } from './DismissibleChip'
import { InputProps } from 'mdlz-prmtz'
import styled, { SimpleInterpolation } from 'styled-components'
import { theme } from '../theme'
import { Box } from './Box'

const StyledInput = styled('input')`
  border: none;
  background: none;
  outline: none;
  flex-grow: 1;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  max-height: ${theme.sizes[3]};
  margin: 0 ${theme.space[1]} ${theme.space[1]} 0;
`

const Container = styled('div')<{ hasFocus: boolean }>`
  position: relative;
  padding: ${theme.space[1]} 0 0 ${theme.space[1]};
  transition: box-shadow 360ms cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;
  border-radius: ${theme.radii[4]};
  box-shadow: 0 0 0 1px ${theme.colors.gray};
  display: flex;
  flex-wrap: wrap;
  background-color: ${theme.colors.white};

  ${({ hasFocus }): SimpleInterpolation =>
    hasFocus &&
    `
    box-shadow: 0 0 0 2px ${theme.colors.black};    
  `}
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

  &:hover {
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

type RenderTagType = (tag: string, onDeleteTag: (tag: string) => void) => ReactNode

const defaultRenderTag: RenderTagType = (tag, onDeleteTag) => (
  <DismissibleChip key={tag} dismiss={(): void => onDeleteTag(tag)}>
    {tag}
  </DismissibleChip>
)

type RenderOptionType = (tag: string, onClick: (v: string) => void) => ReactNode

const defaultRenderOption: RenderOptionType = (option, onClick) => (
  <SelectItem key={option} onClick={(): void => onClick(option)}>
    {option}
  </SelectItem>
)

interface InputTagsProps {
  value?: string
  placeholder?: string
  tags?: string[]
  options?: string[]
  maxTags?: number
  maxInlineTags?: number
  renderTag?: RenderTagType
  renderOption?: RenderOptionType
  onChange?: (value: string) => void
  onSubmit?: (value: string) => void
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
      onChange = (): void => null,
      onSubmit = (): void => null,
      onDeleteTag = (): void => null,
    },
    forwardedRef,
  ) => {
    const [hasFocus, setFocus] = useState(false)
    const [inputValue, setValue] = useState(value)
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
      setValue(e.target.value)
      onChange(e.target.value)
    }

    useEffect(() => {
      setValue(value)
    }, [value, setValue])

    return (
      <Container hasFocus={hasFocus}>
        <CustomInput
          ref={forwardedRef}
          onEnter={onSubmit}
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
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
        {inputValue.length > 0 && options.length > 0 && (
          <SelectContainer>{options.map(option => renderOption(option, onSubmit))}</SelectContainer>
        )}
      </Container>
    )
  },
)

InputTags.displayName = 'InputTags'
