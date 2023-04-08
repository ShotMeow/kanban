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

export const addBoardCollectionToUser = async ({ userId, board }: AddBoardType): Promise<void> => {
  const db = getFirestore();

  const docRef = collection(doc(db, 'users', userId), 'boards');
  await addDoc(docRef, { ...board });
};

export const changeBoardCollectionOfUser = async ({ userId, boardId, board }: ChangeBoardType): Promise<void> => {
  const db = getFirestore();

  const docRef = doc(doc(db, 'users', userId), 'boards', boardId);
  await updateDoc(docRef, { ...board });
};

export const deleteBoardCollectionOfUser = async ({ userId, boardId }: DeleteBoardType): Promise<void> => {
  const db = getFirestore();

  const docRef = doc(doc(db, 'users', userId), 'boards', boardId);
  await deleteDoc(docRef);
};
