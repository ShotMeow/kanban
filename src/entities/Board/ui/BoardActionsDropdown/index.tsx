import React, { type FC, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { Dropdown, LogoutIcon, RenameIcon, TrashIcon } from '@/shared/ui';

import { ChangeBoardModal } from '../ChangeBoardModal';
import { DeleteBoardModal } from '../DeleteBoardModal';
import styles from './BoardActionsDropdown.module.scss';
import { ColorSwitcher } from '@/features/ColorScheme';

interface Props {
  setDropdownShown: React.Dispatch<React.SetStateAction<boolean>>;
  setLogoutModalShown: React.Dispatch<React.SetStateAction<boolean>>;
  dropdownShown: boolean;
}

export const BoardActionsDropdown: FC<Props> = ({ setDropdownShown, setLogoutModalShown, dropdownShown }) => {
  const [changeBoardModalShown, setChangeBoardModalShown] = useState<boolean>(false);
  const [deleteBoardModalShown, setDeleteBoardModalShown] = useState<boolean>(false);

  return (
    <>
      <Dropdown className={styles.dropdown} onShownChange={setDropdownShown} shown={dropdownShown}>
        <button
          onClick={() => {
            setChangeBoardModalShown(true);
          }}
        >
          <RenameIcon /> <span>Rename</span>
        </button>
        <button
          className={styles.delete}
          onClick={() => {
            setDeleteBoardModalShown(true);
          }}
        >
          <TrashIcon /> <span>Delete</span>
        </button>
        <button
          className={styles.logout}
          onClick={() => {
            setLogoutModalShown(true);
          }}
        >
          <LogoutIcon /> <span>Logout</span>
        </button>
        <div className={styles.switcher}>
          <ColorSwitcher />
        </div>
      </Dropdown>
      <AnimatePresence>
        {changeBoardModalShown && (
          <ChangeBoardModal
            setChangeBoardModalShown={setChangeBoardModalShown}
            changeBoardModalShown={changeBoardModalShown}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {deleteBoardModalShown && (
          <DeleteBoardModal
            deleteBoardModalShown={deleteBoardModalShown}
            setDeleteBoardModalShown={setDeleteBoardModalShown}
          />
        )}
      </AnimatePresence>
    </>
  );
};
