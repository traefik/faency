import React from 'react';

type MessageSize = '0' | '1' | '2' | '3';

type FieldControlState = { id?: string; disabled: boolean; invalid: boolean; labelable: boolean };

export type FieldContextValue = {
  controlId?: string;
  labelId?: string;
  descriptionId?: string;
  errorId?: string;
  hintId?: string;
  messageSize: MessageSize;
  invalid: boolean;
  disabled: boolean;
  registerControl: (key: string, state: FieldControlState | null) => void;
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
  /** Text under the label, for what the field is for. */
  hint?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  invalid?: boolean;
  disabled?: boolean;
  announceError?: boolean;
  /** `start` puts the label and the hint in a column before the control, and wraps under it when space is short. */
  labelPosition?: 'top' | 'start' | 'end';
  /** The text size of the hint, the description and the error. A Field inside another Field takes its size. */
  messageSize?: MessageSize;
  /**
   * For a field of more than one control: the field becomes a group named by the label and described by
   * the hint, the description and the error. Give each control its own name, and its own error with an inner Field.
   */
  group?: boolean;
  children?: React.ReactNode;
};

const hasContent = (node: React.ReactNode) =>
  node !== undefined && node !== null && node !== false && node !== '';

const noop = () => {};

const warnedMessages = new Set<string>();

/** Clears the warnings that were already logged. For tests only. */
export const resetFieldWarnings = () => warnedMessages.clear();

const warnOnce = (message: string) => {
  if (typeof process !== 'undefined' && process.env.NODE_ENV === 'production') {
    return;
  }
  if (!warnedMessages.has(message)) {
    warnedMessages.add(message);
    console.warn(message);
  }
};

const MULTIPLE_CONTROLS_WARNING =
  'Field: more than one control is in this Field, and its label points to one of them only. Use group, or one Field per control.';

export const useFieldRoot = ({
  id,
  label,
  hint,
  description,
  error,
  invalid,
  disabled,
  messageSize,
  group = false,
}: FieldBaseProps) => {
  const outerContext = useFieldContext();
  const generatedId = React.useId();
  const hasLabel = typeof label === 'function' || hasContent(label);
  const hasHint = hasContent(hint);
  const resolvedMessageSize = messageSize ?? outerContext?.messageSize ?? '0';
  const hasDescription = hasContent(description);
  const hasError = hasContent(error);
  const isInvalid = Boolean(invalid) || hasError;

  const [control, setControl] = React.useState<FieldControlState | null>(null);
  const controlsRef = React.useRef(new Map<string, FieldControlState>());
  const registerControl = React.useCallback((key: string, state: FieldControlState | null) => {
    const controls = controlsRef.current;
    if (state) {
      controls.set(key, state);
    } else {
      controls.delete(key);
    }
    if (controls.size > 1) {
      warnOnce(MULTIPLE_CONTROLS_WARNING);
    }
    const next = controls.values().next().value ?? null;
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
  // The label points to a control only once one is there, so it never points to a missing id.
  const labelFor = group
    ? undefined
    : control
      ? control.labelable === false
        ? undefined
        : controlId
      : id;

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
      hintId: hasHint ? `${generatedId}-hint` : undefined,
      messageSize: resolvedMessageSize,
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
      hasHint,
      resolvedMessageSize,
      isInvalid,
      disabled,
      registerControl,
    ],
  );

  // The controls of a group get only its disabled state: the group itself carries the name and the messages.
  const groupContext: FieldContextValue = React.useMemo(
    () => ({
      messageSize: resolvedMessageSize,
      invalid: false,
      disabled: Boolean(disabled),
      registerControl: noop,
    }),
    [resolvedMessageSize, disabled],
  );

  const groupProps = group
    ? {
        role: 'group',
        'aria-labelledby': ownContext.labelId,
        'aria-describedby':
          [ownContext.errorId, ownContext.descriptionId, ownContext.hintId]
            .filter(Boolean)
            .join(' ') || undefined,
      }
    : {};

  // A Field with no label, hint, description or error inside another Field keeps the outer one.
  const context = group
    ? groupContext
    : outerContext && !hasLabel && !hasHint && !hasDescription && !hasError
      ? outerContext
      : ownContext;

  return {
    context,
    ids: ownContext,
    groupProps,
    messageSize: resolvedMessageSize,
    labelFor,
    labelVariant,
    hasLabel,
    hasHint,
    hasDescription,
    hasError,
    onFocus,
    onBlur,
  };
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
  const registrationId = React.useId();
  const ownInvalid = Boolean(invalid || ariaInvalid === true || ariaInvalid === 'true');
  const isInvalid = ownInvalid || Boolean(field?.invalid);
  const registerControl = field?.registerControl;

  React.useEffect(() => {
    if (!registerControl) {
      return undefined;
    }
    registerControl(registrationId, {
      id,
      disabled: Boolean(disabled),
      invalid: ownInvalid,
      labelable,
    });
    return () => registerControl(registrationId, null);
  }, [registerControl, registrationId, id, disabled, ownInvalid, labelable]);
  const describedByIds =
    [field?.errorId, field?.descriptionId, field?.hintId, describedBy].filter(Boolean).join(' ') ||
    undefined;

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
