// @ts-expect-error - cannot use "moduleResolution": "bundler" yet.
import { Meta, StoryFn } from '@storybook/react-vite';
import React from 'react';

import { ButtonVanilla } from '../Button/Button.vanilla';
import { FlexVanilla } from '../Flex/Flex.vanilla';
import {
  ToastActionVanilla,
  ToastDescriptionVanilla,
  ToastTitleVanilla,
  ToastVanilla,
  ToastVariant,
} from './Toast.vanilla';
import { ToastProviderVanilla, ToastProviderVanillaProps, useToast } from './ToastProvider.vanilla';

const VARIANTS: ToastVariant[] = ['gray', 'info', 'success', 'warning', 'error'];

const MESSAGES: Record<ToastVariant, { title: string; description: string }> = {
  gray: { title: 'Draft saved', description: 'You can come back to it later.' },
  info: { title: 'Sync in progress', description: 'Routes update in a few seconds.' },
  success: { title: 'Change request created', description: 'Reviewers have been notified.' },
  warning: { title: 'Certificate expires soon', description: 'Renew it before Friday.' },
  error: { title: 'Could not add to change set', description: 'Check your connection and retry.' },
};

const Component: Meta<typeof ToastProviderVanilla> = {
  title: 'Components/Toast',
  component: ToastProviderVanilla,
  argTypes: {
    position: {
      control: 'select',
      options: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ],
    },
    duration: { control: 'number' },
  },
  args: {
    position: 'bottom-right',
    duration: 5000,
  },
};

const Triggers = () => {
  const { toast, dismiss } = useToast();

  return (
    <FlexVanilla gap={2} wrap="wrap">
      {VARIANTS.map((variant) => (
        <ButtonVanilla
          key={variant}
          variant="secondary"
          onClick={() => toast({ variant, ...MESSAGES[variant] })}
        >
          {variant}
        </ButtonVanilla>
      ))}
      <ButtonVanilla
        variant="secondary"
        onClick={() =>
          toast({
            variant: 'success',
            title: 'Deletion added to the change set',
            action: { label: 'Undo', altText: 'Undo the deletion', onClick: () => {} },
          })
        }
      >
        with action
      </ButtonVanilla>
      <ButtonVanilla variant="red" ghost onClick={() => dismiss()}>
        dismiss all
      </ButtonVanilla>
    </FlexVanilla>
  );
};

export const Basic: StoryFn<ToastProviderVanillaProps> = (args) => (
  <ToastProviderVanilla {...args}>
    <Triggers />
  </ToastProviderVanilla>
);

export const Variants: StoryFn<ToastProviderVanillaProps> = (args) => (
  <ToastProviderVanilla {...args}>
    {VARIANTS.map((variant) => (
      <ToastVanilla key={variant} variant={variant} open duration={Infinity}>
        <ToastTitleVanilla>{MESSAGES[variant].title}</ToastTitleVanilla>
        <ToastDescriptionVanilla>{MESSAGES[variant].description}</ToastDescriptionVanilla>
      </ToastVanilla>
    ))}
  </ToastProviderVanilla>
);

export const Composed: StoryFn<ToastProviderVanillaProps> = (args) => {
  const [open, setOpen] = React.useState(false);

  return (
    <ToastProviderVanilla {...args}>
      <ButtonVanilla onClick={() => setOpen(true)}>Delete route</ButtonVanilla>
      <ToastVanilla variant="warning" open={open} onOpenChange={setOpen}>
        <ToastTitleVanilla>Route deleted</ToastTitleVanilla>
        <ToastDescriptionVanilla>
          It stays in the change set until you submit.
        </ToastDescriptionVanilla>
        <ToastActionVanilla altText="Restore the deleted route" onClick={() => setOpen(false)}>
          Restore
        </ToastActionVanilla>
      </ToastVanilla>
    </ToastProviderVanilla>
  );
};

export default Component;
