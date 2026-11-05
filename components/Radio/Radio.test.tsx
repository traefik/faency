import { render, screen } from '@testing-library/react';
import React from 'react';

import { styled } from '../../stitches.config';
import { Radio, RadioGroup } from './Radio';

describe('RadioGroup', () => {
  it('should keep the Stitches className, selector and toString', () => {
    expect(typeof RadioGroup.className).toBe('string');
    expect(RadioGroup.selector).toBe(`.${RadioGroup.className}`);
    expect(`${RadioGroup}`).toBe(`.${RadioGroup.className}`);
  });

  it('should render the Stitches class on the group', () => {
    render(
      <RadioGroup aria-label="Size">
        <Radio value="small" aria-label="Small" />
      </RadioGroup>,
    );

    expect(screen.getByRole('radiogroup', { name: 'Size' })).toHaveClass(RadioGroup.className);
  });

  it('should work with styled', () => {
    const StyledGroup = styled(RadioGroup, { gap: '$2' });
    render(
      <StyledGroup aria-label="Size">
        <Radio value="small" aria-label="Small" />
      </StyledGroup>,
    );

    expect(screen.getByRole('radiogroup', { name: 'Size' })).toHaveClass(RadioGroup.className);
  });
});
