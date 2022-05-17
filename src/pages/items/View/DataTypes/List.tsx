import { Union } from 'ts-toolbelt';
import { useField } from 'formik';
import { useCallback, useMemo, useState } from 'react';
import {
  AutoComplete,
  AutoCompleteCreatable,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteTag,
} from '@choc-ui/chakra-autocomplete';
import { useQuery } from '../../../../lib/pouchdb/useQuery';

type OnChange = Union.NonNullable<
  Parameters<typeof AutoComplete>[0]['onChange']
>;

interface Props {
  disabled: boolean;
  name: string;
}

export const ListField = ({ disabled, name }: Props) => {
  const [field, , helpers] = useField(name || '');
  const tagsResponse = useQuery<string[]>({ fun: 'storeleft/tags' });

  const list = useMemo<string[]>(() => {
    return (tagsResponse?.data?.rows?.[0]?.value || ([] as string[])).sort();
  }, [tagsResponse.data]);

  const handleChange = useCallback<OnChange>(
    (values) => {
      helpers.setValue(values);
    },
    [helpers],
  );

  return (
    <AutoComplete
      openOnFocus
      multiple
      creatable
      onChange={handleChange}
      onBlur={field.onBlur}
      value={field.value}
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
