import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, updateDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
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

export const icons = [
  'beaker',
  'bell',
  'chart-pie',
  'chart-square-bar',
  'chip',
  'clock',
  'currency-dollar',
  'film',
  'fire',
  'flag',
  'globe',
  'photograph',
  'presentation-chart-bar',
  'presentation-chart-line',
  'speakerphone',
  'star',
  'terminal',
  'translate',
  'trash',
  'truck',
  'video-camera',
];

export const getIconsFromFirebaseStorage = async (): Promise<string[]> => {
  const storage = getStorage();

  const paths: string[] = [];

  for (const icon of icons) {
    const svgRef = ref(storage, `icons/kanban-${icon}.svg`);
    const path = await getDownloadURL(svgRef);
    paths.push(path);
  }

  return paths;
};
