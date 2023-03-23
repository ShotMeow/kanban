export interface BoardType {
  id: string;
  title: string;
}

export interface GetBoardType {
  userId: string;
}

export interface AddBoardType {
  userId: string;
  boardTitle: string;
}

export interface ChangeBoardType {
  userId: string;
  boardId: string;
  boardTitle: string;
}

export interface DeleteBoardType {
  userId: string;
  boardId: string;
}

export interface BoardSliceType {
  boards: BoardType[] | null;
  currentBoard: BoardType | null;
}
