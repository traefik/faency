import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import React, { createRef } from 'react';

import { VanillaExtractThemeProvider } from '../../styles/themeContext';
import { resetWarnings } from '../../utils/warnOnce';
import { LiVanilla, OlVanilla, UlVanilla } from './List.vanilla';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<VanillaExtractThemeProvider>{ui}</VanillaExtractThemeProvider>);

describe('UlVanilla and OlVanilla', () => {
  it('should render lists with the list role', () => {
    renderWithTheme(
      <>
        <UlVanilla data-testid="ul">
          <LiVanilla>Item</LiVanilla>
        </UlVanilla>
        <OlVanilla data-testid="ol">
          <LiVanilla>Item</LiVanilla>
        </OlVanilla>
      </>,
    );

    expect(screen.getByTestId('ul').tagName).toBe('UL');
    expect(screen.getByTestId('ul')).toHaveAttribute('role', 'list');
    expect(screen.getByTestId('ol').tagName).toBe('OL');
    expect(screen.getByTestId('ol')).toHaveAttribute('role', 'list');
  });

  it('should merge the className and apply css and style', () => {
    renderWithTheme(
      <>
        <UlVanilla data-testid="ul" className="custom" css={{ p: '$2' }} style={{ opacity: 0.5 }} />
        <OlVanilla data-testid="ol" className="custom" style={{ opacity: 0.5 }} />
      </>,
    );

    const list = screen.getByTestId('ul');
    expect(list).toHaveClass('ul', 'custom');
    expect(list).toHaveStyle({ opacity: '0.5' });
    expect(list.style.padding).not.toBe('');
    expect(screen.getByTestId('ol')).toHaveClass('ol', 'custom');
  });

  it('should forward refs', () => {
    const ulRef = createRef<HTMLUListElement>();
    const olRef = createRef<HTMLOListElement>();
    renderWithTheme(
      <>
        <UlVanilla ref={ulRef} />
        <OlVanilla ref={olRef} />
      </>,
    );

    expect(ulRef.current).toBeInstanceOf(HTMLUListElement);
    expect(olRef.current).toBeInstanceOf(HTMLOListElement);
  });

  it('should pass HTML attributes through', () => {
    renderWithTheme(<OlVanilla data-testid="ol" start={3} aria-label="Steps" />);

    expect(screen.getByTestId('ol')).toHaveAttribute('start', '3');
    expect(screen.getByTestId('ol')).toHaveAttribute('aria-label', 'Steps');
  });
});

