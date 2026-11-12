import { render, screen } from '@testing-library/react';
import React from 'react';

import { NavigationItem, NavigationLink } from './Navigation';

describe('NavigationLink', () => {
  it('should mark the active link as the current page', () => {
    render(
      <>
        <NavigationLink href="/home" active>
          Home
        </NavigationLink>
        <NavigationLink href="/about">About</NavigationLink>
      </>,
    );

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'About' })).not.toHaveAttribute('aria-current');
  });

  it('should keep the aria-current of the caller', () => {
    render(
      <NavigationLink href="/step" active aria-current="step">
        Step
      </NavigationLink>,
    );

    expect(screen.getByRole('link', { name: 'Step' })).toHaveAttribute('aria-current', 'step');
  });

  it('should mark an active NavigationItem link as the current page', () => {
    render(
      <NavigationItem as="a" href="/home" active>
        Home
      </NavigationItem>,
    );

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');
  });

  it('should not set aria-current on a button', () => {
    render(<NavigationItem active>Menu</NavigationItem>);

    expect(screen.getByRole('button', { name: 'Menu' })).not.toHaveAttribute('aria-current');
  });
});
