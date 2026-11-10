import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';

import { VanillaExtractThemeProvider } from '../../styles/themeContext';
import { MeterVanilla } from './Meter.vanilla';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<VanillaExtractThemeProvider>{ui}</VanillaExtractThemeProvider>);

const segmentsOf = (container: HTMLElement) =>
  Array.from(container.querySelector('[role]')!.children) as HTMLElement[];

const segmentWidths = (container: HTMLElement) => segmentsOf(container).map((el) => el.style.width);

describe('MeterVanilla', () => {
  describe('value shorthand', () => {
    it('renders a meter out of 100 by default', () => {
      renderWithTheme(<MeterVanilla value={42} aria-label="Usage" />);
      const meter = screen.getByRole('meter', { name: 'Usage' });

      expect(meter).toHaveAttribute('aria-valuenow', '42');
      expect(meter).toHaveAttribute('aria-valuemin', '0');
      expect(meter).toHaveAttribute('aria-valuemax', '100');
    });

    it('sizes the fill against max', () => {
      const { container } = renderWithTheme(<MeterVanilla value={3} max={12} aria-label="Usage" />);

      expect(segmentWidths(container)).toEqual(['25%']);
    });

    it('shows a caption and uses it as the accessible name and value text', () => {
      const { container } = renderWithTheme(
        <MeterVanilla value={42} label="Storage used" valueLabel="42 GB / 100 GB" />,
      );
      const meter = screen.getByRole('meter', { name: 'Storage used' });

      expect(meter).toHaveAttribute('aria-valuetext', '42 GB / 100 GB');
      expect(container).toHaveTextContent('Storage used42 GB / 100 GB');
    });

    it('renders no caption without label or valueLabel', () => {
      const { container } = renderWithTheme(<MeterVanilla value={42} aria-label="Usage" />);

      expect(container).toHaveTextContent('');
    });

    it('lets aria-label win over the caption', () => {
      renderWithTheme(<MeterVanilla value={42} label="Storage" aria-label="Disk usage" />);

      expect(screen.getByRole('meter', { name: 'Disk usage' })).toBeInTheDocument();
    });

    it('caps the fill at max and ignores negative values', () => {
      const { container, unmount } = renderWithTheme(
        <MeterVanilla value={150} aria-label="Usage" />,
      );
      expect(segmentWidths(container)).toEqual(['100%']);
      unmount();

      const negative = renderWithTheme(<MeterVanilla value={-5} aria-label="Usage" />);
      expect(segmentWidths(negative.container)).toEqual(['0%']);
    });

    it('renders an empty fill when max is 0', () => {
      const { container } = renderWithTheme(<MeterVanilla value={0} max={0} aria-label="Usage" />);

      expect(segmentWidths(container)).toEqual(['0%']);
    });
  });

  describe('segments', () => {
    it('defaults max to the sum of the values', () => {
      const { container } = renderWithTheme(
        <MeterVanilla
          segments={[
            { value: 3, label: '200: 3' },
            { value: 1, label: '500: 1' },
          ]}
        />,
      );

      expect(segmentWidths(container)).toEqual(['75%', '25%']);
    });

    it('sizes segments against a shared max', () => {
      const { container } = renderWithTheme(
        <MeterVanilla
          segments={[
            { value: 10, label: 'a' },
            { value: 20, label: 'b' },
          ]}
          max={100}
        />,
      );

      expect(segmentWidths(container)).toEqual(['10%', '20%']);
    });

    it('caps the total at max', () => {
      const { container } = renderWithTheme(
        <MeterVanilla
          segments={[
            { value: 60, label: 'a' },
            { value: 60, label: 'b' },
            { value: 10, label: 'c' },
          ]}
          max={100}
        />,
      );

      expect(segmentWidths(container)).toEqual(['60%', '40%', '0%']);
    });

    it('is an image labelled by its segments', () => {
      renderWithTheme(
        <MeterVanilla
          segments={[
            { value: 1200, label: '200: 1.2k' },
            { value: 30, label: '500: 30' },
          ]}
        />,
      );

      expect(screen.getByRole('img', { name: '200: 1.2k, 500: 30' })).toBeInTheDocument();
    });

    it('falls back to values for unlabelled segments, and lets aria-label win', () => {
      const { unmount } = renderWithTheme(<MeterVanilla segments={[{ value: 1 }, { value: 2 }]} />);
      expect(screen.getByRole('img', { name: '1, 2' })).toBeInTheDocument();
      unmount();

      renderWithTheme(
        <MeterVanilla segments={[{ value: 1 }, { value: 2 }]} aria-label="Status codes" />,
      );
      expect(screen.getByRole('img', { name: 'Status codes' })).toBeInTheDocument();
    });

    it('prefixes the segment text with the caption label', () => {
      renderWithTheme(
        <MeterVanilla
          label="Responses"
          segments={[
            { value: 3, label: '2xx: 3' },
            { value: 1, label: '5xx: 1' },
          ]}
        />,
      );

      expect(screen.getByRole('img', { name: 'Responses: 2xx: 3, 5xx: 1' })).toBeInTheDocument();
    });

    it('shows segment labels as tooltips', () => {
      const { container } = renderWithTheme(
        <MeterVanilla segments={[{ value: 3, label: '2xx: 3' }, { value: 1 }]} />,
      );

      expect(segmentsOf(container)[0]).toHaveAttribute('title', '2xx: 3');
      expect(segmentsOf(container)[1]).not.toHaveAttribute('title');
    });

    it('treats a single segment as a meter', () => {
      renderWithTheme(<MeterVanilla segments={[{ value: 5, label: 'Requests: 5' }]} max={10} />);

      expect(screen.getByRole('meter', { name: 'Requests: 5' })).toHaveAttribute(
        'aria-valuemax',
        '10',
      );
    });

    it('applies a CSS segment color and leaves the default to the stylesheet', () => {
      const { container } = renderWithTheme(
        <MeterVanilla
          segments={[
            { value: 1, color: 'rgb(255, 0, 0)', label: 'a' },
            { value: 1, label: 'b' },
          ]}
        />,
      );
      const [first, second] = segmentsOf(container);

      expect(first.style.backgroundColor).toBe('rgb(255, 0, 0)');
      expect(second.style.backgroundColor).toBe('');
    });
  });

  it('forwards the ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    renderWithTheme(<MeterVanilla ref={ref} value={1} aria-label="Usage" />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('merges className, css and style, and passes HTML attributes through', () => {
    const { container } = renderWithTheme(
      <MeterVanilla
        value={1}
        aria-label="Usage"
        className="custom"
        css={{ mt: '$2' }}
        style={{ width: '200px' }}
        data-testid="meter"
      />,
    );
    const meter = container.firstChild as HTMLElement;

    expect(meter.className).toContain('custom');
    expect(meter.style.marginTop).toBe('8px');
    expect(meter.style.width).toBe('200px');
    expect(meter).toHaveAttribute('data-testid', 'meter');
  });

  it('renders every size', () => {
    (['small', 'medium', 'large'] as const).forEach((size) => {
      const { unmount } = renderWithTheme(
        <MeterVanilla value={1} size={size} aria-label="Usage" />,
      );
      expect(screen.getByRole('meter')).toBeInTheDocument();
      unmount();
    });
  });

  it('works in light and dark themes', () => {
    (['light', 'dark'] as const).forEach((theme) => {
      const { unmount } = render(
        <VanillaExtractThemeProvider defaultTheme={theme}>
          <MeterVanilla value={1} aria-label="Usage" />
        </VanillaExtractThemeProvider>,
      );
      expect(screen.getByRole('meter')).toBeInTheDocument();
      unmount();
    });
  });

  it('has no accessibility violations', async () => {
    const { container } = renderWithTheme(
      <>
        <MeterVanilla value={42} aria-label="Usage" />
        <MeterVanilla value={42} label="Storage used" valueLabel="42 GB / 100 GB" />
        <MeterVanilla
          segments={[
            { value: 3, label: '200: 3' },
            { value: 1, label: '500: 1' },
          ]}
        />
      </>,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
