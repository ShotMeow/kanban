import { type RootState } from '@/app/store';
import { type TodoType } from '@/features/Task/types';

export const getTodos = (state: RootState): TodoType[] | null => state.todo.todos;
