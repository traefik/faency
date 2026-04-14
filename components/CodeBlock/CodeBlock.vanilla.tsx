import { CheckIcon, CopyIcon } from '@radix-ui/react-icons';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { Highlight, Language, themes } from 'prism-react-renderer';
import React, { forwardRef, HTMLAttributes, useState } from 'react';

import { CSSProps, processCSSProp } from '../../styles/cssProps';
import { useVanillaExtractTheme } from '../../styles/themeContext';
import { AccessibleIcon } from '../AccessibleIcon';
import { ButtonVanilla } from '../Button';
import { codeContent, copyButtonWrapper, pre, preNoBorder, wrapper } from './CodeBlock.vanilla.css';

export interface CodeBlockVanillaProps
  extends Omit<HTMLAttributes<HTMLPreElement>, 'css'>,
    CSSProps {
  lang: Language;
  code: string;
  copyable?: boolean;
  copyText?: string;
  copiedText?: string;
  noBorder?: boolean;
  wrapText?: boolean;
}

export const CodeBlockVanilla = forwardRef<HTMLPreElement, CodeBlockVanillaProps>(
  (
    {
      lang,
      code,
      copyable = false,
      copyText,
      copiedText,
      noBorder,
      wrapText = false,
      css,
      style,
      className,
      ...props
    },
    ref,
  ) => {
    const { colors, resolvedTheme } = useVanillaExtractTheme();
    const prismTheme = resolvedTheme === 'dark' ? themes.nightOwl : themes.nightOwlLight;

    const { style: cssStyles, vars } = processCSSProp(css, colors);
    const mergedStyles = { ...cssStyles, ...style, ...assignInlineVars(vars) };

    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    };

    return (
      <Highlight theme={prismTheme} code={code} language={lang}>
        {({
          className: highlightClass,
          style: highlightStyle,
          tokens,
          getLineProps,
          getTokenProps,
        }) => (
          <div className={wrapper}>
            {copyable && (
              <div className={copyButtonWrapper}>
                <ButtonVanilla
                  variant="secondary"
                  ghost
                  size="small"
                  type="button"
                  onClick={handleCopy}
                  css={{ color: '$hiContrast', gap: '$1' }}
                >
                  <AccessibleIcon label={copied ? 'Copied' : 'Copy'}>
                    {copied ? <CheckIcon /> : <CopyIcon />}
                  </AccessibleIcon>
                  {copied ? copiedText : copyText}
                </ButtonVanilla>
              </div>
            )}
            <pre
              ref={ref}
              className={[pre, noBorder ? preNoBorder : '', highlightClass, className]
                .filter(Boolean)
                .join(' ')}
              style={{ ...highlightStyle, ...mergedStyles }}
              {...props}
            >
              <div className={codeContent}>
                {tokens.map((line, i) => (
                  <div
                    key={i}
                    {...getLineProps({ line })}
                    style={wrapText ? { whiteSpace: 'normal' } : undefined}
                  >
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </div>
            </pre>
          </div>
        )}
      </Highlight>
    );
  },
);

CodeBlockVanilla.displayName = 'CodeBlockVanilla';
