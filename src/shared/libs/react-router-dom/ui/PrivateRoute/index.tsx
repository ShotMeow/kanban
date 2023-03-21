import React, { type FC, type PropsWithChildren } from 'react';
import { useAuthContext } from '@/features/Authorize';
import { Navigate } from 'react-router-dom';

export const PrivateRoute: FC<PropsWithChildren> = ({ children }) => {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) return <Navigate to="/authorize" />;

  return <>{children}</>;
};
