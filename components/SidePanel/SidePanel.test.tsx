import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import React from 'react';

import { DialogTitle } from '../Dialog';
import { SidePanel } from './SidePanel';

describe('SidePanel', () => {
  const renderPanel = (props: Partial<React.ComponentProps<typeof SidePanel>> = {}) => {
    const onOpenChange = jest.fn();
    const result = render(
      <SidePanel open onOpenChange={onOpenChange} {...props}>
        <DialogTitle>Details</DialogTitle>
      </SidePanel>,
    );
    return { ...result, onOpenChange };
  };

  it('should name the close button Close', () => {
    renderPanel();
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('should use the given close label', () => {
    renderPanel({ closeLabel: 'Close the details' });
    expect(screen.getByRole('button', { name: 'Close the details' })).toBeInTheDocument();
  });

  it('should close when the close button is clicked', async () => {
    const { onOpenChange } = renderPanel();
    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('should not render the close button with noCloseIcon', () => {
    renderPanel({ noCloseIcon: true });
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    renderPanel({ description: 'The details of the item' });
    expect(await axe(document.body)).toHaveNoViolations();
  });
});
