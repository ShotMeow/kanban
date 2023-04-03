import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type ColumnSliceType, type ColumnType } from '../types';

const initialState: ColumnSliceType = {
  columns: null,
};

export const columnSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setColumns: (state, { payload }: PayloadAction<ColumnType[]>) => {
      state.columns = payload;
    },
    clearColumns: (state) => {
      state.columns = null;
    },
  },
});

export const { setColumns, clearColumns } = columnSlice.actions;
export default columnSlice.reducer;
