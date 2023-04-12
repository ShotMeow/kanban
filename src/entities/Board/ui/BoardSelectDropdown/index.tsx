import React, { type FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Dropdown } from '@/shared/ui';
import { CreateBoardModal, getBoards, getCurrentBoard, setCurrentBoard } from '@/entities/Board';

import { type BoardType } from '../../types';

import styles from './BoardSelectDropdown.module.scss';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  setDropdownShown: React.Dispatch<React.SetStateAction<boolean>>;
  dropdownShown: boolean;
}

export const BoardSelectDropdown: FC<Props> = ({ setDropdownShown, dropdownShown }) => {
  const [createBoardModalShown, setCreateBoardModalShown] = useState<boolean>(false);
  const boards = useSelector(getBoards);
  const currentBoard = useSelector(getCurrentBoard);
  const dispatch = useDispatch();

  const handleSelect = (board: BoardType): void => {
    void dispatch(setCurrentBoard({ boardId: board.id }));
    setDropdownShown(false);
  };

  return (
    <>
      <Dropdown className={styles.dropdown} onShownChange={setDropdownShown} shown={dropdownShown}>
        <ul>
          {boards?.map((board) => (
            <li key={board.id}>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className={classNames({
                  [styles.active]: board.id === currentBoard?.id,
                })}
                onClick={() => {
                  handleSelect(board);
                }}
              >
                {board.title}
              </motion.button>
            </li>
          ))}
          <li>
            <motion.button
              className={styles.active}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCreateBoardModalShown(true);
              }}
            >
              <span>+ Create New Board</span>
            </motion.button>
          </li>
        </ul>
      </Dropdown>
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
