import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';

import { VanillaExtractThemeProvider } from '@/styles/themeContext';

import { CardVanilla } from '@/components/Card/Card.vanilla';

import { AlertVanilla } from './Alert.vanilla';

describe('AlertVanilla', () => {
  const renderWithTheme = (ui: React.ReactElement) =>
    render(<VanillaExtractThemeProvider>{ui}</VanillaExtractThemeProvider>);

  const classOf = (ui: React.ReactElement) => {
    const { container, unmount } = renderWithTheme(ui);
    const { className } = container.firstChild as HTMLElement;
    unmount();
    return className;
  };

  it('renders a div by default', () => {
    const { container } = renderWithTheme(<AlertVanilla>Alert</AlertVanilla>);

    expect(container.firstChild?.nodeName).toBe('DIV');
    expect(container.firstChild).toHaveTextContent('Alert');
  });

  it('keeps the card classes', () => {
    const cardClasses = classOf(<CardVanilla>Card</CardVanilla>).split(' ');
    const alertClasses = classOf(<AlertVanilla>Alert</AlertVanilla>).split(' ');

    expect(alertClasses).toEqual(expect.arrayContaining(cardClasses));
  });

  it('applies a distinct class per variant', () => {
    const variants = ['gray', 'info', 'success', 'warning', 'error'] as const;
    const classes = variants.map((variant) =>
      classOf(<AlertVanilla variant={variant}>Alert</AlertVanilla>),
    );

    expect(new Set(classes).size).toBe(variants.length);
  });

  it('passes card props through', () => {
    const { container } = renderWithTheme(
      <AlertVanilla interactive variant="info">
        Alert
      </AlertVanilla>,
    );

    expect(container.firstChild?.nodeName).toBe('BUTTON');
    expect(classOf(<AlertVanilla elevation={3}>Alert</AlertVanilla>)).not.toBe(
      classOf(<AlertVanilla>Alert</AlertVanilla>),
    );
  });

  it('renders the `as` element', () => {
    const { container } = renderWithTheme(<AlertVanilla as="section">Alert</AlertVanilla>);

    expect(container.firstChild?.nodeName).toBe('SECTION');
  });

  it('merges className', () => {
    expect(classOf(<AlertVanilla className="custom-alert">Alert</AlertVanilla>)).toContain(
      'custom-alert',
    );
  });

  it('applies css and style, with style winning on conflicts', () => {
    const { container } = renderWithTheme(
      <AlertVanilla css={{ padding: '$4', margin: '$2' }} style={{ padding: '30px' }}>
        Alert
      </AlertVanilla>,
    );
    const alert = container.firstChild as HTMLElement;

    expect(alert.style.padding).toBe('30px');
    expect(alert.style.margin).toBe('8px');
  });

  it('forwards the ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { container } = renderWithTheme(<AlertVanilla ref={ref}>Alert</AlertVanilla>);

    expect(ref.current).toBe(container.firstChild);
  });

  it('passes HTML attributes through', () => {
    const { container } = renderWithTheme(
      <AlertVanilla role="alert" data-testid="alert">
        Alert
      </AlertVanilla>,
    );
    const alert = container.firstChild as HTMLElement;

    expect(alert.getAttribute('role')).toBe('alert');
    expect(alert.getAttribute('data-testid')).toBe('alert');
  });

  it.each(['light', 'dark'] as const)('renders with the %s theme', (theme) => {
    const { container } = render(
      <VanillaExtractThemeProvider defaultTheme={theme}>
        <AlertVanilla variant="info">Alert</AlertVanilla>
      </VanillaExtractThemeProvider>,
    );

    expect(container.firstChild).toHaveTextContent('Alert');
  });

  it('has no accessibility violations', async () => {
    const { container } = renderWithTheme(<AlertVanilla variant="error">Alert</AlertVanilla>);

    expect(await axe(container)).toHaveNoViolations();
  });
});
