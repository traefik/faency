import { assignInlineVars } from '@vanilla-extract/dynamic';
import React from 'react';

import { CSSProps, processCSSProp } from '../../styles/cssProps';
import { useVanillaExtractTheme } from '../../styles/themeContext';
import { BoxVanilla } from '../Box';
import { LabelVanilla } from '../Label';
import { TextVanilla } from '../Text';
import { VisuallyHidden } from '../VisuallyHidden';
import { endLabelRow } from './Field.vanilla.css';
import { FieldBaseProps, FieldContext, useAnnouncedError, useFieldRoot } from './FieldContext';

export type FieldVanillaProps = FieldBaseProps & { css?: CSSProps['css'] };

const MESSAGE_CSS = { display: 'block', m: 0, mt: '$1' };

/**
 * Gives a label, a description and an error to the one form control inside it.
 * Its label connects to one control, so do not put two controls in one Field.
 */
export const FieldVanilla = ({
  label,
  description,
  error,
  announceError,
  labelPosition = 'top',
  children,
  css,
  ...props
}: FieldVanillaProps) => {
  const { context, labelFor, labelVariant, hasLabel, hasDescription, hasError, onFocus, onBlur } =
    useFieldRoot({ label, description, error, ...props });
  const announcedError = useAnnouncedError(
    Boolean(announceError),
    hasError ? context.errorId : undefined,
    context.labelId,
  );
  const { colors } = useVanillaExtractTheme();
  const { style: rootStyle, vars: rootVars } = processCSSProp(css, colors);

  const labelNode = React.useMemo(() => {
    if (!hasLabel || !context.labelId) {
      return null;
    }
    if (typeof label === 'function') {
      return label({ variant: labelVariant, htmlFor: labelFor, id: context.labelId });
    }
    return (
      <LabelVanilla variant={labelVariant} htmlFor={labelFor} id={context.labelId}>
        {label}
      </LabelVanilla>
    );
  }, [hasLabel, label, labelVariant, labelFor, context.labelId]);

  const errorNode = hasError && (
    <TextVanilla as="p" id={context.errorId} size="0" variant="invalid" css={MESSAGE_CSS}>
      {error}
    </TextVanilla>
  );

  return (
    <FieldContext.Provider value={context}>
      <div
        style={{ ...rootStyle, ...assignInlineVars(rootVars) }}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {labelPosition === 'end' ? (
          <BoxVanilla className={endLabelRow}>
            {children}
            {labelNode}
          </BoxVanilla>
        ) : (
          <>
            {labelNode}
            {children}
          </>
        )}
        {hasDescription && (
          <TextVanilla
            as="p"
            id={context.descriptionId}
            size="0"
            variant="subtle"
            css={MESSAGE_CSS}
          >
            {description}
          </TextVanilla>
        )}
        {errorNode}
        {announceError && <VisuallyHidden aria-live="polite">{announcedError}</VisuallyHidden>}
      </div>
    </FieldContext.Provider>
  );
};
