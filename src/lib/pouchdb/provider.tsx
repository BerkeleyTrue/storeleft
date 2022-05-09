import { Context, PropsWithChildren, useMemo } from 'react';
import PouchDB from 'pouchdb';

import { PouchDbContextValue, PouchDbContext } from './context';

export interface PouchDbProviderProps {
  context?: Context<PouchDbContextValue>;
  db: InstanceType<typeof PouchDB>;
}

export const PouchDbProvider = ({
  context,
  children,
  db,
}: PropsWithChildren<PouchDbProviderProps>) => {
  const Context = context || PouchDbContext;

  const contextValue = useMemo(() => ({ db }), [db]);

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
