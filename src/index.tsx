import React from 'react';
import ReactDOM from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import './app/styles/globals.scss';

import { initializeAPI } from '@/shared/libs/firebase';
import { AuthContextProvider } from '@/features/Authorize/provider';
import { persistor, store } from '@/app/store';
import { App } from '@/app';
import { NotificationContextProvider } from '@/features/Notification';

const firebaseApp = initializeAPI();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading="null">
      <AuthContextProvider firebaseApp={firebaseApp}>
        <NotificationContextProvider>
          <App />
        </NotificationContextProvider>
      </AuthContextProvider>
    </PersistGate>
  </Provider>
);
