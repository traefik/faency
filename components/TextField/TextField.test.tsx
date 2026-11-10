import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import React from 'react';

import { FaencyProvider } from '../FaencyProvider';
import { Field } from '../Field';
import { TextField } from './TextField';

jest.mock('../Tooltip', () => ({
  Tooltip: ({ children }: { children: React.ReactNode }) => children,
}));

describe('TextField', () => {
  const renderWithProvider = (ui: React.ReactElement) =>
    render(<FaencyProvider>{ui}</FaencyProvider>);

  it('should link the label to the input without an id', () => {
    renderWithProvider(<TextField label="Name" />);

    expect(screen.getByRole('textbox', { name: 'Name' })).toBeInTheDocument();
  });

  it('should keep the given id', () => {
    renderWithProvider(<TextField label="Name" id="name" />);

    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveAttribute('id', 'name');
  });

  it('should set aria-invalid when state is invalid', () => {
    renderWithProvider(<TextField label="Name" state="invalid" />);

    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveAttribute('aria-invalid', 'true');
  });

  it('should render the description and the error', () => {
    renderWithProvider(
      <TextField label="Name" description="Lowercase letters only" error="Name is required" />,
    );

    const input = screen.getByRole('textbox', { name: 'Name' });
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Name is required Lowercase letters only');
  });

  it('should hide the invalid icon from assistive technologies', () => {
    const { container } = renderWithProvider(<TextField label="Name" state="invalid" />);

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(container.querySelector('svg[aria-hidden="true"]')).toBeInTheDocument();
  });

  it('should use the Field around it', () => {
    renderWithProvider(
      <Field label="Name" error="Name is required">
        <TextField />
      </Field>,
    );

    const input = screen.getByRole('textbox', { name: 'Name' });
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Name is required');
  });

  it('should clear the value with the keyboard and focus the input', async () => {
    const user = userEvent.setup();
    renderWithProvider(<TextField label="Name" clearable defaultValue="traefik" />);

    const input = screen.getByRole('textbox', { name: 'Name' }) as HTMLInputElement;
    await user.click(input);
    await user.tab();
    expect(screen.getByRole('button', { name: 'Clear' })).toHaveFocus();

    await user.keyboard('{Enter}');
    expect(input.value).toBe('');
    expect(input).toHaveFocus();
  });

  it('should toggle the password visibility with the keyboard', async () => {
    const user = userEvent.setup();
    const { container } = renderWithProvider(<TextField label="Password" type="password" />);

    const input = container.querySelector('input') as HTMLInputElement;
    await user.click(input);
    await user.tab();
    expect(screen.getByRole('button', { name: 'Show password' })).toHaveFocus();

    await user.keyboard(' ');
    expect(input).not.toHaveAttribute('type', 'password');
    expect(screen.getByRole('button', { name: 'Hide password' })).toHaveFocus();
  });

  it('should not render the clear button when disabled or readOnly', () => {
    const { rerender } = renderWithProvider(<TextField label="Name" clearable disabled />);
    expect(screen.queryByRole('button', { name: 'Clear' })).not.toBeInTheDocument();

    rerender(
      <FaencyProvider>
        <TextField label="Name" clearable readOnly />
      </FaencyProvider>,
    );
    expect(screen.queryByRole('button', { name: 'Clear' })).not.toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderWithProvider(
      <TextField
        label="Password"
        type="password"
        clearable
        description="At least 12 characters"
        error="Password is too short"
      />,
    );

    expect(await axe(container)).toHaveNoViolations();
  });

  it('should keep the input when an error appears without a label', async () => {
    const { rerender } = renderWithProvider(<TextField aria-label="Search" />);
    const input = screen.getByRole('textbox', { name: 'Search' });
    await userEvent.type(input, 'abc');

    rerender(
      <FaencyProvider>
        <TextField aria-label="Search" error="Too short" />
      </FaencyProvider>,
    );

    expect(screen.getByRole('textbox', { name: 'Search' })).toBe(input);
    expect(input).toHaveFocus();
    expect(input).toHaveValue('abc');
  });

  it('should notify a controlled input when it is cleared', async () => {
    const onChange = jest.fn();
    const Controlled = () => {
      const [value, setValue] = React.useState('hello');
      return (
        <TextField
          aria-label="Search"
          clearable
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
            setValue(event.target.value);
          }}
        />
      );
    };
    renderWithProvider(<Controlled />);

    await userEvent.click(screen.getByRole('button', { name: 'Clear' }));

    expect(onChange).toHaveBeenCalledWith('');
    expect(screen.getByRole('textbox', { name: 'Search' })).toHaveValue('');
  });
});
