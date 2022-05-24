import { Unsubscribe } from '@reduxjs/toolkit';
import ReactQueryProvider from 'core/lib/react-query';
import { setupThemeListeners } from 'core/store/services/theme/listeners';
import { startAppListening, store } from 'core/store/store';
import React, { useEffect } from 'react';
import { Outlet, Router } from 'react-location';
import { ReactLocationDevtools } from 'react-location-devtools';
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
            <Router
              location={location}
              routes={routes}
            >
              <Outlet />
              <ReactLocationDevtools initialIsOpen={true} />
            </Router>
        </Provider>
      </ReactQueryProvider>
    </React.StrictMode>
);
}

export default App;
