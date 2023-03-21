import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@/app/layouts/Layout/ui/Layout';
import { HomePage } from '@/pages/Home';
import { AuthorizePage } from '@/pages/Authorize';
import { PrivateRoute } from '@/shared/libs/react-router-dom/ui/PrivateRoute';

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
]);
