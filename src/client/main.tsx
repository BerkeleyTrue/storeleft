import React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import App from './App';
import './index.css';
import theme from './theme';

const element = document.getElementById('root');

ReactDOM.createRoot(element!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
    </ThemeProvider>
    <App />
  </React.StrictMode>
);
