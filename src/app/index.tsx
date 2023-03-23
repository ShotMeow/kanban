import React, { type FC, useEffect } from 'react';
import { router } from '@/shared/libs/react-router-dom';
import { RouterProvider } from 'react-router-dom';
import { useAuthContext } from '@/features/Authorize';
import { boardApi } from '@/features/Board';

export const App: FC = () => {
  const { user } = useAuthContext();

  const { refetch } = boardApi.useGetBoardsQuery({ userId: user?.uid || '' });

  useEffect(() => {
    void refetch();
  }, [user]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
