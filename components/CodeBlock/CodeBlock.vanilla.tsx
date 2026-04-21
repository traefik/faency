import './prism-extend';

import { CheckIcon, CopyIcon } from '@radix-ui/react-icons';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { Highlight, Language, Prism, themes } from 'prism-react-renderer';
import React, {
  forwardRef,
  HTMLAttributes,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { CSSProps, processCSSProp } from '../../styles/cssProps';
import { useVanillaExtractTheme } from '../../styles/themeContext';
import { AccessibleIcon } from '../AccessibleIcon';
import { ButtonVanilla } from '../Button';
import {
  codeContent,
  codeContentBottomPadding,
  codeContentTopPadding,
  copyButtonWrapperBottomLeft,
  copyButtonWrapperBottomRight,
  copyButtonWrapperTop,
  copyButtonWrapperTopLeft,
  pre,
  preNoBorder,
} from './CodeBlock.vanilla.css';
import type { CodeBlockCopyButtonAlign, CodeBlockLanguage } from './index';

export interface CodeBlockVanillaProps
  extends Omit<HTMLAttributes<HTMLPreElement>, 'css'>,
    CSSProps {
  lang?: CodeBlockLanguage;
  code: string;
  copyable?: boolean;
  copyText?: string;
  copiedText?: string;
  copyButtonAlign?: CodeBlockCopyButtonAlign;
  onCopy?: () => void;
  noBorder?: boolean;
  wrapText?: boolean;
  colorScheme?: 'light' | 'dark';
  maxHeight?: number | string;
}

export const CodeBlockVanilla = forwardRef<HTMLPreElement, CodeBlockVanillaProps>(
  (
    {
      lang = 'text',
      code,
      copyable = false,
      copyText,
      copiedText,
      copyButtonAlign = 'top right',
      onCopy,
      noBorder,
      wrapText = false,
      colorScheme,
      maxHeight = 424,
      css,
      style,
      className,
      ...props
    },
    ref,
  ) => {
    const { colors, resolvedTheme } = useVanillaExtractTheme();
    const effectiveScheme = colorScheme ?? resolvedTheme;
    const prismTheme = effectiveScheme === 'dark' ? themes.nightOwl : themes.nightOwlLight;

    const isBottom = copyButtonAlign.includes('bottom');
    const isLeft = copyButtonAlign.includes('left');

    const { style: cssStyles, vars } = processCSSProp(css, colors);
    const containerStyles = {
      position: 'relative' as const,
      ...cssStyles,
      ...assignInlineVars(vars),
    };

    const [copied, setCopied] = useState(false);

    const preRef = useRef<HTMLPreElement | null>(
      null,
    ) as React.MutableRefObject<HTMLPreElement | null>;
    const buttonWrapperRef = useRef<HTMLDivElement>(null);

    const setPreRef = useCallback(
      (node: HTMLPreElement | null) => {
        preRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLPreElement | null>).current = node;
      },
      [ref],
    );

    useLayoutEffect(() => {
      if (!copyable) return;
      const pre = preRef.current;
      const wrapper = buttonWrapperRef.current;
      if (!pre || !wrapper) return;

      const borderH = noBorder ? 0 : 2;

      const update = () => {
        if (!isLeft) {
          const vScrollbar = Math.max(0, pre.offsetWidth - pre.clientWidth - borderH);
          wrapper.style.right = `${16 + vScrollbar}px`;
        }
        if (isBottom) {
          const hScrollbar = Math.max(0, pre.offsetHeight - pre.clientHeight - borderH);
          wrapper.style.bottom = `${8 + hScrollbar}px`;
        }
      };

      update();
      const observer = new ResizeObserver(update);
      observer.observe(pre);
      return () => observer.disconnect();
    }, [copyable, isBottom, isLeft, noBorder]);

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        onCopy?.();
        setTimeout(() => setCopied(false), 1500);
      } catch {
        // clipboard write failed (e.g. permission denied) — leave UI unchanged
      }
    };

    const buttonPositionClass = isBottom
      ? isLeft
        ? copyButtonWrapperBottomLeft
        : copyButtonWrapperBottomRight
      : isLeft
        ? copyButtonWrapperTopLeft
        : copyButtonWrapperTop;

    const copyButton = copyable ? (
      <ButtonVanilla
        variant="secondary"
        ghost
        size="small"
        type="button"
        onClick={handleCopy}
        css={{
          color: '$hiContrast',
          gap: '$1',
          backgroundColor: '$codeBlockCopyButtonBg',
          height: '32px',
        }}
      >
        <AccessibleIcon label={copied ? 'Copied' : 'Copy'}>
          {copied ? <CheckIcon /> : <CopyIcon />}
        </AccessibleIcon>
        {copied ? copiedText : copyText}
      </ButtonVanilla>
    ) : null;

    return (
      <Highlight
        theme={prismTheme}
        code={code}
        language={(Prism.languages[lang] != null ? lang : 'text') as Language}
      >
        {({
          className: highlightClass,
          style: highlightStyle,
          tokens,
          getLineProps,
          getTokenProps,
        }) => (
          <div style={containerStyles}>
            <pre
              ref={setPreRef}
              className={[pre, noBorder ? preNoBorder : '', highlightClass, className]
                .filter(Boolean)
                .join(' ')}
              style={{
                maxHeight,
                ...highlightStyle,
                backgroundColor: 'inherit',
                ...style,
              }}
              {...props}
            >
              <div
                className={[
                  codeContent,
                  copyable && isLeft && isBottom ? codeContentBottomPadding : '',
                  copyable && isLeft && !isBottom ? codeContentTopPadding : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {tokens.map((line, i) => (
                  <div
                    key={i}
                    {...getLineProps({ line })}
                    style={
                      wrapText ? { whiteSpace: 'pre-wrap', wordBreak: 'break-all' } : undefined
                    }
                  >
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </div>
            </pre>
            {copyButton && (
              <div ref={buttonWrapperRef} className={buttonPositionClass}>
                {copyButton}
              </div>
            )}
          </div>
        )}
      </Highlight>
    );
  },
);

CodeBlockVanilla.displayName = 'CodeBlockVanilla';