describe('LiVanilla', () => {
  it('should render its content in a span outside an interactive list', () => {
    renderWithTheme(
      <UlVanilla>
        <LiVanilla data-testid="li">Dashboard</LiVanilla>
      </UlVanilla>,
    );

    const content = screen.getByText('Dashboard');
    expect(content.tagName).toBe('SPAN');
    expect(content).toHaveClass('itemText');
    expect(content.parentElement).toBe(screen.getByTestId('li'));
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should render its content in a button in an interactive list', () => {
    renderWithTheme(
      <UlVanilla interactive>
        <LiVanilla>Dashboard</LiVanilla>
      </UlVanilla>,
    );

    const button = screen.getByRole('button', { name: 'Dashboard' });
    expect(button).toHaveClass('itemButton');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('should let nested lists inherit interactive, and override it', () => {
    renderWithTheme(
      <UlVanilla interactive>
        <LiVanilla>
          Profile
          <UlVanilla>
            <LiVanilla>Account</LiVanilla>
          </UlVanilla>
          <OlVanilla interactive={false}>
            <LiVanilla>Security</LiVanilla>
          </OlVanilla>
        </LiVanilla>
      </UlVanilla>,
    );

    expect(screen.getByRole('button', { name: 'Profile' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Account' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Security' })).not.toBeInTheDocument();
    expect(screen.getByText('Security').tagName).toBe('SPAN');
  });

  it('should render nested lists outside the button', () => {
    renderWithTheme(
      <UlVanilla interactive>
        <LiVanilla data-testid="li">
          Profile
          <UlVanilla data-testid="nested">
            <LiVanilla>Account</LiVanilla>
          </UlVanilla>
        </LiVanilla>
      </UlVanilla>,
    );

    const nested = screen.getByTestId('nested');
    expect(nested.parentElement).toBe(screen.getByTestId('li'));
    expect(screen.getByRole('button', { name: 'Profile' })).not.toContainElement(nested);
  });

  it('should render a nested list in a fragment outside the button', () => {
    renderWithTheme(
      <UlVanilla interactive>
        <LiVanilla data-testid="li">
          Profile
          <>
            <UlVanilla data-testid="nested">
              <LiVanilla>Account</LiVanilla>
            </UlVanilla>
          </>
        </LiVanilla>
      </UlVanilla>,
    );

    const nested = screen.getByTestId('nested');
    expect(nested.parentElement).toBe(screen.getByTestId('li'));
    expect(screen.getByRole('button', { name: 'Profile' })).not.toContainElement(nested);
  });

  describe('nested list warning', () => {
    beforeEach(() => {
      resetWarnings();
      jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    });

    afterEach(() => jest.restoreAllMocks());

    it('should warn when a component renders a nested list inside the item content', () => {
      // React also reports the button nested in a button.
      jest.spyOn(console, 'error').mockImplementation(() => undefined);
      const SubMenu = () => (
        <UlVanilla>
          <LiVanilla>Account</LiVanilla>
        </UlVanilla>
      );
      renderWithTheme(
        <UlVanilla interactive>
          <LiVanilla>
            Profile
            <SubMenu />
          </LiVanilla>
        </UlVanilla>,
      );

      expect(console.warn).toHaveBeenCalledTimes(1);
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('Make UlVanilla or OlVanilla a direct child of LiVanilla'),
      );
    });

    it('should not warn for nested lists that are direct children or in a fragment', () => {
      const SubMenuItems = () => <LiVanilla>Account</LiVanilla>;
      renderWithTheme(
        <UlVanilla interactive>
          <LiVanilla>
            Profile
            <UlVanilla>
              <SubMenuItems />
            </UlVanilla>
          </LiVanilla>
          <LiVanilla>
            Settings
            <>
              <OlVanilla>
                <LiVanilla>General</LiVanilla>
              </OlVanilla>
            </>
          </LiVanilla>
        </UlVanilla>,
      );

      expect(console.warn).not.toHaveBeenCalled();
    });
  });

  it('should render controls outside the button', () => {
    renderWithTheme(
      <UlVanilla interactive>
        <LiVanilla controls={<input type="checkbox" aria-label="Select" />}>John Doe</LiVanilla>
      </UlVanilla>,
    );

    const checkbox = screen.getByRole('checkbox', { name: 'Select' });
    expect(checkbox.parentElement).toHaveClass('controlsWrapper');
    expect(screen.getByRole('button', { name: 'John Doe' })).not.toContainElement(checkbox);
  });

  it('should render no controls wrapper without controls', () => {
    const { container } = renderWithTheme(
      <UlVanilla>
        <LiVanilla>Item</LiVanilla>
      </UlVanilla>,
    );

    expect(container.querySelector('.controlsWrapper')).not.toBeInTheDocument();
  });

  it('should call the onClick of the item on a click on its button', () => {
    const onClick = jest.fn();
    renderWithTheme(
      <UlVanilla interactive>
        <LiVanilla onClick={onClick}>Dashboard</LiVanilla>
      </UlVanilla>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Dashboard' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should call the onClick of the item on Enter and Space on its button', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    renderWithTheme(
      <UlVanilla interactive>
        <LiVanilla onClick={onClick}>Dashboard</LiVanilla>
      </UlVanilla>,
    );

    await user.tab();
    expect(screen.getByRole('button', { name: 'Dashboard' })).toHaveFocus();

    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledTimes(1);

    await user.keyboard(' ');
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('should disable the button of an interactive item', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    renderWithTheme(
      <UlVanilla interactive>
        <LiVanilla disabled onClick={onClick}>
          Dashboard
        </LiVanilla>
      </UlVanilla>,
    );

    const button = screen.getByRole('button', { name: 'Dashboard' });
    expect(button).toBeDisabled();

    await user.click(button);
    await user.tab();

    expect(button).not.toHaveFocus();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('should not set disabled on the li', () => {
    renderWithTheme(
      <UlVanilla>
        <LiVanilla data-testid="li" disabled>
          Item
        </LiVanilla>
      </UlVanilla>,
    );

    expect(screen.getByTestId('li')).not.toHaveAttribute('disabled');
  });

  it('should accept the elevation and flex variants', () => {
    const elevations = [0, 1, 2, 3, 4, 5] as const;
    elevations.forEach((elevation) => {
      const { unmount } = renderWithTheme(
        <UlVanilla>
          <LiVanilla
            data-testid="li"
            elevation={elevation}
            align="start"
            justify="space-between"
            direction="column"
            gap={3}
            wrap="wrap"
          >
            Item
          </LiVanilla>
        </UlVanilla>,
      );
      expect(screen.getByTestId('li')).toBeInTheDocument();
      unmount();
    });
  });

  it('should merge the className and apply css and style', () => {
    renderWithTheme(
      <UlVanilla>
        <LiVanilla data-testid="li" className="custom" css={{ m: '$3' }} style={{ opacity: 0.5 }}>
          Item
        </LiVanilla>
      </UlVanilla>,
    );

    const item = screen.getByTestId('li');
    expect(item).toHaveClass('custom');
    expect(item).toHaveStyle({ opacity: '0.5' });
    expect(item.style.margin).not.toBe('');
  });

  it('should forward its ref to the li', () => {
    const ref = createRef<HTMLLIElement>();
    renderWithTheme(
      <UlVanilla>
        <LiVanilla ref={ref}>Item</LiVanilla>
      </UlVanilla>,
    );

    expect(ref.current).toBeInstanceOf(HTMLLIElement);
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderWithTheme(
      <>
        <UlVanilla>
          <LiVanilla>
            Profile
            <UlVanilla>
              <LiVanilla>Account</LiVanilla>
            </UlVanilla>
          </LiVanilla>
        </UlVanilla>
        <OlVanilla interactive>
          <LiVanilla controls={<input type="checkbox" aria-label="Select" />}>Dashboard</LiVanilla>
        </OlVanilla>
      </>,
    );

    expect(await axe(container)).toHaveNoViolations();
  });

  it('should render in the light and dark themes and with other primary colors', () => {
    const themes = [
      { defaultTheme: 'light', primaryColor: 'blue' },
      { defaultTheme: 'dark', primaryColor: 'neon' },
      { defaultTheme: 'dark', primaryColor: 'orange' },
    ] as const;
    themes.forEach((theme) => {
      const { unmount } = render(
        <VanillaExtractThemeProvider {...theme}>
          <UlVanilla interactive>
            <LiVanilla>Item</LiVanilla>
          </UlVanilla>
        </VanillaExtractThemeProvider>,
      );
      expect(screen.getByRole('button', { name: 'Item' })).toBeInTheDocument();
      unmount();
    });
  });
});
