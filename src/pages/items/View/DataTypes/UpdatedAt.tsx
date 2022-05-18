import { Input } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useField } from 'formik';
import { memo } from 'react';

interface Props {
  name: string;
}

export const UpdatedAt = memo(({ name }: Props) => {
  const [field] = useField(name || '');
  return (
    <Input
      type='text'
      name={name}
      id={name}
      disabled={true}
      value={dayjs(field.value).format('YYYY/MM/DD-HH:MM')}
      focusBorderColor='brand.400'
      mt='1'
      rounded='md'
      shadow='sm'
      size='sm'
      w='full'
    />
  );
});

UpdatedAt.displayName = 'UpdatedAtField';
