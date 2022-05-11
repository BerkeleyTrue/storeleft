import React from 'react';
import { AppProps } from 'next/app';
import PouchDb from 'pouchdb';
import { ChakraProvider } from '@chakra-ui/react';

import { theme } from '../theme';
import { PouchSync } from '../components/PouchSync';
import { Fonts } from '../components/Fonts';
import { PouchDbProvider } from '../lib/pouchdb/provider';

const db = new PouchDb('storeleft');

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <React.StrictMode>
      <Fonts />
      <ChakraProvider theme={theme}>
        <PouchDbProvider db={db}>
          <PouchSync>
            <Component {...pageProps} />
          </PouchSync>
        </PouchDbProvider>
      </ChakraProvider>
    </React.StrictMode>
  );
};

export default App;
