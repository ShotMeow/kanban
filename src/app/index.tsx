import React, { type FC } from 'react';
import { router } from '@/shared/libs/react-router-dom';
import { RouterProvider } from 'react-router-dom';
import { useAuthContext } from '@/features/Authorize';
import { boardApi } from '@/features/Board';

export const App: FC = () => {
  const { user } = useAuthContext();

  user && boardApi.useGetBoardsQuery({ userId: user.uid });
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
