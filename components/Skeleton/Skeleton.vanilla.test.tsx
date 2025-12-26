import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { VanillaExtractThemeProvider } from '../../styles/themeContext';
import { SkeletonVanilla } from './Skeleton.vanilla';

describe('SkeletonVanilla', () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    return render(<VanillaExtractThemeProvider>{ui}</VanillaExtractThemeProvider>);
  };

  it('should render as div by default', () => {
    const { container } = renderWithTheme(<SkeletonVanilla />);
    const skeleton = container.firstChild;

    expect(skeleton?.nodeName).toBe('DIV');
  });

  it('should render with text variant by default', () => {
    const { container } = renderWithTheme(<SkeletonVanilla />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should apply variant prop - square', () => {
    const { container } = renderWithTheme(<SkeletonVanilla variant="square" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should apply variant prop - circle', () => {
    const { container } = renderWithTheme(<SkeletonVanilla variant="circle" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should apply variant prop - badge', () => {
    const { container } = renderWithTheme(<SkeletonVanilla variant="badge" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should apply variant prop - button', () => {
    const { container } = renderWithTheme(<SkeletonVanilla variant="button" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should apply variant prop - text', () => {
    const { container } = renderWithTheme(<SkeletonVanilla variant="text" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render with children', () => {
    const { container } = renderWithTheme(
      <SkeletonVanilla>
        <div>Child content</div>
      </SkeletonVanilla>,
    );
    const skeleton = container.firstChild;

    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toContainHTML('<div>Child content</div>');
  });

  it('should render with custom className', () => {
    const { container } = renderWithTheme(<SkeletonVanilla className="custom-skeleton" />);
    const skeleton = container.firstChild as HTMLElement;

    expect(skeleton.className).toContain('custom-skeleton');
  });

  it('should apply custom styles via style prop', () => {
    const { container } = renderWithTheme(
      <SkeletonVanilla style={{ width: '100px', height: '50px' }} />,
    );
    const skeleton = container.firstChild as HTMLElement;

    expect(skeleton.style.width).toBe('100px');
    expect(skeleton.style.height).toBe('50px');
  });

  it('should apply CSS prop styles', () => {
    const { container } = renderWithTheme(<SkeletonVanilla css={{ width: '$6', height: '$5' }} />);
    const skeleton = container.firstChild as HTMLElement;

    expect(skeleton.style.width).toBe('32px');
    expect(skeleton.style.height).toBe('24px');
  });

  it('should apply CSS prop with size shorthand', () => {
    const { container } = renderWithTheme(<SkeletonVanilla css={{ size: '$6' }} />);
    const skeleton = container.firstChild as HTMLElement;

    expect(skeleton.style.width).toBe('32px');
    expect(skeleton.style.height).toBe('32px');
  });

  it('should merge style and css props correctly', () => {
    const { container } = renderWithTheme(
      <SkeletonVanilla
        css={{ width: '$6', height: '$5' }}
        style={{ backgroundColor: 'red', width: '100px' }}
      />,
    );
    const skeleton = container.firstChild as HTMLElement;

    expect(skeleton.style.backgroundColor).toBe('red');
    expect(skeleton.style.width).toBe('100px');
    expect(skeleton.style.height).toBe('24px');
  });

  it('should forward ref correctly', () => {
    const ref = { current: null };
    renderWithTheme(<SkeletonVanilla ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('should pass through HTML attributes', () => {
    const { container } = renderWithTheme(
      <SkeletonVanilla data-testid="test-skeleton" aria-label="Loading" />,
    );
    const skeleton = container.firstChild as HTMLElement;

    expect(skeleton.getAttribute('data-testid')).toBe('test-skeleton');
    expect(skeleton.getAttribute('aria-label')).toBe('Loading');
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderWithTheme(<SkeletonVanilla aria-busy="true" />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it('should work with light theme', () => {
    const { container } = render(
      <VanillaExtractThemeProvider defaultTheme="light">
        <SkeletonVanilla />
      </VanillaExtractThemeProvider>,
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it('should work with dark theme', () => {
    const { container } = render(
      <VanillaExtractThemeProvider defaultTheme="dark">
        <SkeletonVanilla />
      </VanillaExtractThemeProvider>,
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render all variants without errors', () => {
    const variants = ['square', 'circle', 'badge', 'button', 'text'] as const;

    variants.forEach((variant) => {
      const { container } = renderWithTheme(<SkeletonVanilla variant={variant} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});
