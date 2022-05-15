import { Input } from '@chakra-ui/react';
import { useField } from 'formik';
import { memo } from 'react';

interface Props {
  name: string;
  disabled: boolean;
}

export const Text = memo(({ name, disabled }: Props) => {
  const [field] = useField(name || '');
  return (
    <Input
      type='string'
      name={name}
      id={name}
      disabled={disabled}
      onChange={field.onChange}
      value={field.value}
      focusBorderColor='brand.400'
      mt='1'
      rounded='md'
      shadow='sm'
      size='sm'
      w='full'
    />
  );
});
