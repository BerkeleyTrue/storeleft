import { Input } from '@chakra-ui/react';

import { FormikReturnType } from './types';


interface Props {
  name: string;
  type: string;
  onChange: FormikReturnType['handleChange'];
  value?: string;
  disabled: boolean;
}

/**
 * Add an input for a path type
 * TODO: add aliases and autocomplete
 */
export const PathInput = ({
  name,
  type,
  onChange,
  value,
  disabled,
}: Props) => {
  return (
    <Input
      id={name}
      type={type}
      name={name}
      disabled={disabled}
      onChange={onChange}
      value={value}
      mt='1'
      focusBorderColor='brand.400'
      shadow='sm'
      size='sm'
      w='full'
      rounded='md'
    />
  );
};
