import { CheckIcon, CopyIcon } from '@radix-ui/react-icons';
import { Highlight, Language, themes } from 'prism-react-renderer';
import React, {
  ComponentProps,
  forwardRef,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { CSS, styled } from '../../stitches.config';
import { AccessibleIcon } from '../AccessibleIcon';
import { Box } from '../Box';
import { Button } from '../Button';
import { useColorScheme } from '../colorSchemeContext';
import type { CodeBlockCopyButtonAlign, CodeBlockLanguage } from './index';
import { Prism } from './prism-extend';

const Pre = styled('pre', {
  m: 0,
  borderRadius: '$2',
  overflow: 'auto',
  border: '1px solid $colors$deepBlue3',
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
      topLeft: { top: '$2', left: '$3' },
      bottomRight: { bottom: '$2', right: '$3' },
      bottomLeft: { bottom: '$2', left: '$3' },
    },
  },

  defaultVariants: {
    position: 'top',
  },
});

export type CodeBlockProps = {
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
    const systemScheme = useColorScheme();
    const resolvedScheme = colorScheme ?? systemScheme;
    const prismTheme = resolvedScheme === 'dark' ? themes.nightOwl : themes.nightOwlLight;

    const isBottom = copyButtonAlign.includes('bottom');
    const isLeft = copyButtonAlign.includes('left');
    const buttonPosition = isBottom
      ? isLeft
        ? 'bottomLeft'
        : 'bottomRight'
      : isLeft
        ? 'topLeft'
        : 'top';

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

      const isBottomAlign = isBottom;
      const borderH = noBorder ? 0 : 2;

      const update = () => {
        if (!isLeft) {
          const vScrollbar = Math.max(0, pre.offsetWidth - pre.clientWidth - borderH);
          wrapper.style.right = `${16 + vScrollbar}px`;
        }
        if (isBottomAlign) {
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

    const copyButton = copyable ? (
      <Button
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
      </Button>
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
          <Box css={{ position: 'relative', ...css }}>
            <Pre
              ref={setPreRef}
              className={[highlightClass, className].filter(Boolean).join(' ')}
              style={{ maxHeight, ...highlightStyle, backgroundColor: 'inherit', ...style }}
              noBorder={noBorder}
              {...props}
            >
              <Box
                css={{
                  p: '$4',
                  ...(copyable && isLeft && isBottom ? { pb: '$7' } : {}),
                  ...(copyable && isLeft && !isBottom ? { pt: '$7' } : {}),
                }}
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
              </Box>
            </Pre>
            {copyButton && (
              <CopyButtonWrapper ref={buttonWrapperRef} position={buttonPosition}>
                {copyButton}
              </CopyButtonWrapper>
            )}
          </Box>
        )}
      </Highlight>
    );
  },
);

CodeBlock.displayName = 'CodeBlock';
