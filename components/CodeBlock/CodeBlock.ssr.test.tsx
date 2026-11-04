/**
 * @jest-environment node
 */
import React from 'react';
import { renderToString } from 'react-dom/server';

import { VanillaExtractThemeProvider } from '../../styles/themeContext';
import { CodeBlock } from './CodeBlock';
import { CodeBlockVanilla } from './CodeBlock.vanilla';

describe('CodeBlock server rendering', () => {
  let consoleError: jest.SpyInstance;

  beforeEach(() => {
    consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleError.mockRestore();
  });

  it('renders without the useLayoutEffect warning', () => {
    const html = renderToString(<CodeBlock code="const a = 1;" lang="javascript" copyable />);

    expect(html).toContain('const');
    expect(consoleError.mock.calls.flat().join('\n')).not.toContain('useLayoutEffect');
  });

  it('renders CodeBlockVanilla and VanillaExtractThemeProvider without the useLayoutEffect warning', () => {
    const html = renderToString(
      <VanillaExtractThemeProvider>
        <CodeBlockVanilla code="const a = 1;" lang="javascript" copyable />
      </VanillaExtractThemeProvider>,
    );

    expect(html).toContain('const');
    expect(consoleError.mock.calls.flat().join('\n')).not.toContain('useLayoutEffect');
  });
});
