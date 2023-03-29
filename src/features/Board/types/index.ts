export interface BoardType {
  id: string;
  title: string;
  columns?: ColumnType[];
}

export interface ColumnType {
  color: string;
  title: string;
}

export interface GetBoardType {
  userId: string;
}

export interface AddBoardType {
  userId: string;
  boardTitle: string;
}

export interface AddColumnToBoardType {
  userId: string;
  boardId: string;
  columnTitle: string;
  columnColor: string;
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

export interface DeleteColumnFromBoardType {
  userId: string;
  boardId: string;
  columnTitle: string;
}

export interface BoardSliceType {
  boards: BoardType[] | null;
  currentBoard: BoardType | null;
}
