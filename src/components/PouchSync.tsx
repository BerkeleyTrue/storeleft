import { PropsWithChildren, useEffect } from 'react';
import { useSnackbar } from 'notistack';

import { usePouchDbContext } from '../lib/pouchdb/useContext';
import { Collapse } from '@mui/material';

export const PouchSync = ({ children }: PropsWithChildren<{}>) => {

  const { enqueueSnackbar } = useSnackbar();
  const { db } = usePouchDbContext();

  useEffect(() => {
    const remoteUrl = `${window.location.origin}/api/db/storedown`;
    enqueueSnackbar('Syncing db...', {
      variant: 'info',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
      TransitionComponent: Collapse,
    });

    db.replicate.from(remoteUrl).on('complete', () => {
      enqueueSnackbar('initial replicate complete.', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
        TransitionComponent: Collapse,
      });
    });
  }, [enqueueSnackbar]);

  return <>{children}</>;
};
