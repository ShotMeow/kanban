import React, { type FC, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';

import { Button, LogoutIcon, OtherButton } from '@/shared/ui';

import { getCurrentBoard, BoardActionsDropdown } from '@/features/Board';
import { AddTaskModal } from '@/features/Task';
import { getColumns } from '@/features/Column';

import { LogoutModal } from '../LogoutModal';
import styles from './Header.module.scss';

export const Header: FC = () => {
  const [dropdownShown, setDropdownShown] = useState<boolean>(false);
  const [logoutModalShown, setLogoutModalShown] = useState<boolean>(false);
  const [addTaskModalShown, setAddTaskModalShown] = useState<boolean>(false);

  const currentBoard = useSelector(getCurrentBoard);
  const columns = useSelector(getColumns);

  const targetRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <header className={styles.header}>
        <h1>{currentBoard?.title}</h1>
        <div className={styles.actions}>
          {currentBoard && (
            <div className={styles.board}>
              {columns && (
                <Button
                  onClick={(event) => {
                    event.stopPropagation();
                    setAddTaskModalShown(true);
                  }}
                  primary
                >
                  + Add New Task
                </Button>
              )}
              <div className={styles.other}>
                <OtherButton
                  onClick={(event) => {
                    event.stopPropagation();
                    setDropdownShown(!dropdownShown);
                  }}
                  ref={targetRef}
                />
                <AnimatePresence>
                  {dropdownShown && (
                    <BoardActionsDropdown setDropdownShown={setDropdownShown} dropdownShown={dropdownShown} />
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
          <Button
            onClick={(event) => {
              event.stopPropagation();
              setLogoutModalShown(true);
            }}
            secondary
          >
            <LogoutIcon />
            Logout
          </Button>
        </div>
      </header>
      <AnimatePresence>
        {logoutModalShown && (
          <LogoutModal logoutModalShown={logoutModalShown} setLogoutModalShown={setLogoutModalShown} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {addTaskModalShown && (
          <AddTaskModal setAddTaskModalShown={setAddTaskModalShown} addTaskModalShown={addTaskModalShown} />
        )}
      </AnimatePresence>
    </>
  );
};
