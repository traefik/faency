import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';

import { VanillaExtractThemeProvider } from '../../styles/themeContext';
import { ButtonSwitchContainerVanilla, ButtonSwitchItemVanilla } from './ButtonSwitch.vanilla';

describe('ButtonSwitch Vanilla', () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    return render(<VanillaExtractThemeProvider>{ui}</VanillaExtractThemeProvider>);
  };

  describe('ButtonSwitchContainerVanilla', () => {
    it('should render as toggle group', () => {
      const { container } = renderWithTheme(
        <ButtonSwitchContainerVanilla type="single">
          <ButtonSwitchItemVanilla value="option1">Option 1</ButtonSwitchItemVanilla>
        </ButtonSwitchContainerVanilla>,
      );

      expect(container.firstChild).toBeInTheDocument();
    });

    it('should render with custom className', () => {
      const { container } = renderWithTheme(
        <ButtonSwitchContainerVanilla type="single" className="custom-container">
          <ButtonSwitchItemVanilla value="option1">Option 1</ButtonSwitchItemVanilla>
        </ButtonSwitchContainerVanilla>,
      );
      const containerElement = container.firstChild as HTMLElement;

      expect(containerElement.className).toContain('custom-container');
    });

    it('should apply custom styles via style prop', () => {
      const { container } = renderWithTheme(
        <ButtonSwitchContainerVanilla
          type="single"
          style={{ backgroundColor: 'red', padding: '10px' }}
        >
          <ButtonSwitchItemVanilla value="option1">Option 1</ButtonSwitchItemVanilla>
        </ButtonSwitchContainerVanilla>,
      );
      const containerElement = container.firstChild as HTMLElement;

      expect(containerElement.style.backgroundColor).toBe('red');
      expect(containerElement.style.padding).toBe('10px');
    });

    it('should apply CSS prop styles', () => {
      const { container } = renderWithTheme(
        <ButtonSwitchContainerVanilla type="single" css={{ padding: '$4', margin: '$2' }}>
          <ButtonSwitchItemVanilla value="option1">Option 1</ButtonSwitchItemVanilla>
        </ButtonSwitchContainerVanilla>,
      );
      const containerElement = container.firstChild as HTMLElement;

      expect(containerElement.style.padding).toBe('20px');
      expect(containerElement.style.margin).toBe('8px');
    });

    it('should merge style and css props correctly', () => {
      const { container } = renderWithTheme(
        <ButtonSwitchContainerVanilla
          type="single"
          css={{ padding: '$4', margin: '$2' }}
          style={{ backgroundColor: 'blue', padding: '30px' }}
        >
          <ButtonSwitchItemVanilla value="option1">Option 1</ButtonSwitchItemVanilla>
        </ButtonSwitchContainerVanilla>,
      );
      const containerElement = container.firstChild as HTMLElement;

      expect(containerElement.style.backgroundColor).toBe('blue');
      expect(containerElement.style.padding).toBe('30px');
      expect(containerElement.style.margin).toBe('8px');
    });

    it('should handle single type', () => {
      const { getByRole } = renderWithTheme(
        <ButtonSwitchContainerVanilla type="single">
          <ButtonSwitchItemVanilla value="option1">Option 1</ButtonSwitchItemVanilla>
          <ButtonSwitchItemVanilla value="option2">Option 2</ButtonSwitchItemVanilla>
        </ButtonSwitchContainerVanilla>,
      );

      expect(getByRole('radio', { name: 'Option 1' })).toBeInTheDocument();
      expect(getByRole('radio', { name: 'Option 2' })).toBeInTheDocument();
    });

    it('should handle multiple type', () => {
      const { getByRole } = renderWithTheme(
        <ButtonSwitchContainerVanilla type="multiple">
          <ButtonSwitchItemVanilla value="option1">Option 1</ButtonSwitchItemVanilla>
          <ButtonSwitchItemVanilla value="option2">Option 2</ButtonSwitchItemVanilla>
        </ButtonSwitchContainerVanilla>,
      );

      expect(getByRole('button', { name: 'Option 1' })).toBeInTheDocument();
      expect(getByRole('button', { name: 'Option 2' })).toBeInTheDocument();
    });

    it('should handle defaultValue', () => {
      const { getByRole } = renderWithTheme(
        <ButtonSwitchContainerVanilla type="single" defaultValue="option1">
          <ButtonSwitchItemVanilla value="option1">Option 1</ButtonSwitchItemVanilla>
          <ButtonSwitchItemVanilla value="option2">Option 2</ButtonSwitchItemVanilla>
        </ButtonSwitchContainerVanilla>,
      );
      const option1 = getByRole('radio', { name: 'Option 1' });

      expect(option1).toHaveAttribute('data-state', 'on');
    });

    it('should forward ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      renderWithTheme(
        <ButtonSwitchContainerVanilla ref={ref} type="single">
          <ButtonSwitchItemVanilla value="option1">Option 1</ButtonSwitchItemVanilla>
        </ButtonSwitchContainerVanilla>,
      );

      expect(ref.current).not.toBeNull();
    });

    it('should pass through HTML attributes', () => {
      const { container } = renderWithTheme(
        <ButtonSwitchContainerVanilla
          type="single"
          data-testid="test-container"
          aria-label="Test Container"
        >
          <ButtonSwitchItemVanilla value="option1">Option 1</ButtonSwitchItemVanilla>
        </ButtonSwitchContainerVanilla>,
      );
      const containerElement = container.firstChild as HTMLElement;

      expect(containerElement.getAttribute('data-testid')).toBe('test-container');
      expect(containerElement.getAttribute('aria-label')).toBe('Test Container');
    });

    it('should work with light theme', () => {
      const { container } = render(
        <VanillaExtractThemeProvider defaultTheme="light">
          <ButtonSwitchContainerVanilla type="single">
            <ButtonSwitchItemVanilla value="option1">Option 1</ButtonSwitchItemVanilla>
          </ButtonSwitchContainerVanilla>
        </VanillaExtractThemeProvider>,
      );

      expect(container.firstChild).toBeInTheDocument();
    });

    it('should work with dark theme', () => {
      const { container } = render(
        <VanillaExtractThemeProvider defaultTheme="dark">
          <ButtonSwitchContainerVanilla type="single">
            <ButtonSwitchItemVanilla value="option1">Option 1</ButtonSwitchItemVanilla>
          </ButtonSwitchContainerVanilla>
        </VanillaExtractThemeProvider>,
      );

      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('ButtonSwitchItemVanilla', () => {
    it('should render as toggle item', () => {
      const { getByRole } = renderWithTheme(
        <ButtonSwitchContainerVanilla type="single">
          <ButtonSwitchItemVanilla value="option1">Option 1</ButtonSwitchItemVanilla>
        </ButtonSwitchContainerVanilla>,
      );
      const item = getByRole('radio');

      expect(item).toBeInTheDocument();
      expect(item).toHaveTextContent('Option 1');
    });

    it('should render with custom className', () => {
      const { getByRole } = renderWithTheme(
        <ButtonSwitchContainerVanilla type="single">
          <ButtonSwitchItemVanilla value="option1" className="custom-item">
            Option 1
          </ButtonSwitchItemVanilla>
        </ButtonSwitchContainerVanilla>,
      );
      const item = getByRole('radio');

      expect(item.className).toContain('custom-item');
    });

    it('should apply custom styles via style prop', () => {
      const { getByRole } = renderWithTheme(
        <ButtonSwitchContainerVanilla type="single">
          <ButtonSwitchItemVanilla
            value="option1"
            style={{ backgroundColor: 'red', padding: '10px' }}
          >
            Option 1
          </ButtonSwitchItemVanilla>
        </ButtonSwitchContainerVanilla>,
      );
      const item = getByRole('radio');

      expect(item.style.backgroundColor).toBe('red');
      expect(item.style.padding).toBe('10px');
    });

    it('should apply CSS prop styles', () => {
      const { getByRole } = renderWithTheme(
        <ButtonSwitchContainerVanilla type="single">
          <ButtonSwitchItemVanilla value="option1" css={{ padding: '$4', margin: '$2' }}>
            Option 1
          </ButtonSwitchItemVanilla>
        </ButtonSwitchContainerVanilla>,
      );
      const item = getByRole('radio');

      expect(item.style.padding).toBe('20px');
      expect(item.style.margin).toBe('8px');
    });

    it('should merge style and css props correctly', () => {
      const { getByRole } = renderWithTheme(
        <ButtonSwitchContainerVanilla type="single">
          <ButtonSwitchItemVanilla
            value="option1"
            css={{ padding: '$4', margin: '$2' }}
            style={{ backgroundColor: 'blue', padding: '30px' }}
          >
            Option 1
          </ButtonSwitchItemVanilla>
        </ButtonSwitchContainerVanilla>,
      );
      const item = getByRole('radio');

      expect(item.style.backgroundColor).toBe('blue');
      expect(item.style.padding).toBe('30px');
      expect(item.style.margin).toBe('8px');
    });

    it('should handle disabled state', () => {
      const { getByRole } = renderWithTheme(
        <ButtonSwitchContainerVanilla type="single">
          <ButtonSwitchItemVanilla value="option1" disabled>
            Option 1
          </ButtonSwitchItemVanilla>
        </ButtonSwitchContainerVanilla>,
      );
      const item = getByRole('radio') as HTMLButtonElement;

      expect(item.disabled).toBe(true);
    });

    it('should handle toggle state', () => {
      const { getByRole } = renderWithTheme(
        <ButtonSwitchContainerVanilla type="single" defaultValue="option1">
          <ButtonSwitchItemVanilla value="option1">Option 1</ButtonSwitchItemVanilla>
          <ButtonSwitchItemVanilla value="option2">Option 2</ButtonSwitchItemVanilla>
        </ButtonSwitchContainerVanilla>,
      );
      const option1 = getByRole('radio', { name: 'Option 1' });
      const option2 = getByRole('radio', { name: 'Option 2' });

      expect(option1).toHaveAttribute('data-state', 'on');
      expect(option2).toHaveAttribute('data-state', 'off');
    });

    it('should forward ref correctly', () => {
      const ref = React.createRef<HTMLButtonElement>();
      renderWithTheme(
        <ButtonSwitchContainerVanilla type="single">
          <ButtonSwitchItemVanilla ref={ref} value="option1">
            Option 1
          </ButtonSwitchItemVanilla>
        </ButtonSwitchContainerVanilla>,
      );

      expect(ref.current).not.toBeNull();
      expect(ref.current?.nodeName).toBe('BUTTON');
    });

    it('should pass through HTML attributes', () => {
      const { getByRole } = renderWithTheme(
        <ButtonSwitchContainerVanilla type="single">
          <ButtonSwitchItemVanilla value="option1" data-testid="test-item" aria-label="Test Item">
            Option 1
          </ButtonSwitchItemVanilla>
        </ButtonSwitchContainerVanilla>,
      );
      const item = getByRole('radio');

      expect(item.getAttribute('data-testid')).toBe('test-item');
      expect(item.getAttribute('aria-label')).toBe('Test Item');
    });
  });

  describe('Integration', () => {
    it('should render multiple items in container', () => {
      const { getByRole } = renderWithTheme(
        <ButtonSwitchContainerVanilla type="single">
          <ButtonSwitchItemVanilla value="option1">Option 1</ButtonSwitchItemVanilla>
          <ButtonSwitchItemVanilla value="option2">Option 2</ButtonSwitchItemVanilla>
          <ButtonSwitchItemVanilla value="option3">Option 3</ButtonSwitchItemVanilla>
        </ButtonSwitchContainerVanilla>,
      );

      expect(getByRole('radio', { name: 'Option 1' })).toBeInTheDocument();
      expect(getByRole('radio', { name: 'Option 2' })).toBeInTheDocument();
      expect(getByRole('radio', { name: 'Option 3' })).toBeInTheDocument();
    });

    it('should have no accessibility violations', async () => {
      const { container } = renderWithTheme(
        <ButtonSwitchContainerVanilla type="single" aria-label="Options">
          <ButtonSwitchItemVanilla value="option1">Option 1</ButtonSwitchItemVanilla>
          <ButtonSwitchItemVanilla value="option2">Option 2</ButtonSwitchItemVanilla>
        </ButtonSwitchContainerVanilla>,
      );
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });

    it('should work with different primary colors', () => {
      const colors = ['neon', 'blue', 'orange', 'red', 'green'] as const;

      colors.forEach((color) => {
        const { getByRole, unmount } = render(
          <VanillaExtractThemeProvider primaryColor={color}>
            <ButtonSwitchContainerVanilla type="single">
              <ButtonSwitchItemVanilla value="option1">Option 1</ButtonSwitchItemVanilla>
            </ButtonSwitchContainerVanilla>
          </VanillaExtractThemeProvider>,
        );

        expect(getByRole('radio')).toBeInTheDocument();
        unmount();
      });
    });
  });
});
