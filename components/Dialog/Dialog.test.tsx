import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';

import { Dialog, DialogCloseIconButton, DialogContent, DialogTitle } from './Dialog';

describe('Dialog', () => {
  const renderDialog = (closeLabel?: string) =>
    render(
      <Dialog open>
        <DialogContent closeLabel={closeLabel} aria-describedby={undefined}>
          <DialogTitle>Details</DialogTitle>
        </DialogContent>
      </Dialog>,
    );

  it('should name the close button Close', () => {
    renderDialog();
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('should use the given close label', () => {
    renderDialog('Close the details');
    expect(screen.getByRole('button', { name: 'Close the details' })).toBeInTheDocument();
  });

  it('should name DialogCloseIconButton Close by default', () => {
    render(
      <Dialog open>
        <DialogCloseIconButton />
      </Dialog>,
    );
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    renderDialog();
    expect(await axe(document.body)).toHaveNoViolations();
  });
});
