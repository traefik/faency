import * as Popover from '@radix-ui/react-popover';
import { DPUserConfig } from '@rehookify/datepicker';
import React, { useState } from 'react';

import { CSS, styled, VariantProps } from '../../stitches.config';
import { Card } from '../Card';
import { DateTimePicker } from '../DateTimePicker';
import { Input } from '../Input';

const StyledWrapper = styled('div', {
  display: 'flex',
  width: '100%',
});

export type DateTimePickerInputProps = Omit<DPUserConfig, 'onDatesChange' | 'selectedDates'> & {
  inputCSS?: CSS;
  inputProps?: Omit<typeof Input, 'css' | 'onBlur' | 'onFocus'>;
  onChange?: React.ChangeEventHandler<string>;
  pickerCSS?: CSS;
  showTimePicker?: boolean;
  value?: string;
};

export type DateTimePickerInputVariants = VariantProps<DateTimePickerInputProps>;

export const DateTimePickerInput = React.forwardRef<
  React.ElementRef<typeof StyledWrapper>,
  DateTimePickerInputProps
>(({ inputCSS, inputProps, pickerCSS, showTimePicker, ...pickerProps }, fowardedRef) => {
  const [selectedDates, onDatesChange] = useState<Date[]>([]);
  const [showPicker, setShowPicker] = useState(false);

  return (
    <StyledWrapper ref={fowardedRef}>
      <Popover.Root open={showPicker}>
        <Popover.Anchor asChild>
          <Input {...inputProps} css={inputCSS} onFocus={() => setShowPicker(true)} />
        </Popover.Anchor>
        <Popover.Portal>
          <Popover.Content
            onEscapeKeyDown={() => setShowPicker(false)}
            onFocusOutside={() => setShowPicker(false)}
            onPointerDownOutside={() => setShowPicker(false)}
          >
            <Card>
              <DateTimePicker
                {...pickerProps}
                css={pickerCSS}
                onDatesChange={onDatesChange}
                onTimeButtonClick={() => setShowPicker(false)}
                selectedDates={selectedDates}
                showTimePicker={showTimePicker}
              />
            </Card>
            <Popover.Arrow />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </StyledWrapper>
  );
});
