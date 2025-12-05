import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { VanillaExtractThemeProvider } from '../../styles/themeContext';
import { InputVanilla } from './Input.vanilla';

describe('InputVanilla', () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    return render(<VanillaExtractThemeProvider>{ui}</VanillaExtractThemeProvider>);
  };

  it('should render as input element', () => {
    const { container } = renderWithTheme(<InputVanilla placeholder="Test input" />);
    const wrapper = container.firstChild;
    const input = wrapper?.firstChild;

    expect(input?.nodeName).toBe('INPUT');
    expect(input).toHaveAttribute('placeholder', 'Test input');
  });

  it('should render with custom className on wrapper', () => {
    const { container } = renderWithTheme(<InputVanilla className="custom-input" />);
    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper.className).toContain('custom-input');
  });

  it('should apply size prop', () => {
    const sizes = ['small', 'medium', 'large'] as const;

    sizes.forEach((size) => {
      const { container } = renderWithTheme(<InputVanilla size={size} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('should apply variant prop', () => {
    const { container } = renderWithTheme(<InputVanilla variant="ghost" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should apply state prop', () => {
    const { container } = renderWithTheme(<InputVanilla state="invalid" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should apply cursor prop', () => {
    const cursors = ['default', 'text'] as const;

    cursors.forEach((cursor) => {
      const { container } = renderWithTheme(<InputVanilla cursor={cursor} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('should render with startAdornment', () => {
    const { container } = renderWithTheme(
      <InputVanilla startAdornment={<span>Start</span>} placeholder="Input with start adornment" />,
    );
    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper).toHaveTextContent('Start');
  });

  it('should render with endAdornment', () => {
    const { container } = renderWithTheme(
      <InputVanilla endAdornment={<span>End</span>} placeholder="Input with end adornment" />,
    );
    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper).toHaveTextContent('End');
  });

  it('should render with both startAdornment and endAdornment', () => {
    const { container } = renderWithTheme(
      <InputVanilla
        startAdornment={<span>Start</span>}
        endAdornment={<span>End</span>}
        placeholder="Input with both adornments"
      />,
    );
    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper).toHaveTextContent('Start');
    expect(wrapper).toHaveTextContent('End');
  });

  it('should combine multiple variant props', () => {
    const { container } = renderWithTheme(
      <InputVanilla size="large" variant="ghost" state="invalid" cursor="text" />,
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should apply custom styles via style prop', () => {
    const { container } = renderWithTheme(
      <InputVanilla style={{ backgroundColor: 'red', padding: '10px' }} />,
    );
    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper.style.backgroundColor).toBe('red');
    expect(wrapper.style.padding).toBe('10px');
  });

  it('should apply CSS prop styles', () => {
    const { container } = renderWithTheme(<InputVanilla css={{ padding: '$4', margin: '$2' }} />);
    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper.style.padding).toBe('20px');
    expect(wrapper.style.margin).toBe('8px');
  });

  it('should merge style and css props correctly', () => {
    const { container } = renderWithTheme(
      <InputVanilla
        css={{ padding: '$4', margin: '$2' }}
        style={{ backgroundColor: 'blue', padding: '30px' }}
      />,
    );
    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper.style.backgroundColor).toBe('blue');
    expect(wrapper.style.padding).toBe('30px');
    expect(wrapper.style.margin).toBe('8px');
  });

  it('should forward ref correctly', () => {
    const ref = { current: null };
    renderWithTheme(<InputVanilla ref={ref} />);

    expect(ref.current).not.toBeNull();
    expect(ref.current).toHaveProperty('clear');
  });

  it('should have clear method on ref', () => {
    const ref = { current: null };
    const { container } = renderWithTheme(<InputVanilla ref={ref} defaultValue="test value" />);
    const wrapper = container.firstChild;
    const input = wrapper?.firstChild as HTMLInputElement;

    expect(input.value).toBe('test value');

    if (ref.current) {
      (ref.current as any).clear();
    }

    expect(input.value).toBe('');
  });

  it('should pass through HTML attributes', () => {
    const { container } = renderWithTheme(
      <InputVanilla data-testid="test-input" aria-label="Test Input" placeholder="Test" />,
    );
    const wrapper = container.firstChild;
    const input = wrapper?.firstChild as HTMLElement;

    expect(input.getAttribute('data-testid')).toBe('test-input');
    expect(input.getAttribute('aria-label')).toBe('Test Input');
  });

  it('should handle disabled state', () => {
    const { container } = renderWithTheme(<InputVanilla disabled />);
    const wrapper = container.firstChild;
    const input = wrapper?.firstChild as HTMLInputElement;

    expect(input.disabled).toBe(true);
  });

  it('should handle readOnly state', () => {
    const { container } = renderWithTheme(<InputVanilla readOnly />);
    const wrapper = container.firstChild;
    const input = wrapper?.firstChild as HTMLInputElement;

    expect(input.readOnly).toBe(true);
  });

  it('should handle type attribute', () => {
    const types = ['text', 'password', 'email', 'number'];

    types.forEach((type) => {
      const { container } = renderWithTheme(<InputVanilla type={type} />);
      const wrapper = container.firstChild;
      const input = wrapper?.firstChild as HTMLInputElement;

      expect(input.type).toBe(type);
    });
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderWithTheme(<InputVanilla aria-label="Test Input" />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it('should work with light theme', () => {
    const { container } = render(
      <VanillaExtractThemeProvider defaultTheme="light">
        <InputVanilla placeholder="Light Input" />
      </VanillaExtractThemeProvider>,
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it('should work with dark theme', () => {
    const { container } = render(
      <VanillaExtractThemeProvider defaultTheme="dark">
        <InputVanilla placeholder="Dark Input" />
      </VanillaExtractThemeProvider>,
    );

    expect(container.firstChild).toBeInTheDocument();
  });
});
