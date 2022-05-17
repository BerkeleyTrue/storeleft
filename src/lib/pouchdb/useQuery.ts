import { useCallback } from 'react';
import useSWR from 'swr';
import { PublicConfiguration, BareFetcher } from 'swr/dist/types';

import { usePouchDbContext } from './useContext';

type FetcherResponse<Results> = PouchDB.Query.Response<Results>

export interface UseQueryOptions<Model, Results> {
  fun: string;
  pouchdbOptions?: PouchDB.Query.Options<Model, Results>;
  shouldPause?: boolean;
  swrOptions?: Partial<
    PublicConfiguration<
      FetcherResponse<Results>,
      any,
      BareFetcher<FetcherResponse<Results>>
    >
  >;
}

export const useQuery = <Results, Model = {}>({
  fun,
  shouldPause,
  pouchdbOptions,
  swrOptions,
}: UseQueryOptions<Model, Results>) => {
  const { db } = usePouchDbContext();

  const fetcher = useCallback(() => {
    return db.query<Results, Model>(fun, pouchdbOptions);
  }, [db]);

  return useSWR<PouchDB.Query.Response<Results>>(
    shouldPause ? null : ['query', fun],
    fetcher,
    swrOptions,
  );
};
