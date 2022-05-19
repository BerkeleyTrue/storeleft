import { useToast } from '@chakra-ui/react';
import { PropsWithChildren, useEffect, useState } from 'react';
import { useAppEffect } from '../lib/hooks/use-app-effect';

import { usePouchDbContext } from '../lib/pouchdb/useContext';

const dbName = process.env.NEXT_PUBLIC_COUCHDB_DB_REMOTE || process.env.NEXT_PUBLIC_COUCHDB_DB || 'storeleft';

const getRemoteUrl = () => `${window.location.origin}/api/db/${dbName}`;

const ddoc = {
  _id: '_design/storeleft',
  views: {
    tags: {
      map: 'function (doc) { if (doc.tags) {\n    emit(doc._id, doc.tags);\n  }\n}',
      reduce:
        'function (keys, values, rereduce) {\n\n  return [...new Set(values.reduce((acc, tags) => acc.concat(tags), []))];\n}',
    },
    containers: {
      map: "function (doc) {\n  if (!doc.location) {\n    return;\n  }\n  let paths = doc.location.split('/');\n  if (!paths[0] && paths[1]) {\n    paths = paths.splice(1);\n  }\n  emit(doc._id, paths);\n}",
      reduce:
        'function (keys, values, rereduce) {\n  const flatten = arr => [].concat(...arr);\n  const zip = (...arr) => Array(Math.max(...arr.map(a => a.length))).fill().map((_,i) => arr.map(a => a[i]));  \n  if (rereduce) {\n    const paths =  zip(...values);\n    return paths.map((level) => [...new Set(flatten(level)) ]);\n    //return values;\n  } else {\n  \n    return zip(...values);\n  }\n}',
    },
  },
};
export const PouchSync = ({ children }: PropsWithChildren<{}>) => {
  const toast = useToast();
  const { db } = usePouchDbContext();
  const [hasSynced, setHasSynced] = useState(false);

  useAppEffect(() => {
    const remoteUrl = getRemoteUrl();
    console.log(`Syncing local '${db.name}' to remote '${dbName}'...`);

    const syncSubscription = db.replicate.from(remoteUrl).on('complete', () => {
      toast({
        title: 'initial replicate complete.',
        status: 'success',
        variant: 'solid',
        isClosable: true,
        position: 'bottom',
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
      .then(({ id, rev}) => {
        console.log(`Index saved: ${id} ${rev}`);
      })
      .catch((err) => {
        if (err.name !== 'conflict') {
          toast({
            title: 'Indexing failed...',
            status: 'error',
            variant: 'solid',
            description: `Failed to add index: ${err.message}`,
            isClosable: true,
          });
        }
      })
  }, [db, hasSynced, toast]);

  return <>{children}</>;
};
