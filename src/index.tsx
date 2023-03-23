import React from 'react';
import ReactDOM from 'react-dom/client';

import { PersistGate } from 'redux-persist/integration/react';

import './app/styles/globals.scss';

import { initializeAPI } from '@/shared/libs/firebase';
import { AuthContextProvider } from '@/features/Authorize/providers';
import { Provider } from 'react-redux';
import { persistor, store } from '@/app/store';
import { App } from '@/app';

const firebaseApp = initializeAPI();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading="null">
      <AuthContextProvider firebaseApp={firebaseApp}>
        <App />
      </AuthContextProvider>
    </PersistGate>
  </Provider>
);
