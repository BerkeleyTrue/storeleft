import { Input } from '@chakra-ui/react';
import { useField } from 'formik';

interface Props {
  name: string;
  value?: string;
  disabled: boolean;
}

/**
 * Add an input for a path type
 * TODO: add aliases and autocomplete
 */
export const PathInput = ({
  name,
  disabled,
}: Props) => {

  const [field] = useField(name || '');

  return (
    <Input
      id={name}
      type='text'
      name={name}
      disabled={disabled}
      onChange={field.onChange}
      value={field.value}
      mt='1'
      focusBorderColor='brand.400'
      shadow='sm'
      size='sm'
      w='full'
      rounded='md'
    />
  );
};
