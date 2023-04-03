import React, { type FC, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { Dropdown, RenameIcon, TrashIcon } from '@/shared/ui';

import { ChangeColumnModal } from '../ChangeColumnModal';
import { DeleteColumnModal } from '../DeleteColumnModal';
import { type ColumnType } from '../../types';
import styles from './ColumnActionsDropdown.module.scss';

interface Props {
  setDropdownShown: React.Dispatch<React.SetStateAction<boolean>>;
  dropdownShown: boolean;
  column: ColumnType;
}

export const ColumnActionsDropdown: FC<Props> = ({ setDropdownShown, dropdownShown, column }) => {
  const [changeColumnModalShown, setChangeColumnModalShown] = useState<boolean>(false);
  const [deleteColumnModalShown, setDeleteColumnModalShown] = useState<boolean>(false);

  return (
    <>
      <Dropdown className={styles.dropdown} onShownChange={setDropdownShown} shown={dropdownShown}>
        <button
          onClick={() => {
            setChangeColumnModalShown(true);
          }}
        >
          <RenameIcon /> <span>Rename</span>
        </button>
        <button
          className={styles.delete}
          onClick={() => {
            setDeleteColumnModalShown(true);
          }}
        >
          <TrashIcon /> <span>Delete</span>
        </button>
      </Dropdown>
      <AnimatePresence>
        {changeColumnModalShown && (
          <ChangeColumnModal
            column={column}
            setChangeColumnModalShown={setChangeColumnModalShown}
            changeColumnModalShown={changeColumnModalShown}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {deleteColumnModalShown && (
          <DeleteColumnModal
            column={column}
            deleteColumnModalShown={deleteColumnModalShown}
            setDeleteColumnModalShown={setDeleteColumnModalShown}
          />
        )}
      </AnimatePresence>
    </>
  );
};
