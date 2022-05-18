import * as R from 'remeda';
import { Union } from 'ts-toolbelt';
import { useCallback } from 'react';
import { FormLabel, HStack, Text, Switch, VStack } from '@chakra-ui/react';
import { useField } from 'formik';

import { formatDate } from '../utils';
import { TLibraryStatus, TLibraryStatusEvents } from '../../../../model/model';
import { defaultTo } from '../../../../lib/remeda/defaultTo';

type OnChange = Union.NonNullable<Parameters<typeof Switch>[0]['onChange']>;

interface Props {
  name: string;
}

export const LibraryStatus = ({ name }: Props) => {
  const [field, meta, helpers] = useField<TLibraryStatus>(name || '');

  const isCheckedIn = field?.value?.status || false;

  const events: TLibraryStatusEvents = field?.value?.events || [];

  const handleChange = useCallback<OnChange>(({ target: { checked } }) => {
    helpers.setValue({
      status: checked,
      events: R.pipe(
        meta.initialValue,
        defaultTo<TLibraryStatus>({ status: false, events: [] }),
        R.prop('events'),
        defaultTo<TLibraryStatusEvents>([]),
        R.concat([
          {
            checkIn: checked,
            date: new Date().toISOString(),
            user: 'Anon',
          },
        ]),
      ),
    });
  }, [helpers, meta.initialValue]);

  return (
    <VStack justify='stretch'>
      <HStack w='100%'>
        <FormLabel htmlFor={name}>
          {name}: {isCheckedIn ? 'checked in' : 'checked out'}
        </FormLabel>
        <Switch
          id={name}
          {...field}
          checked={isCheckedIn}
          onChange={handleChange}
          value={undefined}
        />
      </HStack>
      {events.map(({ date, checkIn, user }) => (
        <HStack key={formatDate(date)} w='100%' pl='2'>
          <Text>- {checkIn ? 'In' : 'out'}({user}): </Text>
          <Text>{formatDate(date)}</Text>
        </HStack>
      ))}
    </VStack>
  );
};
