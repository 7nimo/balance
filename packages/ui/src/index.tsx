import './global.scss';

import App from 'components/_App/App';
import ReactQueryProvider from 'core/lib/react-query';
import { themeActions } from 'core/store/services/theme/slice';
import { store } from 'core/store/store';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import reportWebVitals from './reportWebVitals';

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  store.dispatch(themeActions.changeColorScheme('dark'));
}

const container = document.getElementById('app');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

root.render(
  <StrictMode>
    <ReactQueryProvider>
      <App />
    </ReactQueryProvider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
