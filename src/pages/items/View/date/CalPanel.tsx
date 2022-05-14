import * as R from 'remeda';
import {
  HStack,
  VStack,
  Heading,
  Divider,
  SimpleGrid,
  Box,
  Stack,
  Spacer,
} from '@chakra-ui/react';
import { useDayzed } from 'dayzed';

import { OnDateSelected } from './types';
import { Day } from './Day';
import { BackwardButtons, ForwardButtons } from './NavButtons';
import dayjs from 'dayjs';

const dayNames = R.pipe(
  R.range(1, 7),
  R.concat([0]),
  R.map((dayIndex) => dayjs().day(dayIndex).format('dd'))
);

const monthNames = R.pipe(
  R.range(0, 12),
  R.map((dayIndex) => dayjs().month(dayIndex).format('MMM'))
);

interface Props {
  onDateSelected: OnDateSelected;
  value: Date | string | undefined;
}

export const CalendarPanel = ({ onDateSelected, value }: Props) => {
  const { calendars, getBackProps, getForwardProps, getDateProps } = useDayzed({
    showOutsideDays: true,
    onDateSelected,
    firstDayOfWeek: 1,
    selected: new Date(value || ''),
  });

  if (calendars.length <= 0) {
    return null;
  }

  return (
    <Stack direction={['column', 'column', 'row']}>
      {calendars.map((calendar) => {
        return (
          <VStack
            key={`${calendar.month}${calendar.year}`}
            height='100%'
            borderWidth='1px'
            padding='5px 10px'
          >
            <HStack justify='space-between' w='100%'>
              <BackwardButtons
                calendars={calendars}
                propsFactory={getBackProps}
              />
              <Spacer />
              <Heading size='sm' textAlign='center'>
                {monthNames[calendar.month]} {calendar.year}
              </Heading>
              <Spacer />
              <ForwardButtons
                calendars={calendars}
                propsFactory={getForwardProps}
              />
            </HStack>
            <Divider />

            <SimpleGrid columns={7} spacing={1} textAlign='center'>
              {dayNames.map((day) => (
                <Box
                  fontSize='sm'
                  fontWeight='semibold'
                  key={`${calendar.month}${calendar.year}${day}`}
                >
                  {day}
                </Box>
              ))}
              {calendar.weeks.map((week, weekIdx) => {
                return week.map((dateObj, index) => {
                  const key = `${calendar.month}${calendar.year}${weekIdx}${index}`;

                  if (!dateObj) {
                    return <Box key={key} />;
                  }

                  return (
                    <Day
                      key={key}
                      dateObj={dateObj}
                      getDateProps={getDateProps}
                    />
                  );
                });
              })}
            </SimpleGrid>
          </VStack>
        );
      })}
    </Stack>
  );
};
