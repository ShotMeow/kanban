import { type ColumnType } from '../types';

export const getBoardStatuses = (columns: ColumnType[]): string[] => {
  const arr: string[] = [];
  columns.forEach((column) => arr.push(column.title));

  return arr;
};
