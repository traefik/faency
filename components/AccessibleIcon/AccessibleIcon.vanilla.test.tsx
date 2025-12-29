import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { VanillaExtractThemeProvider } from '../../styles/themeContext';
import { AccessibleIconVanilla } from './AccessibleIcon.vanilla';

describe('AccessibleIconVanilla', () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    return render(<VanillaExtractThemeProvider>{ui}</VanillaExtractThemeProvider>);
  };

  const TestIcon = () => (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M0 0h15v15H0z" fill="currentColor" />
    </svg>
  );

  it('should render with label', () => {
    const { container } = renderWithTheme(
      <AccessibleIconVanilla label="Test Icon">
        <TestIcon />
      </AccessibleIconVanilla>,
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it('should provide accessible label via visually hidden text', () => {
    const { container } = renderWithTheme(
      <AccessibleIconVanilla label="Notification Bell">
        <TestIcon />
      </AccessibleIconVanilla>,
    );

    // The label should be present in the DOM for screen readers, but visually hidden
    expect(container.textContent).toContain('Notification Bell');
  });

  it('should render icon with accessible label', () => {
    const { container } = renderWithTheme(
      <AccessibleIconVanilla label="User Avatar">
        <TestIcon />
      </AccessibleIconVanilla>,
    );

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(container.textContent).toContain('User Avatar');
  });

  it('should render child icon element', () => {
    const { container } = renderWithTheme(
      <AccessibleIconVanilla label="Settings">
        <TestIcon />
      </AccessibleIconVanilla>,
    );

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should preserve child element classes', () => {
    const { container } = renderWithTheme(
      <AccessibleIconVanilla label="Search">
        <div className="custom-icon">Icon</div>
      </AccessibleIconVanilla>,
    );

    const iconElement = container.querySelector('.custom-icon');
    expect(iconElement).toBeInTheDocument();
    expect(container.textContent).toContain('Search');
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderWithTheme(
      <AccessibleIconVanilla label="Accessible Icon">
        <TestIcon />
      </AccessibleIconVanilla>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should work with light theme', () => {
    const { container } = render(
      <VanillaExtractThemeProvider defaultTheme="light">
        <AccessibleIconVanilla label="Light Theme Icon">
          <TestIcon />
        </AccessibleIconVanilla>
      </VanillaExtractThemeProvider>,
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it('should work with dark theme', () => {
    const { container } = render(
      <VanillaExtractThemeProvider defaultTheme="dark">
        <AccessibleIconVanilla label="Dark Theme Icon">
          <TestIcon />
        </AccessibleIconVanilla>
      </VanillaExtractThemeProvider>,
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it('should work with complex icon components', () => {
    const ComplexIcon = () => (
      <svg width="15" height="15" viewBox="0 0 15 15">
        <circle cx="7.5" cy="7.5" r="7" fill="currentColor" />
        <path d="M5 7.5L7 9.5L10 6.5" stroke="white" strokeWidth="1.5" />
      </svg>
    );

    const { container } = renderWithTheme(
      <AccessibleIconVanilla label="Check Icon">
        <ComplexIcon />
      </AccessibleIconVanilla>,
    );

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(container.textContent).toContain('Check Icon');
  });
});
