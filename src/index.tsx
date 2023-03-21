import React from 'react';
import ReactDOM from 'react-dom/client';

import { RouterProvider } from 'react-router-dom';
import { router } from '@/shared/libs/react-router-dom';

import './app/styles/globals.scss';

import { initializeAPI } from '@/shared/libs/firebase';
import { AuthContextProvider } from '@/features/Authorize/providers';

const firebaseApp = initializeAPI();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AuthContextProvider firebaseApp={firebaseApp}>
    <RouterProvider router={router} />
  </AuthContextProvider>
);
