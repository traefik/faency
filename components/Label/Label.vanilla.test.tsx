import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';

import { VanillaExtractThemeProvider } from '../../styles/themeContext';
import { LabelVanilla } from './Label.vanilla';

describe('LabelVanilla', () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    return render(<VanillaExtractThemeProvider>{ui}</VanillaExtractThemeProvider>);
  };

  it('should render as label element', () => {
    const { container } = renderWithTheme(<LabelVanilla>Label text</LabelVanilla>);
    const label = container.querySelector('label');

    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent('Label text');
  });

  it('should render with custom className', () => {
    const { container } = renderWithTheme(
      <LabelVanilla className="custom-label">Label</LabelVanilla>,
    );
    const label = container.querySelector('label');

    expect(label?.className).toContain('custom-label');
  });

  it('should apply size prop', () => {
    const sizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;

    sizes.forEach((size) => {
      const { container, unmount } = renderWithTheme(
        <LabelVanilla size={size}>Label</LabelVanilla>,
      );
      expect(container.querySelector('label')).toBeInTheDocument();
      unmount();
    });
  });

  it('should apply weight prop', () => {
    const weights = ['light', 'regular', 'medium', 'bold'] as const;

    weights.forEach((weight) => {
      const { container, unmount } = renderWithTheme(
        <LabelVanilla weight={weight}>Label</LabelVanilla>,
      );
      expect(container.querySelector('label')).toBeInTheDocument();
      unmount();
    });
  });

  it('should apply variant prop', () => {
    const variants = ['subtle', 'contrast'] as const;

    variants.forEach((variant) => {
      const { container, unmount } = renderWithTheme(
        <LabelVanilla variant={variant}>Label</LabelVanilla>,
      );
      expect(container.querySelector('label')).toBeInTheDocument();
      unmount();
    });
  });

  it('should apply gradient prop', () => {
    const { container } = renderWithTheme(<LabelVanilla gradient>Label</LabelVanilla>);
    expect(container.querySelector('label')).toBeInTheDocument();
  });

  it('should apply transform prop', () => {
    const transforms = ['uppercase', 'capitalize', 'capitalizeWords'] as const;

    transforms.forEach((transform) => {
      const { container, unmount } = renderWithTheme(
        <LabelVanilla transform={transform}>Label</LabelVanilla>,
      );
      expect(container.querySelector('label')).toBeInTheDocument();
      unmount();
    });
  });

  it('should apply noWrap prop', () => {
    const { container } = renderWithTheme(<LabelVanilla noWrap>Label</LabelVanilla>);
    expect(container.querySelector('label')).toBeInTheDocument();
  });

  it('should apply custom styles via style prop', () => {
    const { container } = renderWithTheme(
      <LabelVanilla style={{ color: 'red', padding: '10px' }}>Label</LabelVanilla>,
    );
    const label = container.querySelector('label') as HTMLElement;

    expect(label.style.color).toBe('red');
    expect(label.style.padding).toBe('10px');
  });

  it('should apply CSS prop styles', () => {
    const { container } = renderWithTheme(
      <LabelVanilla css={{ padding: '$4', margin: '$2' }}>Label</LabelVanilla>,
    );
    const label = container.querySelector('label') as HTMLElement;

    expect(label.style.padding).toBe('20px');
    expect(label.style.margin).toBe('8px');
  });

  it('should merge style and css props correctly', () => {
    const { container } = renderWithTheme(
      <LabelVanilla
        css={{ padding: '$4', margin: '$2' }}
        style={{ color: 'blue', padding: '30px' }}
      >
        Label
      </LabelVanilla>,
    );
    const label = container.querySelector('label') as HTMLElement;

    expect(label.style.color).toBe('blue');
    expect(label.style.padding).toBe('30px');
    expect(label.style.margin).toBe('8px');
  });

  it('should forward ref correctly', () => {
    const ref = React.createRef<HTMLLabelElement>();
    renderWithTheme(<LabelVanilla ref={ref}>Label</LabelVanilla>);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.nodeName).toBe('LABEL');
  });

  it('should pass through HTML attributes', () => {
    const { container } = renderWithTheme(
      <LabelVanilla htmlFor="input-id" data-testid="test-label">
        Label
      </LabelVanilla>,
    );
    const label = container.querySelector('label') as HTMLElement;

    expect(label.getAttribute('for')).toBe('input-id');
    expect(label.getAttribute('data-testid')).toBe('test-label');
  });

  it('should work with form inputs', () => {
    const { container } = renderWithTheme(
      <>
        <LabelVanilla htmlFor="test-input">Input Label</LabelVanilla>
        <input id="test-input" type="text" />
      </>,
    );
    const label = container.querySelector('label');
    const input = container.querySelector('input');

    expect(label?.getAttribute('for')).toBe('test-input');
    expect(input?.id).toBe('test-input');
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderWithTheme(
      <>
        <LabelVanilla htmlFor="accessible-input">Accessible Label</LabelVanilla>
        <input id="accessible-input" type="text" />
      </>,
    );
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it('should work with light theme', () => {
    const { container } = render(
      <VanillaExtractThemeProvider defaultTheme="light">
        <LabelVanilla>Light Label</LabelVanilla>
      </VanillaExtractThemeProvider>,
    );

    expect(container.querySelector('label')).toBeInTheDocument();
  });

  it('should work with dark theme', () => {
    const { container } = render(
      <VanillaExtractThemeProvider defaultTheme="dark">
        <LabelVanilla>Dark Label</LabelVanilla>
      </VanillaExtractThemeProvider>,
    );

    expect(container.querySelector('label')).toBeInTheDocument();
  });

  it('should work with different primary colors', () => {
    const colors = ['neon', 'blue', 'orange', 'red', 'green'] as const;

    colors.forEach((color) => {
      const { container, unmount } = render(
        <VanillaExtractThemeProvider primaryColor={color}>
          <LabelVanilla>Label</LabelVanilla>
        </VanillaExtractThemeProvider>,
      );

      expect(container.querySelector('label')).toBeInTheDocument();
      unmount();
    });
  });
});
