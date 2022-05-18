import * as R from 'remeda';
import { Union } from 'ts-toolbelt';
import { useField } from 'formik';
import { useCallback, useMemo, useState } from 'react';

import {
  AutoComplete,
  AutoCompleteCreatable,
  AutoCompleteInput,
  AutoCompleteInputProps,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteProps,
  UseAutoCompleteReturn,
} from '@choc-ui/chakra-autocomplete';

import { useQuery } from '../../../../lib/pouchdb/useQuery';
import { useBoolean } from '@chakra-ui/hooks';

type Paths = [string[]];

type OnChange = Union.NonNullable<AutoCompleteProps['onChange']>;

interface Props {
  name: string;
  value?: string;
  disabled: boolean;
}

/**
 * Add an input for a path type
 * TODO: add aliases and autocomplete
 */
export const PathInput = ({ name, disabled }: Props) => {
  const [field, , helpers] = useField<string>(name || '');
  const queryResponse = useQuery<Paths>({ fun: 'storeleft/containers' });
  const [hasQuery, setQuery] = useBoolean(false);

  const handleChange = useCallback<OnChange>(
    (values) => {
      helpers.setValue(values.join('/'));
      setQuery.off();
    },
    [helpers],
  );
  const value = useMemo<string[]>(() => {
    const paths = field.value.split('/');
    if (!paths[0]) {
      return paths.slice(1);
    }
    return paths;
  }, [field.value]);

  const list = useMemo<string[]>(() => {
    const pathTree: Paths =
      queryResponse?.data?.rows?.[0]?.value || ([] as string[]);
    return R.uniq(pathTree?.[value.length] || []);
  }, [queryResponse.data, value]);

  const handleKeyDown = useCallback<
    NonNullable<AutoCompleteInputProps['onKeyDown']>
  >(
    ({ key }) => {
      if (!hasQuery && (key === 'Delete' || key === 'Backspace')) {
        helpers.setValue(R.dropLast(value, 1).join('/'));
      }
    },
    [helpers.setValue, value],
  );

  const handleInputChange = useCallback<
    NonNullable<AutoCompleteInputProps['onChange']>
  >(
    ({ target: { value } }) => {
      if (value) {
        setQuery.on();
      } else {
        setQuery.off();
      }
    },
    [setQuery],
  );

  return (
    <AutoComplete
      openOnFocus
      multiple
      creatable
      onChange={handleChange}
      onBlur={field.onBlur}
      value={value}
      listAllValuesOnFocus
    >
      <AutoCompleteInput
        id={name}
        name={name}
        disabled={disabled}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
      >
        {({ tags }: { tags: UseAutoCompleteReturn['tags'] }) =>
          tags.map(({ label }) => label).join('/')
        }
      </AutoCompleteInput>
      <AutoCompleteList>
        {list.map((listItem, cid) => (
          <AutoCompleteItem
            key={`option-${listItem}-${cid}`}
            value={listItem}
            _selected={{ bg: 'whiteAlpha.200' }}
            _focus={{ bg: 'whiteAlpha.100' }}
            _hover={{ bg: 'cyan' }}
          >
            {listItem}
          </AutoCompleteItem>
        ))}
      </AutoCompleteList>
    </AutoComplete>
  );
};
