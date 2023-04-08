import React, { type FC, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';

import { Button, LogoutIcon, OtherButton } from '@/shared/ui';

import { getCurrentBoard, BoardActionsDropdown } from '@/entities/Board';
import { getColumns } from '@/entities/Column';

import styles from './DesktopHeader.module.scss';

interface Props {
  setLogoutModalShown: React.Dispatch<React.SetStateAction<boolean>>;
  setAddTaskModalShown: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DesktopHeader: FC<Props> = ({ setAddTaskModalShown, setLogoutModalShown }) => {
  const [dropdownShown, setDropdownShown] = useState<boolean>(false);

  const currentBoard = useSelector(getCurrentBoard);
  const columns = useSelector(getColumns);

  return (
    <header className={styles.header}>
      <h1>{currentBoard?.title}</h1>
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
                + Add New Task
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
  );
};
