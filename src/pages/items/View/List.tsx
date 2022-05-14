import { Union } from 'ts-toolbelt';
import { useField } from 'formik';
import { useCallback } from 'react';
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
  list: string[];
  disabled: boolean;
  name: string;
}
export const ListField = ({ list = [], disabled, name }: Props) => {
  const [field, , helpers] = useField(name || '');

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
        {list.map((list, cid) => (
          <AutoCompleteItem
            key={`option-${cid}`}
            value={list}
            textTransform='capitalize'
            _selected={{ bg: 'whiteAlpha.50' }}
            _focus={{ bg: 'whiteAlpha.100' }}
          >
            {list}
          </AutoCompleteItem>
        ))}
        <AutoCompleteCreatable />
      </AutoCompleteList>
    </AutoComplete>
  );
};
