import React from 'react';

import { CSS } from '../../stitches.config';
import { Box } from '../Box';
import { Label } from '../Label';
import { Text } from '../Text';
import { VisuallyHidden } from '../VisuallyHidden';
import { FieldBaseProps, FieldContext, useAnnouncedError, useFieldRoot } from './FieldContext';

export type FieldProps = FieldBaseProps & { css?: CSS };

const MESSAGE_CSS = { display: 'block', m: 0, mt: '$1' };

/**
 * Gives a label, a description and an error to the one form control inside it.
 * Its label connects to one control, so do not put two controls in one Field.
 */
export const Field = ({
  label,
  description,
  error,
  announceError,
  labelPosition = 'top',
  children,
  css,
  ...props
}: FieldProps) => {
  const { context, labelFor, labelVariant, hasLabel, hasDescription, hasError, onFocus, onBlur } =
    useFieldRoot({ label, description, error, ...props });
  const announcedError = useAnnouncedError(
    Boolean(announceError),
    hasError ? context.errorId : undefined,
    context.labelId,
  );

  const labelNode = React.useMemo(() => {
    if (!hasLabel || !context.labelId) {
      return null;
    }
    if (typeof label === 'function') {
      return label({ variant: labelVariant, htmlFor: labelFor, id: context.labelId });
    }
    return (
      <Label variant={labelVariant} htmlFor={labelFor} id={context.labelId}>
        {label}
      </Label>
    );
  }, [hasLabel, label, labelVariant, labelFor, context.labelId]);

  const errorNode = hasError && (
    <Text as="p" id={context.errorId} size="0" variant="invalid" css={MESSAGE_CSS}>
      {error}
    </Text>
  );

  return (
    <FieldContext.Provider value={context}>
      <Box css={css} onFocus={onFocus} onBlur={onBlur}>
        {labelPosition === 'end' ? (
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
        ) : (
          <>
            {labelNode}
            {children}
          </>
        )}
        {hasDescription && (
          <Text as="p" id={context.descriptionId} size="0" variant="subtle" css={MESSAGE_CSS}>
            {description}
          </Text>
        )}
        {errorNode}
        {announceError && <VisuallyHidden aria-live="polite">{announcedError}</VisuallyHidden>}
      </Box>
    </FieldContext.Provider>
  );
};
