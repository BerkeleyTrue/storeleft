import { Heading, VStack } from '@chakra-ui/react';
import { AppHead } from '../components/AppHead';

interface Props {}

const Containers = ({}: Props) => {
  return (
    <>
      <AppHead subTitle='Containers'>
        <meta name='description' content='Containers list of My Storeleft' />
      </AppHead>
      <VStack>
        <Heading>Containers</Heading>
      </VStack>
    </>
  );
}

export default Containers;
