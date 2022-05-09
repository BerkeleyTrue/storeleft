import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import PouchDb from 'pouchdb';

import { theme } from '../theme';
import { PouchDbProvider } from '../lib/pouchdb/provider';
import { SnackbarProvider, useSnackbar, withSnackbar } from 'notistack';
import { PouchSync } from '../components/PouchSync';

const db = new PouchDb('storeleft');

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PouchDbProvider db={db}>
          <SnackbarProvider preventDuplicate maxSnack={3}>
            <PouchSync>
              <Component {...pageProps} />
            </PouchSync>
          </SnackbarProvider>
        </PouchDbProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default App;
