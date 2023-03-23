import React, { type FC, useRef, useState } from 'react';

import styles from './Header.module.scss';
import { Button, Dropdown, LogoutIcon, OtherButton, Modal, TrashIcon, RenameIcon, Message, Field } from '@/shared/ui';
import { AnimatePresence } from 'framer-motion';
import { useAuthContext } from '@/features/Authorize';
import { useSelector } from 'react-redux';
import { boardApi, getCurrentBoard } from '@/features/Board';

export const Header: FC = () => {
  const { logout } = useAuthContext();
  const [dropdownShown, setDropdownShown] = useState<boolean>(false);
  const [logoutModalShown, setLogoutModalShown] = useState<boolean>(false);
  const [changeBoardModalShown, setChangeBoardModalShown] = useState<boolean>(false);
  const [deleteBoardModalShown, setDeleteBoardModalShown] = useState<boolean>(false);
  const currentBoard = useSelector(getCurrentBoard);
  const { user } = useAuthContext();

  const [boardTitle, setBoardTitle] = useState<string>(currentBoard?.title || '');

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [deleteBoard] = boardApi.useDeleteBoardMutation();
  const [changeBoard] = boardApi.useChangeBoardMutation();

  const targetRef = useRef<HTMLButtonElement>(null);

  const handleDeleteBoard = (): void => {
    deleteBoard({ userId: user?.uid || '', boardId: currentBoard?.id || '' })
      .then(() => {
        setSuccessMessage(`The board «${currentBoard?.title}» was successfully deleted`);
        setDeleteBoardModalShown(false);
      })
      .catch(() => {
        setErrorMessage('The board could not be deleted. Try again later');
      });
  };

  const handleChangeBoard = (): void => {
    changeBoard({ userId: user?.uid || '', boardId: currentBoard?.id || '', boardTitle })
      .then(() => {
        setSuccessMessage(`The board «${currentBoard?.title}» was successfully changed`);
        setChangeBoardModalShown(false);
      })
      .catch(() => {
        setErrorMessage('The board could not be changed. Try again later');
      });
  };

  return (
    <>
      <header className={styles.header}>
        <h1>{currentBoard?.title}</h1>
        <div className={styles.actions}>
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
                )}
              </AnimatePresence>
            </div>
          </div>
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
        {errorMessage && (
          <Message messageVisibleHandler={setErrorMessage} error>
            {errorMessage}
          </Message>
        )}
        {successMessage && (
          <Message messageVisibleHandler={setSuccessMessage} success>
            {successMessage}
          </Message>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {logoutModalShown && (
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
        )}
        {changeBoardModalShown && (
          <Modal className={styles.modal} onShownChange={setChangeBoardModalShown} shown={changeBoardModalShown}>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleChangeBoard();
              }}
            >
              {currentBoard && (
                <Field
                  title="Board Name"
                  onChange={(event) => {
                    setBoardTitle(event.currentTarget.value);
                  }}
                  value={boardTitle}
                />
              )}
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
                  Change
                </Button>
              </div>
            </form>
          </Modal>
        )}
        {deleteBoardModalShown && (
          <Modal className={styles.modal} onShownChange={setDeleteBoardModalShown} shown={deleteBoardModalShown}>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleDeleteBoard();
              }}
            >
              <h3>Do you really want delete «{currentBoard?.title}» board?</h3>
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
                  Delete
                </Button>
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};
