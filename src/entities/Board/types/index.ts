export interface BoardType {
  id: string;
  title: string;
  icon: string;
}
export interface GetBoardType {
  userId: string;
}

export interface AddBoardType {
  userId: string;
  board: Omit<BoardType, 'id'>;
}

export interface ChangeBoardType {
  userId: string;
  boardId: string;
  board: Partial<Omit<BoardType, 'id'>>;
}

export interface DeleteBoardType {
  userId: string;
  boardId: string;
}

export interface BoardSliceType {
  boards: BoardType[] | null;
  icons: string[] | null;
  currentBoard: BoardType | null;
}
