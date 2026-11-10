import { render, screen } from '@testing-library/react';
import React from 'react';

import { getCssText } from '../../stitches.config';
import { Input } from './Input';

describe('Input', () => {
  it('should let a click on the start adornment go through to the input', () => {
    render(<Input aria-label="Search" startAdornment={<span data-testid="icon" aria-hidden />} />);

    const adornment = screen.getByTestId('icon').parentElement as HTMLElement;
    const css = getCssText();
    const rules = Array.from(
      adornment.classList,
      (cls) => css.match(new RegExp(`\\.${cls}\\s*\\{[^}]*\\}`))?.[0] ?? '',
    );

    expect(rules.join('')).toMatch(/pointer-events:\s*none/);
  });
});
