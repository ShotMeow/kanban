import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@/app/layouts/Layout/ui/Layout';
import { HomePage } from '@/pages/Home';
import { AuthorizePage } from '@/pages/Authorize';
import { PrivateRoute } from '@/features/Authorize/ui/PrivateRoute';
import { NotFoundPage } from '@/pages/NotFound';

export const router = createBrowserRouter([
  {
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
    path: '/*',
    element: <NotFoundPage />,
  },
]);
