import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import React from 'react';

import { CSS, styled, VariantProps } from '../../stitches.config';
import { Box } from '../Box';
import { Text } from '../Text';

export type TooltipProps = React.ComponentProps<typeof TooltipPrimitive.Root> &
  React.ComponentProps<typeof TooltipPrimitive.Content> & {
    children: React.ReactElement | React.ReactNode;
    content: React.ReactElement | React.ReactNode;
    multiline?: boolean;
    css?: CSS;
  };

const Content = styled(TooltipPrimitive.Content, {
  color: '$tooltipText',
  backgroundColor: '$tooltipContentBg',
  borderRadius: '$3',
  padding: '$2',

  variants: {
    multiline: {
      true: {
        maxWidth: 250,
        pb: 7,
      },
    },
  },
});

const ArrowBox = styled(Box, {
  color: '$tooltipContentBg',
});

export const TooltipContent = React.forwardRef<
  React.ElementRef<typeof Content>,
  Partial<TooltipProps>
>(({ css, multiline, children, ...props }, forwardedRef) => {
  const isContentString = React.useMemo(() => typeof children === 'string', [children]);
  return (
    <Content
      css={css}
      side="top"
      align="center"
      sideOffset={5}
      {...props}
      multiline={multiline}
      ref={forwardedRef}
    >
      {isContentString ? (
        <Text
          size="1"
          as="p"
          css={{
            color: 'currentColor',
            lineHeight: multiline ? '20px' : undefined,
          }}
        >
          {children}
        </Text>
      ) : (
        children
      )}
      <ArrowBox>
        <TooltipPrimitive.Arrow
          offset={5}
          width={11}
          height={5}
          style={{
            fill: 'currentColor',
          }}
        />
      </ArrowBox>
    </Content>
  );
});

export const Tooltip = React.forwardRef<React.ElementRef<typeof Content>, TooltipProps>(
  (
    { children, content, open, defaultOpen, onOpenChange, multiline, css, ...props },
    forwardedRef,
  ) => (
    <TooltipPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipContent css={css} multiline={multiline} ref={forwardedRef} {...props}>
          {content}
        </TooltipContent>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  ),
);

export const TooltipRoot = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;
export const TooltipPortal = TooltipPrimitive.Portal;

export type TooltipVariants = VariantProps<typeof Tooltip>;
