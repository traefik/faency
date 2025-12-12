import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';

import { VanillaExtractThemeProvider } from '../../styles/themeContext';
import {
  H1Vanilla,
  H2Vanilla,
  H3Vanilla,
  H4Vanilla,
  H5Vanilla,
  H6Vanilla,
} from './Heading.vanilla';

describe('Heading Vanilla Components', () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    return render(<VanillaExtractThemeProvider>{ui}</VanillaExtractThemeProvider>);
  };

  describe('H1Vanilla', () => {
    it('should render as h1 element by default', () => {
      const { container } = renderWithTheme(<H1Vanilla>Heading 1</H1Vanilla>);
      const h1 = container.querySelector('h1');

      expect(h1).toBeInTheDocument();
      expect(h1).toHaveTextContent('Heading 1');
    });

    it('should render with custom className', () => {
      const { container } = renderWithTheme(<H1Vanilla className="custom-h1">Heading 1</H1Vanilla>);
      const h1 = container.querySelector('h1');

      expect(h1?.className).toContain('custom-h1');
    });

    it('should apply transform prop', () => {
      const transforms = ['uppercase', 'lowercase', 'capitalize'] as const;

      transforms.forEach((transform) => {
        const { container, unmount } = renderWithTheme(
          <H1Vanilla transform={transform}>Heading</H1Vanilla>,
        );
        expect(container.querySelector('h1')).toBeInTheDocument();
        unmount();
      });
    });

    it('should apply custom styles via style prop', () => {
      const { container } = renderWithTheme(
        <H1Vanilla style={{ color: 'red', fontSize: '48px' }}>Heading</H1Vanilla>,
      );
      const h1 = container.querySelector('h1') as HTMLElement;

      expect(h1.style.color).toBe('red');
      expect(h1.style.fontSize).toBe('48px');
    });

    it('should apply CSS prop styles', () => {
      const { container } = renderWithTheme(
        <H1Vanilla css={{ padding: '$4', margin: '$2' }}>Heading</H1Vanilla>,
      );
      const h1 = container.querySelector('h1') as HTMLElement;

      expect(h1.style.padding).toBe('20px');
      expect(h1.style.margin).toBe('8px');
    });

    it('should render polymorphically as different element', () => {
      const { container } = renderWithTheme(<H1Vanilla as="div">Heading</H1Vanilla>);
      const div = container.querySelector('div');

      expect(div).toBeInTheDocument();
      expect(div).toHaveTextContent('Heading');
    });

    it('should forward ref correctly', () => {
      const ref = React.createRef<HTMLHeadingElement>();
      renderWithTheme(<H1Vanilla ref={ref}>Heading</H1Vanilla>);

      expect(ref.current).not.toBeNull();
      expect(ref.current?.nodeName).toBe('H1');
    });

    it('should have no accessibility violations', async () => {
      const { container } = renderWithTheme(<H1Vanilla>Accessible Heading</H1Vanilla>);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });

  describe('H2Vanilla', () => {
    it('should render as h2 element by default', () => {
      const { container } = renderWithTheme(<H2Vanilla>Heading 2</H2Vanilla>);
      const h2 = container.querySelector('h2');

      expect(h2).toBeInTheDocument();
      expect(h2).toHaveTextContent('Heading 2');
    });

    it('should apply transform prop', () => {
      const { container } = renderWithTheme(<H2Vanilla transform="uppercase">Heading</H2Vanilla>);
      expect(container.querySelector('h2')).toBeInTheDocument();
    });

    it('should forward ref correctly', () => {
      const ref = React.createRef<HTMLHeadingElement>();
      renderWithTheme(<H2Vanilla ref={ref}>Heading</H2Vanilla>);

      expect(ref.current?.nodeName).toBe('H2');
    });
  });

  describe('H3Vanilla', () => {
    it('should render as h3 element by default', () => {
      const { container } = renderWithTheme(<H3Vanilla>Heading 3</H3Vanilla>);
      const h3 = container.querySelector('h3');

      expect(h3).toBeInTheDocument();
      expect(h3).toHaveTextContent('Heading 3');
    });

    it('should apply transform prop', () => {
      const { container } = renderWithTheme(<H3Vanilla transform="lowercase">Heading</H3Vanilla>);
      expect(container.querySelector('h3')).toBeInTheDocument();
    });

    it('should forward ref correctly', () => {
      const ref = React.createRef<HTMLHeadingElement>();
      renderWithTheme(<H3Vanilla ref={ref}>Heading</H3Vanilla>);

      expect(ref.current?.nodeName).toBe('H3');
    });
  });

  describe('H4Vanilla', () => {
    it('should render as h4 element by default', () => {
      const { container } = renderWithTheme(<H4Vanilla>Heading 4</H4Vanilla>);
      const h4 = container.querySelector('h4');

      expect(h4).toBeInTheDocument();
      expect(h4).toHaveTextContent('Heading 4');
    });

    it('should apply transform prop', () => {
      const { container } = renderWithTheme(<H4Vanilla transform="capitalize">Heading</H4Vanilla>);
      expect(container.querySelector('h4')).toBeInTheDocument();
    });

    it('should forward ref correctly', () => {
      const ref = React.createRef<HTMLHeadingElement>();
      renderWithTheme(<H4Vanilla ref={ref}>Heading</H4Vanilla>);

      expect(ref.current?.nodeName).toBe('H4');
    });
  });

  describe('H5Vanilla', () => {
    it('should render as h5 element by default', () => {
      const { container } = renderWithTheme(<H5Vanilla>Heading 5</H5Vanilla>);
      const h5 = container.querySelector('h5');

      expect(h5).toBeInTheDocument();
      expect(h5).toHaveTextContent('Heading 5');
    });

    it('should apply CSS prop styles', () => {
      const { container } = renderWithTheme(<H5Vanilla css={{ padding: '$2' }}>Heading</H5Vanilla>);
      const h5 = container.querySelector('h5') as HTMLElement;

      expect(h5.style.padding).toBe('8px');
    });

    it('should forward ref correctly', () => {
      const ref = React.createRef<HTMLHeadingElement>();
      renderWithTheme(<H5Vanilla ref={ref}>Heading</H5Vanilla>);

      expect(ref.current?.nodeName).toBe('H5');
    });
  });

  describe('H6Vanilla', () => {
    it('should render as h6 element by default', () => {
      const { container } = renderWithTheme(<H6Vanilla>Heading 6</H6Vanilla>);
      const h6 = container.querySelector('h6');

      expect(h6).toBeInTheDocument();
      expect(h6).toHaveTextContent('Heading 6');
    });

    it('should apply CSS prop styles', () => {
      const { container } = renderWithTheme(<H6Vanilla css={{ margin: '$1' }}>Heading</H6Vanilla>);
      const h6 = container.querySelector('h6') as HTMLElement;

      expect(h6.style.margin).toBe('4px');
    });

    it('should forward ref correctly', () => {
      const ref = React.createRef<HTMLHeadingElement>();
      renderWithTheme(<H6Vanilla ref={ref}>Heading</H6Vanilla>);

      expect(ref.current?.nodeName).toBe('H6');
    });
  });

  describe('Theme Support', () => {
    it('should work with light theme', () => {
      const { container } = render(
        <VanillaExtractThemeProvider defaultTheme="light">
          <H1Vanilla>Light Heading</H1Vanilla>
        </VanillaExtractThemeProvider>,
      );

      expect(container.querySelector('h1')).toBeInTheDocument();
    });

    it('should work with dark theme', () => {
      const { container } = render(
        <VanillaExtractThemeProvider defaultTheme="dark">
          <H1Vanilla>Dark Heading</H1Vanilla>
        </VanillaExtractThemeProvider>,
      );

      expect(container.querySelector('h1')).toBeInTheDocument();
    });

    it('should work with different primary colors', () => {
      const colors = ['neon', 'blue', 'orange', 'red', 'green'] as const;

      colors.forEach((color) => {
        const { container, unmount } = render(
          <VanillaExtractThemeProvider primaryColor={color}>
            <H1Vanilla>Heading</H1Vanilla>
          </VanillaExtractThemeProvider>,
        );

        expect(container.querySelector('h1')).toBeInTheDocument();
        unmount();
      });
    });
  });
});
