import {
  addTaskToBoardCollectionOfUser,
  changeTaskFromCollectionOfUser,
  deleteTaskFromBoardCollectionOfUser,
  getTaskCollectionsOfColumn,
  moveTaskToOtherColumn,
} from '../api';
import {
  type AddTaskType,
  type ChangeTaskType,
  type DeleteTaskType,
  type GetTaskType,
  type MoveTaskToOtherColumnType,
} from '../types';

import { rtkApi } from '@/shared/libs/redux-toolkit';

export const taskApi = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      async queryFn({ userId, boardId, columnId }: GetTaskType) {
        const tasks = await getTaskCollectionsOfColumn({ userId, boardId, columnId });
        return { data: tasks };
      },
      providesTags: ['Task'],
    }),
    addTask: builder.mutation({
      async queryFn({ userId, boardId, columnId, task }: AddTaskType) {
        await addTaskToBoardCollectionOfUser({ userId, boardId, columnId, task });
        return { data: 'OK' };
      },
      invalidatesTags: ['Task'],
    }),
    changeTask: builder.mutation({
      async queryFn({ userId, boardId, columnId, taskId, task }: ChangeTaskType) {
        await changeTaskFromCollectionOfUser({ userId, boardId, columnId, taskId, task });
        return { data: 'OK' };
      },
      invalidatesTags: ['Task'],
    }),
    deleteTask: builder.mutation({
      async queryFn({ userId, boardId, columnId, taskId }: DeleteTaskType) {
        await deleteTaskFromBoardCollectionOfUser({ userId, boardId, columnId, taskId });
        return { data: 'OK' };
      },
      invalidatesTags: ['Task'],
    }),
    moveTask: builder.mutation({
      async queryFn({ userId, boardId, columnFromId, columnToId, task }: MoveTaskToOtherColumnType) {
        await moveTaskToOtherColumn({ userId, boardId, columnFromId, columnToId, task });
        return { data: 'OK' };
      },
      invalidatesTags: ['Task'],
    }),
  }),
});
