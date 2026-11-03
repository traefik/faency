import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { CodeBlock } from './CodeBlock';

const CODE_SNIPPET = 'const a = 1;';

describe('CodeBlock', () => {
  const clipboardError = new Error('Write permission denied');

  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: jest.fn().mockRejectedValue(clipboardError) },
      configurable: true,
      writable: true,
    });

    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  describe('onCopyError', () => {
    it('should call onCopyError with the error and the code when the clipboard write fails', async () => {
      const onCopyError = jest.fn();
      render(<CodeBlock code={CODE_SNIPPET} copyable onCopyError={onCopyError} />);
      await userEvent.click(screen.getByRole('button'));
      await waitFor(() => expect(onCopyError).toHaveBeenCalledWith(clipboardError, CODE_SNIPPET));
    });

    it('should show the copied state and call onCopy when onCopyError resolves to true', async () => {
      const onCopy = jest.fn();
      render(
        <CodeBlock
          code={CODE_SNIPPET}
          copyable
          copyText="Copy"
          copiedText="Copied!"
          onCopy={onCopy}
          onCopyError={() => Promise.resolve(true)}
        />,
      );
      const button = screen.getByRole('button');
      await userEvent.click(button);
      await waitFor(() => expect(button).toHaveTextContent('Copied!'));
      expect(onCopy).toHaveBeenCalledTimes(1);
    });

    it('should leave the UI unchanged when onCopyError returns false', async () => {
      const onCopy = jest.fn();
      const onCopyError = jest.fn(() => false);
      render(
        <CodeBlock
          code={CODE_SNIPPET}
          copyable
          copyText="Copy"
          copiedText="Copied!"
          onCopy={onCopy}
          onCopyError={onCopyError}
        />,
      );
      const button = screen.getByRole('button');
      await userEvent.click(button);
      await waitFor(() => expect(onCopyError).toHaveBeenCalledTimes(1));
      expect(button).not.toHaveTextContent('Copied!');
      expect(onCopy).not.toHaveBeenCalled();
    });
  });
});
