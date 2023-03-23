import { clearTodos, setTodos } from '../slice';
import {
  addTodoToBoardCollectionOfUser,
  changeTodoFromCollectionOfUser,
  deleteTodoFromBoardCollectionOfUser,
  getTodosFromBoardCollectionOfUser,
} from '../api';
import { type AddTodoType, type ChangeTodoType, type DeleteTodoType, type GetTodoType } from '../types';

import { rtkApi } from '@/shared/libs/redux-toolkit';

export const todoApi = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getTodo: builder.query({
      async queryFn({ userId, boardId }: GetTodoType) {
        const todos = await getTodosFromBoardCollectionOfUser({ userId, boardId });
        return { data: todos };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          data && dispatch(setTodos(data));
        } catch (error) {
          dispatch(clearTodos());
        }
      },
      providesTags: ['Todo'],
    }),
    addTodo: builder.mutation({
      async queryFn({ userId, boardId, task }: AddTodoType) {
        await addTodoToBoardCollectionOfUser({ userId, boardId, task });
        return { data: 'OK' };
      },
      invalidatesTags: ['Todo'],
    }),
    changeTodo: builder.mutation({
      async queryFn({ userId, boardId, todoId, todo }: ChangeTodoType) {
        await changeTodoFromCollectionOfUser({ userId, boardId, todoId, todo });
        return { data: 'OK' };
      },
      invalidatesTags: ['Todo'],
    }),
    deleteTodo: builder.mutation({
      async queryFn({ userId, boardId, todoId }: DeleteTodoType) {
        await deleteTodoFromBoardCollectionOfUser({ userId, boardId, todoId });
        return { data: 'OK' };
      },
      invalidatesTags: ['Todo'],
    }),
  }),
});
