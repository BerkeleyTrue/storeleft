import { useCallback } from 'react';
import useSWR from 'swr';
import { PublicConfiguration, BareFetcher } from 'swr/dist/types';
import { O } from 'ts-toolbelt';

import { usePouchDbContext } from './useContext';

type FetcherResponse<Model> = Model &
  PouchDB.Core.IdMeta &
  PouchDB.Core.GetMeta;

export interface UseGetOptions<Model> {
  query: O.Merge<PouchDB.Core.GetOptions, { docId: string }>;
  shouldPause?: boolean;
  swrOptions?: Partial<
    PublicConfiguration<
      FetcherResponse<Model>,
      any,
      BareFetcher<FetcherResponse<Model>>
    >
  >;
}

export const useGet = <Model>({
  shouldPause,
  query: { docId, ...rest },
  swrOptions,
}: UseGetOptions<Model>) => {
  const { db } = usePouchDbContext();

  const fetcher = useCallback(() => {
    return db.get<Model>(docId, { ...rest });
  }, [db]);

  return useSWR<FetcherResponse<Model>>(
    shouldPause ? null : ['get', docId],
    fetcher,
    swrOptions,
  );
};
