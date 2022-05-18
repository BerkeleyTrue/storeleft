import { useCallback } from 'react';
import useSWR, { SWRResponse } from 'swr';
import { useChanges } from './useChanges';
import { usePouchDbContext } from './useContext';

export interface UseAllDocsOptions {
  /**
   * Listen for updates through the changes api in addition to SWR updating
   */
  isLive?: boolean;
  query: PouchDB.Core.AllDocsOptions;
}

export const useAllDocs = ({
  isLive = false,
  query: { limit, skip, include_docs, ...rest },
}: UseAllDocsOptions): SWRResponse<PouchDB.Core.AllDocsResponse<{}>> => {

  const { db } = usePouchDbContext();

  const allDocsFetcher = useCallback(() => {
    return db.allDocs({ skip, limit, include_docs, ...rest });
  }, [db, skip, limit, include_docs, rest]);

  const res = useSWR(['allDocs', limit, skip, include_docs], allDocsFetcher);

  useChanges({
    shouldPause: !isLive,
    onChange: () => {
      res.mutate();
    },
  });

  return res;
};
