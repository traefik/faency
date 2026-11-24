import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { createRef } from 'react';

import { TabsContainer, TabsContent, TabsList, TabsTrigger } from './Tabs';

describe('Tabs', () => {
  it('should mark a disabled tab with aria-disabled', async () => {
    render(
      <TabsContainer defaultValue="one">
        <TabsList aria-label="Sections">
          <TabsTrigger value="one">One</TabsTrigger>
          <TabsTrigger value="two" disabled>
            Two
          </TabsTrigger>
        </TabsList>
        <TabsContent value="one">First panel</TabsContent>
        <TabsContent value="two">Second panel</TabsContent>
      </TabsContainer>,
    );
    const disabled = screen.getByRole('tab', { name: 'Two' });

    expect(disabled).toBeDisabled();
    expect(disabled).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByRole('tab', { name: 'One' })).not.toHaveAttribute('aria-disabled');

    await userEvent.click(disabled);
    expect(screen.getByRole('tabpanel')).toHaveTextContent('First panel');
  });

  it('should mark a disabled asChild tab with aria-disabled', () => {
    render(
      <TabsContainer defaultValue="one">
        <TabsList aria-label="Sections">
          <TabsTrigger value="one" asChild>
            <div>One</div>
          </TabsTrigger>
          <TabsTrigger value="two" disabled asChild>
            <div>Two</div>
          </TabsTrigger>
        </TabsList>
      </TabsContainer>,
    );

    const disabled = screen.getByRole('tab', { name: 'Two' });
    expect(disabled.tagName).toBe('DIV');
    expect(disabled).toHaveAttribute('aria-disabled', 'true');
  });

  it('should focus a clicked tab without the keyboard focus ring', () => {
    const focus = jest.spyOn(HTMLElement.prototype, 'focus');
    const onMouseDown = jest.fn();
    render(
      <TabsContainer defaultValue="one">
        <TabsList aria-label="Sections">
          <TabsTrigger value="one">One</TabsTrigger>
          <TabsTrigger value="two" onMouseDown={onMouseDown}>
            Two
          </TabsTrigger>
        </TabsList>
      </TabsContainer>,
    );

    fireEvent.mouseDown(screen.getByRole('tab', { name: 'Two' }));
    expect(onMouseDown).toHaveBeenCalledTimes(1);
    expect(focus).toHaveBeenCalledWith({ focusVisible: false });
    expect(screen.getByRole('tab', { name: 'Two' })).toHaveFocus();
    focus.mockRestore();
  });

  it('should forward the trigger ref', () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <TabsContainer defaultValue="one">
        <TabsList aria-label="Sections">
          <TabsTrigger value="one" ref={ref}>
            One
          </TabsTrigger>
        </TabsList>
      </TabsContainer>,
    );

    expect(ref.current).toBe(screen.getByRole('tab'));
  });

  it('should keep the trigger usable as a Stitches selector', () => {
    render(
      <TabsContainer defaultValue="one">
        <TabsList aria-label="Sections">
          <TabsTrigger value="one">One</TabsTrigger>
        </TabsList>
      </TabsContainer>,
    );

    expect(String(TabsTrigger)).toMatch(/^\.c-/);
    expect(screen.getByRole('tab')).toHaveClass(TabsTrigger.className);
  });
});
