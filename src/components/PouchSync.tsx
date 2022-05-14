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
      status: 'info',
      variant: 'solid',
    });

    db.replicate.from(remoteUrl).on('complete', () => {
      toast({
        title: 'initial replicate complete.',
        status: 'success',
        variant: 'solid',
      });
    });
  }, [db]);

  return <>{children}</>;
};
