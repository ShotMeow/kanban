import {
  addColumnToBoardCollectionOfUser,
  changeColumnInBoardCollectionOfUser,
  deleteColumnFromBoardCollectionOfUser,
  getColumnCollectionsOfBoard,
} from '../api';
import { type AddColumnType, type ChangeColumnType, type DeleteColumnType, type GetColumnType } from '../types';
import { clearColumns, setColumns } from '../slice';

import { rtkApi } from '@/shared/libs/redux-toolkit';

export const columnApi = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getColumns: builder.query({
      async queryFn({ userId, boardId }: GetColumnType) {
        const columns = await getColumnCollectionsOfBoard({ userId, boardId });
        return { data: columns };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setColumns(data));
        } catch (error) {
          dispatch(clearColumns());
        }
      },
      providesTags: ['Column'],
    }),
    addColumn: builder.mutation({
      async queryFn({ userId, boardId, column }: AddColumnType) {
        await addColumnToBoardCollectionOfUser({ userId, boardId, column });
        return { data: 'OK' };
      },
      invalidatesTags: ['Column'],
    }),
    changeColumn: builder.mutation({
      async queryFn({ userId, boardId, columnId, column }: ChangeColumnType) {
        await changeColumnInBoardCollectionOfUser({ userId, boardId, columnId, column });
        return { data: 'OK' };
      },
      invalidatesTags: ['Column'],
    }),
    deleteColumn: builder.mutation({
      async queryFn({ userId, boardId, columnId }: DeleteColumnType) {
        await deleteColumnFromBoardCollectionOfUser({ userId, boardId, columnId });
        return { data: 'OK' };
      },
      invalidatesTags: ['Column'],
    }),
  }),
});
