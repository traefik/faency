import { assignInlineVars } from '@vanilla-extract/dynamic';
import React from 'react';

import { CSSProps, processCSSProp } from '../../styles/cssProps';
import { useVanillaExtractTheme } from '../../styles/themeContext';
import { BoxVanilla } from '../Box';
import { LabelVanilla } from '../Label';
import { TextVanilla } from '../Text';
import { VisuallyHidden } from '../VisuallyHidden';
import { endLabelRow, startControl, startLabel, startRow } from './Field.vanilla.css';
import { FieldBaseProps, FieldContext, useAnnouncedError, useFieldRoot } from './FieldContext';

export type FieldVanillaProps = FieldBaseProps & { css?: CSSProps['css'] };

const MESSAGE_CSS = { display: 'block', m: 0, mt: '$1', lineHeight: 1.4 };
// The tall line of a label makes room for a control right under it. Before a hint or beside a control, it is a gap.
const COMPACT_LABEL_CSS = { lineHeight: 1.4 };
const HINT_ABOVE_CONTROL_CSS = { ...MESSAGE_CSS, mb: '$2' };

/**
 * Gives a label, a hint, a description and an error to the one form control inside it.
 * For more than one control, use `group`.
 */
export const FieldVanilla = ({
  label,
  hint,
  description,
  error,
  announceError,
  labelPosition = 'top',
  children,
  css,
  ...props
}: FieldVanillaProps) => {
  const {
    context,
    ids,
    groupProps,
    messageSize,
    labelFor,
    labelVariant,
    hasLabel,
    hasHint,
    hasDescription,
    hasError,
    onFocus,
    onBlur,
  } = useFieldRoot({ label, hint, description, error, ...props });
  const announcedError = useAnnouncedError(
    Boolean(announceError),
    hasError ? ids.errorId : undefined,
    ids.labelId,
  );
  const { colors } = useVanillaExtractTheme();
  const { style: rootStyle, vars: rootVars } = processCSSProp(css, colors);

  const labelNode = React.useMemo(() => {
    if (!hasLabel || !ids.labelId) {
      return null;
    }
    if (typeof label === 'function') {
      return label({ variant: labelVariant, htmlFor: labelFor, id: ids.labelId });
    }
    return (
      <LabelVanilla
        variant={labelVariant}
        htmlFor={labelFor}
        id={ids.labelId}
        css={hasHint || labelPosition === 'start' ? COMPACT_LABEL_CSS : undefined}
      >
        {label}
      </LabelVanilla>
    );
  }, [hasLabel, hasHint, label, labelPosition, labelVariant, labelFor, ids.labelId]);

  const hintNode = hasHint && (
    <TextVanilla
      as="p"
      id={ids.hintId}
      size={messageSize}
      variant="subtle"
      css={labelPosition === 'top' ? HINT_ABOVE_CONTROL_CSS : MESSAGE_CSS}
    >
      {hint}
    </TextVanilla>
  );

  const messages = (
    <>
      {hasDescription && (
        <TextVanilla
          as="p"
          id={ids.descriptionId}
          size={messageSize}
          variant="subtle"
          css={MESSAGE_CSS}
        >
          {description}
        </TextVanilla>
      )}
      {hasError && (
        <TextVanilla as="p" id={ids.errorId} size={messageSize} variant="invalid" css={MESSAGE_CSS}>
          {error}
        </TextVanilla>
      )}
    </>
  );

  return (
    <FieldContext.Provider value={context}>
      <div
        className={labelPosition === 'start' ? startRow : undefined}
        style={{ ...rootStyle, ...assignInlineVars(rootVars) }}
        onFocus={onFocus}
        onBlur={onBlur}
        {...groupProps}
      >
        {labelPosition === 'start' ? (
          <>
            <BoxVanilla className={startLabel}>
              {labelNode}
              {hintNode}
            </BoxVanilla>
            <BoxVanilla className={startControl}>
              {children}
              {messages}
            </BoxVanilla>
          </>
        ) : labelPosition === 'end' ? (
          <>
            <BoxVanilla className={endLabelRow}>
              {children}
              {labelNode}
            </BoxVanilla>
            {hintNode}
            {messages}
          </>
        ) : (
          <>
            {labelNode}
            {hintNode}
            {children}
            {messages}
          </>
        )}
        {announceError && <VisuallyHidden aria-live="polite">{announcedError}</VisuallyHidden>}
      </div>
    </FieldContext.Provider>
  );
};
