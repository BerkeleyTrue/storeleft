import { Union } from 'ts-toolbelt';
import { useField } from 'formik';
import { useCallback, useState } from 'react';
import {
  AutoComplete,
  AutoCompleteCreatable,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteTag,
} from '@choc-ui/chakra-autocomplete';

type OnChange = Union.NonNullable<
  Parameters<typeof AutoComplete>[0]['onChange']
>;

interface Props {
  disabled: boolean;
  name: string;
}
export const ListField = ({ disabled, name }: Props) => {
  const [field, , helpers] = useField(name || '');
  const [list]= useState([]);

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
            key={`option-${cid}`}
            value={listItem}
            textTransform='capitalize'
            _selected={{ bg: 'whiteAlpha.50' }}
            _focus={{ bg: 'whiteAlpha.100' }}
          >
            {listItem}
          </AutoCompleteItem>
        ))}
        <AutoCompleteCreatable />
      </AutoCompleteList>
    </AutoComplete>
  );
};
