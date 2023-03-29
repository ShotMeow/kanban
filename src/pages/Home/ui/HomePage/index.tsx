import React, { type FC, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { AddColumnModal } from '@/pages/Home/ui/AddColumnModal';

import styles from './HomePage.module.scss';
import { useSelector } from 'react-redux';
import { getCurrentBoard } from '@/features/Board';
import { getTodos } from '@/features/Todo/selectors';
import { TaskCard } from '@/features/Todo/ui/TaskCard';
import { todoApi } from '@/features/Todo/queries';
import { useAuthContext } from '@/features/Authorize';
export const HomePage: FC = () => {
  const [addColumnModalShown, setAddColumnModalShown] = useState<boolean>(false);
  const { user } = useAuthContext();
  const currentBoard = useSelector(getCurrentBoard);
  const todos = useSelector(getTodos);

  const { refetch: todosRefetch } = todoApi.useGetTodoQuery({
    userId: user?.uid || '',
    boardId: currentBoard?.id || '',
  });

  useEffect(() => {
    void todosRefetch();
  }, [user, currentBoard]);

  return (
    <main className={styles.home}>
      {currentBoard && (
        <ul className={styles.columns}>
          {currentBoard?.columns?.map((column) => (
            <li key={column.title}>
              <h2>
                <div style={{ backgroundColor: column.color }} /> {column.title}
              </h2>
              {todos && (
                <ul>
                  {todos
                    ?.filter((todo) => todo.status === column.title)
                    .map((task) => (
                      <li key={task.id}>
                        <TaskCard task={task} />
                      </li>
                    ))}
                </ul>
              )}
            </li>
          ))}
          <li>
            <motion.button
              onClick={(event) => {
                event.stopPropagation();
                setAddColumnModalShown(true);
              }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.95 }}
            >
              + New Column
            </motion.button>
          </li>
        </ul>
      )}
      <AnimatePresence>
        {addColumnModalShown && (
          <AddColumnModal setAddColumnModalShown={setAddColumnModalShown} addColumnModalShown={addColumnModalShown} />
        )}
      </AnimatePresence>
    </main>
  );
};
