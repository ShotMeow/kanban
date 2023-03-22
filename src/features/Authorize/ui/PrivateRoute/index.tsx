import React, { type FC, type PropsWithChildren } from 'react';
import { useAuthContext } from '@/features/Authorize';
import { Navigate } from 'react-router-dom';
import { Loader } from '@/widgets/Loader';

export const PrivateRoute: FC<PropsWithChildren> = ({ children }) => {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated === null) return <Loader />;

  return <>{isAuthenticated ? children : <Navigate to="/authorize" />}</>;
};
