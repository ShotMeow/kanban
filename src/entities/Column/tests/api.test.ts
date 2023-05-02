import { getFirestore, collection, doc, updateDoc, getDocs, addDoc, deleteDoc } from 'firebase/firestore';
import {
  addColumnToBoardCollectionOfUser,
  changeColumnInBoardCollectionOfUser,
  deleteColumnFromBoardCollectionOfUser,
  getColumnCollectionsOfBoard,
} from '../api';
import {
  type AddColumnType,
  type ChangeColumnType,
  type ColumnType,
  type DeleteColumnType,
  type GetColumnType,
} from '../types';

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  doc: jest.fn(),
  getDocs: jest.fn(),
  addDoc: jest.fn(),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
}));

describe('getColumnCollectionsOfBoard', () => {
  const testUserId: GetColumnType['userId'] = 'testUserId';
  const testBoardId: GetColumnType['boardId'] = 'testBoardId';
  const testColumnsData: ColumnType[] = [
    {
      id: 'id1',
      color: '#FFFFFF',
      title: 'TestColumnTitle',
    },
    {
      id: 'id2',
      color: '#000000',
      title: 'TestColumnTitle',
    },
  ];

  beforeAll(() => {
    (getDocs as jest.Mock).mockResolvedValue({
      forEach: jest.fn((callback) => {
        testColumnsData.forEach((column) => {
          callback({
            data: () => column,
          });
        });
      }),
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Call Firestore methods with correct arguments', async () => {
    await getColumnCollectionsOfBoard({ userId: testUserId, boardId: testBoardId });

    expect(getFirestore).toHaveBeenCalledTimes(1);
    expect(getDocs).toHaveBeenCalledTimes(1);
    expect(collection).toHaveBeenCalledTimes(1);
    expect(doc).toHaveBeenCalledTimes(2);
  });

  it('Get true data', async () => {
    const response = await getColumnCollectionsOfBoard({ userId: testUserId, boardId: testBoardId });

    expect(response).toEqual(testColumnsData);
  });
});

describe('addColumnToBoardCollectionOfUser', () => {
  const testUserId: AddColumnType['userId'] = 'testUserId';
  const testBoardId: AddColumnType['boardId'] = 'testBoardId';
  const testColumn: AddColumnType['column'] = { color: '#FFFFFF', title: 'TestColumnTitle' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Call Firestore methods with correct arguments', async () => {
    await addColumnToBoardCollectionOfUser({ userId: testUserId, boardId: testBoardId, column: testColumn });

    expect(getFirestore).toHaveBeenCalledTimes(1);
    expect(collection).toHaveBeenCalledTimes(1);
    expect(addDoc).toHaveBeenCalledTimes(1);
    expect(doc).toHaveBeenCalledTimes(2);
  });
});

describe('changeColumnInBoardCollectionOfUser', () => {
  const testUserId: ChangeColumnType['userId'] = 'testUserId';
  const testBoardId: ChangeColumnType['boardId'] = 'testBoardId';
  const testColumnId: ChangeColumnType['columnId'] = 'testColumnId';
  const testColumn: ChangeColumnType['column'] = { color: '#FFFFFF', title: 'TestColumnTitle' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Call Firestore methods with correct arguments and incomplete board data', async () => {
    await changeColumnInBoardCollectionOfUser({
      userId: testUserId,
      boardId: testBoardId,
      columnId: testColumnId,
      column: testColumn,
    });

    expect(getFirestore).toHaveBeenCalledTimes(1);
    expect(updateDoc).toHaveBeenCalledTimes(1);
    expect(doc).toHaveBeenCalledTimes(3);
  });
});

describe('deleteColumnFromBoardCollectionOfUser', () => {
  const testUserId: DeleteColumnType['userId'] = 'testUserId';
  const testBoardId: DeleteColumnType['boardId'] = 'testBoardId';
  const testColumnId: DeleteColumnType['columnId'] = 'testColumnId';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Call Firestore methods with correct arguments', async () => {
    await deleteColumnFromBoardCollectionOfUser({ userId: testUserId, boardId: testBoardId, columnId: testColumnId });

    expect(getFirestore).toHaveBeenCalledTimes(1);
    expect(deleteDoc).toHaveBeenCalledTimes(1);
    expect(doc).toHaveBeenCalledTimes(3);
  });
});
