export interface MutationResult<T> {
  data?: T;
  error?: Error;
  isFetching: boolean;
}

export type PouchDBMutationResult = MutationResult<PouchDB.Core.Response>;

export type Executor = (...args: any[]) => any;

export type UseMutationReturn<T> = [MutationResult<T>, Executor];
