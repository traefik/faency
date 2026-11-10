import React from 'react';

type FieldControlState = { id?: string; disabled: boolean; invalid: boolean; labelable: boolean };

export type FieldContextValue = {
  controlId?: string;
  labelId?: string;
  descriptionId?: string;
  errorId?: string;
  invalid: boolean;
  disabled: boolean;
  registerControl: (state: FieldControlState | null) => void;
};

export const FieldContext = React.createContext<FieldContextValue | null>(null);

export const useFieldContext = () => React.useContext(FieldContext);

export type FieldControlOptions = {
  id?: string;
  invalid?: boolean;
  disabled?: boolean;
  'aria-describedby'?: string;
  'aria-invalid'?: React.AriaAttributes['aria-invalid'];
  /** Set to false when the control is not a labelable element, such as a radio group. */
  labelable?: boolean;
};

export type FieldLabelVariant = 'invalid' | 'subtle' | 'contrast' | 'default';

export type FieldLabelProps = {
  variant: FieldLabelVariant;
  htmlFor?: string;
  id: string;
};

export type FieldBaseProps = {
  id?: string;
  label?: React.ReactNode | ((props: FieldLabelProps) => React.ReactNode);
  description?: React.ReactNode;
  error?: React.ReactNode;
  invalid?: boolean;
  disabled?: boolean;
  announceError?: boolean;
  labelPosition?: 'top' | 'end';
  children?: React.ReactNode;
};

const hasContent = (node: React.ReactNode) =>
  node !== undefined && node !== null && node !== false && node !== '';

export const useFieldRoot = ({
  id,
  label,
  description,
  error,
  invalid,
  disabled,
}: FieldBaseProps) => {
  const outerContext = useFieldContext();
  const generatedId = React.useId();
  const hasLabel = typeof label === 'function' || hasContent(label);
  const hasDescription = hasContent(description);
  const hasError = hasContent(error);
  const isInvalid = Boolean(invalid) || hasError;

  const [control, setControl] = React.useState<FieldControlState | null>(null);
  const registerControl = React.useCallback((next: FieldControlState | null) => {
    setControl((prev) =>
      prev?.id === next?.id &&
      prev?.disabled === next?.disabled &&
      prev?.invalid === next?.invalid &&
      prev?.labelable === next?.labelable
        ? prev
        : next,
    );
  }, []);
  const controlId = control?.id ?? id ?? (hasLabel ? `${generatedId}-control` : undefined);
  const labelFor = control?.labelable === false ? undefined : controlId;

  const [hasFocus, setHasFocus] = React.useState(false);
  const onFocus = React.useCallback(() => setHasFocus(true), []);
  const onBlur = React.useCallback(() => setHasFocus(false), []);

  const labelVariant: FieldLabelVariant = React.useMemo(() => {
    if (disabled || control?.disabled) {
      return 'subtle';
    }
    if (isInvalid || control?.invalid) {
      return 'invalid';
    }
    if (hasFocus) {
      return 'contrast';
    }
    return 'default';
  }, [disabled, isInvalid, hasFocus, control?.disabled, control?.invalid]);

  const ownContext: FieldContextValue = React.useMemo(
    () => ({
      controlId,
      labelId: hasLabel ? `${generatedId}-label` : undefined,
      descriptionId: hasDescription ? `${generatedId}-description` : undefined,
      errorId: hasError ? `${generatedId}-error` : undefined,
      invalid: isInvalid,
      disabled: Boolean(disabled),
      registerControl,
    }),
    [
      controlId,
      generatedId,
      hasLabel,
      hasDescription,
      hasError,
      isInvalid,
      disabled,
      registerControl,
    ],
  );

  // A Field with no label, description or error inside another Field keeps the outer one.
  const context =
    outerContext && !hasLabel && !hasDescription && !hasError ? outerContext : ownContext;

  return { context, labelFor, labelVariant, hasLabel, hasDescription, hasError, onFocus, onBlur };
};

/**
 * Gives a form control the id, `aria-describedby`, `aria-invalid` and `disabled` of the `Field` around it,
 * and gives its own id, `disabled` and invalid state to that `Field`.
 * Outside a `Field`, it only sets `aria-invalid` from `invalid`.
 */
export const useFieldControl = ({
  id,
  invalid,
  disabled,
  'aria-describedby': describedBy,
  'aria-invalid': ariaInvalid,
  labelable = true,
}: FieldControlOptions) => {
  const field = useFieldContext();
  const ownInvalid = Boolean(invalid || ariaInvalid === true || ariaInvalid === 'true');
  const isInvalid = ownInvalid || Boolean(field?.invalid);
  const registerControl = field?.registerControl;

  React.useEffect(() => {
    if (!registerControl) {
      return undefined;
    }
    registerControl({ id, disabled: Boolean(disabled), invalid: ownInvalid, labelable });
    return () => registerControl(null);
  }, [registerControl, id, disabled, ownInvalid, labelable]);
  const describedByIds =
    [field?.errorId, field?.descriptionId, describedBy].filter(Boolean).join(' ') || undefined;

  return {
    id: id ?? field?.controlId,
    labelId: field?.labelId,
    invalid: isInvalid,
    disabled: disabled || field?.disabled || undefined,
    'aria-describedby': describedByIds,
    'aria-invalid': isInvalid ? true : ariaInvalid,
  };
};

const ANNOUNCE_DELAY = 1000;

/**
 * Returns the text of the error, after the text of the label when there is one, once it has not
 * changed for a short time, so that a screen reader reads it after the echo of the typed text.
 */
export const useAnnouncedError = (enabled: boolean, errorId?: string, labelId?: string) => {
  const [announcedError, setAnnouncedError] = React.useState<string | null>(null);
  const lastTextRef = React.useRef<string | null | undefined>(undefined);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>();

  // Compares the rendered text, so that a new JSX error with the same text does not restart the delay.
  React.useEffect(() => {
    const text =
      (enabled && errorId && document.getElementById(errorId)?.textContent?.trim()) || null;
    if (text === lastTextRef.current) {
      return;
    }
    lastTextRef.current = text;
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(
      () => {
        const fieldName = labelId
          ? document.getElementById(labelId)?.textContent?.trim()
          : undefined;
        setAnnouncedError(text !== null && fieldName ? `${fieldName}: ${text}` : text);
      },
      text === null ? 0 : ANNOUNCE_DELAY,
    );
  });

  React.useEffect(
    () => () => {
      clearTimeout(timeoutRef.current);
      lastTextRef.current = undefined;
    },
    [],
  );

  return announcedError;
};
