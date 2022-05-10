import { useCallback } from 'react';
import useSWR, { SWRResponse } from 'swr';
import { usePouchDbContext } from './useContext';

export interface UseAllDocsOptions {
  query: PouchDB.Core.AllDocsOptions;
}

export const useAllDocs = ({
  query: { limit, skip, include_docs, ...rest },
}: UseAllDocsOptions): SWRResponse<PouchDB.Core.AllDocsResponse<{}>> => {

  const { db } = usePouchDbContext();

  const allDocsFetcher = useCallback(() => {
    return db.allDocs({ skip, limit, include_docs, ...rest });
  }, [db]);

  return useSWR(['allDocs', limit, skip, include_docs], allDocsFetcher);
};
