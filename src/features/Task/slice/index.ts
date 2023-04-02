import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type SubtaskType, type TodoSliceType, type TodoType } from '../types';

const initialState: TodoSliceType = {
  todos: null,
};

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    changeSubtasks: (state, { payload }: PayloadAction<SubtaskType>) => {
      state?.todos &&
        state.todos.forEach((todo) => {
          todo.subtasks.forEach((subtask) => {
            if (subtask.id === payload.id) subtask.isSuccess = payload.isSuccess;
          });
        });
    },
    clearTodos: (state) => {
      state.todos = null;
    },
    setTodos: (state, { payload }: PayloadAction<TodoType[]>) => {
      state.todos = payload;
    },
  },
});

export const { setTodos, clearTodos, changeSubtasks } = todoSlice.actions;
export default todoSlice.reducer;
