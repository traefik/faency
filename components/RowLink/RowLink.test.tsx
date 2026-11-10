import { render, screen, within } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';

import { Table as AriaTable, Tbody as AriaTbody, Td as AriaTd, Tr as AriaTr } from '../AriaTable';
import { Table, Tbody, Td, Tr } from '../Table';
import { RowLink } from './RowLink';

const RouterLink = React.forwardRef<
  HTMLAnchorElement,
  { href: string; children?: React.ReactNode }
>(({ href, children, ...props }, ref) => (
  <a ref={ref} href={href} data-router-link="" {...props}>
    {children}
  </a>
));
RouterLink.displayName = 'RouterLink';

describe('RowLink', () => {
  it('should render a link that keeps the row a row', () => {
    render(
      <AriaTable aria-label="Subscriptions">
        <AriaTbody>
          <AriaTr>
            <AriaTd>
              <RowLink href="/subscriptions/sub-42">sub-42</RowLink>
            </AriaTd>
            <AriaTd>Active</AriaTd>
          </AriaTr>
        </AriaTbody>
      </AriaTable>,
    );

    const row = screen.getByRole('row');
    expect(within(row).getByRole('link', { name: 'sub-42' })).toHaveAttribute(
      'href',
      '/subscriptions/sub-42',
    );
  });

  it('should render the child with asChild', () => {
    render(
      <RowLink asChild>
        <RouterLink href="/apis/api-1">api-1</RouterLink>
      </RowLink>,
    );

    const link = screen.getByRole('link', { name: 'api-1' });
    expect(link).toHaveAttribute('data-router-link');
    expect(link).toHaveAttribute('data-row-link');
  });

  it('should keep other links in the row apart from the row link', async () => {
    const { container } = render(
      <AriaTable aria-label="Subscriptions">
        <AriaTbody>
          <AriaTr interactive>
            <AriaTd>
              <a href="/applications/app-1">app-1</a>
            </AriaTd>
            <AriaTd>
              <RowLink href="/subscriptions/sub-42">sub-42</RowLink>
            </AriaTd>
          </AriaTr>
        </AriaTbody>
      </AriaTable>,
    );

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    links.forEach((link) => expect(link.querySelector('a')).toBeNull());
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe.each([
  ['AriaTable', AriaTable, AriaTbody, AriaTr, AriaTd],
  ['Table', Table, Tbody, Tr, Td],
] as const)('%s Tr with href', (_, TableComponent, TbodyComponent, TrComponent, TdComponent) => {
  const renderRow = (props: Record<string, unknown>) =>
    render(
      <TableComponent aria-label="APIs">
        <TbodyComponent>
          <TrComponent {...props}>
            <TdComponent>api-1</TdComponent>
            <TdComponent>Published</TdComponent>
          </TrComponent>
        </TbodyComponent>
      </TableComponent>,
    );

  it('should put the first cell in a row link', () => {
    renderRow({ href: '/apis/api-1' });

    const link = screen.getByRole('link', { name: 'api-1' });
    expect(link).toHaveAttribute('href', '/apis/api-1');
    expect(link).toHaveAttribute('data-row-link');
    expect(screen.getAllByRole('link')).toHaveLength(1);
  });

  it('should put the cell at linkCell in the row link', () => {
    renderRow({ href: '/apis/api-1', linkCell: 1 });

    expect(screen.getByRole('link', { name: 'Published' })).toHaveAttribute('href', '/apis/api-1');
  });

  it('should render the link with linkAs', () => {
    renderRow({ href: '/apis/api-1', linkAs: RouterLink });

    const link = screen.getByRole('link', { name: 'api-1' });
    expect(link).toHaveAttribute('data-router-link');
    expect(link).toHaveAttribute('data-row-link');
  });

  it('should not render a link without href', () => {
    renderRow({});

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderRow({ href: '/apis/api-1' });

    expect(await axe(container)).toHaveNoViolations();
  });
});

describe('AriaTable Tr with href and asChild', () => {
  it('should throw', () => {
    jest.spyOn(console, 'error').mockImplementation(() => undefined);

    expect(() =>
      render(
        <AriaTr href="/apis/api-1" asChild>
          <a href="/apis/api-1">
            <AriaTd>api-1</AriaTd>
          </a>
        </AriaTr>,
      ),
    ).toThrow('Tr cannot use href with asChild');

    jest.restoreAllMocks();
  });
});
