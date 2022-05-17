import * as R from 'remeda';
import { Union } from 'ts-toolbelt';
import { Input } from '@chakra-ui/react';
import { useField } from 'formik';
import { useCallback, useMemo } from 'react';

import {
  AutoComplete,
  AutoCompleteCreatable,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteTag,
} from '@choc-ui/chakra-autocomplete';

import { useQuery } from '../../../../lib/pouchdb/useQuery';

type Paths = [string[]];

type OnChange = Union.NonNullable<
  Parameters<typeof AutoComplete>[0]['onChange']
>;

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

  const handleChange = useCallback<OnChange>(
    (values) => {
      helpers.setValue(values.join('/'));
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
    return pathTree?.[value.length] || [];
  }, [queryResponse.data, value]);

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
      <AutoCompleteInput id={name} name={name} disabled={disabled}>
        {({ tags }) =>
          tags.map((tag) => (
            <AutoCompleteTag
              key={tag.label}
              label={tag.label}
              onRemove={tag.onRemove}
            />
          ))
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
