import { FormControl, GridItem, FormLabel } from '@chakra-ui/react';

import { PathInput } from './DataTypes/PathInput';
import { DatePicker } from './DataTypes/date';
import { ListField } from './DataTypes/List';
import { LibraryStatus } from './DataTypes/LibraryStatus';
import { UpdatedAt } from './DataTypes/UpdatedAt';
import { Text } from './DataTypes/Text';

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
      {type === 'string' && <Text name={name} disabled={disabled} />}
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
