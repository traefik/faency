import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { DateTimePickerInput } from './DateTimePickerInput';

// autoUpdate keeps jsdom busy for ~30s per open; positioning is not under test.
jest.mock('@floating-ui/react', () => ({
  ...jest.requireActual('@floating-ui/react'),
  autoUpdate: () => () => {},
}));

const getInput = (container: HTMLElement) =>
  container.querySelector('input[type="datetime-local"]') as HTMLInputElement;

describe('DateTimePickerInput', () => {
  it('should emit no dates when the input is cleared', () => {
    const onChange = jest.fn();
    const { container } = render(<DateTimePickerInput onChange={onChange} />);

    fireEvent.change(getInput(container), { target: { value: '2026-11-20T14:30' } });
    fireEvent.change(getInput(container), { target: { value: '' } });

    expect(onChange).toHaveBeenLastCalledWith([], { rejected: false });
  });

  it('should keep opening the picker when inputProps has its own onClick', async () => {
    const onClick = jest.fn();
    const { container } = render(<DateTimePickerInput inputProps={{ onClick } as never} />);

    await userEvent.click(getInput(container));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
  });

  it('should ignore typed dates outside the allowed range', () => {
    const onChange = jest.fn();
    const { container } = render(
      <DateTimePickerInput onChange={onChange} dates={{ minDate: new Date(2026, 10, 20) }} />,
    );

    expect(getInput(container)).toHaveAttribute('min', '2026-11-20T00:00');
    fireEvent.change(getInput(container), { target: { value: '2026-11-19T15:00' } });
    expect(onChange).toHaveBeenLastCalledWith([], { rejected: true });
  });

  it('should keep min from inputProps and reject typed times outside the limits', () => {
    const onChange = jest.fn();
    const { container } = render(
      <DateTimePickerInput
        onChange={onChange}
        inputProps={{ min: '2026-01-01T00:00' } as never}
        time={{ minTime: { h: 9, m: 0 } }}
      />,
    );
    const input = getInput(container);

    expect(input).toHaveAttribute('min', '2026-01-01T00:00');
    fireEvent.change(input, { target: { value: '2026-11-26T03:00' } });
    expect(onChange).toHaveBeenLastCalledWith([], { rejected: true });
  });

  it('should close the picker when the Firefox patch is pressed while open', async () => {
    const { container } = render(<DateTimePickerInput />);
    const patch = container.querySelector('.firefox-patch') as HTMLElement;

    await userEvent.click(patch);
    expect(await screen.findByRole('dialog', { name: 'Choose a date' })).toBeInTheDocument();

    await userEvent.click(patch);
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('should close the picker when a day is picked and there is no time to pick', async () => {
    const { container } = render(<DateTimePickerInput />);

    await userEvent.click(getInput(container));
    const day = (await screen.findAllByRole('button', { name: '25' })).find(
      (b) => !(b as HTMLButtonElement).disabled,
    ) as HTMLElement;
    await userEvent.click(day);

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });
});
