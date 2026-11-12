import { act, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';

import { Checkbox } from '../Checkbox';
import { FaencyProvider } from '../FaencyProvider';
import { Input } from '../Input';
import { Radio, RadioGroup } from '../Radio';
import { Select } from '../Select';
import { Switch } from '../Switch';
import { Textarea } from '../Textarea';
import { TextField } from '../TextField';
import { Field } from './Field';
import { resetFieldWarnings, useFieldControl } from './FieldContext';

describe('Field', () => {
  it('should link the label to the control without an id', () => {
    render(
      <Field label="Name">
        <Input />
      </Field>,
    );

    expect(screen.getByRole('textbox', { name: 'Name' })).toBeInTheDocument();
  });

  it('should use the given id for the control', () => {
    render(
      <Field id="name" label="Name">
        <Input />
      </Field>,
    );

    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveAttribute('id', 'name');
  });

  it('should describe the control with the description', () => {
    render(
      <Field label="Name" description="Lowercase letters only">
        <Input />
      </Field>,
    );

    const input = screen.getByRole('textbox', { name: 'Name' });
    expect(input).toHaveAccessibleDescription('Lowercase letters only');
    expect(input).not.toHaveAttribute('aria-invalid');
  });

  it('should mark the control as invalid and describe it with the error first', () => {
    render(
      <Field label="Name" description="Lowercase letters only" error="Name is required">
        <Input />
      </Field>,
    );

    const input = screen.getByRole('textbox', { name: 'Name' });
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Name is required Lowercase letters only');
  });

  it('should keep the aria-describedby of the caller', () => {
    render(
      <>
        <span id="hint">Hint</span>
        <Field label="Name" error="Name is required">
          <Input aria-describedby="hint" />
        </Field>
      </>,
    );

    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveAccessibleDescription(
      'Name is required Hint',
    );
  });

  it('should mark the control as invalid without an error text', () => {
    render(
      <Field label="Name" invalid>
        <Input />
      </Field>,
    );

    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveAttribute('aria-invalid', 'true');
  });

  it('should not render a live region by default', () => {
    const { container } = render(
      <Field label="Name" error="Name is required">
        <Input />
      </Field>,
    );

    expect(container.querySelector('[aria-live]')).not.toBeInTheDocument();
  });

  it('should keep the id of the control and link the label to it', () => {
    render(
      <Field label="Name">
        <Input id="name" />
      </Field>,
    );

    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveAttribute('id', 'name');
  });

  it('should not give an id to a control without a label or an id', () => {
    render(
      <Field description="Help">
        <Input aria-label="Name" />
      </Field>,
    );

    expect(screen.getByRole('textbox', { name: 'Name' })).not.toHaveAttribute('id');
  });

  it('should style the label from the state of the control', () => {
    const labelClass = (ui: React.ReactElement) => {
      const { container, unmount } = render(ui);
      const className = container.querySelector('label')?.className;
      unmount();
      return className;
    };

    expect(
      labelClass(
        <Field label="Name">
          <Input disabled />
        </Field>,
      ),
    ).toBe(
      labelClass(
        <Field label="Name" disabled>
          <Input />
        </Field>,
      ),
    );
    expect(
      labelClass(
        <Field label="Name">
          <Input state="invalid" />
        </Field>,
      ),
    ).toBe(
      labelClass(
        <Field label="Name" invalid>
          <Input />
        </Field>,
      ),
    );
  });

  it('should keep the id of a TextField or a Textarea inside it', () => {
    render(
      <>
        <Field label="Name">
          <TextField id="name" />
        </Field>
        <Field label="Notes">
          <Textarea id="notes" />
        </Field>
      </>,
    );

    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveAttribute('id', 'name');
    expect(screen.getByRole('textbox', { name: 'Notes' })).toHaveAttribute('id', 'notes');
  });

  it('should not point the label for to a radio group', () => {
    render(
      <Field label="Size">
        <RadioGroup>
          <Radio value="small" aria-label="Small" />
        </RadioGroup>
      </Field>,
    );

    expect(screen.getByText('Size')).not.toHaveAttribute('for');
    expect(screen.getByRole('radiogroup', { name: 'Size' })).toBeInTheDocument();
  });

  describe('with announceError', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    const renderField = (error?: string) => (
      <Field label="Name" announceError error={error}>
        <Input />
      </Field>
    );

    it('should announce a JSX error when the parent renders often', () => {
      const jsxField = () => (
        <Field label="Name" announceError error={<span>Name is required</span>}>
          <Input />
        </Field>
      );
      const { container, rerender } = render(jsxField());

      for (let i = 0; i < 4; i += 1) {
        act(() => {
          jest.advanceTimersByTime(300);
        });
        rerender(jsxField());
      }

      expect(container.querySelector('[aria-live="polite"]')).toHaveTextContent(
        /^Name: Name is required$/,
      );
    });

    it('should announce the error in a polite live region after a pause', () => {
      const { container, rerender } = render(renderField());
      const region = container.querySelector('[aria-live="polite"]');
      expect(region).toBeEmptyDOMElement();

      rerender(renderField('Name is already taken'));
      expect(screen.getByRole('textbox', { name: 'Name' })).toHaveAccessibleDescription(
        'Name is already taken',
      );
      expect(region).toBeEmptyDOMElement();

      act(() => {
        jest.advanceTimersByTime(1000);
      });
      expect(container.querySelector('[aria-live="polite"]')).toBe(region);
      expect(region).toHaveTextContent(/^Name: Name is already taken$/);

      rerender(renderField());

      act(() => {
        jest.advanceTimersByTime(0);
      });
      expect(region).toBeEmptyDOMElement();
    });

    it('should announce only the last error when it changes during the pause', () => {
      const { container, rerender } = render(renderField('Too short'));
      const region = container.querySelector('[aria-live="polite"]');

      act(() => {
        jest.advanceTimersByTime(600);
      });
      rerender(renderField('Only lowercase letters'));
      act(() => {
        jest.advanceTimersByTime(600);
      });
      expect(region).toBeEmptyDOMElement();

      act(() => {
        jest.advanceTimersByTime(400);
      });
      expect(region).toHaveTextContent(/^Name: Only lowercase letters$/);
    });

    it('should announce the text of a custom label that renders its id', () => {
      const { container } = render(
        <Field
          label={({ htmlFor, id }) => (
            <label htmlFor={htmlFor} id={id}>
              Custom
            </label>
          )}
          announceError
          error="Custom error"
        >
          <Input />
        </Field>,
      );

      act(() => {
        jest.advanceTimersByTime(1000);
      });
      expect(container.querySelector('[aria-live="polite"]')).toHaveTextContent(
        /^Custom: Custom error$/,
      );
    });

    it('should announce only the error with a custom label without its id', () => {
      const { container } = render(
        <Field
          label={({ htmlFor }) => <label htmlFor={htmlFor}>Custom</label>}
          announceError
          error="Custom error"
        >
          <Input />
        </Field>,
      );

      act(() => {
        jest.advanceTimersByTime(1000);
      });
      expect(container.querySelector('[aria-live="polite"]')).toHaveTextContent(/^Custom error$/);
    });
  });

  it('should support Select', () => {
    render(
      <Field label="Color" error="Pick a color">
        <Select>
          <option>Red</option>
        </Select>
      </Field>,
    );

    const select = screen.getByRole('combobox', { name: 'Color' });
    expect(select).toHaveAttribute('aria-invalid', 'true');
    expect(select).toHaveAccessibleDescription('Pick a color');
  });

  it('should support Checkbox', () => {
    render(
      <Field label="Accept the terms" error="You must accept the terms">
        <Checkbox />
      </Field>,
    );

    const checkbox = screen.getByRole('checkbox', { name: 'Accept the terms' });
    expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    expect(checkbox).toHaveAccessibleDescription('You must accept the terms');
  });

  it('should support Switch', () => {
    render(
      <Field label="Notifications" description="Sends an email on each change">
        <Switch />
      </Field>,
    );

    expect(screen.getByRole('switch', { name: 'Notifications' })).toHaveAccessibleDescription(
      'Sends an email on each change',
    );
  });

  it('should support RadioGroup', () => {
    render(
      <Field label="Size" error="Pick a size">
        <RadioGroup>
          <Radio value="small" aria-label="Small" />
          <Radio value="large" aria-label="Large" />
        </RadioGroup>
      </Field>,
    );

    const group = screen.getByRole('radiogroup', { name: 'Size' });
    expect(group).toHaveAttribute('aria-invalid', 'true');
    expect(group).toHaveAccessibleDescription('Pick a size');
  });

  it('should support custom controls through useFieldControl', () => {
    const CustomControl = () => {
      const control = useFieldControl({});
      return (
        <div
          role="textbox"
          tabIndex={0}
          id={control.id}
          aria-labelledby={control.labelId}
          aria-describedby={control['aria-describedby']}
          aria-invalid={control['aria-invalid']}
        />
      );
    };

    render(
      <Field label="Custom" error="Custom error">
        <CustomControl />
      </Field>,
    );

    const control = screen.getByRole('textbox', { name: 'Custom' });
    expect(control).toHaveAttribute('aria-invalid', 'true');
    expect(control).toHaveAccessibleDescription('Custom error');
  });

  it('should render a custom label', () => {
    render(
      <Field
        label={({ htmlFor, id, variant }) => (
          <label htmlFor={htmlFor} id={id}>{`Custom ${variant}`}</label>
        )}
      >
        <Input />
      </Field>,
    );

    expect(screen.getByRole('textbox', { name: 'Custom default' })).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <Field label="Name" description="Lowercase letters only" error="Name is required">
        <Input />
      </Field>,
    );

    expect(await axe(container)).toHaveNoViolations();
  });

  it('should set aria-invalid from state outside a Field', () => {
    render(
      <>
        <Input aria-label="Name" state="invalid" />
        <Select aria-label="Color" state="invalid">
          <option>Red</option>
        </Select>
      </>,
    );

    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('combobox', { name: 'Color' })).toHaveAttribute('aria-invalid', 'true');
  });

  it('should hide the Select caret icon', () => {
    const { container } = render(
      <Select aria-label="Color">
        <option>Red</option>
      </Select>,
    );

    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('should render the label after the control with labelPosition end', () => {
    render(
      <Field label="Accept the terms" labelPosition="end">
        <Checkbox />
      </Field>,
    );

    const checkbox = screen.getByRole('checkbox', { name: 'Accept the terms' });
    const label = screen.getByText('Accept the terms');
    expect(checkbox.compareDocumentPosition(label) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('should disable every kind of control with disabled', () => {
    render(
      <>
        <Field label="Name" disabled>
          <Input />
        </Field>
        <Field label="Notes" disabled>
          <Textarea />
        </Field>
        <Field label="Color" disabled>
          <Select>
            <option>Red</option>
          </Select>
        </Field>
        <Field label="Accept the terms" disabled>
          <Checkbox />
        </Field>
        <Field label="Notifications" disabled>
          <Switch />
        </Field>
        <Field label="Size" disabled>
          <RadioGroup>
            <Radio value="small" aria-label="Small" />
          </RadioGroup>
        </Field>
      </>,
    );

    expect(screen.getByRole('textbox', { name: 'Name' })).toBeDisabled();
    expect(screen.getByRole('textbox', { name: 'Notes' })).toBeDisabled();
    expect(screen.getByRole('combobox', { name: 'Color' })).toBeDisabled();
    expect(screen.getByRole('checkbox', { name: 'Accept the terms' })).toBeDisabled();
    expect(screen.getByRole('switch', { name: 'Notifications' })).toBeDisabled();
    expect(screen.getByRole('radio', { name: 'Small' })).toBeDisabled();
  });

  it('should keep the disabled prop of the control', () => {
    render(
      <Field label="Name">
        <Input disabled />
      </Field>,
    );

    expect(screen.getByRole('textbox', { name: 'Name' })).toBeDisabled();
  });

  it('should hide the TextField clear button when the Field is disabled', () => {
    render(
      <FaencyProvider>
        <Field label="Name" disabled>
          <TextField clearable defaultValue="traefik" />
        </Field>
      </FaencyProvider>,
    );

    expect(screen.getByRole('textbox', { name: 'Name' })).toBeDisabled();
    expect(screen.queryByRole('button', { name: 'Clear' })).not.toBeInTheDocument();
  });

  it('should put the label and the hint before the control with labelPosition start', () => {
    const { container } = render(
      <Field
        label="Name"
        hint="Names the route."
        description="Lowercase letters only"
        labelPosition="start"
      >
        <Input />
      </Field>,
    );

    const input = screen.getByRole('textbox', { name: 'Name' });
    expect(input).toHaveAccessibleDescription('Lowercase letters only Names the route.');
    expect(container.textContent).toBe('NameNames the route.Lowercase letters only');
    expect(screen.getByText('Names the route.').compareDocumentPosition(input)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
  });

  it('should give the hint, the description and the error the message size', () => {
    render(
      <Field label="Name" hint="Hint" description="Help" error="Error" messageSize="2">
        <Input />
      </Field>,
    );

    for (const text of ['Hint', 'Help', 'Error']) {
      expect(screen.getByText(text).className).toMatch(/size-2/);
    }
  });

  it('should not point the label to a control that is not there', () => {
    render(
      <>
        <Field label="File">
          <span>manifests/route.yaml</span>
        </Field>
        <Field id="path" label="Path">
          <span>/v1</span>
        </Field>
      </>,
    );

    expect(screen.getByText('File')).not.toHaveAttribute('for');
    expect(screen.getByText('Path')).toHaveAttribute('for', 'path');
  });

  describe('with more than one control', () => {
    let warn: jest.SpyInstance;

    beforeEach(() => {
      resetFieldWarnings();
      warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => warn.mockRestore());

    it('should warn that the label points to one control only', () => {
      render(
        <Field label="Endpoint">
          <Input aria-label="Host" />
          <Input aria-label="Path" />
        </Field>,
      );

      expect(warn).toHaveBeenCalledTimes(1);
      expect(warn.mock.calls[0][0]).toMatch(/more than one control/);
    });

    it('should name and describe the group, and give each control its own error with group', () => {
      render(
        <Field
          label="Endpoint"
          hint="The address clients call."
          error="Use a host or a path."
          group
        >
          <Field error="Use a host name.">
            <Input aria-label="Host" />
          </Field>
          <Input aria-label="Path" />
        </Field>,
      );

      const group = screen.getByRole('group', { name: 'Endpoint' });
      expect(group).toHaveAccessibleDescription('Use a host or a path. The address clients call.');
      expect(screen.getByText('Endpoint')).not.toHaveAttribute('for');
      const host = screen.getByRole('textbox', { name: 'Host' });
      expect(host).toHaveAttribute('aria-invalid', 'true');
      expect(host).toHaveAccessibleDescription('Use a host name.');
      const path = screen.getByRole('textbox', { name: 'Path' });
      expect(path).not.toHaveAttribute('aria-invalid');
      expect(path).not.toHaveAttribute('aria-describedby');
      expect(warn).not.toHaveBeenCalled();
    });

    it('should give an inner Field the message size of the group', () => {
      render(
        <Field label="Endpoint" description="Leave both empty." messageSize="2" group>
          <Field error="Use a host name.">
            <Input aria-label="Host" />
          </Field>
        </Field>,
      );

      expect(screen.getByText('Use a host name.').className).toMatch(/size-2/);
    });

    it('should disable every control of a disabled group', () => {
      render(
        <Field label="Endpoint" group disabled>
          <Input aria-label="Host" />
          <Input aria-label="Path" />
        </Field>,
      );

      expect(screen.getByRole('textbox', { name: 'Host' })).toBeDisabled();
      expect(screen.getByRole('textbox', { name: 'Path' })).toBeDisabled();
    });
  });
});
