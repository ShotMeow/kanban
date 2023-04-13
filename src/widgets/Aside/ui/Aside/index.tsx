import React, { type FC, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { BoardIcon, HideIcon, Logo } from '@/shared/ui';
import { getBoards, getCurrentBoard, CreateBoardModal, setCurrentBoard } from '@/entities/Board';

import styles from './Aside.module.scss';

interface Props {
  isSmallestAside: boolean;
  setIsSmallestAside: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Aside: FC<Props> = ({ isSmallestAside, setIsSmallestAside }) => {
  const [createBoardModalShown, setCreateBoardModalShown] = useState<boolean>(false);
  const dispatch = useDispatch();
  const boards = useSelector(getBoards);
  const currentBoard = useSelector(getCurrentBoard);
  return (
    <>
      <aside
        className={classNames(
          {
            [styles.smallest]: isSmallestAside,
          },
          styles.aside
        )}
      >
        <div className={styles.top}>
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
                  {board.icon ? <img width={20} height={20} src={board.icon} alt="Icon" /> : <BoardIcon />}
                  <span>{board.title}</span>
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
        </div>
        <div className={styles.bottom}>
          <motion.button
            aria-label="Hide Sidebar Button"
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsSmallestAside(!isSmallestAside);
            }}
          >
            <HideIcon /> <span>Hide Sidebar</span>
          </motion.button>
        </div>
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
