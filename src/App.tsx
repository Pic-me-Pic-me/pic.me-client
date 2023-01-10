import './styles/globalFont.css';

import React from 'react';
import { ThemeProvider } from 'styled-components';

import Router from './components/common/Router';
import GlobalStyle from './styles/globalStyle';
import theme from './styles/theme';

const App = () => (
  <>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  </>
);

export default App;
