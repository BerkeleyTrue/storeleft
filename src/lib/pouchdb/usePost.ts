import { useCallback, useState } from 'react';

import { usePouchDbContext } from './useContext';
import { PouchDBMutationResult, UseMutationReturn } from './types';

export interface UsePostOptions<T> {
  doc: PouchDB.Core.PostDocument<T>;
}
/**
 * Update a document
 */
export const usePost = <Model>(): UseMutationReturn<PouchDB.Core.Response> => {
  const { db } = usePouchDbContext();
  const [operationResult, setOperationResult] = useState<PouchDBMutationResult>(
    {
      isFetching: false,
    },
  );

  const mutate = useCallback(
    async ({ doc }: UsePostOptions<Model>): Promise<PouchDBMutationResult> => {
      setOperationResult({
        isFetching: true,
      });

      return db
        .post<Model>(doc)
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
