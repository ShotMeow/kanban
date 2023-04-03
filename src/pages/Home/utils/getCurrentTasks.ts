import { type TodoType } from '@/features/Task';
import { type ColumnType } from '@/features/Board';

export const getCurrentTasks = (todos: TodoType[], column: ColumnType): TodoType[] => {
  return todos.filter((todo) => todo.status === column.title);
};
