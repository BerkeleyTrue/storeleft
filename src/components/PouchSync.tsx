import { useToast } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { useAppEffect } from '../lib/hooks/use-app-effect';

import { usePouchDbContext } from '../lib/pouchdb/useContext';

export const PouchSync = ({ children }: PropsWithChildren<{}>) => {
  const toast = useToast();
  const { db } = usePouchDbContext();

  useAppEffect(() => {
    const remoteUrl = `${window.location.origin}/api/db/storedown`;
    toast({
      title: 'Syncing db...',
      variant: 'info',
    });

    db.replicate.from(remoteUrl).on('complete', () => {
      toast({
        title: 'initial replicate complete.',
        variant: 'success',
      });
    });
  }, [db]);

  return <>{children}</>;
};
