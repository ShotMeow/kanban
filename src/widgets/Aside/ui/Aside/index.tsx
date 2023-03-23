import React, { type FC, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { BoardIcon, Logo } from '@/shared/ui';
import { getBoards, getCurrentBoard } from '@/features/Board';
import { setCurrentBoard } from '@/features/Board/slice';
import { CreateBoardModal } from '@/widgets/Aside/ui/CreateBoardModal';

import styles from './Aside.module.scss';

export const Aside: FC = () => {
  const [createBoardModalShown, setCreateBoardModalShown] = useState<boolean>(false);
  const dispatch = useDispatch();
  const boards = useSelector(getBoards);
  const currentBoard = useSelector(getCurrentBoard);

  return (
    <>
      <aside className={styles.aside}>
        <Logo />
        <h3>All boards ({boards?.length || 0})</h3>
        <ul>
          {boards?.map((board) => (
            <li
              className={classNames({
                [styles.active]: currentBoard?.id === board.id,
              })}
              key={board.id}
            >
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => dispatch(setCurrentBoard({ boardId: board.id }))}
              >
                <BoardIcon /> <span>{board.title}</span>
              </motion.button>
              <div className={styles.background} />
            </li>
          ))}
          <li>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={(event) => {
                event.stopPropagation();
                setCreateBoardModalShown(true);
              }}
            >
              <BoardIcon /> <span>+ Create New Board</span>
            </motion.button>
          </li>
        </ul>
      </aside>
      <AnimatePresence>
        {createBoardModalShown && (
          <CreateBoardModal
            createBoardModalShown={createBoardModalShown}
            setCreateBoardModalShown={setCreateBoardModalShown}
          />
        )}
      </AnimatePresence>
    </>
  );
};
