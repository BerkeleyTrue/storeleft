import * as R from 'remeda';
import dayjs from 'dayjs';
import React, { useCallback, useRef } from 'react';

import {
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useOutsideClick,
  Portal,
  InputProps,
  ButtonProps,
  PopoverArrow,
} from '@chakra-ui/react';
import { useBoolean } from '@chakra-ui/hooks';
import { useField } from 'formik';

import { CalendarPanel } from './CalPanel';
import { OnDateSelected } from './types';

const formatDate = (date: string | Date): string =>
  dayjs(date).format('YYYY/MM/DD');

export interface Props {
  id?: string;
  name?: string;
  disabled?: boolean;
}

export const DatePicker = ({
  id,
  name,
  disabled,
}: Props) => {
  const popOverContentRef = useRef<HTMLElement>(null);
  const initialFocusRef = useRef<HTMLInputElement>(null);
  const [, meta, helpers] = useField<Date | string | undefined>(name || '');

  const [isOpen, setPopover] = useBoolean(false);

  useOutsideClick({
    ref: popOverContentRef,
    handler: setPopover.off,
  });

  const handleDateSelected = useCallback<OnDateSelected>(
    ({ selectable, date }) => {
      if (!selectable) {
        return;
      }

      if (date instanceof Date && !isNaN(date.getTime())) {
        helpers.setValue(date);
        setPopover.off();
        return;
      }
    },
    [helpers.setValue, setPopover]
  );

  return (
    <Popover
      isOpen={isOpen}
      onClose={setPopover.off}
      initialFocusRef={initialFocusRef}
      isLazy
      placement='bottom-start'
      variant='responsive'
    >
      <PopoverTrigger>
        <Input
          id={id}
          isDisabled={disabled}
          onClick={setPopover.toggle}
          name={name}
          value={meta.value ? formatDate(meta.value) : ''}
          autoComplete='off'
          onChange={R.noop}
          ref={initialFocusRef}
        />
      </PopoverTrigger>
      <Portal>
        <PopoverContent ref={popOverContentRef} width='100%'>
          <PopoverArrow />
          <PopoverBody>
            <CalendarPanel
              onDateSelected={handleDateSelected}
              value={meta.value}
            />
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};
