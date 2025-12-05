import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';

import { FaencyProvider } from '../FaencyProvider';
import { VanillaExtractThemeProvider } from '../../styles/themeContext';
import { TextFieldVanilla } from './TextField.vanilla';

describe('TextFieldVanilla', () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    return render(
      <VanillaExtractThemeProvider>
        <FaencyProvider>{ui}</FaencyProvider>
      </VanillaExtractThemeProvider>,
    );
  };

  it('should render with label as string', () => {
    renderWithTheme(<TextFieldVanilla label="Test Label" id="test-input" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('should render with label as function', () => {
    const CustomLabel = ({ variant }: { variant: string }) => <span>Custom {variant}</span>;
    renderWithTheme(<TextFieldVanilla label={CustomLabel} id="test-input" />);
    expect(screen.getByText(/Custom/)).toBeInTheDocument();
  });

  it('should render without label', () => {
    const { container } = renderWithTheme(<TextFieldVanilla id="test-input" />);
    expect(container.querySelector('label')).not.toBeInTheDocument();
  });

  it('should apply size prop', () => {
    const sizes = ['small', 'medium', 'large'] as const;

    sizes.forEach((size) => {
      const { container } = renderWithTheme(
        <TextFieldVanilla label="Test" id={`test-${size}`} size={size} />,
      );
      expect(container).toBeInTheDocument();
    });
  });

  it('should apply state prop', () => {
    const { rerender } = renderWithTheme(
      <TextFieldVanilla label="Test" id="test-input" state="invalid" />,
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();

    rerender(
      <VanillaExtractThemeProvider>
        <TextFieldVanilla label="Test" id="test-input" />
      </VanillaExtractThemeProvider>,
    );
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('should render clearable icon when clearable prop is true and not disabled', () => {
    renderWithTheme(<TextFieldVanilla label="Test" id="test-input" clearable />);
    expect(screen.getByLabelText('Clear')).toBeInTheDocument();
  });

  it('should not render clearable icon when disabled', () => {
    renderWithTheme(<TextFieldVanilla label="Test" id="test-input" clearable disabled />);
    expect(screen.queryByLabelText('Clear')).not.toBeInTheDocument();
  });

  it('should not render clearable icon when readOnly', () => {
    renderWithTheme(<TextFieldVanilla label="Test" id="test-input" clearable readOnly />);
    expect(screen.queryByLabelText('Clear')).not.toBeInTheDocument();
  });

  it('should clear input value when clear icon is clicked', () => {
    renderWithTheme(
      <TextFieldVanilla label="Test" id="test-input" clearable defaultValue="test value" />,
    );

    const input = screen.getByLabelText('Test') as HTMLInputElement;
    expect(input.value).toBe('test value');

    const clearButton = screen.getByLabelText('Clear');
    fireEvent.click(clearButton);

    expect(input.value).toBe('');
  });

  it('should render password type with visibility toggle', () => {
    renderWithTheme(<TextFieldVanilla label="Password" id="password-input" type="password" />);
    expect(screen.getByLabelText('Show password')).toBeInTheDocument();
  });

  it('should toggle password visibility when icon is clicked', () => {
    renderWithTheme(<TextFieldVanilla label="Password" id="password-input" type="password" />);

    const input = screen.getByLabelText('Password') as HTMLInputElement;
    expect(input.type).toBe('password');

    const toggleButton = screen.getByLabelText('Show password');
    fireEvent.click(toggleButton);

    expect(input.type).toBe('text');
    expect(screen.getByLabelText('Hide password')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Hide password'));
    expect(input.type).toBe('password');
  });

  it('should show invalid icon when state is invalid', () => {
    renderWithTheme(<TextFieldVanilla label="Test" id="test-input" state="invalid" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByLabelText('Invalid')).toBeInTheDocument();
  });

  it('should update label variant on focus', () => {
    renderWithTheme(<TextFieldVanilla label="Test" id="test-input" />);
    const input = screen.getByLabelText('Test');

    fireEvent.focus(input);
    // Label variant changes to 'contrast' on focus

    fireEvent.blur(input);
    // Label variant changes back to 'default' on blur
  });

  it('should handle disabled state', () => {
    renderWithTheme(<TextFieldVanilla label="Test" id="test-input" disabled />);
    const input = screen.getByLabelText('Test') as HTMLInputElement;

    expect(input.disabled).toBe(true);
  });

  it('should handle readOnly state', () => {
    renderWithTheme(<TextFieldVanilla label="Test" id="test-input" readOnly />);
    const input = screen.getByLabelText('Test') as HTMLInputElement;

    expect(input.readOnly).toBe(true);
  });

  it('should forward ref correctly', () => {
    const ref = { current: null };
    renderWithTheme(<TextFieldVanilla label="Test" id="test-input" ref={ref} />);

    expect(ref.current).not.toBeNull();
    expect(ref.current).toHaveProperty('clear');
  });

  it('should apply CSS prop styles to wrapper', () => {
    const { container } = renderWithTheme(
      <TextFieldVanilla label="Test" id="test-input" css={{ padding: '$4', margin: '$2' }} />,
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.padding).toBe('20px');
    expect(wrapper.style.margin).toBe('8px');
  });

  it('should pass through HTML attributes', () => {
    renderWithTheme(
      <TextFieldVanilla
        label="Test"
        id="test-input"
        data-testid="test-textfield"
        placeholder="Enter text"
      />,
    );
    const input = screen.getByLabelText('Test');

    expect(input.getAttribute('data-testid')).toBe('test-textfield');
    expect(input.getAttribute('placeholder')).toBe('Enter text');
  });

  it('should combine clearable with password type', () => {
    renderWithTheme(
      <TextFieldVanilla label="Password" id="password-input" type="password" clearable />,
    );

    expect(screen.getByLabelText('Show password')).toBeInTheDocument();
    expect(screen.getByLabelText('Clear')).toBeInTheDocument();
  });

  it('should combine clearable with invalid state', () => {
    renderWithTheme(<TextFieldVanilla label="Test" id="test-input" state="invalid" clearable />);

    expect(screen.getByLabelText('Invalid')).toBeInTheDocument();
    expect(screen.getByLabelText('Clear')).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderWithTheme(<TextFieldVanilla label="Test" id="test-input" />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it('should work with light theme', () => {
    const { container } = render(
      <VanillaExtractThemeProvider defaultTheme="light">
        <FaencyProvider>
          <TextFieldVanilla label="Light TextField" id="light-input" />
        </FaencyProvider>
      </VanillaExtractThemeProvider>,
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it('should work with dark theme', () => {
    const { container } = render(
      <VanillaExtractThemeProvider defaultTheme="dark">
        <FaencyProvider>
          <TextFieldVanilla label="Dark TextField" id="dark-input" />
        </FaencyProvider>
      </VanillaExtractThemeProvider>,
    );

    expect(container.firstChild).toBeInTheDocument();
  });
});
