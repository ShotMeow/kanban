import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, updateDoc } from '@firebase/firestore';

import { type AddTodoType, type ChangeTodoType, type DeleteTodoType, type GetTodoType, type TodoType } from '../types';

export const getTodosFromBoardCollectionOfUser = async ({ userId, boardId }: GetTodoType): Promise<TodoType[]> => {
  const db = getFirestore();

  const todos: TodoType[] = [];

  try {
    const querySnapshot = await getDocs(collection(doc(doc(db, 'users', userId), 'boards', boardId), 'todos'));

    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<TodoType, 'id'>;

      todos.push({
        id: doc.id,
        ...data,
      });
    });
  } catch (error) {
    return await Promise.reject(error);
  }

  return todos;
};

export const addTodoToBoardCollectionOfUser = async ({ userId, boardId, task }: AddTodoType): Promise<void> => {
  const db = getFirestore();

  await addDoc(collection(doc(doc(db, 'users', userId), 'boards', boardId), 'todos'), {
    ...task,
  });
};

export const changeTodoFromCollectionOfUser = async ({
  userId,
  boardId,
  todoId,
  todo,
}: ChangeTodoType): Promise<void> => {
  const db = getFirestore();

  const docRef = doc(doc(doc(db, 'users', userId), 'boards', boardId), 'todos', todoId);
  await updateDoc(docRef, {
    ...todo,
  });
};

export const deleteTodoFromBoardCollectionOfUser = async ({
  userId,
  boardId,
  todoId,
}: DeleteTodoType): Promise<void> => {
  const db = getFirestore();

  const docRef = doc(doc(doc(db, 'users', userId), 'boards', boardId), 'todos', todoId);
  await deleteDoc(docRef);
};
