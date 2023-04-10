export interface TaskType {
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

export interface GetTaskType {
  userId: string;
  boardId: string;
  columnId: string;
}

export interface AddTaskType {
  userId: string;
  boardId: string;
  columnId: string;
  task: Omit<TaskType, 'id'>;
}

export interface ChangeTaskType {
  userId: string;
  boardId: string;
  columnId: string;
  newColumnId?: string;
  taskId: string;
  task: Partial<Omit<TaskType, 'id'>>;
}

export interface DeleteTaskType {
  userId: string;
  boardId: string;
  columnId: string;
  taskId: string;
}

export interface MoveTaskToOtherColumnType {
  userId: string;
  boardId: string;
  columnFromId: string;
  columnToId: string;
  task: TaskType;
}

export interface TaskSliceType {
  tasks: TaskType[] | null;
}
