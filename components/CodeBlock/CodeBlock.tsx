import './prism-extend';

import { CheckIcon, CopyIcon } from '@radix-ui/react-icons';
import { Highlight, Language, Prism, themes } from 'prism-react-renderer';
import React, { ComponentProps, forwardRef, useState } from 'react';

import { CSS, styled } from '../../stitches.config';
import { AccessibleIcon } from '../AccessibleIcon';
import { Box } from '../Box';
import { Button } from '../Button';
import { useColorScheme } from '../colorSchemeContext';
import type { CodeBlockLanguage } from './index';

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
  zIndex: 1,
  variants: {
    position: {
      top: { top: '$2', right: '$3' },
      bottomRight: { bottom: '$2', right: '$3' },
      bottomLeft: { bottom: '$2', left: '$3' },
    },
  },

  defaultVariants: {
    position: 'top',
  },
});

export type CopyButtonAlign = 'top' | 'top right' | 'bottom' | 'bottom right' | 'bottom left';

export type CodeBlockProps = {
  lang?: CodeBlockLanguage;
  code: string;
  copyable?: boolean;
  copyText?: string;
  copiedText?: string;
  copyButtonAlign?: CopyButtonAlign;
  onCopy?: () => void;
  copyButtonBgColor?: string;
  noBorder?: boolean;
  wrapText?: boolean;
  colorScheme?: 'light' | 'dark';
  maxHeight?: number | string;
  css?: CSS;
} & Omit<ComponentProps<typeof Pre>, 'css'>;

export const CodeBlock = forwardRef<HTMLPreElement, CodeBlockProps>(
  (
    {
      lang = 'text',
      code,
      copyable = false,
      copyText,
      copiedText,
      copyButtonAlign = 'top right',
      onCopy,
      copyButtonBgColor,
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

    const isBottom = copyButtonAlign.includes('bottom');
    const buttonPosition = isBottom
      ? copyButtonAlign.includes('left')
        ? 'bottomLeft'
        : 'bottomRight'
      : 'top';

    const [copied, setCopied] = useState(false);

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

    const copyButton = copyable ? (
      <Button
        variant="secondary"
        ghost
        size="small"
        type="button"
        onClick={handleCopy}
        css={{ color: '$hiContrast', gap: '$1', backgroundColor: copyButtonBgColor }}
      >
        <AccessibleIcon label={copied ? 'Copied' : 'Copy'}>
          {copied ? <CheckIcon /> : <CopyIcon />}
        </AccessibleIcon>
        {copied ? copiedText : copyText}
      </Button>
    ) : null;

    return (
      <Highlight
        theme={prismTheme}
        code={code}
        language={(lang != null && Prism.languages[lang] != null ? lang : 'text') as Language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Box css={{ position: 'relative', ...css }}>
            <Pre
              ref={ref}
              className={className}
              style={{ ...style, backgroundColor: 'inherit' }}
              noBorder={noBorder}
              css={{ maxHeight }}
              {...props}
            >
              <Box css={{ p: '$4', ...(copyable && isBottom ? { pb: '$7' } : {}) }}>
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
              </Box>
            </Pre>
            {copyButton && (
              <CopyButtonWrapper position={buttonPosition}>{copyButton}</CopyButtonWrapper>
            )}
          </Box>
        )}
      </Highlight>
    );
  },
);

CodeBlock.displayName = 'CodeBlock';
