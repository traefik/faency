import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';

import { VanillaExtractThemeProvider } from '@/styles/themeContext';

import { RowLinkVanilla } from './RowLink.vanilla';
import { rowLink } from './RowLink.vanilla.css';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<VanillaExtractThemeProvider>{ui}</VanillaExtractThemeProvider>);

const RouterLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>((props, ref) => <a ref={ref} data-router-link="" {...props} />);
RouterLink.displayName = 'RouterLink';

describe('RowLinkVanilla', () => {
  it('renders a link that covers the row by default', () => {
    renderWithTheme(<RowLinkVanilla href="/apps/1">App 1</RowLinkVanilla>);

    const link = screen.getByRole('link', { name: 'App 1' });
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '/apps/1');
    expect(link).toHaveAttribute('data-row-link', '');
    expect(link).toHaveClass(rowLink);
  });

  it('marks the link as opened by a row click without overlay', () => {
    renderWithTheme(
      <RowLinkVanilla href="/apps/1" overlay={false}>
        App 1
      </RowLinkVanilla>,
    );

    expect(screen.getByRole('link', { name: 'App 1' })).toHaveAttribute('data-row-link', 'click');
  });

  it('merges a custom className', () => {
    renderWithTheme(
      <RowLinkVanilla href="/apps/1" className="custom">
        App 1
      </RowLinkVanilla>,
    );

    const link = screen.getByRole('link', { name: 'App 1' });
    expect(link).toHaveClass(rowLink);
    expect(link).toHaveClass('custom');
  });

  it('renders its child with asChild', () => {
    renderWithTheme(
      <RowLinkVanilla asChild overlay={false}>
        <RouterLink href="/apps/1">App 1</RouterLink>
      </RowLinkVanilla>,
    );

    const link = screen.getByRole('link', { name: 'App 1' });
    expect(link).toHaveAttribute('data-router-link', '');
    expect(link).toHaveAttribute('data-row-link', 'click');
    expect(link).toHaveClass(rowLink);
  });

  it('forwards its ref, also with asChild', () => {
    const ref = React.createRef<HTMLAnchorElement>();
    const childRef = React.createRef<HTMLAnchorElement>();
    const { unmount } = renderWithTheme(
      <RowLinkVanilla ref={ref} href="/apps/1">
        App 1
      </RowLinkVanilla>,
    );
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    unmount();

    renderWithTheme(
      <RowLinkVanilla ref={childRef} asChild>
        <RouterLink href="/apps/2">App 2</RouterLink>
      </RowLinkVanilla>,
    );
    expect(childRef.current).toHaveAttribute('data-router-link', '');
  });

  it('passes HTML attributes through', () => {
    renderWithTheme(
      <RowLinkVanilla href="/apps/1" target="_blank" rel="noreferrer" aria-describedby="hint">
        App 1
      </RowLinkVanilla>,
    );

    const link = screen.getByRole('link', { name: 'App 1' });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer');
    expect(link).toHaveAttribute('aria-describedby', 'hint');
  });

  it('has no accessibility violations', async () => {
    const { container } = renderWithTheme(
      <table>
        <tbody>
          <tr>
            <td>
              <RowLinkVanilla href="/apps/1">App 1</RowLinkVanilla>
            </td>
            <td>
              <RowLinkVanilla href="/apps/2" overlay={false}>
                App 2
              </RowLinkVanilla>
            </td>
          </tr>
        </tbody>
      </table>,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
