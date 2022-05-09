import { useContext } from 'react';

import { PouchDbContext } from './context';

export const usePouchDbContext = () => {
  const contextValue = useContext(PouchDbContext);

  if (process.env.NODE_ENV !== 'production' && !contextValue) {
    throw new Error(
      'could not find PouchDb context value; please ensure the component is wrapped in a <Provider>'
    );
  }

  return contextValue;
};
