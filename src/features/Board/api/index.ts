import { getFirestore, addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';

import {
  type AddBoardType,
  type BoardType,
  type ChangeBoardType,
  type DeleteBoardType,
  type GetBoardType,
} from '../types';

export const getBoardCollectionsOfUser = async ({ userId }: GetBoardType): Promise<BoardType[]> => {
  const db = getFirestore();

  const boards: BoardType[] = [];
  try {
    const querySnapshot = await getDocs(collection(doc(db, 'users', userId), 'boards'));

    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<BoardType, 'id'>;

      boards.push({
        id: doc.id,
        ...data,
      });
    });
  } catch (error) {
    return await Promise.reject(error);
  }

  return boards;
};

export const addBoardCollectionToUser = async ({ userId, boardTitle }: AddBoardType): Promise<void> => {
  const db = getFirestore();

  await addDoc(collection(doc(db, 'users', userId), 'boards'), {
    title: boardTitle,
  });
};

export const changeBoardCollectionOfUser = async ({ userId, boardId, boardTitle }: ChangeBoardType): Promise<void> => {
  const db = getFirestore();

  const docRef = doc(doc(db, 'users', userId), 'boards', boardId);
  await updateDoc(docRef, {
    title: boardTitle,
  });
};

export const deleteBoardCollectionOfUser = async ({ userId, boardId }: DeleteBoardType): Promise<void> => {
  const db = getFirestore();

  const docRef = doc(doc(db, 'users', userId), 'boards', boardId);
  await deleteDoc(docRef);
};
