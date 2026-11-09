import * as PopoverPrimitive from '@radix-ui/react-popover';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import React, { forwardRef, useEffect, useId, useRef, useState } from 'react';

import { CSSProps, processCSSProp } from '../../styles/cssProps';
import { useVanillaExtractTheme } from '../../styles/themeContext';
import { InputVanilla, InputVanillaHandle, InputVanillaProps } from '../Input/Input.vanilla';
import {
  comboboxAnchor,
  comboboxContent,
  comboboxEmptyRecipe,
  comboboxListbox,
  comboboxOptionRecipe,
} from './Combobox.vanilla.css';

const joinClassNames = (...classNames: (string | undefined)[]) =>
  classNames.filter(Boolean).join(' ');

const defaultFilter = (suggestion: string, query: string) =>
  suggestion.toLowerCase().includes(query.toLowerCase());

export interface ComboboxVanillaProps
  extends
    Omit<InputVanillaProps, 'value' | 'defaultValue' | 'onChange' | 'type' | 'role' | 'css'>,
    CSSProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  suggestions: string[];
  emptyText?: React.ReactNode;
  filter?: (suggestion: string, query: string) => boolean;
  openOnFocus?: boolean;
}

export const ComboboxVanilla = forwardRef<InputVanillaHandle, ComboboxVanillaProps>(
  (
    {
      value: valueProp,
      defaultValue = '',
      onValueChange,
      suggestions,
      emptyText,
      filter = defaultFilter,
      openOnFocus = true,
      id: idProp,
      size,
      disabled,
      readOnly,
      className,
      style,
      css,
      onFocus,
      onBlur,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    const { colors } = useVanillaExtractTheme();
    const { style: cssStyles, vars } = processCSSProp(css, colors);

    const autoId = useId();
    const id = idProp ?? autoId;
    const listId = `${id}-listbox`;
    const optionId = (index: number) => `${id}-option-${index}`;

    const anchorRef = useRef<HTMLDivElement>(null);
    const [innerValue, setInnerValue] = useState(defaultValue);
    const value = valueProp ?? innerValue;
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [highlighted, setHighlighted] = useState(-1);

    const shown = query ? suggestions.filter((s) => filter(s, query)) : suggestions;
    const showEmpty = emptyText != null && suggestions.length === 0;
    const popupOpen = open && (shown.length > 0 || showEmpty);
    const listOpen = popupOpen && shown.length > 0;
    const active = listOpen && highlighted < shown.length ? highlighted : -1;

    useEffect(() => {
      if (active >= 0) {
        document.getElementById(`${id}-option-${active}`)?.scrollIntoView?.({ block: 'nearest' });
      }
    }, [active, id]);

    const setValue = (next: string) => {
      if (valueProp === undefined) setInnerValue(next);
      onValueChange?.(next);
    };

    const close = () => {
      setOpen(false);
      setQuery('');
      setHighlighted(-1);
    };

    const choose = (suggestion: string) => {
      setValue(suggestion);
      close();
    };

    const interactive = !disabled && !readOnly;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(e);
      if (e.defaultPrevented || !interactive) return;

      const last = shown.length - 1;
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (!open) {
            setOpen(true);
            setHighlighted(e.altKey ? -1 : 0);
          } else if (!e.altKey) {
            setHighlighted(active >= last ? 0 : active + 1);
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (!open) {
            setOpen(true);
            setHighlighted(last);
          } else {
            setHighlighted(active <= 0 ? last : active - 1);
          }
          break;
        case 'Enter':
          if (active >= 0) {
            e.preventDefault();
            choose(shown[active]);
          }
          break;
        case 'Escape':
          if (popupOpen) {
            e.preventDefault();
            close();
          }
          break;
        default:
          break;
      }
    };

    return (
      <PopoverPrimitive.Root open={popupOpen} onOpenChange={(next) => !next && close()}>
        <PopoverPrimitive.Anchor asChild>
          <div
            ref={anchorRef}
            className={joinClassNames(comboboxAnchor, className)}
            style={{ ...cssStyles, ...style, ...assignInlineVars(vars) }}
          >
            <InputVanilla
              ref={ref}
              id={id}
              role="combobox"
              aria-autocomplete="list"
              aria-expanded={listOpen}
              aria-controls={listOpen ? listId : undefined}
              aria-activedescendant={active >= 0 ? optionId(active) : undefined}
              autoComplete="off"
              size={size}
              disabled={disabled}
              readOnly={readOnly}
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setValue(e.target.value);
                setQuery(e.target.value);
                setOpen(true);
                setHighlighted(-1);
              }}
              onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                onFocus?.(e);
                if (openOnFocus && interactive) {
                  setOpen(true);
                  setQuery('');
                  setHighlighted(-1);
                }
              }}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                onBlur?.(e);
                close();
              }}
              onKeyDown={handleKeyDown}
              {...props}
            />
          </div>
        </PopoverPrimitive.Anchor>
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            role={undefined}
            id={undefined}
            className={comboboxContent}
            side="bottom"
            align="start"
            sideOffset={4}
            collisionPadding={8}
            onOpenAutoFocus={(e) => e.preventDefault()}
            onCloseAutoFocus={(e) => e.preventDefault()}
            onInteractOutside={(e) => {
              if (anchorRef.current?.contains(e.target as Node)) e.preventDefault();
            }}
            // Keeps the focus in the input, so a click on an option does not blur it.
            onMouseDown={(e) => e.preventDefault()}
          >
            {listOpen ? (
              <ul
                id={listId}
                role="listbox"
                aria-label={
                  props['aria-labelledby'] ? undefined : (props['aria-label'] ?? 'Suggestions')
                }
                aria-labelledby={props['aria-labelledby']}
                className={comboboxListbox}
              >
                {shown.map((suggestion, index) => (
                  <li
                    key={suggestion}
                    id={optionId(index)}
                    role="option"
                    aria-selected={index === active}
                    data-highlighted={index === active ? '' : undefined}
                    className={comboboxOptionRecipe({ size })}
                    onMouseMove={() => index !== active && setHighlighted(index)}
                    onClick={() => choose(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            ) : (
              <div role="status" className={comboboxEmptyRecipe({ size })}>
                {emptyText}
              </div>
            )}
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    );
  },
);

ComboboxVanilla.displayName = 'ComboboxVanilla';
