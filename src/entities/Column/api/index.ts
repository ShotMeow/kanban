import { getFirestore, doc, updateDoc, getDocs, collection, addDoc, deleteDoc } from 'firebase/firestore';

import {
  type AddColumnType,
  type ChangeColumnType,
  type ColumnType,
  type DeleteColumnType,
  type GetColumnType,
} from '../types';

export const getColumnCollectionsOfBoard = async ({ userId, boardId }: GetColumnType): Promise<ColumnType[]> => {
  const db = getFirestore();

  const columns: ColumnType[] = [];
  try {
    const querySnapshot = await getDocs(collection(doc(doc(db, 'users', userId), 'boards', boardId), 'columns'));

    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<ColumnType, 'id'>;

      columns.push({
        id: doc.id,
        ...data,
      });
    });
  } catch (error) {
    return await Promise.reject(error);
  }

  return columns;
};

export const addColumnToBoardCollectionOfUser = async ({ userId, boardId, column }: AddColumnType): Promise<void> => {
  const db = getFirestore();

  await addDoc(collection(doc(doc(db, 'users', userId), 'boards', boardId), 'columns'), { ...column });
};

export const changeColumnInBoardCollectionOfUser = async ({
  userId,
  boardId,
  columnId,
  column,
}: ChangeColumnType): Promise<void> => {
  const db = getFirestore();

  const docRef = doc(doc(doc(db, 'users', userId), 'boards', boardId), 'columns', columnId);
  await updateDoc(docRef, { ...column });
};

export const deleteColumnFromBoardCollectionOfUser = async ({
  userId,
  boardId,
  columnId,
}: DeleteColumnType): Promise<void> => {
  const db = getFirestore();

  await deleteDoc(doc(doc(doc(db, 'users', userId), 'boards', boardId), 'columns', columnId));
};
