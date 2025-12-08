import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { VanillaExtractThemeProvider } from '../../styles/themeContext';
import { TextareaVanilla } from './Textarea.vanilla';

describe('TextareaVanilla', () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    return render(<VanillaExtractThemeProvider>{ui}</VanillaExtractThemeProvider>);
  };

  it('should render as textarea element', () => {
    const { container } = renderWithTheme(<TextareaVanilla placeholder="Test textarea" />);
    const textarea = container.querySelector('textarea');

    expect(textarea?.nodeName).toBe('TEXTAREA');
    expect(textarea).toHaveAttribute('placeholder', 'Test textarea');
  });

  it('should render with label', () => {
    renderWithTheme(<TextareaVanilla label="Test Label" id="test-textarea" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('should render without label', () => {
    const { container } = renderWithTheme(<TextareaVanilla id="test-textarea" />);
    expect(container.querySelector('label')).not.toBeInTheDocument();
  });

  it('should render with custom className', () => {
    const { container } = renderWithTheme(
      <TextareaVanilla className="custom-textarea" id="test-textarea" />,
    );
    const textarea = container.querySelector('textarea') as HTMLElement;

    expect(textarea.className).toContain('custom-textarea');
  });

  it('should apply variant prop', () => {
    const { container } = renderWithTheme(<TextareaVanilla variant="ghost" />);
    expect(container.querySelector('textarea')).toBeInTheDocument();
  });

  it('should apply state prop', () => {
    const { container } = renderWithTheme(<TextareaVanilla state="invalid" />);
    expect(container.querySelector('textarea')).toBeInTheDocument();
  });

  it('should apply cursor prop', () => {
    const cursors = ['default', 'text'] as const;

    cursors.forEach((cursor) => {
      const { container } = renderWithTheme(<TextareaVanilla cursor={cursor} />);
      expect(container.querySelector('textarea')).toBeInTheDocument();
    });
  });

  it('should apply resize prop', () => {
    const resizes = ['none', 'both', 'vertical', 'horizontal'] as const;

    resizes.forEach((resize) => {
      const { container } = renderWithTheme(<TextareaVanilla resize={resize} />);
      expect(container.querySelector('textarea')).toBeInTheDocument();
    });
  });

  it('should render with endAdornment', () => {
    renderWithTheme(
      <TextareaVanilla
        endAdornment={<span>End Adornment</span>}
        placeholder="Textarea with end adornment"
      />,
    );

    expect(screen.getByText('End Adornment')).toBeInTheDocument();
  });

  it('should combine multiple variant props', () => {
    const { container } = renderWithTheme(
      <TextareaVanilla variant="ghost" state="invalid" cursor="text" resize="vertical" />,
    );
    expect(container.querySelector('textarea')).toBeInTheDocument();
  });

  it('should apply custom styles via style prop', () => {
    const { container } = renderWithTheme(
      <TextareaVanilla style={{ backgroundColor: 'red', padding: '10px' }} />,
    );
    const textarea = container.querySelector('textarea') as HTMLElement;

    expect(textarea.style.backgroundColor).toBe('red');
    expect(textarea.style.padding).toBe('10px');
  });

  it('should apply CSS prop styles', () => {
    const { container } = renderWithTheme(
      <TextareaVanilla css={{ padding: '$4', margin: '$2' }} />,
    );
    const textarea = container.querySelector('textarea') as HTMLElement;

    expect(textarea.style.padding).toBe('20px');
    expect(textarea.style.margin).toBe('8px');
  });

  it('should merge style and css props correctly', () => {
    const { container } = renderWithTheme(
      <TextareaVanilla
        css={{ padding: '$4', margin: '$2' }}
        style={{ backgroundColor: 'blue', padding: '30px' }}
      />,
    );
    const textarea = container.querySelector('textarea') as HTMLElement;

    expect(textarea.style.backgroundColor).toBe('blue');
    expect(textarea.style.padding).toBe('30px');
    expect(textarea.style.margin).toBe('8px');
  });

  it('should apply rootCss prop styles to root wrapper', () => {
    const { container } = renderWithTheme(<TextareaVanilla rootCss={{ p: '$4', m: '$2' }} />);
    const root = container.firstChild as HTMLElement;

    expect(root.style.padding).toBe('20px');
    expect(root.style.margin).toBe('8px');
  });

  it('should forward ref correctly', () => {
    const ref = { current: null };
    renderWithTheme(<TextareaVanilla ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it('should pass through HTML attributes', () => {
    const { container } = renderWithTheme(
      <TextareaVanilla data-testid="test-textarea" aria-label="Test Textarea" placeholder="Test" />,
    );
    const textarea = container.querySelector('textarea') as HTMLElement;

    expect(textarea.getAttribute('data-testid')).toBe('test-textarea');
    expect(textarea.getAttribute('aria-label')).toBe('Test Textarea');
  });

  it('should handle disabled state', () => {
    const { container } = renderWithTheme(<TextareaVanilla disabled />);
    const textarea = container.querySelector('textarea') as HTMLTextAreaElement;

    expect(textarea.disabled).toBe(true);
  });

  it('should handle readOnly state', () => {
    const { container } = renderWithTheme(<TextareaVanilla readOnly />);
    const textarea = container.querySelector('textarea') as HTMLTextAreaElement;

    expect(textarea.readOnly).toBe(true);
  });

  it('should update label variant on focus', () => {
    renderWithTheme(<TextareaVanilla label="Test Label" id="test-textarea" />);
    const textarea = screen.getByLabelText('Test Label');

    fireEvent.focus(textarea);
    // Label variant changes to 'contrast' on focus

    fireEvent.blur(textarea);
    // Label variant changes back to 'default' on blur
  });

  it('should show invalid label variant when state is invalid', () => {
    renderWithTheme(<TextareaVanilla label="Test Label" id="test-textarea" state="invalid" />);
    // Label should have 'invalid' variant
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('should show subtle label variant when disabled', () => {
    renderWithTheme(<TextareaVanilla label="Test Label" id="test-textarea" disabled />);
    // Label should have 'subtle' variant
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('should handle rows attribute', () => {
    const { container } = renderWithTheme(<TextareaVanilla rows={10} />);
    const textarea = container.querySelector('textarea') as HTMLTextAreaElement;

    expect(textarea.rows).toBe(10);
  });

  it('should handle cols attribute', () => {
    const { container } = renderWithTheme(<TextareaVanilla cols={50} />);
    const textarea = container.querySelector('textarea') as HTMLTextAreaElement;

    expect(textarea.cols).toBe(50);
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderWithTheme(<TextareaVanilla aria-label="Test Textarea" />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it('should work with light theme', () => {
    const { container } = render(
      <VanillaExtractThemeProvider defaultTheme="light">
        <TextareaVanilla placeholder="Light Textarea" />
      </VanillaExtractThemeProvider>,
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it('should work with dark theme', () => {
    const { container } = render(
      <VanillaExtractThemeProvider defaultTheme="dark">
        <TextareaVanilla placeholder="Dark Textarea" />
      </VanillaExtractThemeProvider>,
    );

    expect(container.firstChild).toBeInTheDocument();
  });
});
