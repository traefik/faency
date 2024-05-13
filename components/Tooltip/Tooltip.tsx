import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { styled, CSS, VariantProps } from '../../stitches.config';
import { Text } from '../Text';
import { Box } from '../Box';

export type TooltipProps = React.ComponentProps<typeof TooltipPrimitive.Root> &
  React.ComponentProps<typeof TooltipPrimitive.Content> & {
    children: React.ReactElement | React.ReactNode;
    content: React.ReactNode;
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

export const TooltipContent = ({ css, multiline, children, ...props }: Partial<TooltipProps>) => {
  const isContentString = React.useMemo(() => typeof children === 'string', [children]);
  return (
    <Content css={css} side="top" align="center" sideOffset={5} {...props} multiline={multiline}>
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
};

export function Tooltip({
  children,
  content,
  open,
  defaultOpen,
  onOpenChange,
  multiline,
  css,
  ...props
}: TooltipProps) {
  return (
    <TooltipPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipContent css={css} multiline={multiline} {...props}>
          {content}
        </TooltipContent>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}

export const TooltipRoot = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;
export const TooltipPortal = TooltipPrimitive.Portal;

export type TooltipVariants = VariantProps<typeof Tooltip>;
