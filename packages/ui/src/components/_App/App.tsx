import { Unsubscribe } from '@reduxjs/toolkit';
import { AuthProvider } from 'core/lib/auth';
import ReactQueryProvider from 'core/lib/react-query';
import { setupThemeListeners } from 'core/store/services/theme/listeners';
import { startAppListening, store } from 'core/store/store';
import React, { useEffect } from 'react';
import { Router } from 'react-location';
import { Provider } from 'react-redux';

import { location, routes } from '../../routes';

function App (): React.ReactElement {
  useEffect(() => {
    const subscriptions: Unsubscribe[] = [
      setupThemeListeners(startAppListening)
    ];

    return () => subscriptions.forEach((unsubscribe) => unsubscribe());
  }, []);

  return (
    <React.StrictMode>
      <ReactQueryProvider>
        <Provider store={store}>
          <AuthProvider>
            <Router
              location={location}
              routes={routes}
            />
          </AuthProvider>
        </Provider>
      </ReactQueryProvider>
    </React.StrictMode>

  );
}

export default App;
