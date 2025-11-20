import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { VanillaExtractThemeProvider } from '../../styles/themeContext';
import { GridVanilla } from './Grid.vanilla';

describe('GridVanilla', () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    return render(<VanillaExtractThemeProvider>{ui}</VanillaExtractThemeProvider>);
  };

  it('should render as a div by default', () => {
    const { container } = renderWithTheme(<GridVanilla>Content</GridVanilla>);
    const grid = container.firstChild;

    expect(grid?.nodeName).toBe('DIV');
    expect(grid).toHaveTextContent('Content');
  });

  it('should render with custom element via as prop', () => {
    const { container } = renderWithTheme(<GridVanilla as="section">Content</GridVanilla>);
    const grid = container.firstChild;

    expect(grid?.nodeName).toBe('SECTION');
    expect(grid).toHaveTextContent('Content');
  });

  it('should render with custom className', () => {
    const { container } = renderWithTheme(
      <GridVanilla className="custom-class">Content</GridVanilla>,
    );
    const grid = container.firstChild as HTMLElement;

    expect(grid.className).toContain('custom-class');
  });

  it('should apply custom styles via style prop', () => {
    const { container } = renderWithTheme(
      <GridVanilla style={{ backgroundColor: 'red', padding: '10px' }}>Content</GridVanilla>,
    );
    const grid = container.firstChild as HTMLElement;

    expect(grid.style.backgroundColor).toBe('red');
    expect(grid.style.padding).toBe('10px');
  });

  it('should apply CSS prop styles', () => {
    const { container } = renderWithTheme(
      <GridVanilla css={{ padding: '$4', margin: '$2' }}>Content</GridVanilla>,
    );
    const grid = container.firstChild as HTMLElement;

    expect(grid.style.padding).toBe('20px');
    expect(grid.style.margin).toBe('8px');
  });

  it('should merge style and css props correctly', () => {
    const { container } = renderWithTheme(
      <GridVanilla
        css={{ padding: '$4', margin: '$2' }}
        style={{ backgroundColor: 'blue', padding: '30px' }}
      >
        Content
      </GridVanilla>,
    );
    const grid = container.firstChild as HTMLElement;

    expect(grid.style.backgroundColor).toBe('blue');
    expect(grid.style.padding).toBe('30px');
    expect(grid.style.margin).toBe('8px');
  });

  it('should forward ref correctly', () => {
    const ref = { current: null };
    renderWithTheme(<GridVanilla ref={ref}>Content</GridVanilla>);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('should pass through HTML attributes', () => {
    const { container } = renderWithTheme(
      <GridVanilla data-testid="test-grid" aria-label="Test Grid">
        Content
      </GridVanilla>,
    );
    const grid = container.firstChild as HTMLElement;

    expect(grid.getAttribute('data-testid')).toBe('test-grid');
    expect(grid.getAttribute('aria-label')).toBe('Test Grid');
  });

  it('should render multiple children', () => {
    const { container } = renderWithTheme(
      <GridVanilla>
        <span>Child 1</span>
        <span>Child 2</span>
      </GridVanilla>,
    );

    expect(container.textContent).toContain('Child 1');
    expect(container.textContent).toContain('Child 2');
  });

  it('should render with different semantic elements', () => {
    const elements: Array<keyof JSX.IntrinsicElements> = [
      'article',
      'aside',
      'footer',
      'header',
      'main',
      'nav',
      'section',
    ];

    elements.forEach((element) => {
      const { container } = renderWithTheme(<GridVanilla as={element}>Content</GridVanilla>);
      const grid = container.firstChild;

      expect(grid?.nodeName).toBe(element.toUpperCase());
    });
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderWithTheme(<GridVanilla>Content</GridVanilla>);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it('should work with light theme', () => {
    const { container } = render(
      <VanillaExtractThemeProvider defaultTheme="light">
        <GridVanilla>Light theme content</GridVanilla>
      </VanillaExtractThemeProvider>,
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it('should work with dark theme', () => {
    const { container } = render(
      <VanillaExtractThemeProvider defaultTheme="dark">
        <GridVanilla>Dark theme content</GridVanilla>
      </VanillaExtractThemeProvider>,
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it('should work with different primary colors', () => {
    const colors = ['blue', 'neon', 'orange', 'red', 'green'] as const;

    colors.forEach((color) => {
      const { container } = render(
        <VanillaExtractThemeProvider primaryColor={color}>
          <GridVanilla>Content</GridVanilla>
        </VanillaExtractThemeProvider>,
      );

      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Grid props', () => {
    it('should render with all align variants', () => {
      const aligns = ['start', 'center', 'end', 'stretch', 'baseline'] as const;
      aligns.forEach((align) => {
        const { container } = renderWithTheme(<GridVanilla align={align}>Content</GridVanilla>);
        expect(container.firstChild).toBeInTheDocument();
      });
    });

    it('should render with all justify variants', () => {
      const justifies = ['start', 'center', 'end', 'between'] as const;
      justifies.forEach((justify) => {
        const { container } = renderWithTheme(<GridVanilla justify={justify}>Content</GridVanilla>);
        expect(container.firstChild).toBeInTheDocument();
      });
    });

    it('should render with all flow variants', () => {
      const flows = ['row', 'column', 'dense', 'rowDense', 'columnDense'] as const;
      flows.forEach((flow) => {
        const { container } = renderWithTheme(<GridVanilla flow={flow}>Content</GridVanilla>);
        expect(container.firstChild).toBeInTheDocument();
      });
    });

    it('should render with all column variants', () => {
      const columns = [1, 2, 3, 4] as const;
      columns.forEach((col) => {
        const { container } = renderWithTheme(<GridVanilla columns={col}>Content</GridVanilla>);
        expect(container.firstChild).toBeInTheDocument();
      });
    });

    it('should render with all gap variants', () => {
      const gaps = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
      gaps.forEach((gap) => {
        const { container } = renderWithTheme(<GridVanilla gap={gap}>Content</GridVanilla>);
        expect(container.firstChild).toBeInTheDocument();
      });
    });

    it('should render with all gapX variants', () => {
      const gapXs = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
      gapXs.forEach((gapX) => {
        const { container } = renderWithTheme(<GridVanilla gapX={gapX}>Content</GridVanilla>);
        expect(container.firstChild).toBeInTheDocument();
      });
    });

    it('should render with all gapY variants', () => {
      const gapYs = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
      gapYs.forEach((gapY) => {
        const { container } = renderWithTheme(<GridVanilla gapY={gapY}>Content</GridVanilla>);
        expect(container.firstChild).toBeInTheDocument();
      });
    });

    it('should render with combined gap props', () => {
      const { container } = renderWithTheme(
        <GridVanilla gapX={2} gapY={4}>
          Content
        </GridVanilla>,
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should render with multiple grid props combined', () => {
      const { container } = renderWithTheme(
        <GridVanilla columns={3} gap={4} align="center" justify="between" flow="row">
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </GridVanilla>,
      );
      const grid = container.firstChild;

      expect(grid).toBeInTheDocument();
      expect(container.textContent).toContain('Item 1');
      expect(container.textContent).toContain('Item 2');
      expect(container.textContent).toContain('Item 3');
    });
  });
});
