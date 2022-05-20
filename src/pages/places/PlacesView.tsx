import * as R from 'remeda';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Box,
  Divider,
  Flex,
  Text,
  Heading,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  VStack,
  UnorderedList,
  ListItem,
  Button,
  Spinner,
  AlertDescription,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';

import { useAllDocs } from '../../lib/pouchdb';
import { TBaseSchema } from '../../model/model';
import { locationsToTree, Node, isNode, findByName } from './utils/place-tree';

const SubPath = ({
  name,
  setName,
}: {
  name: string;
  setName: (name: string) => void;
}) => {
  const handleClick = useCallback(() => {
    setName(name);
  }, [setName, name]);

  return (
    <ListItem pb='4' display='flex' justifyContent='center'>
      <Button px='4' variant='ghost' w='80%' onClick={handleClick}>
        <Text>{name}</Text>
      </Button>
    </ListItem>
  );
};

interface Props {}

export const PlacesView = ({}: Props) => {
  const allDocsRes = useAllDocs<TBaseSchema>({ query: { include_docs: true } });
  const [currNode, setName] = useState<string | void>();

  const tree = useMemo<Node | Node[] | void>(() => {
    if (!allDocsRes.data) {
      return;
    }
    return R.pipe(
      allDocsRes.data.rows,
      R.map(R.prop('doc')),
      R.compact,
      locationsToTree,
    );
  }, [allDocsRes.data]);

  const node = useMemo<Node | void>(() => {
    if (!tree) {
      return;
    }
    if (currNode) {
      return findByName(isNode(tree) ? tree : tree[0], currNode);
    }

    return isNode(tree) ? tree : tree[0];
  }, [tree, currNode]);

  const handleClickOnParent = useCallback(() => {
    setName(node?.parentName);
  }, [setName, node?.parentName]);

  if (!allDocsRes.data) {
    return (
      <VStack>
        <Spinner />
      </VStack>
    );
  }

  return (
    <VStack w='100%' justify='stretch' spacing='8'>
      {}
      <Heading>Path: {node?.name || currNode || 'Not Found'}</Heading>

      {node ? (
        <>
          <StatGroup w='80%'>
            <Stat as='button' onClick={handleClickOnParent}>
              <StatLabel>Located In</StatLabel>
              <StatNumber>{node.parentName}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Num of Items</StatLabel>
              <StatNumber>{node.items}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Num of Places</StatLabel>
              <StatNumber>{node.children.length}</StatNumber>
            </Stat>
          </StatGroup>

          <Divider />
          <UnorderedList listStyleType='none' w='100%'>
            {node.children.map(({ name }) => (
              <SubPath key={name} name={name} setName={setName} />
            ))}
          </UnorderedList>
        </>
      ) : (
        <Alert status='info'>
          <AlertIcon />
          <AlertDescription>Can not find stats</AlertDescription>
        </Alert>
      )}
    </VStack>
  );
};
