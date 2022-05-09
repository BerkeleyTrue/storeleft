import React from 'react';
import { AppProps } from 'next/app';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import PouchDb from 'pouchdb';

import { theme } from '../theme';
import { PouchDbProvider } from '../lib/pouchdb/provider';

const db = new PouchDb('storeleft');

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PouchDbProvider db={db}>
          <Component {...pageProps} />
        </PouchDbProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default App;
