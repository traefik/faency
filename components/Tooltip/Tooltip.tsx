import React from 'react';
import { VariantProps } from '@stitches/react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { styled } from '../../stitches.config';
import { Box } from '../Box';
import { Text } from '../Text';

export type TooltipProps = React.ComponentProps<typeof TooltipPrimitive.Root> &
  React.ComponentProps<typeof TooltipPrimitive.Content> & {
    children: React.ReactElement;
    content: React.ReactNode;
    multiline?: boolean;
  };

const Content = styled(TooltipPrimitive.Content, {
  backgroundColor: '$deepBlue3',
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

      <Content side="top" align="center" sideOffset={5} {...props} multiline={multiline}>
        <Text
          size="1"
          as="p"
          css={{
            color: '$hiContrast',
            lineHeight: multiline ? '20px' : (undefined as any),
          }}
        >
          {content}
        </Text>
        <Box css={{ color: '$deepBlue3' }}>
          <TooltipPrimitive.Arrow
            offset={5}
            width={11}
            height={5}
            style={{
              fill: 'currentColor',
            }}
          />
        </Box>
      </Content>
    </TooltipPrimitive.Root>
  );
}

export type TooltipVariants = VariantProps<typeof Tooltip>;
