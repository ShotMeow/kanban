import { getFirestore, collection, doc, updateDoc, getDocs, addDoc, deleteDoc } from 'firebase/firestore';
import {
  addTaskToBoardCollectionOfUser,
  changeTaskFromCollectionOfUser,
  deleteTaskFromBoardCollectionOfUser,
  getTaskCollectionsOfColumn,
  moveTaskToOtherColumn,
} from '../api';
import {
  type AddTaskType,
  type ChangeTaskType,
  type DeleteTaskType,
  type GetTaskType,
  type MoveTaskToOtherColumnType,
  type TaskType,
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

describe('getTaskCollectionsOfColumn', () => {
  const testUserId: GetTaskType['userId'] = 'testUserId';
  const testBoardId: GetTaskType['boardId'] = 'testBoardId';
  const testColumnId: GetTaskType['columnId'] = 'testColumnId';
  const testTasks: TaskType[] = [
    {
      id: 'TestTaskId',
      title: 'TestTaskTitle',
      description: 'TestTaskDescription',
      subtasks: [
        {
          id: 1,
          value: 'TestSubtaskValue',
          isSuccess: true,
        },
        {
          id: 2,
          value: 'TestSubtaskValue',
          isSuccess: false,
        },
      ],
      status: 'TestStatus',
    },
    {
      id: 'TestTaskId2',
      title: 'TestTaskTitle',
      description: 'TestTaskDescription',
      subtasks: [
        {
          id: 1,
          value: 'TestSubtaskValue',
          isSuccess: true,
        },
        {
          id: 2,
          value: 'TestSubtaskValue',
          isSuccess: false,
        },
      ],
      status: 'TestStatus',
    },
  ];

  beforeAll(() => {
    (getDocs as jest.Mock).mockResolvedValue({
      forEach: jest.fn((callback) => {
        testTasks.forEach((task) => {
          callback({
            data: () => task,
          });
        });
      }),
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Call Firestore methods with correct arguments', async () => {
    await getTaskCollectionsOfColumn({ userId: testUserId, boardId: testBoardId, columnId: testColumnId });

    expect(getFirestore).toHaveBeenCalledTimes(1);
    expect(getDocs).toHaveBeenCalledTimes(1);
    expect(collection).toHaveBeenCalledTimes(1);
    expect(doc).toHaveBeenCalledTimes(3);
  });

  it('Get true data', async () => {
    const response = await getTaskCollectionsOfColumn({
      userId: testUserId,
      boardId: testBoardId,
      columnId: testColumnId,
    });

    expect(response).toEqual(testTasks);
  });

  it('Throw error if Firestore methods fail', async () => {
    const errorMessage = 'Firestore methods failed';
    (getDocs as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await expect(
      getTaskCollectionsOfColumn({ userId: testUserId, boardId: testBoardId, columnId: testColumnId })
    ).rejects.toThrow(errorMessage);
  });
});

describe('addTaskToBoardCollectionOfUser', () => {
  const testUserId: AddTaskType['userId'] = 'testUserId';
  const testBoardId: AddTaskType['boardId'] = 'testBoardId';
  const testColumnId: AddTaskType['columnId'] = 'testColumnId';
  const testTask: AddTaskType['task'] = {
    title: 'TestTaskTitle',
    description: 'TestTaskDescription',
    subtasks: [
      {
        id: 1,
        value: 'TestSubtaskValue',
        isSuccess: true,
      },
      {
        id: 2,
        value: 'TestSubtaskValue',
        isSuccess: false,
      },
    ],
    status: 'TestStatus',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Call Firestore methods with correct arguments', async () => {
    await addTaskToBoardCollectionOfUser({
      userId: testUserId,
      boardId: testBoardId,
      columnId: testColumnId,
      task: testTask,
    });

    expect(getFirestore).toHaveBeenCalledTimes(1);
    expect(collection).toHaveBeenCalledTimes(1);
    expect(addDoc).toHaveBeenCalledTimes(1);
    expect(doc).toHaveBeenCalledTimes(3);
  });
});

describe('changeTaskFromCollectionOfUser', () => {
  const testUserId: ChangeTaskType['userId'] = 'testUserId';
  const testBoardId: ChangeTaskType['boardId'] = 'testBoardId';
  const testColumnId: ChangeTaskType['columnId'] = 'testColumnId';
  const testTaskId: ChangeTaskType['taskId'] = 'testTaskId';
  const testTask: ChangeTaskType['task'] = {
    title: 'TestTaskTitle',
    description: 'TestTaskDescription',
    status: 'TestStatus',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Call Firestore methods with correct arguments and incomplete board data', async () => {
    await changeTaskFromCollectionOfUser({
      userId: testUserId,
      boardId: testBoardId,
      columnId: testColumnId,
      taskId: testTaskId,
      task: testTask,
    });

    expect(getFirestore).toHaveBeenCalledTimes(1);
    expect(updateDoc).toHaveBeenCalledTimes(1);
    expect(doc).toHaveBeenCalledTimes(4);
  });
});

describe('deleteTaskFromBoardCollectionOfUser', () => {
  const testUserId: DeleteTaskType['userId'] = 'testUserId';
  const testBoardId: DeleteTaskType['boardId'] = 'testBoardId';
  const testColumnId: DeleteTaskType['columnId'] = 'testColumnId';
  const testTaskId: DeleteTaskType['taskId'] = 'testTaskId';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Call Firestore methods with correct arguments', async () => {
    await deleteTaskFromBoardCollectionOfUser({
      userId: testUserId,
      boardId: testBoardId,
      columnId: testColumnId,
      taskId: testTaskId,
    });

    expect(getFirestore).toHaveBeenCalledTimes(1);
    expect(deleteDoc).toHaveBeenCalledTimes(1);
    expect(doc).toHaveBeenCalledTimes(4);
  });
});

describe('moveTaskToOtherColumn', () => {
  const testUserId: MoveTaskToOtherColumnType['userId'] = 'testUserId';
  const testBoardId: MoveTaskToOtherColumnType['boardId'] = 'testBoardId';
  const testColumnFromId: MoveTaskToOtherColumnType['columnFromId'] = 'testColumnFromId';
  const testColumnToId: MoveTaskToOtherColumnType['columnToId'] = 'testColumnToId';
  const testTask: MoveTaskToOtherColumnType['task'] = {
    id: 'TestTaskId',
    title: 'TestTaskTitle',
    description: 'TestTaskDescription',
    subtasks: [
      {
        id: 1,
        value: 'TestSubtaskValue',
        isSuccess: true,
      },
      {
        id: 2,
        value: 'TestSubtaskValue',
        isSuccess: false,
      },
    ],
    status: 'TestStatus',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Call Firestore methods with correct arguments', async () => {
    await moveTaskToOtherColumn({
      userId: testUserId,
      boardId: testBoardId,
      columnFromId: testColumnFromId,
      columnToId: testColumnToId,
      task: testTask,
    });

    expect(getFirestore).toHaveBeenCalledTimes(1);
    expect(deleteDoc).toHaveBeenCalledTimes(1);
    expect(doc).toHaveBeenCalledTimes(7);
  });
});
