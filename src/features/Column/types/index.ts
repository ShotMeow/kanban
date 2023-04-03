export interface ColumnType {
  id: string;
  color: string;
  title: string;
}

export interface GetColumnType {
  userId: string;
  boardId: string;
}

export interface AddColumnType {
  userId: string;
  boardId: string;
  column: Omit<ColumnType, 'id'>;
}

export interface ChangeColumnType {
  userId: string;
  boardId: string;
  columnId: string;
  column: Partial<Omit<ColumnType, 'id'>>;
}

export interface DeleteColumnType {
  userId: string;
  boardId: string;
  columnId: string;
}

export interface ColumnSliceType {
  columns: ColumnType[] | null;
}
