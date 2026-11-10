import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { Table as AriaTable, Tbody as AriaTbody, Td as AriaTd, Tr as AriaTr } from '../AriaTable';
import { Table, Tbody, Td, Tr } from './Table';

describe.each([
  ['AriaTable', AriaTable, AriaTbody, AriaTr, AriaTd],
  ['Table', Table, Tbody, Tr, Td],
] as const)(
  '%s Tr with collapsedContent',
  (_, TableComponent, TbodyComponent, TrComponent, TdComponent) => {
    const renderRow = (props: Record<string, unknown> = {}) =>
      render(
        <TableComponent aria-label="APIs">
          <TbodyComponent>
            <TrComponent collapsedContent="More about api-1" {...props}>
              <TdComponent>api-1</TdComponent>
            </TrComponent>
          </TbodyComponent>
        </TableComponent>,
      );

    it('should expand the row with the keyboard', async () => {
      renderRow();

      await userEvent.tab();
      const button = screen.getByRole('button', { name: 'Expand row' });
      expect(button).toHaveFocus();
      expect(button).toHaveAttribute('aria-expanded', 'false');

      await userEvent.keyboard('{Enter}');
      expect(button).toHaveAttribute('aria-expanded', 'true');

      await userEvent.keyboard(' ');
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('should not open the row link when the row is expanded', async () => {
      renderRow({ href: '#api-1' });

      const link = screen.getByRole('link', { name: 'api-1' });
      const onLinkClick = jest.fn((event: MouseEvent) => event.preventDefault());
      link.addEventListener('click', onLinkClick);

      await userEvent.click(screen.getByRole('button', { name: 'Expand row' }));

      expect(screen.getByRole('button', { name: 'Expand row' })).toHaveAttribute(
        'aria-expanded',
        'true',
      );
      expect(onLinkClick).not.toHaveBeenCalled();
    });
  },
);
