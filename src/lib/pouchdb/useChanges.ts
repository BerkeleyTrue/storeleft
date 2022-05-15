import { useCallback, useEffect } from 'react';
import { usePouchDbContext } from './useContext';

export interface UseChangesOptions<Content extends {}> {
  /**
   * Whether to start listening or to stop listening if already started
   */
  shouldPause: boolean;
  changesOptions?: PouchDB.Core.ChangesOptions;
  onChange: (value: PouchDB.Core.ChangesResponseChange<Content>) => any;
  onComplete?: (value: PouchDB.Core.ChangesResponse<Content>) => any;
  onError?: (error: any) => any;
}
export const useChanges = <Content>({
  shouldPause,
  onChange,
  onError,
  onComplete,
  changesOptions,
}: UseChangesOptions<Content>) => {
  const { db } = usePouchDbContext();

  useEffect(() => {
    if (shouldPause) {
      return;
    }
    const changes = db
      .changes<Content>({
        live: true,
        since: 'now',
        include_docs: true,
        ...changesOptions,
      })
      .on('change', onChange);

    if (onError) {
      changes.on('error', onError);
    }

    if (onComplete) {
      changes.on('complete', onComplete);
    }

    return () => {
      changes.cancel();
    };
  }, [db, shouldPause, onChange, onError, onComplete, changesOptions]);
};
