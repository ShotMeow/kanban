import { getFirestore, collection, doc, updateDoc, getDocs, addDoc, deleteDoc } from 'firebase/firestore';
import {
  addBoardCollectionToUser,
  changeBoardCollectionOfUser,
  deleteBoardCollectionOfUser,
  getBoardCollectionsOfUser,
  getIconsFromFirebaseStorage,
  icons,
} from '../api';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  doc: jest.fn(),
  getDocs: jest.fn(),
  addDoc: jest.fn(),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
}));

jest.mock('firebase/storage', () => ({
  getStorage: jest.fn(),
  getDownloadURL: jest.fn(),
  ref: jest.fn(),
}));

describe('getBoardCollectionsOfUser', () => {
  const testUserId = 'testUserId';
  const testBoardsData = [
    {
      id: 'id1',
      title: 'Board 1',
      icon: 'https://kanban.com/icons/test-icon.svg',
    },
    {
      id: 'id2',
      title: 'Board 2',
      icon: 'https://kanban.com/icons/test-icon.svg',
    },
  ];

  beforeAll(() => {
    (getDocs as jest.Mock).mockResolvedValue({
      forEach: jest.fn((callback) => {
        testBoardsData.forEach((board) => {
          callback({
            data: () => board,
          });
        });
      }),
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Call Firestore methods with correct arguments', async () => {
    await getBoardCollectionsOfUser({ userId: testUserId });

    expect(getFirestore).toHaveBeenCalledTimes(1);
    expect(getDocs).toHaveBeenCalledTimes(1);
    expect(collection).toHaveBeenCalledTimes(1);
    expect(doc).toHaveBeenCalledTimes(1);
  });

  it('Get true data', async () => {
    expect(await getBoardCollectionsOfUser({ userId: testUserId })).toEqual(testBoardsData);
  });
});

describe('addBoardCollectionToUser', () => {
  const testUserId = 'testUserId';
  const testBoard = { title: 'testBoardTitle', icon: 'https://kanban.com/icons/testIcon.svg' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Call Firestore methods with correct arguments', async () => {
    await addBoardCollectionToUser({ userId: testUserId, board: testBoard });

    expect(getFirestore).toHaveBeenCalledTimes(1);
    expect(collection).toHaveBeenCalledTimes(1);
    expect(addDoc).toHaveBeenCalledTimes(1);
    expect(doc).toHaveBeenCalledTimes(1);
  });
});

describe('changeBoardCollectionOfUser', () => {
  const testUserId = 'testUserId';
  const testBoardId = 'testBoardId';
  const testBoard = { title: 'testBoardTitle' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Call Firestore methods with correct arguments and incomplete board data', async () => {
    await changeBoardCollectionOfUser({ userId: testUserId, boardId: testBoardId, board: testBoard });

    expect(getFirestore).toHaveBeenCalledTimes(1);
    expect(updateDoc).toHaveBeenCalledTimes(1);
    expect(doc).toHaveBeenCalledTimes(2);
  });

  it('Call Firestore methods with correct arguments and complete board data', async () => {
    await changeBoardCollectionOfUser({ userId: testUserId, boardId: testBoardId, board: testBoard });

    expect(getFirestore).toHaveBeenCalledTimes(1);
    expect(updateDoc).toHaveBeenCalledTimes(1);
    expect(doc).toHaveBeenCalledTimes(2);
  });
});

describe('deleteBoardCollectionOfUser', () => {
  const testUserId = 'testUserId';
  const testBoardId = 'testBoardId';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Call Firestore methods with correct arguments', async () => {
    await deleteBoardCollectionOfUser({ userId: testUserId, boardId: testBoardId });

    expect(getFirestore).toHaveBeenCalledTimes(1);
    expect(deleteDoc).toHaveBeenCalledTimes(1);
    expect(doc).toHaveBeenCalledTimes(2);
  });
});
describe('getIconsFromFirebaseStorage', () => {
  const testIconPath = 'https://kanban.com/icons/kanban-test.svg';

  beforeAll(() => {
    (getDownloadURL as jest.Mock).mockReturnValue(testIconPath);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Call Firestore methods with correct arguments', async () => {
    await getIconsFromFirebaseStorage();

    expect(getStorage).toHaveBeenCalledTimes(1);
    expect(ref).toHaveBeenCalledTimes(icons.length); // 21
    expect(getDownloadURL).toHaveBeenCalledTimes(icons.length); // 21
  });

  it('Get current paths to icons', async () => {
    expect(await getIconsFromFirebaseStorage()).toEqual(new Array(21).fill(testIconPath));
  });
});
