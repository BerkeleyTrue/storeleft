import { FormControl, GridItem, FormLabel } from '@chakra-ui/react';

import { PathInput } from './PathInput';
import { DatePicker } from './date';
import { ListField } from './List';
import { LibraryStatus } from './LibraryStatus';
import { UpdatedAt } from './UpdatedAt';
import { Text } from './Text';

interface Props {
  displayName: string;
  type: string;
  name: string;
  disabled: boolean;
}

export const Field = ({ displayName, type, name, disabled }: Props) => {
  return (
    <FormControl as={GridItem} colSpan={[6, 3]} key={name}>
      <FormLabel htmlFor={name} fontSize='sm' fontWeight='md' color='gray.50'>
        {displayName}
      </FormLabel>
      {type === 'string' && <Text name={name} disabled={disabled}/>}
      {type === 'updatedAt' && <UpdatedAt name={name} />}
      {type === 'path' && <PathInput name={name} disabled={disabled} />}
      {type === 'date' && (
        <DatePicker disabled={disabled} id={name} name={name} />
      )}
      {type === 'list' && <ListField disabled={disabled} name={name} />}
      {type === 'libraryStatus' && <LibraryStatus name={name} />}
    </FormControl>
  );
};
