import { type RootState } from '@/app/store';
import { type ColumnType } from '../types';

export const getColumns = (state: RootState): ColumnType[] | null => state.column.columns;
