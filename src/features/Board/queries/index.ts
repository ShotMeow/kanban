import {
  addBoardCollectionToUser,
  changeBoardCollectionOfUser,
  deleteBoardCollectionOfUser,
  getBoardCollectionsOfUser,
} from '../api';
import { type AddBoardType, type ChangeBoardType, type DeleteBoardType, type GetBoardType } from '../types';
import { clearBoards, setBoards } from '../slice';

import { rtkApi } from '@/shared/libs/redux-toolkit';

export const boardApi = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getBoards: builder.query({
      async queryFn({ userId }: GetBoardType) {
        const boards = await getBoardCollectionsOfUser({ userId });
        return { data: boards };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setBoards(data));
        } catch (error) {
          dispatch(clearBoards());
        }
      },
      providesTags: ['Board'],
    }),
    addBoard: builder.mutation({
      async queryFn({ userId, boardTitle }: AddBoardType) {
        await addBoardCollectionToUser({ userId, boardTitle });
        return { data: 'OK' };
      },
      invalidatesTags: ['Board'],
    }),
    changeBoard: builder.mutation({
      async queryFn({ userId, boardId, boardTitle }: ChangeBoardType) {
        await changeBoardCollectionOfUser({ userId, boardTitle, boardId });
        return { data: 'OK' };
      },
      invalidatesTags: ['Board'],
    }),
    deleteBoard: builder.mutation({
      async queryFn({ userId, boardId }: DeleteBoardType) {
        await deleteBoardCollectionOfUser({ userId, boardId });
        return { data: 'OK' };
      },
      invalidatesTags: ['Board'],
    }),
  }),
});
