import * as TabsPrimitive from '@radix-ui/react-tabs';
import { styled } from '../../stitches.config';

export const TabsContainer = styled(TabsPrimitive.Root, {
  display: 'flex',
  flexDirection: 'column',
});

export const TabsList = styled(TabsPrimitive.List, {
  display: 'flex',
  borderBottom: `1px solid $textSubtle`,
});

export const TabsTrigger = styled(TabsPrimitive.Trigger, {
  all: 'unset',
  color: '$textSubtle',
  fontFamily: 'inherit',
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  py: '$2',
  userSelect: 'none',
  '@hover': {
    '&:hover': {
      cursor: 'pointer',
      color: '$hiContrast',
    },
  },
  '&[data-state="active"]': {
    color: '$primary',
    boxShadow: 'inset 0 -1px 0 0 currentColor, 0 1px 0 0 currentColor',
    fontWeight: '$semiBold',
  },
});

export const TabsContent = styled(TabsPrimitive.Content, {
  width: '100%',
});
