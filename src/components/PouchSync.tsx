import { useToast } from '@chakra-ui/react';
import { PropsWithChildren, useEffect, useState } from 'react';
import { useAppEffect } from '../lib/hooks/use-app-effect';

import { usePouchDbContext } from '../lib/pouchdb/useContext';

const getRemoteUrl = () => `${window.location.origin}/api/db/storedown`;

const ddoc = {
  _id: '_design/storeleft',
  views: {
    tags: {
      map: `function (doc) { if (doc.tags) {\n    emit(doc._id, doc.tags);\n  }\n}`,
      reduce:
        'function (keys, values, rereduce) {\n\n  return [...new Set(values.reduce((acc, tags) => acc.concat(tags), []))];\n}',
    },
  },
};
export const PouchSync = ({ children }: PropsWithChildren<{}>) => {
  const toast = useToast();
  const { db } = usePouchDbContext();
  const [hasSynced, setHasSynced] = useState(false);

  useAppEffect(() => {
    const remoteUrl = getRemoteUrl();
    toast({
      title: 'Syncing db...',
      status: 'info',
      variant: 'solid',
    });

    const syncSubscription = db.replicate.from(remoteUrl).on('complete', () => {
      toast({
        title: 'initial replicate complete.',
        status: 'success',
        variant: 'solid',
      });
      setHasSynced(true);
    });

    return () => {
      syncSubscription.cancel();
    };
  }, [db]);

  useEffect(() => {
    const remoteUrl = getRemoteUrl();
    let syncSubscription: PouchDB.Replication.Sync<{}>;

    if (hasSynced) {
      syncSubscription = db.sync(remoteUrl, { live: true, retry: true });
    }

    return () => {
      if (syncSubscription) {
        syncSubscription.cancel();
      }
    };
  }, [db, hasSynced]);

  useEffect(() => {
    db.put(ddoc)
      .catch((err) => {
        if (err.name !== 'conflict') {
          toast({
            title: 'Indexing failed...',
            status: 'error',
            variant: 'solid',
            description: `Failed to add index: ${err.message}`,
          });
        }
      })
      .then(() => {
        toast({
          title: 'Index saved',
          status: 'info',
          variant: 'solid',
        });
      });
  }, [db, hasSynced]);

  return <>{children}</>;
};
