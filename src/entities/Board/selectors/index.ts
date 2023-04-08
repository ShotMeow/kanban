import { type RootState } from '@/app/store';
import { type BoardType } from '../types';

export const getBoards = (state: RootState): BoardType[] | null => state.board.boards;
export const getCurrentBoard = (state: RootState): BoardType | null => state.board.currentBoard;
