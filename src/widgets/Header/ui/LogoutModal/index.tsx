import React, { type FC } from 'react';

import { Button, Modal } from '@/shared/ui';
import { useAuthContext } from '@/features/Authorize';

import styles from './LogoutModal.module.scss';

interface Props {
  setLogoutModalShown: React.Dispatch<React.SetStateAction<boolean>>;
  logoutModalShown: boolean;
}

export const LogoutModal: FC<Props> = ({ setLogoutModalShown, logoutModalShown }) => {
  const { logout } = useAuthContext();
  return (
    <Modal className={styles.modal} onShownChange={setLogoutModalShown} shown={logoutModalShown}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          logout();
        }}
      >
        <h3>Do you really want to log out?</h3>
        <div className={styles.actions}>
          <Button
            type="button"
            onClick={() => {
              setLogoutModalShown(false);
            }}
            secondary
          >
            Cancel
          </Button>
          <Button type="submit" primary>
            Log out
          </Button>
        </div>
      </form>
    </Modal>
  );
};
