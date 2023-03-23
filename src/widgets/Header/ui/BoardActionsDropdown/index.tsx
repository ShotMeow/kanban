import React, { type FC, useState } from 'react';
import styles from '@/widgets/Header/ui/Header/Header.module.scss';
import { Dropdown, RenameIcon, TrashIcon } from '@/shared/ui';
import { AnimatePresence } from 'framer-motion';
import { ChangeBoardModal } from '@/widgets/Header/ui/ChangeBoardModal';
import { DeleteBoardModal } from '@/widgets/Header/ui/DeleteBoardModal';

interface Props {
  setDropdownShown: React.Dispatch<React.SetStateAction<boolean>>;
  dropdownShown: boolean;
}

export const BoardActionsDropdown: FC<Props> = ({ setDropdownShown, dropdownShown }) => {
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
          onClick={() => {
            setDeleteBoardModalShown(true);
          }}
        >
          <TrashIcon /> <span>Delete</span>
        </button>
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
