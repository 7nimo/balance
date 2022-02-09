import './index.scss';

import ReactQueryProvider from '@core/lib/react-query';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <ReactQueryProvider>
      <App />
    </ReactQueryProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
