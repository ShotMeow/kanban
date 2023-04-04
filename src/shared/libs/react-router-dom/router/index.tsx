import { createBrowserRouter } from 'react-router-dom';

import { Layout } from '@/app/layouts/ui/Layout';

import { HomePage } from '@/pages/Home';
import { AuthorizePage } from '@/pages/Authorize';
import { NotFoundPage } from '@/pages/NotFound';

import { PrivateRoute } from '@/features/Authorize';

export const router = createBrowserRouter([
  {
    index: true,
    path: '/',
    element: (
      <PrivateRoute>
        <Layout>
          <HomePage />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: '/authorize',
    element: <AuthorizePage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
