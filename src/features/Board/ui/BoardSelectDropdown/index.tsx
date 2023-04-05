import React, { type FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Dropdown } from '@/shared/ui';
import { getBoards, getCurrentBoard, setCurrentBoard } from '@/features/Board';

import { type BoardType } from '../../types';

import styles from './BoardSelectDropdown.module.scss';
import classNames from 'classnames';

interface Props {
  setDropdownShown: React.Dispatch<React.SetStateAction<boolean>>;
  dropdownShown: boolean;
}

export const BoardSelectDropdown: FC<Props> = ({ setDropdownShown, dropdownShown }) => {
  const boards = useSelector(getBoards);
  const currentBoard = useSelector(getCurrentBoard);
  const dispatch = useDispatch();

  const handleSelect = (board: BoardType): void => {
    void dispatch(setCurrentBoard({ boardId: board.id }));
    setDropdownShown(false);
  };

  return (
    <Dropdown className={styles.dropdown} onShownChange={setDropdownShown} shown={dropdownShown}>
      <ul>
        {boards?.map((board) => (
          <li key={board.id}>
            <button
              className={classNames({
                [styles.active]: board.id === currentBoard?.id,
              })}
              onClick={() => {
                handleSelect(board);
              }}
            >
              {board.title}
            </button>
          </li>
        ))}
      </ul>
    </Dropdown>
  );
};
