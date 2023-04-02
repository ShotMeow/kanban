export interface TodoType {
  id: string;
  title: string;
  description: string;
  subtasks: SubtaskType[];
  status: string;
}

export interface SubtaskType {
  id: number;
  value: string;
  isSuccess: boolean;
}

export interface GetTodoType {
  userId: string;
  boardId: string;
}

export interface AddTodoType {
  userId: string;
  boardId: string;
  task: Omit<TodoType, 'id'>;
}

export interface ChangeTodoType {
  userId: string;
  boardId: string;
  todoId: string;
  todo: Partial<Omit<TodoType, 'id'>>;
}

export interface DeleteTodoType {
  userId: string;
  boardId: string;
  todoId: string;
}

export interface TodoSliceType {
  todos: TodoType[] | null;
}
