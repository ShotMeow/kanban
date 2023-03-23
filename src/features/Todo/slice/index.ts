import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type TodoSliceType, type TodoType } from '../types';

const initialState: TodoSliceType = {
  todos: null,
};

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, { payload }: PayloadAction<TodoType[]>) => {
      state.todos = payload;
    },
    clearTodos: (state) => {
      state.todos = null;
    },
  },
});

export const { setTodos, clearTodos } = todoSlice.actions;
export default todoSlice.reducer;
