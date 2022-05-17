import * as R from 'remeda';
import React, { useCallback, useRef } from 'react';

import {
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useOutsideClick,
  Portal,
  PopoverArrow,
  PopoverContentProps,
} from '@chakra-ui/react';
import { useBoolean } from '@chakra-ui/hooks';
import { useField } from 'formik';

import { CalendarPanel } from './CalPanel';
import { OnDateSelected } from './types';
import { formatDate } from '../../utils';

export interface Props {
  id?: string;
  name?: string;
  disabled?: boolean;
}
const popoverStyle: PopoverContentProps = {
  background: 'blue.500',
  dropShadow: 'dark-lg'
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
          type='text'
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
        <PopoverContent ref={popOverContentRef} width='100%' {...popoverStyle}>
          <PopoverArrow  bg={popoverStyle.background}/>
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
