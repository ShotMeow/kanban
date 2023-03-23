import React, { type FC, useRef, useState } from 'react';

import styles from './Header.module.scss';
import { Button, LogoutIcon, OtherButton } from '@/shared/ui';
import { AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { getCurrentBoard } from '@/features/Board';
import { BoardActionsDropdown } from '@/widgets/Header/ui/BoardActionsDropdown';
import { LogoutModal } from '@/widgets/Header/ui/LogoutModal';

export const Header: FC = () => {
  const [dropdownShown, setDropdownShown] = useState<boolean>(false);
  const [logoutModalShown, setLogoutModalShown] = useState<boolean>(false);
  const currentBoard = useSelector(getCurrentBoard);

  const targetRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <header className={styles.header}>
        <h1>{currentBoard?.title}</h1>
        <div className={styles.actions}>
          {currentBoard && (
            <div className={styles.board}>
              <Button primary>+ Add New Task</Button>
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
    </>
  );
};
