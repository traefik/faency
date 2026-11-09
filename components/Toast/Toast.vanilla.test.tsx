import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { axe } from 'jest-axe';
import React, { createRef, useEffect } from 'react';

import { VanillaExtractThemeProvider } from '../../styles/themeContext';
import {
  ToastActionVanilla,
  ToastDescriptionVanilla,
  ToastTitleVanilla,
  ToastVanilla,
} from './Toast.vanilla';
import {
  ToastOptions,
  ToastProviderVanilla,
  ToastProviderVanillaProps,
  useToast,
} from './ToastProvider.vanilla';

type Api = ReturnType<typeof useToast>;

const Capture = ({ api }: { api: Api }) => {
  const context = useToast();
  useEffect(() => {
    Object.assign(api, context);
  }, [api, context]);
  return null;
};

const Orphan = () => {
  useToast();
  return null;
};

const renderWithToasts = (
  providerProps: Partial<ToastProviderVanillaProps> = {},
  ui?: React.ReactNode,
  themeProps: Partial<React.ComponentProps<typeof VanillaExtractThemeProvider>> = {},
) => {
  const api = {} as Api;
  const result = render(
    <VanillaExtractThemeProvider {...themeProps}>
      <ToastProviderVanilla {...providerProps}>
        <Capture api={api} />
        {ui}
      </ToastProviderVanilla>
    </VanillaExtractThemeProvider>,
  );
  return { ...result, api };
};

const show = (api: Api, options: ToastOptions) => {
  let id = '';
  act(() => {
    id = api.toast(options);
  });
  return id;
};

const getToast = () => screen.getByRole('listitem');

