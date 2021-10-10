import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ReactQueryProvider } from './lib/react-query';
import { AuthProvider } from './lib/auth';

ReactDOM.render(
  <React.StrictMode>
    <ReactQueryProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ReactQueryProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
