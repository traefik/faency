import React, { ChangeEvent, KeyboardEvent, ReactNode, useState } from 'react'
import { DismissableChip } from './DismissableChip'
import { InputProps } from 'mdlz-prmtz'
import styled from 'styled-components'
import { theme } from '../theme'

const StyledInput = styled('input')`
  border: none;
  background: none;
  outline: none;
  flex-grow: 1;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  max-height: ${theme.sizes[3]};
  margin: 0 ${theme.space[1]} ${theme.space[1]} 0;
`

type CustomInputType = InputProps & {
  onEnter?: () => void
}

const CustomInput = ({ onEnter, ...props }: CustomInputType) => {
  const handlePressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onEnter) {
      onEnter()
    }
  }

  return <StyledInput {...props} onKeyPress={handlePressEnter} />
}

const Container = styled('div')<{ hasFocus: boolean }>`
  position: relative;
  padding: ${theme.space[1]} 0 0 ${theme.space[1]};
  transition: box-shadow 360ms cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;
  border-radius: ${theme.radii[4]};
  box-shadow: 0 0 0 1px ${theme.colors.gray};
  display: flex;
  flex-wrap: wrap;

  ${({ hasFocus }) =>
    hasFocus &&
    `
    box-shadow: 0 0 0 2px ${theme.colors.black};    
  `}
`

const SyledDismissableChip = styled(DismissableChip)``

const ChipsContainer = styled('div')`
  display: flex;
  flex-wrap: wrap;

  &:first-child {
    justify-items: flex-end;
    max-width: 60%;
  }

  ${SyledDismissableChip} {
    margin: 0 ${theme.space[1]} ${theme.space[1]} 0;
  }
`

type RenderTagType = (props: { tag: string; removeTag: () => void }) => ReactNode

const defaultRenderTag: RenderTagType = ({ tag, removeTag }) => (
  <SyledDismissableChip key={tag} dismiss={() => removeTag()}>
    {tag}
  </SyledDismissableChip>
)

type InputTagsProps = {
  placeholder?: string
  tags?: string[]
  renderTag?: RenderTagType
  maxInlineTags?: number
}

export const InputTags = React.forwardRef<HTMLInputElement, InputTagsProps>(
  ({ placeholder = '', tags = [], renderTag = defaultRenderTag, maxInlineTags = 3 }, forwardedRef) => {
    const [values, setValues] = useState<string[]>(tags)
    const [fieldValue, setFieldValue] = useState('')
    const [hasFocus, setFocus] = useState(false)
    const addValue = () => {
      setValues(prevValues => (!prevValues.includes(fieldValue) ? [...prevValues, fieldValue] : prevValues))
      setFieldValue('')
    }
    const removeValue = (i: number) =>
      setValues(prevValues => prevValues.slice(0, i).concat(prevValues.slice(i + 1, prevValues.length)))
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => setFieldValue(e.target.value)

    return (
      <Container hasFocus={hasFocus}>
        <CustomInput
          ref={forwardedRef}
          onEnter={addValue}
          onChange={handleChange}
          value={fieldValue}
          placeholder={placeholder}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
        {values.length > 0 && (
          <>
            <ChipsContainer>
              {values.map(
                (tag, index) => index < maxInlineTags && renderTag({ tag, removeTag: () => removeValue(index) }),
              )}
            </ChipsContainer>
            <ChipsContainer>
              {values.map(
                (tag, index) => index >= maxInlineTags && renderTag({ tag, removeTag: () => removeValue(index) }),
              )}
            </ChipsContainer>
          </>
        )}
      </Container>
    )
  },
)
