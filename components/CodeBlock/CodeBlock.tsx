import { CheckIcon, CopyIcon } from '@radix-ui/react-icons';
import { Highlight, Language, themes } from 'prism-react-renderer';
import React, { ComponentProps, forwardRef, useState } from 'react';

import { CSS, styled } from '../../stitches.config';
import { AccessibleIcon } from '../AccessibleIcon';
import { Box } from '../Box';
import { Button } from '../Button';
import { useColorScheme } from '../FaencyProvider';

const Pre = styled('pre', {
  m: 0,
  borderRadius: '$2',
  overflow: 'auto',
  border: '1px solid $colors$deepBlue3',
  position: 'relative',
  fontSize: '$2',
  lineHeight: 1.6,

  variants: {
    noBorder: {
      true: { border: 'none' },
    },
  },
});

const CopyButtonWrapper = styled('div', {
  position: 'absolute',
  top: '$2',
  right: '$4',
  zIndex: 1,
});

export type CodeBlockProps = {
  lang: Language;
  code: string;
  copyable?: boolean;
  copyText?: string;
  copiedText?: string;
  noBorder?: boolean;
  wrapText?: boolean;
  colorScheme?: 'light' | 'dark';
  maxHeight?: number | string;
  css?: CSS;
} & Omit<ComponentProps<typeof Pre>, 'css'>;

export const CodeBlock = forwardRef<HTMLPreElement, CodeBlockProps>(
  (
    {
      lang,
      code,
      copyable = false,
      copyText,
      copiedText,
      noBorder,
      wrapText = false,
      colorScheme,
      maxHeight = 424,
      css,
      ...props
    },
    ref,
  ) => {
    const systemScheme = useColorScheme();
    const resolvedScheme = colorScheme ?? systemScheme;
    const prismTheme = resolvedScheme === 'dark' ? themes.nightOwl : themes.nightOwlLight;

    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } catch {
        // clipboard write failed (e.g. permission denied) — leave UI unchanged
      }
    };

    return (
      <Highlight theme={prismTheme} code={code} language={lang}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Box css={{ position: 'relative', ...css }}>
            {copyable && (
              <CopyButtonWrapper>
                <Button
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
                </Button>
              </CopyButtonWrapper>
            )}
            <Pre
              ref={ref}
              className={className}
              style={style}
              noBorder={noBorder}
              css={{ maxHeight }}
              {...props}
            >
              <Box css={{ p: '$4' }}>
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
              </Box>
            </Pre>
          </Box>
        )}
      </Highlight>
    );
  },
);

CodeBlock.displayName = 'CodeBlock';
