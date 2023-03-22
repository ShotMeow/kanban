import React, { type FC, useRef, useState } from 'react';

import styles from './Header.module.scss';
import { Button, Dropdown, LogoutIcon, OtherButton, Modal } from '@/shared/ui';
import { AnimatePresence } from 'framer-motion';
import { useAuthContext } from '@/features/Authorize';

export const Header: FC = () => {
  const { logout } = useAuthContext();
  const [dropdownShown, setDropdownShown] = useState<boolean>(false);
  const [logoutModalShown, setLogoutModalShown] = useState<boolean>(false);

  const targetRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <header className={styles.header}>
        <h1>Platform Launch</h1>
        <div className={styles.actions}>
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
                <Dropdown className={styles.dropdown} onShownChange={setDropdownShown} shown={dropdownShown}>
                  <button
                    onClick={() => {
                      setLogoutModalShown(true);
                    }}
                  >
                    <LogoutIcon /> Logout
                  </button>
                </Dropdown>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {logoutModalShown && (
          <Modal className={styles.modal} onShownChange={setLogoutModalShown} shown={logoutModalShown}>
            <h3>Do you really want to log out?</h3>
            <div className={styles.actions}>
              <Button
                onClick={() => {
                  setLogoutModalShown(false);
                }}
                secondary
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  logout();
                }}
                primary
              >
                Log out
              </Button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};
