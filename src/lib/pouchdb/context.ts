import React from 'react';

export interface PouchDbContextValue {
  db: InstanceType<typeof PouchDB>;
}

export const PouchDbContext = React.createContext<PouchDbContextValue>(
  null as any
);

export type PouchDbContextInstance = typeof PouchDbContext;

if (process.env.NODE_ENV !== 'production') {
  PouchDbContext.displayName = 'PouchDb';
}
