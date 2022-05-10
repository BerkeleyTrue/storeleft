import { useCallback } from 'react';
import useSWR, { SWRResponse } from 'swr';
import { usePouchDbContext } from './useContext';

export interface AllDocsQuery {
  limit: number;
  skip: number;
  include_docs: boolean;
}

export interface UseAllDocsOptions {
  query: AllDocsQuery;
}

export const useAllDocs = ({
  query: { limit, skip, include_docs },
}: UseAllDocsOptions): SWRResponse<PouchDB.Core.AllDocsResponse<{}>> => {

  const { db } = usePouchDbContext();

  const allDocsFetcher = useCallback(() => {
    return db.allDocs({ skip, limit, include_docs });
  }, [db]);

  return useSWR(['allDocs', limit, skip, include_docs], allDocsFetcher);
};
