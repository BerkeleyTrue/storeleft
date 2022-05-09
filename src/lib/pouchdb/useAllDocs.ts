import { useCallback, useEffect, useMemo, useState } from 'react';
import { OperationResult } from './types';
import { usePouchDbContext } from './useContext';
import { initialState, computeNextState, hasDepsChanged } from './utils/state';

export interface AllDocsQuery {
  limit: number;
  skip: number;
}

export interface UseAllDocsOptions {
  query: AllDocsQuery;
  pause?: boolean;
}

let currentInit = false;

const runQuery = (query: AllDocsQuery, db: InstanceType<typeof PouchDB>) =>
  db
    .allDocs(query)
    .then(
      (data) =>
        ({
          ...initialState,
          data,
          isFetching: false,
          error: undefined,
        } as OperationResult)
    )
    .catch(
      (error) =>
        ({
          ...initialState,
          isFetching: false,
          data: null,
          error,
        } as OperationResult)
    );

export const useAllDocs = ({
  query,
  pause,
}: UseAllDocsOptions): [OperationResult, Function] => {
  const { db } = usePouchDbContext();

  // memo allDocs request
  const source = useMemo((): Promise<OperationResult> | null => {
    if (pause) {
      return null;
    }

    return runQuery(query, db);
  }, [db, query.limit, query.skip, pause]);

  const getSnapshot = useCallback(
    (source: Promise<OperationResult> | null): Partial<OperationResult> => {
      return { isFetching: !!source };
    },
    [query.limit, query.skip]
  );

  const deps = [db, query.limit, query.skip, pause] as const;

  const [state, setState] = useState(() => {
    currentInit = true;
    try {
      return [
        source,
        computeNextState(initialState, getSnapshot(source)),
        deps,
      ] as const;
    } finally {
      currentInit = false;
    }
  });

  let currentResult = state[1];

  if (source !== state[0] && hasDepsChanged(state[2], deps)) {
    setState([
      source,
      (currentResult = computeNextState(state[1], getSnapshot(source))),
      deps,
    ]);
  }

  useEffect(() => {
    const source = state[0];

    let hasResult = false;

    const updateResult = (result: Partial<OperationResult>) => {
      hasResult = true;

      if (!currentInit) {
        setState((state) => {
          const nextResult = computeNextState(state[1], result);
          return state[1] !== nextResult
            ? [state[0], nextResult, state[2]]
            : state;
        });
      }
    };

    if (source) {
      source.then(updateResult).finally(() => {
        updateResult({ isFetching: false });
      });

      if (!hasResult) {
        updateResult({ isFetching: true });
      }
    } else {
      updateResult({ isFetching: false });
    }
  }, [state[0], state[2][1], state[2][2]]);

  const reExectute = useCallback(
    (query: UseAllDocsOptions['query']) => {
      setState((state) => {
        const source = runQuery(query, db);
        return [source, state[1], deps];
      });
    },
    [db, query.limit, query.skip, getSnapshot]
  );
  return [currentResult, reExectute];
};
