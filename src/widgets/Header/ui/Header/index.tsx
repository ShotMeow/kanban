import React, { type FC, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { AddTaskModal } from '@/entities/Task';
import { LogoutModal } from '@/features/Authorize';

import { DesktopHeader } from '../DesktopHeader';
import { MobileHeader } from '../MobileHeader';

export const Header: FC = () => {
  const [logoutModalShown, setLogoutModalShown] = useState<boolean>(false);
  const [addTaskModalShown, setAddTaskModalShown] = useState<boolean>(false);

  return (
    <>
      <DesktopHeader setLogoutModalShown={setLogoutModalShown} setAddTaskModalShown={setAddTaskModalShown} />
      <MobileHeader setAddTaskModalShown={setAddTaskModalShown} setLogoutModalShown={setLogoutModalShown} />
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
