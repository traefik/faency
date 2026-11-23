import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';

import { VanillaExtractThemeProvider } from '@/styles/themeContext';

import { FieldVanilla } from '@/components/Field';

import { RadioGroupVanilla, RadioVanilla } from './Radio.vanilla';

describe('RadioVanilla', () => {
  const renderWithTheme = (ui: React.ReactElement) =>
    render(<VanillaExtractThemeProvider>{ui}</VanillaExtractThemeProvider>);

  const renderGroup = (
    groupProps: Partial<React.ComponentProps<typeof RadioGroupVanilla>> = {},
    radioProps: Partial<React.ComponentProps<typeof RadioVanilla>> = {},
  ) =>
    renderWithTheme(
      <RadioGroupVanilla aria-label="Size" {...groupProps}>
        <RadioVanilla value="small" aria-label="Small" {...radioProps} />
        <RadioVanilla value="large" aria-label="Large" />
      </RadioGroupVanilla>,
    );

  it('should render a radiogroup with radios', () => {
    renderGroup();

    expect(screen.getByRole('radiogroup', { name: 'Size' })).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(2);
    expect(screen.getByRole('radio', { name: 'Small' }).tagName).toBe('BUTTON');
  });

  it('should check a radio when clicked', () => {
    const onValueChange = jest.fn();
    renderGroup({ onValueChange });

    fireEvent.click(screen.getByRole('radio', { name: 'Large' }));

    expect(onValueChange).toHaveBeenCalledWith('large');
    expect(screen.getByRole('radio', { name: 'Large' })).toHaveAttribute('data-state', 'checked');
  });

  it('should render with custom className', () => {
    renderGroup({ className: 'group-class' }, { className: 'radio-class' });

    expect(screen.getByRole('radiogroup')).toHaveClass('group-class');
    expect(screen.getByRole('radio', { name: 'Small' })).toHaveClass('radio-class');
  });

  it('should apply size variants', () => {
    (['1', '2', 1, 2] as const).forEach((size) => {
      const { unmount } = renderGroup({}, { size });

      expect(screen.getByRole('radio', { name: 'Small' })).toBeInTheDocument();
      unmount();
    });
  });

  it('should apply CSS prop and style prop on the group and the radio', () => {
    renderGroup(
      { css: { gap: '$3', p: '$1' }, style: { padding: '2px' } },
      { css: { mr: '$5' }, style: { marginLeft: '3px' } },
    );
    const group = screen.getByRole('radiogroup');
    const radio = screen.getByRole('radio', { name: 'Small' });

    expect(group.style.gap).toBe('16px');
    expect(group.style.padding).toBe('2px');
    expect(radio.style.marginRight).toBe('24px');
    expect(radio.style.marginLeft).toBe('3px');
  });

  it('should forward refs', () => {
    const groupRef = React.createRef<HTMLDivElement>();
    const radioRef = React.createRef<HTMLButtonElement>();
    renderWithTheme(
      <RadioGroupVanilla aria-label="Size" ref={groupRef}>
        <RadioVanilla value="small" aria-label="Small" ref={radioRef} />
      </RadioGroupVanilla>,
    );

    expect(groupRef.current).toBe(screen.getByRole('radiogroup'));
    expect(radioRef.current).toBe(screen.getByRole('radio'));
  });

  it('should pass through HTML attributes', () => {
    renderGroup({ id: 'size-group', dir: 'rtl' }, { id: 'small' });

    expect(screen.getByRole('radiogroup')).toHaveAttribute('id', 'size-group');
    expect(screen.getByRole('radiogroup')).toHaveAttribute('dir', 'rtl');
    expect(screen.getByRole('radio', { name: 'Small' })).toHaveAttribute('id', 'small');
  });

  it('should disable every radio when the group is disabled', () => {
    renderGroup({ disabled: true });

    screen.getAllByRole('radio').forEach((radio) => expect(radio).toBeDisabled());
  });

  it('should take its name, description, error and disabled state from FieldVanilla', () => {
    renderWithTheme(
      <FieldVanilla label="Size" description="Pick one" error="Select a size" disabled>
        <RadioGroupVanilla>
          <RadioVanilla value="small" aria-label="Small" />
        </RadioGroupVanilla>
      </FieldVanilla>,
    );
    const group = screen.getByRole('radiogroup', { name: 'Size' });

    expect(group).toHaveAttribute('aria-invalid', 'true');
    expect(group).toHaveAccessibleDescription(expect.stringContaining('Pick one'));
    expect(screen.getByRole('radio')).toBeDisabled();
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderGroup({ defaultValue: 'small' });

    expect(await axe(container)).toHaveNoViolations();
  });

  it('should have no accessibility violations inside FieldVanilla', async () => {
    const { container } = renderWithTheme(
      <FieldVanilla label="Size" error="Select a size">
        <RadioGroupVanilla>
          <RadioVanilla value="small" aria-label="Small" />
        </RadioGroupVanilla>
      </FieldVanilla>,
    );

    expect(await axe(container)).toHaveNoViolations();
  });

  it('should work with light and dark themes', () => {
    (['light', 'dark'] as const).forEach((theme) => {
      const { unmount } = render(
        <VanillaExtractThemeProvider forcedTheme={theme}>
          <RadioGroupVanilla aria-label="Size" defaultValue="small">
            <RadioVanilla value="small" aria-label="Small" />
          </RadioGroupVanilla>
        </VanillaExtractThemeProvider>,
      );

      expect(screen.getByRole('radio')).toHaveAttribute('data-state', 'checked');
      unmount();
    });
  });

  it('should work with different primary colors', () => {
    (['blue', 'neon', 'orange', 'red', 'green', 'deepBlue', 'grayBlue'] as const).forEach(
      (primaryColor) => {
        const { unmount } = render(
          <VanillaExtractThemeProvider primaryColor={primaryColor}>
            <RadioGroupVanilla aria-label="Size" defaultValue="small">
              <RadioVanilla value="small" aria-label="Small" />
            </RadioGroupVanilla>
          </VanillaExtractThemeProvider>,
        );

        expect(screen.getByRole('radio')).toBeInTheDocument();
        unmount();
      },
    );
  });
});
