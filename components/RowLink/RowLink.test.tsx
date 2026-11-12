import { fireEvent, render, screen, within } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';
import { createPortal } from 'react-dom';

import { styled } from '../../stitches.config';
import { Table as AriaTable, Tbody as AriaTbody, Td as AriaTd, Tr as AriaTr } from '../AriaTable';
import { Table, Tbody, Td, Tr } from '../Table';
import { resetRowLinkWarnings, RowLink } from './RowLink';

const RouterLink = React.forwardRef<
  HTMLAnchorElement,
  { href: string; children?: React.ReactNode } & Record<string, unknown>
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

describe('Tr with href and a child that is not a Td', () => {
  const NameCell = ({ name }: { name: string }) => <AriaTd>{name}</AriaTd>;

  beforeEach(() => {
    resetRowLinkWarnings();
    jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  });
  afterEach(() => jest.restoreAllMocks());

  it('should warn and add no link for a custom cell component', () => {
    render(
      <AriaTable aria-label="APIs">
        <AriaTbody>
          <AriaTr href="/apis/api-1">
            <NameCell name="api-1" />
            <AriaTd>Published</AriaTd>
          </AriaTr>
        </AriaTbody>
      </AriaTable>,
    );

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'api-1' })).toBeInTheDocument();
    expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('is not a Td'));
  });

  it('should warn only once for the same problem', () => {
    const renderRow = () => (
      <AriaTable aria-label="APIs">
        <AriaTbody>
          <AriaTr href="/apis/api-1">
            <NameCell name="api-1" />
          </AriaTr>
        </AriaTbody>
      </AriaTable>
    );
    const { rerender } = render(renderRow());
    rerender(renderRow());

    expect(console.warn).toHaveBeenCalledTimes(1);
  });

  it('should warn and not put the cells of a Fragment in the link', () => {
    render(
      <AriaTable aria-label="APIs">
        <AriaTbody>
          <AriaTr href="/apis/api-1">
            <>
              <AriaTd>api-1</AriaTd>
              <AriaTd>Published</AriaTd>
            </>
          </AriaTr>
        </AriaTbody>
      </AriaTable>,
    );

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.getAllByRole('cell')).toHaveLength(2);
    expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('is not a Td'));
  });
});

describe.each([
  ['AriaTable', AriaTable, AriaTbody, AriaTr, AriaTd],
  ['Table', Table, Tbody, Tr, Td],
] as const)(
  '%s Tr with href and other cells',
  (_, TableComponent, TbodyComponent, TrComponent, TdComponent) => {
    it('should put a styled Td in the row link', () => {
      const NameTd = styled(TdComponent, { fontWeight: '$semiBold' });
      render(
        <TableComponent aria-label="APIs">
          <TbodyComponent>
            <TrComponent href="/apis/api-1">
              <NameTd>api-1</NameTd>
            </TrComponent>
          </TbodyComponent>
        </TableComponent>,
      );

      expect(screen.getByRole('link', { name: 'api-1' })).toHaveAttribute('href', '/apis/api-1');
    });

    it('should pass linkProps to the link component', () => {
      render(
        <TableComponent aria-label="APIs">
          <TbodyComponent>
            <TrComponent
              href="/apis/api-1"
              linkAs={RouterLink}
              linkProps={{ 'data-return-to': '/apis' }}
            >
              <TdComponent>api-1</TdComponent>
            </TrComponent>
          </TbodyComponent>
        </TableComponent>,
      );

      const link = screen.getByRole('link', { name: 'api-1' });
      expect(link).toHaveAttribute('data-return-to', '/apis');
      expect(link).toHaveAttribute('href', '/apis/api-1');
    });
  },
);

describe('AriaTable Tr with asChild and collapsedContent', () => {
  it('should not put a button in the row link', () => {
    render(
      <AriaTable aria-label="APIs">
        <AriaTbody>
          <AriaTr asChild collapsedContent="More about api-1">
            <a href="/apis/api-1">
              <AriaTd>api-1</AriaTd>
              <AriaTd>Published</AriaTd>
            </a>
          </AriaTr>
        </AriaTbody>
      </AriaTable>,
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
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

describe.each([
  ['AriaTable', AriaTable, AriaTbody, AriaTr, AriaTd],
  ['Table', Table, Tbody, Tr, Td],
] as const)(
  '%s Tr with a row link without overlay',
  (_, TableComponent, TbodyComponent, TrComponent, TdComponent) => {
    const onLinkClick = jest.fn((event: React.MouseEvent) => event.preventDefault());
    let open: jest.SpyInstance;

    const Menu = () => createPortal(<span>Delete</span>, document.body);

    const renderRow = () =>
      render(
        <TableComponent aria-label="APIs">
          <TbodyComponent>
            <TrComponent
              href="/apis/api-1"
              linkOverlay={false}
              linkProps={{ onClick: onLinkClick }}
            >
              <TdComponent>api-1</TdComponent>
              <TdComponent>Published</TdComponent>
              <TdComponent>
                <button type="button">Actions</button>
                <Menu />
              </TdComponent>
            </TrComponent>
          </TbodyComponent>
        </TableComponent>,
      );

    beforeEach(() => {
      onLinkClick.mockClear();
      open = jest.spyOn(window, 'open').mockImplementation(() => null);
    });

    afterEach(() => open.mockRestore());

    it('should keep the link in its cell, without the overlay', () => {
      renderRow();

      expect(screen.getByRole('link', { name: 'api-1' })).toHaveAttribute('data-row-link', 'click');
    });

    it('should open the link on a click anywhere in the row', () => {
      renderRow();

      fireEvent.click(screen.getByText('Published'));

      expect(onLinkClick).toHaveBeenCalledTimes(1);
      expect(open).not.toHaveBeenCalled();
    });

    it('should open the link in a new tab on a middle click or a modifier click', () => {
      renderRow();
      const cell = screen.getByText('Published');

      fireEvent(cell, new MouseEvent('auxclick', { bubbles: true, button: 1 }));
      fireEvent.click(cell, { ctrlKey: true });
      fireEvent.click(cell, { metaKey: true });
      fireEvent.click(cell, { shiftKey: true });

      expect(open).toHaveBeenCalledTimes(4);
      expect(open).toHaveBeenCalledWith(
        expect.stringMatching(/\/apis\/api-1$/),
        '_blank',
        'noopener,noreferrer',
      );
      expect(onLinkClick).not.toHaveBeenCalled();
    });

    it.each(['tel:+33123456789', 'mailto:team@example.com', 'data:text/html,api-1'])(
      'should open %s as on a plain click, not in a new tab',
      (href) => {
        render(
          <TableComponent aria-label="Contacts">
            <TbodyComponent>
              <TrComponent href={href} linkOverlay={false} linkProps={{ onClick: onLinkClick }}>
                <TdComponent>api-1</TdComponent>
                <TdComponent>Published</TdComponent>
              </TrComponent>
            </TbodyComponent>
          </TableComponent>,
        );

        fireEvent.click(screen.getByText('Published'), { ctrlKey: true });

        expect(open).not.toHaveBeenCalled();
        expect(onLinkClick).toHaveBeenCalledTimes(1);
      },
    );

    it('should leave the clicks on a control or from a portal to them', () => {
      renderRow();

      fireEvent.click(screen.getByRole('button', { name: 'Actions' }));
      fireEvent.click(screen.getByText('Delete'));
      fireEvent(
        screen.getByText('Published'),
        new MouseEvent('auxclick', { bubbles: true, button: 2 }),
      );

      expect(onLinkClick).not.toHaveBeenCalled();
      expect(open).not.toHaveBeenCalled();
    });
  },
);
