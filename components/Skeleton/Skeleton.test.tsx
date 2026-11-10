import { render } from '@testing-library/react';
import React from 'react';

import { getCssText } from '../../stitches.config';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('should stop the pulse when the user prefers reduced motion', () => {
    render(<Skeleton />);

    const css = getCssText().replace(/\s+/g, '');
    expect(css).toMatch(
      /@media\(prefers-reduced-motion\)\{\.c-[\w-]+::after\{animation:none;opacity:0;?\}/,
    );
  });
});
