import React, { type FC, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { router } from '@/shared/libs/react-router-dom';

import { useAuthContext } from '@/features/Authorize';
import { boardApi } from '@/features/Board';

export const App: FC = () => {
  const { user } = useAuthContext();

  const { refetch: boardsRefetch } = boardApi.useGetBoardsQuery({ userId: user?.uid || '' });

  useEffect(() => {
    void boardsRefetch();
  }, [user]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
