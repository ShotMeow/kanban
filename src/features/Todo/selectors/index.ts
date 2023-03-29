import { type RootState } from '@/app/store';
import { type TodoType } from '@/features/Todo/types';

export const getTodos = (state: RootState): TodoType[] | null => state.todo.todos;
