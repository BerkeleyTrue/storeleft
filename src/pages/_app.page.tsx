import { StrictMode } from 'react';
import { AppProps } from 'next/app';
import PouchDb from 'pouchdb';
import { ChakraProvider } from '@chakra-ui/react';

import { Layout } from './Layout';
import { theme } from '../theme';
import { PouchSync } from '../components/PouchSync';
import { Fonts } from '../components/Fonts';
import { PouchDbProvider } from '../lib/pouchdb/provider';

const db = new PouchDb(process.env.NEXT_PUBLIC_COUCHDB_DB || 'storeleft');

if (typeof window === 'object') {
  (window as any).__DB__ = db;
}

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <StrictMode>
      <Fonts />
      <ChakraProvider theme={theme}>
        <PouchDbProvider db={db}>
          <PouchSync>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </PouchSync>
        </PouchDbProvider>
      </ChakraProvider>
    </StrictMode>
  );
};

export default App;
