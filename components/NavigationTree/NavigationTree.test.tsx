import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';

import { NavigationTreeContainer } from './NavigationTreeContainer';
import { NavigationTreeDrawer } from './NavigationTreeDrawer';
import { NavigationTreeItem } from './NavigationTreeItem';

describe('NavigationTree', () => {
  it('renders items with their labels', () => {
    render(
      <NavigationTreeContainer>
        <NavigationTreeItem label="One" />
        <NavigationTreeItem label="Two" />
      </NavigationTreeContainer>,
    );

    expect(screen.getByRole('button', { name: /One/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Two/ })).toBeInTheDocument();
  });

  it('toggles nested children when an expandable item is clicked', () => {
    render(
      <NavigationTreeContainer>
        <NavigationTreeItem label="Parent">
          <NavigationTreeItem label="Child" />
        </NavigationTreeItem>
      </NavigationTreeContainer>,
    );

    expect(screen.queryByRole('button', { name: /Child/ })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Parent/ }));
    expect(screen.getByRole('button', { name: /Child/ })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Parent/ }));
    expect(screen.queryByRole('button', { name: /Child/ })).not.toBeInTheDocument();
  });

  it('calls onClick for a leaf item but toggles (does not call onClick) for an expandable item', () => {
    const onLeafClick = jest.fn();
    const onParentClick = jest.fn();

    render(
      <NavigationTreeContainer>
        <NavigationTreeItem label="Leaf" onClick={onLeafClick} />
        <NavigationTreeItem label="Parent" onClick={onParentClick}>
          <NavigationTreeItem label="Child" />
        </NavigationTreeItem>
      </NavigationTreeContainer>,
    );

    fireEvent.click(screen.getByRole('button', { name: /Leaf/ }));
    expect(onLeafClick).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('button', { name: /Parent/ }));
    expect(onParentClick).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: /Child/ })).toBeInTheDocument();
  });

  it('inherits the container default expand icon on expandable items', () => {
    render(
      <NavigationTreeContainer
        defaultExpandIcon={<span data-testid="ctx-expand-icon">expand</span>}
      >
        <NavigationTreeItem label="Parent">
          <NavigationTreeItem label="Child" />
        </NavigationTreeItem>
      </NavigationTreeContainer>,
    );

    expect(screen.getByTestId('ctx-expand-icon')).toBeInTheDocument();
  });

  it('propagates the container context through non-tree wrappers to descendant items', () => {
    render(
      <NavigationTreeContainer
        defaultExpandIcon={<span data-testid="ctx-expand-icon">expand</span>}
      >
        <div>
          <NavigationTreeItem label="Wrapped">
            <NavigationTreeItem label="Child" />
          </NavigationTreeItem>
        </div>
      </NavigationTreeContainer>,
    );

    expect(screen.getByTestId('ctx-expand-icon')).toBeInTheDocument();
  });

  it('lets a per-item icon prop override the inherited container icon', () => {
    render(
      <NavigationTreeContainer defaultExpandIcon={<span data-testid="ctx-expand-icon">ctx</span>}>
        <NavigationTreeItem
          label="Parent"
          defaultExpandIcon={<span data-testid="item-expand-icon">item</span>}
        >
          <NavigationTreeItem label="Child" />
        </NavigationTreeItem>
      </NavigationTreeContainer>,
    );

    expect(screen.getByTestId('item-expand-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('ctx-expand-icon')).not.toBeInTheDocument();
  });

  it('renders items inside a NavigationTreeDrawer', () => {
    render(
      <NavigationTreeDrawer>
        <NavigationTreeContainer>
          <NavigationTreeItem label="Drawer item" />
        </NavigationTreeContainer>
      </NavigationTreeDrawer>,
    );

    expect(screen.getByRole('button', { name: /Drawer item/ })).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <NavigationTreeDrawer>
        <NavigationTreeContainer>
          <NavigationTreeItem label="Parent">
            <NavigationTreeItem label="Child" />
          </NavigationTreeItem>
          <NavigationTreeItem label="Leaf" />
        </NavigationTreeContainer>
      </NavigationTreeDrawer>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
