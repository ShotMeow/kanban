import { getFirestore, addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import {
  type AddTaskType,
  type ChangeTaskType,
  type DeleteTaskType,
  type GetTaskType,
  type MoveTaskToOtherColumnType,
  type TaskType,
} from '../types';

export const getTaskCollectionsOfColumn = async ({ userId, boardId, columnId }: GetTaskType): Promise<TaskType[]> => {
  const db = getFirestore();

  const tasks: TaskType[] = [];

  try {
    const querySnapshot = await getDocs(
      collection(doc(doc(doc(db, 'users', userId), 'boards', boardId), 'columns', columnId), 'tasks')
    );

    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<TaskType, 'id'>;

      tasks.push({
        id: doc.id,
        ...data,
      });
    });
  } catch (error) {
    return await Promise.reject(error);
  }

  return tasks;
};

export const addTaskToBoardCollectionOfUser = async ({
  userId,
  boardId,
  columnId,
  task,
}: AddTaskType): Promise<void> => {
  const db = getFirestore();

  const collectionRef = collection(doc(doc(doc(db, 'users', userId), 'boards', boardId), 'columns', columnId), 'tasks');

  await addDoc(collectionRef, {
    ...task,
  });
};

export const changeTaskFromCollectionOfUser = async ({
  userId,
  boardId,
  columnId,
  newColumnId,
  taskId,
  task,
}: ChangeTaskType): Promise<void> => {
  const db = getFirestore();

  if (newColumnId) {
    const docRef = doc(doc(doc(doc(db, 'users', userId), 'boards', boardId), 'columns', columnId), 'tasks', taskId);
    await deleteDoc(docRef);

    const collectionRef = collection(
      doc(doc(doc(db, 'users', userId), 'boards', boardId), 'columns', newColumnId),
      'tasks'
    );
    await addDoc(collectionRef, {
      ...task,
    });
  } else {
    const docRef = doc(doc(doc(doc(db, 'users', userId), 'boards', boardId), 'columns', columnId), 'tasks', taskId);
    await updateDoc(docRef, {
      ...task,
    });
  }
};

export const deleteTaskFromBoardCollectionOfUser = async ({
  userId,
  boardId,
  columnId,
  taskId,
}: DeleteTaskType): Promise<void> => {
  const db = getFirestore();

  const docRef = doc(doc(doc(doc(db, 'users', userId), 'boards', boardId), 'columns', columnId), 'tasks', taskId);
  await deleteDoc(docRef);
};

export const moveTaskToOtherColumn = async ({
  userId,
  boardId,
  columnFromId,
  columnToId,
  task,
}: MoveTaskToOtherColumnType): Promise<void> => {
  const db = getFirestore();

  const docOldRef = doc(
    doc(doc(doc(db, 'users', userId), 'boards', boardId), 'columns', columnFromId),
    'tasks',
    task.id
  );
  await deleteDoc(docOldRef);

  const docNewRef = collection(doc(doc(doc(db, 'users', userId), 'boards', boardId), 'columns', columnToId), 'tasks');
  await addDoc(docNewRef, {
    title: task.title,
    description: task.description,
    status: task.status,
    subtasks: task.subtasks,
  });
};
