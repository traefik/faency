import React from 'react';

import { CSS } from '../../stitches.config';
import { Box } from '../Box';
import { Label } from '../Label';
import { Text } from '../Text';
import { VisuallyHidden } from '../VisuallyHidden';
import { FieldBaseProps, FieldContext, useAnnouncedError, useFieldRoot } from './FieldContext';

export type FieldProps = FieldBaseProps & { css?: CSS };

const MESSAGE_CSS = { display: 'block', m: 0, mt: '$1', lineHeight: 1.4 };
// The tall line of a label makes room for a control right under it. Before a hint or beside a control, it is a gap.
const COMPACT_LABEL_CSS = { lineHeight: 1.4 };
const HINT_ABOVE_CONTROL_CSS = { ...MESSAGE_CSS, mb: '$2' };

const START_ROW_CSS = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'baseline',
  columnGap: '$5',
  rowGap: '$2',
};
const START_LABEL_CSS = { flex: '1 1 0', minWidth: '10rem' };
const START_CONTROL_CSS = { flex: '2 1 0', minWidth: '16rem' };

/**
 * Gives a label, a hint, a description and an error to the one form control inside it.
 * For more than one control, use `group`.
 */
export const Field = ({
  label,
  hint,
  description,
  error,
  announceError,
  labelPosition = 'top',
  children,
  css,
  ...props
}: FieldProps) => {
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

  const labelNode = React.useMemo(() => {
    if (!hasLabel || !ids.labelId) {
      return null;
    }
    if (typeof label === 'function') {
      return label({ variant: labelVariant, htmlFor: labelFor, id: ids.labelId });
    }
    return (
      <Label
        variant={labelVariant}
        htmlFor={labelFor}
        id={ids.labelId}
        css={hasHint || labelPosition === 'start' ? COMPACT_LABEL_CSS : undefined}
      >
        {label}
      </Label>
    );
  }, [hasLabel, hasHint, label, labelPosition, labelVariant, labelFor, ids.labelId]);

  const hintNode = hasHint && (
    <Text
      as="p"
      id={ids.hintId}
      size={messageSize}
      variant="subtle"
      css={labelPosition === 'top' ? HINT_ABOVE_CONTROL_CSS : MESSAGE_CSS}
    >
      {hint}
    </Text>
  );

  const messages = (
    <>
      {hasDescription && (
        <Text as="p" id={ids.descriptionId} size={messageSize} variant="subtle" css={MESSAGE_CSS}>
          {description}
        </Text>
      )}
      {hasError && (
        <Text as="p" id={ids.errorId} size={messageSize} variant="invalid" css={MESSAGE_CSS}>
          {error}
        </Text>
      )}
    </>
  );

  return (
    <FieldContext.Provider value={context}>
      <Box
        css={labelPosition === 'start' ? { ...START_ROW_CSS, ...css } : css}
        onFocus={onFocus}
        onBlur={onBlur}
        {...groupProps}
      >
        {labelPosition === 'start' ? (
          <>
            <Box css={START_LABEL_CSS}>
              {labelNode}
              {hintNode}
            </Box>
            <Box css={START_CONTROL_CSS}>
              {children}
              {messages}
            </Box>
          </>
        ) : labelPosition === 'end' ? (
          <>
            <Box
              css={{
                display: 'flex',
                alignItems: 'center',
                gap: '$2',
                '& > [role="switch"]': { m: 0 },
              }}
            >
              {children}
              {labelNode}
            </Box>
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
      </Box>
    </FieldContext.Provider>
  );
};
