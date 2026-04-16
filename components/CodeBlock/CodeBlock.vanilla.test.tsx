import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import React from 'react';

import { VanillaExtractThemeProvider } from '../../styles/themeContext';
import { CodeBlockVanilla } from './CodeBlock.vanilla';
import { preNoBorder } from './CodeBlock.vanilla.css';

const CODE_SNIPPET = `const greet = (name: string) => {
  console.log(\`Hello, \${name}!\`);
};`;

describe('CodeBlockVanilla', () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    return render(<VanillaExtractThemeProvider>{ui}</VanillaExtractThemeProvider>);
  };

  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: jest.fn().mockResolvedValue(undefined) },
      configurable: true,
      writable: true,
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render as a pre element', () => {
    const { container } = renderWithTheme(
      <CodeBlockVanilla lang="typescript" code={CODE_SNIPPET} />,
    );
    expect(container.querySelector('pre')).toBeInTheDocument();
  });

  it('should render the code content', () => {
    const { container } = renderWithTheme(
      <CodeBlockVanilla lang="typescript" code={CODE_SNIPPET} />,
    );
    // Prism splits tokens into separate spans, so check the full pre text content
    expect(container.querySelector('pre')?.textContent).toContain('const');
    expect(container.querySelector('pre')?.textContent).toContain('greet');
  });

  it('should apply custom className', () => {
    const { container } = renderWithTheme(
      <CodeBlockVanilla lang="typescript" code={CODE_SNIPPET} className="custom-class" />,
    );
    expect(container.querySelector('pre')?.className).toContain('custom-class');
  });

  it('should not render copy button when copyable is false', () => {
    renderWithTheme(<CodeBlockVanilla lang="typescript" code={CODE_SNIPPET} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should render copy button when copyable is true', () => {
    renderWithTheme(<CodeBlockVanilla lang="typescript" code={CODE_SNIPPET} copyable />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should have accessible label on copy button even without text props', () => {
    renderWithTheme(<CodeBlockVanilla lang="typescript" code={CODE_SNIPPET} copyable />);
    expect(screen.getByRole('button', { name: /copy/i })).toBeInTheDocument();
  });

  it('should not render visible text in copy button when copyText is omitted', () => {
    renderWithTheme(<CodeBlockVanilla lang="typescript" code={CODE_SNIPPET} copyable />);
    const button = screen.getByRole('button');
    // AccessibleIcon adds exactly one hidden "Copy" label — no extra text node
    expect(button.textContent).toBe('Copy');
  });

  it('should show copyText when provided', () => {
    renderWithTheme(
      <CodeBlockVanilla lang="typescript" code={CODE_SNIPPET} copyable copyText="Copy" />,
    );
    expect(screen.getByRole('button')).toHaveTextContent('Copy');
  });

  it('should copy code to clipboard when button is clicked', async () => {
    renderWithTheme(<CodeBlockVanilla lang="typescript" code={CODE_SNIPPET} copyable />);
    await userEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(CODE_SNIPPET);
    });
  });

  it('should show copiedText after clicking copy', async () => {
    renderWithTheme(
      <CodeBlockVanilla
        lang="typescript"
        code={CODE_SNIPPET}
        copyable
        copyText="Copy"
        copiedText="Copied!"
      />,
    );
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Copy');

    await userEvent.click(button);
    await waitFor(() => expect(button).toHaveTextContent('Copied!'));
  });

  it('should revert back to copy state after timeout', async () => {
    jest.useFakeTimers({ legacyFakeTimers: true });

    renderWithTheme(
      <CodeBlockVanilla
        lang="typescript"
        code={CODE_SNIPPET}
        copyable
        copyText="Copy"
        copiedText="Copied!"
      />,
    );
    const button = screen.getByRole('button');

    // fireEvent.click is synchronous, so the clipboard Promise microtask hasn't
    // fired yet when we hit `await Promise.resolve()` — that drains it while
    // IS_REACT_ACT_ENVIRONMENT is still true, avoiding the act() warning.
    await act(async () => {
      fireEvent.click(button);
      await Promise.resolve();
    });
    expect(button).toHaveTextContent('Copied!');

    act(() => {
      jest.advanceTimersByTime(1500);
    });
    expect(button).toHaveTextContent('Copy');
  });

  it('should apply noBorder class when noBorder is true', () => {
    const { container } = renderWithTheme(
      <CodeBlockVanilla lang="typescript" code={CODE_SNIPPET} noBorder />,
    );
    expect(container.querySelector('pre')?.className).toContain(preNoBorder);
  });

  it('should not apply noBorder class when noBorder is false', () => {
    const { container } = renderWithTheme(
      <CodeBlockVanilla lang="typescript" code={CODE_SNIPPET} />,
    );
    expect(container.querySelector('pre')?.className).not.toContain(preNoBorder);
  });

  it('should apply whiteSpace: normal to lines when wrapText is true', () => {
    const { container } = renderWithTheme(
      <CodeBlockVanilla lang="typescript" code={CODE_SNIPPET} wrapText />,
    );
    const lineDivs = container.querySelectorAll('pre > div > div');
    expect(lineDivs.length).toBeGreaterThan(0);
    lineDivs.forEach((div) => {
      expect((div as HTMLElement).style.whiteSpace).toBe('normal');
    });
  });

  it('should not apply whiteSpace: normal to lines when wrapText is false', () => {
    const { container } = renderWithTheme(
      <CodeBlockVanilla lang="typescript" code={CODE_SNIPPET} />,
    );
    const lineDivs = container.querySelectorAll('pre > div > div');
    expect(lineDivs.length).toBeGreaterThan(0);
    lineDivs.forEach((div) => {
      expect((div as HTMLElement).style.whiteSpace).toBe('');
    });
  });

  it('should render different languages', () => {
    const langs = ['javascript', 'json', 'yaml', 'bash', 'tsx'] as const;
    langs.forEach((lang) => {
      const { container, unmount } = renderWithTheme(
        <CodeBlockVanilla lang={lang} code="const x = 1" />,
      );
      expect(container.querySelector('pre')).toBeInTheDocument();
      unmount();
    });
  });

  it('should apply custom style prop', () => {
    const { container } = renderWithTheme(
      <CodeBlockVanilla lang="typescript" code={CODE_SNIPPET} style={{ maxHeight: '200px' }} />,
    );
    const pre = container.querySelector('pre') as HTMLElement;
    expect(pre.style.maxHeight).toBe('200px');
  });

  it('should forward ref to the pre element', () => {
    const ref = React.createRef<HTMLPreElement>();
    renderWithTheme(<CodeBlockVanilla ref={ref} lang="typescript" code={CODE_SNIPPET} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.nodeName).toBe('PRE');
  });

  it('should pass through HTML attributes', () => {
    renderWithTheme(
      <CodeBlockVanilla
        lang="typescript"
        code={CODE_SNIPPET}
        data-testid="my-codeblock"
        aria-label="Code example"
      />,
    );
    const pre = screen.getByTestId('my-codeblock');
    expect(pre).toBeInTheDocument();
    expect(pre).toHaveAttribute('aria-label', 'Code example');
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderWithTheme(
      <CodeBlockVanilla lang="typescript" code={CODE_SNIPPET} copyable copyText="Copy" />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  }, 10000);

  it('should apply different prism theme styles for light and dark', () => {
    const { container: lightContainer } = render(
      <VanillaExtractThemeProvider defaultTheme="light">
        <CodeBlockVanilla lang="typescript" code={CODE_SNIPPET} />
      </VanillaExtractThemeProvider>,
    );
    const { container: darkContainer } = render(
      <VanillaExtractThemeProvider defaultTheme="dark">
        <CodeBlockVanilla lang="typescript" code={CODE_SNIPPET} />
      </VanillaExtractThemeProvider>,
    );
    const lightStyle = lightContainer.querySelector('pre')?.getAttribute('style');
    const darkStyle = darkContainer.querySelector('pre')?.getAttribute('style');
    expect(lightStyle).not.toBe(darkStyle);
  });

  it('should respect colorScheme prop override regardless of context theme', () => {
    const { container: forcedLight } = render(
      <VanillaExtractThemeProvider defaultTheme="dark">
        <CodeBlockVanilla lang="typescript" code={CODE_SNIPPET} colorScheme="light" />
      </VanillaExtractThemeProvider>,
    );
    const { container: contextLight } = render(
      <VanillaExtractThemeProvider defaultTheme="light">
        <CodeBlockVanilla lang="typescript" code={CODE_SNIPPET} />
      </VanillaExtractThemeProvider>,
    );
    const forcedStyle = forcedLight.querySelector('pre')?.getAttribute('style');
    const contextStyle = contextLight.querySelector('pre')?.getAttribute('style');
    expect(forcedStyle).toBe(contextStyle);
  });
});
