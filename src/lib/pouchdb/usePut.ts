import { useCallback, useState } from 'react';

import { usePouchDbContext } from './useContext';
import { PouchDBMutationResult, UseMutationReturn } from './types';

export interface UsePutOptions<T> {
  doc: PouchDB.Core.PutDocument<T>;
}

/**
 * Update a document
 */
export const usePut = <Model>(): UseMutationReturn<PouchDB.Core.Response> => {
  const { db } = usePouchDbContext();
  const [operationResult, setOperationResult] = useState<PouchDBMutationResult>(
    {
      isFetching: false,
    },
  );

  const mutate = useCallback(
    async ({ doc }: UsePutOptions<Model>) => {
      setOperationResult({
        isFetching: true,
      });
      return db
        .put<Model>(doc)
        .then((data) => {
          const res = {
            data,
            isFetching: false,
          };
          setOperationResult(res);
          return res;
        })
        .catch((error) => {
          const res = {
            isFetching: false,
            error,
          };
          setOperationResult(res);
          return res;
        });
    },
    [db],
  );

  return [operationResult, mutate];
};
