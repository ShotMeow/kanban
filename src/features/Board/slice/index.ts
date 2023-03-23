import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type BoardSliceType, type BoardType } from '../types';

const initialState: BoardSliceType = {
  boards: null,
  currentBoard: null,
};

export const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setBoards: (state, { payload }: PayloadAction<BoardType[]>) => {
      state.boards = payload;
      state.currentBoard = payload[0];
    },
    setCurrentBoard: (state, { payload }: PayloadAction<{ boardId: string }>) => {
      state.currentBoard = state.boards?.find((board) => board.id === payload.boardId) || null;
    },
    clearBoards: (state) => {
      state.boards = null;
      state.currentBoard = null;
    },
  },
});

export const { setBoards, clearBoards, setCurrentBoard } = boardSlice.actions;
export default boardSlice.reducer;
