import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import React from 'react';

import { VanillaExtractThemeProvider } from '../../styles/themeContext';
import { CodeBlockVanilla } from './CodeBlock.vanilla';
import {
  codeContent,
  codeContentBottomPadding,
  copyButtonWrapperBottomLeft,
  copyButtonWrapperBottomRight,
  copyButtonWrapperTop,
  preNoBorder,
} from './CodeBlock.vanilla.css';

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

  it('should render copy button only when copyable is true', () => {
    const { rerender } = renderWithTheme(
      <CodeBlockVanilla lang="typescript" code={CODE_SNIPPET} />,
    );
    expect(screen.queryByRole('button')).not.toBeInTheDocument();

    rerender(
      <VanillaExtractThemeProvider>
        <CodeBlockVanilla lang="typescript" code={CODE_SNIPPET} copyable />
      </VanillaExtractThemeProvider>,
    );
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

  it('should show copyText and copiedText correctly', () => {
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

  it('should show copiedText after clicking copy, then revert after timeout', async () => {
    jest.useFakeTimers('legacy');

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

  it('should call onCopy callback after clicking copy', async () => {
    const onCopy = jest.fn();
    renderWithTheme(
      <CodeBlockVanilla lang="typescript" code={CODE_SNIPPET} copyable onCopy={onCopy} />,
    );
    await userEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(onCopy).toHaveBeenCalledTimes(1));
  });

  it('should apply noBorder class conditionally', () => {
    const { container: withBorder } = renderWithTheme(
      <CodeBlockVanilla lang="typescript" code={CODE_SNIPPET} />,
    );
    expect(withBorder.querySelector('pre')?.className).not.toContain(preNoBorder);

    const { container: withoutBorder } = renderWithTheme(
      <CodeBlockVanilla lang="typescript" code={CODE_SNIPPET} noBorder />,
    );
    expect(withoutBorder.querySelector('pre')?.className).toContain(preNoBorder);
  });

  it('should apply wrapText styles to lines conditionally', () => {
    const { container: noWrap } = renderWithTheme(
      <CodeBlockVanilla lang="typescript" code={CODE_SNIPPET} />,
    );
    noWrap.querySelectorAll('pre > div > div').forEach((div) => {
      expect((div as HTMLElement).style.whiteSpace).toBe('');
    });

    const { container: wrap } = renderWithTheme(
      <CodeBlockVanilla lang="typescript" code={CODE_SNIPPET} wrapText />,
    );
    const lineDivs = wrap.querySelectorAll('pre > div > div');
    expect(lineDivs.length).toBeGreaterThan(0);
    lineDivs.forEach((div) => {
      expect((div as HTMLElement).style.whiteSpace).toBe('pre-wrap');
      expect((div as HTMLElement).style.wordBreak).toBe('break-all');
    });
  });

  it('should place copy button at top right by default', () => {
    const { container } = renderWithTheme(
      <CodeBlockVanilla lang="typescript" code={CODE_SNIPPET} copyable />,
    );
    const wrapperDiv = container.querySelector(`.${copyButtonWrapperTop}`);
    expect(wrapperDiv).toBeInTheDocument();
  });

  it('should support all copyButtonAlign combinations', () => {
    const cases = [
      { align: 'top', expectedClass: copyButtonWrapperTop },
      { align: 'top right', expectedClass: copyButtonWrapperTop },
      { align: 'bottom', expectedClass: copyButtonWrapperBottomRight },
      { align: 'bottom right', expectedClass: copyButtonWrapperBottomRight },
      { align: 'bottom left', expectedClass: copyButtonWrapperBottomLeft },
    ] as const;

    cases.forEach(({ align, expectedClass }) => {
      const { container, unmount } = renderWithTheme(
        <CodeBlockVanilla lang="typescript" code={CODE_SNIPPET} copyable copyButtonAlign={align} />,
      );
      expect(container.querySelector(`.${expectedClass}`)).toBeInTheDocument();
      unmount();
    });
  });

  it('should add bottom padding to code content when copyable and button is at the bottom', () => {
    const { container, unmount } = renderWithTheme(
      <CodeBlockVanilla
        lang="typescript"
        code={CODE_SNIPPET}
        copyable
        copyButtonAlign="bottom left"
      />,
    );
    const contentDiv = container.querySelector(`.${codeContent}`);
    expect(contentDiv?.className).toContain(codeContentBottomPadding);
    unmount();

    const { container: container2 } = renderWithTheme(
      <CodeBlockVanilla
        lang="typescript"
        code={CODE_SNIPPET}
        copyable
        copyButtonAlign="top right"
      />,
    );
    const contentDiv2 = container2.querySelector(`.${codeContent}`);
    expect(contentDiv2?.className).not.toContain(codeContentBottomPadding);
  });

  it('should render without errors when copyButtonBgColor is provided', () => {
    const { container } = renderWithTheme(
      <CodeBlockVanilla
        lang="typescript"
        code={CODE_SNIPPET}
        copyable
        copyButtonBgColor="rgb(255, 0, 0)"
      />,
    );
    expect(container.querySelector('pre')).toBeInTheDocument();
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
