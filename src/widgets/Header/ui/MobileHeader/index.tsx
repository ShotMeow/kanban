import React, { type FC, useState } from 'react';

import styles from './MobileHeader.module.scss';
import { Button, OtherButton } from '@/shared/ui';
import { AnimatePresence } from 'framer-motion';
import { BoardActionsDropdown, BoardSelectDropdown, getCurrentBoard } from '@/features/Board';
import { useSelector } from 'react-redux';
import { getColumns } from '@/features/Column';
import { KanbanIcon } from '@/shared/ui/Icons/Kanban';
import { ArrowIcon } from '@/shared/ui/Icons/Arrow';
import classNames from 'classnames';

interface Props {
  setLogoutModalShown: React.Dispatch<React.SetStateAction<boolean>>;
  setAddTaskModalShown: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MobileHeader: FC<Props> = ({ setLogoutModalShown, setAddTaskModalShown }) => {
  const [dropdownShown, setDropdownShown] = useState<boolean>(false);
  const [selectBoardDropdownShown, setSelectBoardDropdownShown] = useState<boolean>(false);
  const currentBoard = useSelector(getCurrentBoard);
  const columns = useSelector(getColumns);

  return (
    <header className={styles.header}>
      <div className={styles.board}>
        <button
          onClick={(event) => {
            event.stopPropagation();
            setSelectBoardDropdownShown(!selectBoardDropdownShown);
          }}
          className={classNames({
            [styles.active]: selectBoardDropdownShown,
          })}
        >
          <h1>
            <KanbanIcon />
            {currentBoard?.title}
          </h1>
          <ArrowIcon />
        </button>
        <AnimatePresence>
          {selectBoardDropdownShown && (
            <BoardSelectDropdown
              setDropdownShown={setSelectBoardDropdownShown}
              dropdownShown={selectBoardDropdownShown}
            />
          )}
        </AnimatePresence>
      </div>
      <div className={styles.actions}>
        {currentBoard && (
          <div className={styles.board}>
            {Boolean(columns?.length) && (
              <Button
                onClick={(event) => {
                  event.stopPropagation();
                  setAddTaskModalShown(true);
                }}
                primary
              >
                +
              </Button>
            )}
            <div className={styles.other}>
              <OtherButton
                onClick={(event) => {
                  event.stopPropagation();
                  setDropdownShown(!dropdownShown);
                }}
              />
              <AnimatePresence>
                {dropdownShown && (
                  <BoardActionsDropdown
                    setLogoutModalShown={setLogoutModalShown}
                    setDropdownShown={setDropdownShown}
                    dropdownShown={dropdownShown}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
