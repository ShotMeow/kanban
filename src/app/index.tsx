import React, { type FC } from 'react';
import { RouterProvider } from 'react-router-dom';

import { router } from '@/shared/libs/react-router-dom';
import { colorSchemeInitialize } from '@/features/ColorScheme/utils';

colorSchemeInitialize();

export const App: FC = () => {
  return <RouterProvider router={router} />;
};
