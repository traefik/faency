import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { VanillaExtractThemeProvider } from '../../styles/themeContext';
import { ContainerVanilla } from './Container.vanilla';

describe('ContainerVanilla', () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    return render(<VanillaExtractThemeProvider>{ui}</VanillaExtractThemeProvider>);
  };

  it('should render as a div by default', () => {
    const { container } = renderWithTheme(<ContainerVanilla>Content</ContainerVanilla>);
    const element = container.firstChild;

    expect(element?.nodeName).toBe('DIV');
    expect(element).toHaveTextContent('Content');
  });

  it('should render with custom element via as prop', () => {
    const { container } = renderWithTheme(
      <ContainerVanilla as="section">Content</ContainerVanilla>,
    );
    const element = container.firstChild;

    expect(element?.nodeName).toBe('SECTION');
    expect(element).toHaveTextContent('Content');
  });

  it('should render with custom className', () => {
    const { container } = renderWithTheme(
      <ContainerVanilla className="custom-class">Content</ContainerVanilla>,
    );
    const element = container.firstChild as HTMLElement;

    expect(element.className).toContain('custom-class');
  });

  it('should apply custom styles via style prop', () => {
    const { container } = renderWithTheme(
      <ContainerVanilla style={{ backgroundColor: 'red', padding: '10px' }}>
        Content
      </ContainerVanilla>,
    );
    const element = container.firstChild as HTMLElement;

    expect(element.style.backgroundColor).toBe('red');
    expect(element.style.padding).toBe('10px');
  });

  it('should apply CSS prop styles', () => {
    const { container } = renderWithTheme(
      <ContainerVanilla css={{ padding: '$4', margin: '$2' }}>Content</ContainerVanilla>,
    );
    const element = container.firstChild as HTMLElement;

    expect(element.style.padding).toBe('20px');
    expect(element.style.margin).toBe('8px');
  });

  it('should merge style and css props correctly', () => {
    const { container } = renderWithTheme(
      <ContainerVanilla
        css={{ padding: '$4', margin: '$2' }}
        style={{ backgroundColor: 'blue', padding: '30px' }}
      >
        Content
      </ContainerVanilla>,
    );
    const element = container.firstChild as HTMLElement;

    expect(element.style.backgroundColor).toBe('blue');
    expect(element.style.padding).toBe('30px');
    expect(element.style.margin).toBe('8px');
  });

  it('should forward ref correctly', () => {
    const ref = { current: null };
    renderWithTheme(<ContainerVanilla ref={ref}>Content</ContainerVanilla>);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('should pass through HTML attributes', () => {
    const { container } = renderWithTheme(
      <ContainerVanilla data-testid="test-container" aria-label="Test Container">
        Content
      </ContainerVanilla>,
    );
    const element = container.firstChild as HTMLElement;

    expect(element.getAttribute('data-testid')).toBe('test-container');
    expect(element.getAttribute('aria-label')).toBe('Test Container');
  });

  it('should render multiple children', () => {
    const { container } = renderWithTheme(
      <ContainerVanilla>
        <span>Child 1</span>
        <span>Child 2</span>
      </ContainerVanilla>,
    );

    expect(container.textContent).toContain('Child 1');
    expect(container.textContent).toContain('Child 2');
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderWithTheme(<ContainerVanilla>Content</ContainerVanilla>);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  describe('Container props', () => {
    it('should render with all size variants', () => {
      const sizes = ['1', '2', '3', '4'] as const;
      sizes.forEach((size) => {
        const { container } = renderWithTheme(
          <ContainerVanilla size={size}>Content</ContainerVanilla>,
        );
        expect(container.firstChild).toBeInTheDocument();
      });
    });

    it('should render with noGutter prop', () => {
      const { container } = renderWithTheme(<ContainerVanilla noGutter>Content</ContainerVanilla>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});