describe('ToastVanilla', () => {
  it('shows a toast with title and description', () => {
    const { api } = renderWithToasts();
    show(api, { title: 'Saved', description: 'Your changes are live.' });

    const toast = getToast();
    expect(toast.nodeName).toBe('LI');
    expect(within(toast).getByText('Saved')).toBeInTheDocument();
    expect(within(toast).getByText('Your changes are live.')).toBeInTheDocument();
  });

  it('renders inside a labelled notifications region', () => {
    const { api } = renderWithToasts({ position: 'top-center' });
    show(api, { title: 'Saved' });

    expect(screen.getByRole('region', { name: /notifications/i })).toContainElement(getToast());
  });

  it('returns a distinct id for every toast', () => {
    const { api } = renderWithToasts();
    const first = show(api, { title: 'One' });
    const second = show(api, { title: 'Two' });

    expect(first).not.toBe(second);
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('shows the variant icon and no icon for gray', () => {
    const { api } = renderWithToasts();
    show(api, { title: 'Failed', variant: 'error' });
    show(api, { title: 'Note' });

    const [error, gray] = screen.getAllByRole('listitem');
    expect(error.querySelector('[aria-hidden] svg')).toBeInTheDocument();
    expect(gray.querySelector('[aria-hidden] svg')).not.toBeInTheDocument();
  });

  it('replaces or hides the icon', () => {
    const { api } = renderWithToasts();
    show(api, { title: 'Custom', variant: 'info', icon: <span data-testid="custom-icon" /> });
    show(api, { title: 'None', variant: 'success', icon: null });

    const [custom, none] = screen.getAllByRole('listitem');
    expect(within(custom).getByTestId('custom-icon')).toBeInTheDocument();
    expect(none.querySelector('[aria-hidden] svg')).not.toBeInTheDocument();
  });

  it('announces errors assertively and other variants politely', async () => {
    const { api } = renderWithToasts();
    show(api, { title: 'Failed', variant: 'error' });
    show(api, { title: 'Saved', variant: 'success' });

    const announcement = (text: string) =>
      screen.getAllByRole('status').find((el) => el.textContent?.includes(text));
    await waitFor(() => expect(announcement('Failed')).toHaveAttribute('aria-live', 'assertive'));
    expect(announcement('Saved')).toHaveAttribute('aria-live', 'polite');
  });

  it('closes with the close button', async () => {
    const { api } = renderWithToasts({ closeLabel: 'Dismiss' });
    show(api, { title: 'Saved' });

    fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    await waitFor(() => expect(screen.queryByRole('listitem')).not.toBeInTheDocument());
  });

  it('closes one toast with dismiss(id) and all toasts with dismiss()', async () => {
    const { api } = renderWithToasts();
    const first = show(api, { title: 'One' });
    show(api, { title: 'Two' });
    show(api, { title: 'Three' });

    act(() => api.dismiss(first));
    await waitFor(() => expect(screen.getAllByRole('listitem')).toHaveLength(2));

    act(() => api.dismiss());
    await waitFor(() => expect(screen.queryByRole('listitem')).not.toBeInTheDocument());
  });

  it('closes on its own after the duration', async () => {
    const { api } = renderWithToasts({ duration: 50 });
    show(api, { title: 'Saved' });

    expect(getToast()).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByRole('listitem')).not.toBeInTheDocument());
  });

  it('runs the action and closes the toast', async () => {
    const onClick = jest.fn();
    const { api } = renderWithToasts();
    show(api, { title: 'Deleted', action: { label: 'Undo', altText: 'Undo deletion', onClick } });

    fireEvent.click(screen.getByRole('button', { name: 'Undo' }));
    expect(onClick).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.queryByRole('listitem')).not.toBeInTheDocument());
  });

  it('removes closed toasts from the list', () => {
    jest.useFakeTimers();
    try {
      const { api } = renderWithToasts();
      const id = show(api, { title: 'Saved' });
      act(() => api.dismiss(id));
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      // A dismissed toast that is still in the list would be reopened by this call.
      act(() => api.dismiss(id));
      expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
    } finally {
      jest.useRealTimers();
    }
  });

  it('throws when useToast is used outside a ToastProviderVanilla', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Orphan />)).toThrow('useToast must be used within a ToastProviderVanilla');
    spy.mockRestore();
  });

  describe('composed parts', () => {
    const renderComposed = (toast: React.ReactNode) => renderWithToasts({}, toast);

    it('forwards refs', () => {
      const toastRef = createRef<HTMLLIElement>();
      const titleRef = createRef<HTMLDivElement>();
      const descriptionRef = createRef<HTMLDivElement>();
      const actionRef = createRef<HTMLButtonElement>();
      renderComposed(
        <ToastVanilla ref={toastRef} open>
          <ToastTitleVanilla ref={titleRef}>Title</ToastTitleVanilla>
          <ToastDescriptionVanilla ref={descriptionRef}>Description</ToastDescriptionVanilla>
          <ToastActionVanilla ref={actionRef} altText="Retry the request">
            Retry
          </ToastActionVanilla>
        </ToastVanilla>,
      );

      expect(toastRef.current?.nodeName).toBe('LI');
      expect(titleRef.current).toHaveTextContent('Title');
      expect(descriptionRef.current).toHaveTextContent('Description');
      expect(actionRef.current?.nodeName).toBe('BUTTON');
    });

    it('applies className, style, css and HTML attributes', () => {
      renderComposed(
        <ToastVanilla
          open
          className="custom-toast"
          style={{ opacity: 0.5 }}
          css={{ p: '$5' }}
          data-testid="toast"
        >
          <ToastTitleVanilla className="custom-title" css={{ mb: '$2' }}>
            Title
          </ToastTitleVanilla>
        </ToastVanilla>,
      );

      const toast = screen.getByTestId('toast');
      expect(toast).toHaveClass('custom-toast');
      expect(toast).toHaveStyle({ opacity: '0.5', padding: '24px' });
      expect(within(toast).getByText('Title')).toHaveClass('custom-title');
      expect(within(toast).getByText('Title')).toHaveStyle({ marginBottom: '8px' });
    });

    it('calls onOpenChange when closed', () => {
      const onOpenChange = jest.fn();
      renderComposed(
        <ToastVanilla open onOpenChange={onOpenChange}>
          <ToastTitleVanilla>Title</ToastTitleVanilla>
        </ToastVanilla>,
      );

      fireEvent.click(screen.getByRole('button', { name: 'Close' }));
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });

  it('renders in the dark theme', () => {
    const { api } = renderWithToasts({}, null, { forcedTheme: 'dark', primaryColor: 'neon' });
    show(api, { title: 'Saved', variant: 'success' });

    expect(getToast()).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { api, container } = renderWithToasts();
    show(api, {
      title: 'Deleted',
      description: 'The route was removed.',
      variant: 'warning',
      action: { label: 'Undo', altText: 'Undo deletion', onClick: () => {} },
    });

    expect(await axe(container)).toHaveNoViolations();
  });
});
