import { render, screen } from '@testing-library/react';
import React from 'react';

import { FaencyProvider } from '../FaencyProvider';
import { Select } from './Select';

describe('Select', () => {
  afterEach(() => document.documentElement.classList.remove('dark'));

  const renderSelect = (style?: React.CSSProperties) =>
    render(
      <FaencyProvider>
        <Select aria-label="Country" style={style}>
          <option>France</option>
        </Select>
      </FaencyProvider>,
    );

  it('should use the light color scheme by default', () => {
    renderSelect();
    expect(screen.getByRole('combobox', { name: 'Country' })).toHaveStyle({ colorScheme: 'light' });
  });

  it('should use the dark color scheme in the dark theme', () => {
    document.documentElement.classList.add('dark');
    renderSelect();
    expect(screen.getByRole('combobox', { name: 'Country' })).toHaveStyle({ colorScheme: 'dark' });
  });

  it('should keep the style of the caller', () => {
    renderSelect({ colorScheme: 'light', width: '100px' });
    document.documentElement.classList.add('dark');
    expect(screen.getByRole('combobox', { name: 'Country' })).toHaveStyle({
      colorScheme: 'light',
      width: '100px',
    });
  });
});
