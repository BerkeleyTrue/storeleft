import { useCallback } from 'react';
import useSWR from 'swr';
import { O } from 'ts-toolbelt';

import { usePouchDbContext } from './useContext';

export interface UseGetOptions {
  query: O.Merge<PouchDB.Core.GetOptions, { docId: string }>;
}

export const useGet = <Model>({ query: { docId, ...rest } }: UseGetOptions) => {
  const { db } = usePouchDbContext();

  const fetcher = useCallback(() => {
    return db.get<Model>(docId, { ...rest });
  }, [db]);

  return useSWR(['get', docId], fetcher);
};
