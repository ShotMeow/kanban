import React, { type FC, type FormEvent, useState } from 'react';

import styles from './Aside.module.scss';
import { BoardIcon, Button, Field, Logo, Message, Modal } from '@/shared/ui';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuthContext } from '@/features/Authorize';
import { boardApi } from '@/features/Board/queries';
import { useDispatch, useSelector } from 'react-redux';
import { getBoards, getCurrentBoard } from '@/features/Board';
import { setCurrentBoard } from '@/features/Board/slice';
import classNames from 'classnames';

export const Aside: FC = () => {
  const [createBoardModalShown, setCreateBoardModalShown] = useState<boolean>(false);
  const [boardTitle, setBoardTitle] = useState<string>('');
  const { user } = useAuthContext();
  const [addBoard] = boardApi.useAddBoardMutation();
  const dispatch = useDispatch();
  const boards = useSelector(getBoards);
  const currentBoard = useSelector(getCurrentBoard);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleAddBoard = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    addBoard({ userId: user?.uid || '', boardTitle })
      .then((data) => {
        console.log(data);
        setSuccessMessage(`The board «${boardTitle}» was created successfully`);
        setCreateBoardModalShown(false);
      })
      .catch(() => {
        setErrorMessage('The board was not created. Try again later');
      });
  };

  return (
    <>
      <aside className={styles.aside}>
        <Logo />
        <h3>All boards ({boards?.length || 0})</h3>
        <ul>
          {boards?.map((board) => (
            <li
              className={classNames({
                [styles.active]: currentBoard?.id === board.id,
              })}
              key={board.id}
            >
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => dispatch(setCurrentBoard({ boardId: board.id }))}
              >
                <BoardIcon /> <span>{board.title}</span>
              </motion.button>
              <div className={styles.background} />
            </li>
          ))}
          <li>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={(event) => {
                event.stopPropagation();
                setCreateBoardModalShown(true);
              }}
            >
              <BoardIcon /> <span>+ Create New Board</span>
            </motion.button>
          </li>
        </ul>
      </aside>
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
        {createBoardModalShown && (
          <Modal className={styles.modal} onShownChange={setCreateBoardModalShown} shown={createBoardModalShown}>
            <form
              onSubmit={(event) => {
                handleAddBoard(event);
              }}
            >
              <h3>Create New Board</h3>
              <Field
                required
                value={boardTitle}
                onChange={(event) => {
                  setBoardTitle(event.currentTarget.value);
                }}
                title="Title"
                placeholder="e.g. Platform Launch"
              />
              <Button primary>Create Board</Button>
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};
