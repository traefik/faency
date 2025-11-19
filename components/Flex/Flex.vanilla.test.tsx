import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { VanillaExtractThemeProvider } from '../../styles/themeContext';
import { FlexVanilla } from './Flex.vanilla';

describe('FlexVanilla', () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    return render(<VanillaExtractThemeProvider>{ui}</VanillaExtractThemeProvider>);
  };

  it('should render as a div by default', () => {
    const { container } = renderWithTheme(<FlexVanilla>Content</FlexVanilla>);
    const flex = container.firstChild;

    expect(flex?.nodeName).toBe('DIV');
    expect(flex).toHaveTextContent('Content');
  });

  it('should render with custom element via as prop', () => {
    const { container } = renderWithTheme(<FlexVanilla as="section">Content</FlexVanilla>);
    const flex = container.firstChild;

    expect(flex?.nodeName).toBe('SECTION');
    expect(flex).toHaveTextContent('Content');
  });

  it('should render with custom className', () => {
    const { container } = renderWithTheme(
      <FlexVanilla className="custom-class">Content</FlexVanilla>,
    );
    const flex = container.firstChild as HTMLElement;

    expect(flex.className).toContain('custom-class');
  });

  it('should apply custom styles via style prop', () => {
    const { container } = renderWithTheme(
      <FlexVanilla style={{ backgroundColor: 'red', padding: '10px' }}>Content</FlexVanilla>,
    );
    const flex = container.firstChild as HTMLElement;

    expect(flex.style.backgroundColor).toBe('red');
    expect(flex.style.padding).toBe('10px');
  });

  it('should apply CSS prop styles', () => {
    const { container } = renderWithTheme(
      <FlexVanilla css={{ padding: '$4', margin: '$2' }}>Content</FlexVanilla>,
    );
    const flex = container.firstChild as HTMLElement;

    expect(flex.style.padding).toBe('20px');
    expect(flex.style.margin).toBe('8px');
  });

  it('should merge style and css props correctly', () => {
    const { container } = renderWithTheme(
      <FlexVanilla
        css={{ padding: '$4', margin: '$2' }}
        style={{ backgroundColor: 'blue', padding: '30px' }}
      >
        Content
      </FlexVanilla>,
    );
    const flex = container.firstChild as HTMLElement;

    expect(flex.style.backgroundColor).toBe('blue');
    expect(flex.style.padding).toBe('30px');
    expect(flex.style.margin).toBe('8px');
  });

  it('should forward ref correctly', () => {
    const ref = { current: null };
    renderWithTheme(<FlexVanilla ref={ref}>Content</FlexVanilla>);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('should pass through HTML attributes', () => {
    const { container } = renderWithTheme(
      <FlexVanilla data-testid="test-flex" aria-label="Test Flex">
        Content
      </FlexVanilla>,
    );
    const flex = container.firstChild as HTMLElement;

    expect(flex.getAttribute('data-testid')).toBe('test-flex');
    expect(flex.getAttribute('aria-label')).toBe('Test Flex');
  });

  it('should render multiple children', () => {
    const { container } = renderWithTheme(
      <FlexVanilla>
        <span>Child 1</span>
        <span>Child 2</span>
      </FlexVanilla>,
    );

    expect(container.textContent).toContain('Child 1');
    expect(container.textContent).toContain('Child 2');
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderWithTheme(<FlexVanilla>Content</FlexVanilla>);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  describe('Flex props', () => {
    it('should render with all direction variants', () => {
      const directions = ['row', 'column', 'rowReverse', 'columnReverse'] as const;
      directions.forEach((dir) => {
        const { container } = renderWithTheme(<FlexVanilla direction={dir}>Content</FlexVanilla>);
        expect(container.firstChild).toBeInTheDocument();
      });
    });

    it('should render with all align variants', () => {
      const aligns = ['start', 'center', 'end', 'stretch', 'baseline'] as const;
      aligns.forEach((align) => {
        const { container } = renderWithTheme(<FlexVanilla align={align}>Content</FlexVanilla>);
        expect(container.firstChild).toBeInTheDocument();
      });
    });

    it('should render with all justify variants', () => {
      const justifies = [
        'start',
        'center',
        'end',
        'space-evenly',
        'space-between',
        'space-around',
      ] as const;
      justifies.forEach((justify) => {
        const { container } = renderWithTheme(<FlexVanilla justify={justify}>Content</FlexVanilla>);
        expect(container.firstChild).toBeInTheDocument();
      });
    });

    it('should render with all wrap variants', () => {
      const wraps = ['wrap', 'noWrap', 'wrapReverse'] as const;
      wraps.forEach((wrap) => {
        const { container } = renderWithTheme(<FlexVanilla wrap={wrap}>Content</FlexVanilla>);
        expect(container.firstChild).toBeInTheDocument();
      });
    });

    it('should render with all gap variants', () => {
      const gaps = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
      gaps.forEach((gap) => {
        const { container } = renderWithTheme(<FlexVanilla gap={gap}>Content</FlexVanilla>);
        expect(container.firstChild).toBeInTheDocument();
      });
    });
  });
});
