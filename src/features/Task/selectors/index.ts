import { type RootState } from '@/app/store';
import { type TaskType } from '@/features/Task/types';

export const getTasks = (state: RootState): TaskType[] | null => state.task.tasks;
